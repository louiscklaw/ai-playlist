const { OUT_OF_QUOTA } = require("../worker/poe/chatGPT/error");
const { myLogger } = require("./myLogger");


async function checkIfOutOfQuota(page) {
    try {
        myLogger.info('checkIfOutOfQuota.js: init')

        const [left_incidator] = await page.$x("//div[contains(., 'Standard bots: 0 left')]");
        if (left_incidator) throw new Error(OUT_OF_QUOTA);

    } catch (error) {
        if (error.message == OUT_OF_QUOTA) {
            myLogger.error('out of quota for ChatGPT')
        }
        throw error;
    }

}

module.exports = { checkIfOutOfQuota }
