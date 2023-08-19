#!/usr/bin/env bash

set -x

docker build . -t logickee/poe-tryout-diff-handler

docker push logickee/poe-tryout-diff-handler
