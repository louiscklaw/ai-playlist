#!/usr/bin/env bash

set -x

# rm -rf node_modules

export PUPPETEER_PRODUCT=firefox
npm install

npm i puppeteer-core \
  express \
  dotenv \
  puppeteer-extra \
  puppeteer-extra-plugin-stealth \
  puppeteer-extra-plugin-adblocker \
  puppeteer-proxy

npm run dev
