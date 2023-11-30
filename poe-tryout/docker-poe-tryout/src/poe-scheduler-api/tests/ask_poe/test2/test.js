const fetch = require("node-fetch");
const { myLogger } = require("../../../utils/myLogger");

const body = {
  preprompts: ["say 'preprompt1' to me", "say 'preprompt2' to me"],
  question_list: ["say 'question 1' to me", "say 'question 2' to me"],
};

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    myLogger.info(`posting ask ${i}...`);

    const response = await fetch("http://poe-scheduler-api:3002/ask_poe", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const res_json = await response.json();
    myLogger.info(JSON.stringify({ res_json }));
  });
