#!/usr/bin/env bash

set -x

docker build . -t poe-tryout-bait

docker image tag poe-tryout-bait logickee/poe-tryout-bait

docker push logickee/poe-tryout-bait
