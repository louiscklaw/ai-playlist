async function gptBotCooldown(time_s, page) {
  try {
    await page.waitForTimeout(time_s * 1000);
  } catch (error) {
    console.log('error during gptBotCooldown');
    throw error;
  }
}

module.exports = { gptBotCooldown };
