#!/usr/bin/env bash

set -x

docker build . -t poe-tryout-poe-scheduler-api

docker image tag poe-tryout-poe-scheduler-api logickee/poe-tryout-poe-scheduler-api
docker image tag poe-tryout-poe-scheduler-api 192.168.10.61:5000/poe-tryout-poe-scheduler-api

docker push logickee/poe-tryout-poe-scheduler-api
docker push 192.168.10.61:5000/poe-tryout-poe-scheduler-api
