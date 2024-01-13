const core = require("@actions/core")
const { LokaliseApi } = require("@lokalise/node-api")
//import { LokaliseApi } from "@lokalise/node-api";

async function run(){
    try {
        console.log("Getting keys");
        const API_KEY = core.getInput('LOKALISE_API_KEY');
        const PROJECT_KEY = core.getInput('LOKALISE_PROJECT_KEY');
        
        console.log("Setting up lokaliseAPI");
        const lokAPI = new LokaliseApi({ apiKey: API_KEY });
        console.log("Download Translations");
        const downloads = await lokAPI.files().download(
            PROJECT_KEY, 
            {
                format: "xlf",
                original_filenames: false,
                bundle_structure: "frontend/src/i18n/messages.%LANG_ISO%.%FORMAT%",
                triggers: ['github']
            }
        );
        console.log("success");
        core.setOutput("result", "success");
            
    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports = {
    run
}