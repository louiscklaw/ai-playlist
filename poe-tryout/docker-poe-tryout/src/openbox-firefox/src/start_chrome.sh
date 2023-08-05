#!/usr/bin/env bash

set -x

# mkdir -p /share/firefox
# cp -r /share/firefox-seed /share/firefox

google-chrome-stable \
  --no-sandbox \
  --user-data-dir=/share/chrome-user-data
