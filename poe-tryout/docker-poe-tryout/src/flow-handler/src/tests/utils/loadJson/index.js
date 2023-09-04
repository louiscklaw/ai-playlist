const { loadJson, loadMetaJson } = require("../../../utils/loadJson");

(async () =>{
    // should point to /share/testing when undefined
    // await loadJson(undefined);

    // should point to /share/testing/meta.json when undefined
    // await loadMetaJson(undefined);

    // should load /hello_defined/meta.json when defined
    // await loadJson('/src/volumes/static-share/_output/testing/meta.json')

    await loadMetaJson('/src/volumes/static-share/_output/testing')
})()