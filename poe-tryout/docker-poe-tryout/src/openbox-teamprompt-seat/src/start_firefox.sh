#!/usr/bin/env bash

set -x

# mkdir -p /share/firefox
# cp -r /share/firefox-seed /share/firefox

firefox -jsconsole --profile /workspace/firefox-user-data
