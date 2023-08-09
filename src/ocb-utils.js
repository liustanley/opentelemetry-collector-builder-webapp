import yaml from "js-yaml";

const getGoModUrl = (url) => {
    let newUrl = url;
    newUrl = newUrl.replace("github.com", "raw.githubusercontent.com");
    newUrl = newUrl.replace("/tree", "");
    newUrl = newUrl.replace("/blob", "");
    newUrl += "/go.mod";
    return newUrl;
};

const getGoModule = async (repoUrl) => {
    const goModUrl = getGoModUrl(repoUrl);
    const goModRequest = await fetch(goModUrl, { mode: "cors" });
    if (goModRequest.ok) {
        const goModRequestText = await goModRequest.text();
        const startIndex = goModRequestText.indexOf("module ") + 7;
        const endIndex = goModRequestText.indexOf("\n", startIndex);
        return goModRequestText.slice(startIndex, endIndex);
    } else {
        return null;
    }
};

const transformGoMods = (goModList, version) => {
    return goModList.map((goMod) => {
        return {
            gomod: goMod + " v" + version,
        };
    });
};

const generateManifest = async (components) => {
    const exporters = [],
        processors = [],
        receivers = [];

    await Promise.all(
        components.map(async (component) => {
            const goMod = await getGoModule(component.content.repo);
            if (goMod != null && component.content.registryType == "exporter") {
                exporters.push(goMod);
            } else if (
                goMod != null &&
                component.content.registryType == "processor"
            ) {
                processors.push(goMod);
            } else if (
                goMod != null &&
                component.content.registryType == "receiver"
            ) {
                receivers.push(goMod);
            }
        })
    );

    const manifest = {
        dist: {
            name: "otelcol-dev",
            description: "Basic OTel Collector distribution for Developers",
            output_path: "./otelcol-dev",
            otelcol_version: "0.82.0",
        },
    };
    manifest.exporters = transformGoMods(
        exporters,
        manifest.dist.otelcol_version
    );
    manifest.processors = transformGoMods(
        processors,
        manifest.dist.otelcol_version
    );
    manifest.receivers = transformGoMods(
        receivers,
        manifest.dist.otelcol_version
    );

    console.log(yaml.dump(manifest));
};

export { generateManifest };
