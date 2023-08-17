#!/usr/bin/env bash

set -x

docker build . -t poe-tryout-diff-handler

docker image tag poe-tryout-diff-handler logickee/poe-tryout-diff-handler

docker push logickee/poe-tryout-diff-handler
