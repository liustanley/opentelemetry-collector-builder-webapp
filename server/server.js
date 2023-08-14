const express = require("express");
const cors = require("cors");
const yaml = require("js-yaml");
const { writeFile } = require("fs/promises");
const shell = require("shelljs");

const app = express();
app.use(express.json(), cors({ origin: "*" }));
const port = 8000;

app.post("/build", async function (req, res) {
    let config = req.body;
    await writeFile("./ocb_config.yaml", yaml.dump(config), (err) => {
        if (err) throw err;
        console.log("OCB config written to ocb_config.yaml");
    });
    shell.exec("./ocb --config ocb_config.yaml");
    console.log("Build written to /build");
    res.sendStatus(200);
});

app.listen(port, function () {
    console.log(`OCB server listening on port ${port}!`);
});
