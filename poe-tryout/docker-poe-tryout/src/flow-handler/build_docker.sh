#!/usr/bin/env bash

set -x

docker build . -t poe-tryout-flow-handler

docker image tag poe-tryout-flow-handler logickee/poe-tryout-flow-handler
docker image tag poe-tryout-flow-handler 192.168.10.61:5000/poe-tryout-flow-handler

docker push logickee/poe-tryout-flow-handler
docker push 192.168.10.61:5000/poe-tryout-flow-handler
