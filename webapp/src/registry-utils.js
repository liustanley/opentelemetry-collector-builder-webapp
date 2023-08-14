import { Octokit } from "@octokit/core";
import yaml from "js-yaml";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const getRegistry = async () => {
    const registryRequest = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
            owner: "open-telemetry",
            repo: "opentelemetry.io",
            path: "data/registry",
            headers: {
                "X-GitHub-Api-Version": "2022-11-28",
            },
        }
    );
    const registry = [];
    await Promise.all(
        registryRequest.data.map(async (registryItem) => {
            const registryItemRequest = await (
                await fetch(registryItem.download_url)
            ).text();
            const registryItemParsed = yaml.load(registryItemRequest);
            if (
                registryItemParsed.registryType &&
                (registryItemParsed.registryType == "receiver" ||
                    registryItemParsed.registryType == "processor" ||
                    registryItemParsed.registryType == "exporter")
            ) {
                registry.push({
                    id: registryItem.download_url,
                    content: registryItemParsed,
                });
            }
        })
    );
    return registry;
};

export { getRegistry };
