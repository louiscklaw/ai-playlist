#!/usr/bin/env bash

set -x

docker build . -t poe-tryout-page-handler

docker image tag poe-tryout-page-handler logickee/poe-tryout-page-handler
docker image tag poe-tryout-page-handler 192.168.10.61:5000/poe-tryout-page-handler

docker push logickee/poe-tryout-page-handler
docker push 192.168.10.61:5000/poe-tryout-page-handler
