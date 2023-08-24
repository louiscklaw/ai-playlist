const TG = require('telegram-bot-api');

const express = require('express');
const router = express.Router();

const { TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } = process.env;

const api = new TG({
  token: TELEGRAM_TOKEN,
});

const tgApi = api;

async function tgSendMarkDownMessage(md_content) {
  return api.sendMessage({
    chat_id: TELEGRAM_CHAT_ID,
    text: md_content,
    parse_mode: 'MarkdownV2',
  });
}

async function tgSendMarkDownAlert(md_content) {
  return api.sendMessage({
    chat_id: TELEGRAM_CHAT_ID,
    text: md_content,
    parse_mode: 'MarkdownV2',
  });
}

async function tgSendMessage(txt_content) {
  return api.sendMessage({
    chat_id: TELEGRAM_CHAT_ID,
    text: txt_content,
  });
}

module.exports = { api, tgApi, tgSendMarkDownMessage, tgSendMessage, tgSendMarkDownAlert };
