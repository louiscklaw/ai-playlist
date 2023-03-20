#!/usr/bin/env bash

set -ex


npm run build:ts
node ./app.js