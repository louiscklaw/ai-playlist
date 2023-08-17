#!/usr/bin/env bash

set -x

docker build . -t poe-tryout-static-share

docker image tag poe-tryout-static-share logickee/poe-tryout-static-share

docker push logickee/poe-tryout-static-share
