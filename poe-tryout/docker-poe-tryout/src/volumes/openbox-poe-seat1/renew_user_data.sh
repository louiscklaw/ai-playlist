#!/usr/bin/env bash

set -ex

echo $PWD

# rm -rf firefox-user-data
# cp -r /workspace/ai-playlist/poe-tryout/docker-poe-tryout/src/openbox-firefox/share.del/firefox-user-data \
#   .

docker kill openbox-poe-seat1

rm -rf ./chrome-user-data
cp -r ../../../_seeds/chrome-user-data-seed/ ./chrome-user-data

rm -rf ./firefox-user-data
cp -r ../../../_seeds/firefox-user-data-seed/ ./firefox-user-data

docker start openbox-poe-seat1
