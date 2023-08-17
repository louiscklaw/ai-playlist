#!/usr/bin/env bash

set -x

docker build . -t poe-tryout-poe-scheduler-api

docker image tag poe-tryout-poe-scheduler-api logickee/poe-tryout-poe-scheduler-api

docker push logickee/poe-tryout-poe-scheduler-api
