const core = require('@actions/core');
const github = require('@actions/github');
const LokaliseApi = require("@lokalise/node-api");

try {
  const API_KEY = core.getInput('API_KEY');
  const PROJECT_KEY = core.getInput('PROJECT_KEY');

  const lokaliseApi = new LokaliseApi({ apiKey: API_KEY});
  const downloads = await lokaliseApi.files().download(
    PROJECT_KEY, 
    {
        format: "xlf",
        original_filenames: false,
        bundle_structure: "frontend/src/i18n/messages.%LANG_ISO%.%FORMAT%",
        triggers: ['github']
    }
    )
  core.setOutput("result", "success");

} catch (error) {
  core.setFailed(error.message);
}