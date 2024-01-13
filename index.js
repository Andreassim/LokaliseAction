import { core } from "@actions/core"
import { LokaliseApi } from "@lokalise/node-api";


async function run(){
    try {
        console.log("Getting keys");
        const API_KEY = core.getInput('API_KEY');
        const PROJECT_KEY = core.getInput('PROJECT_KEY');
        
        console.log("Setting up lokaliseAPI");
        const lokaliseApi = new LokaliseApi({ apiKey: API_KEY});
        console.log("Download Translations");
        const downloads = await lokaliseApi.files().download(
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

run()

