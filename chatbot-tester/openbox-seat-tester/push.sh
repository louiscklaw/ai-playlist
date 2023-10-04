#!/usr/bin/env bash

set -x

docker image tag openbox-poe-seat logickee/openbox-poe-seat

docker push logickee/openbox-poe-seat