#!/usr/bin/env bash

set -x

docker image tag openbox-poe-seat logickee/openbox-poe-seat
docker image tag openbox-poe-seat 192.168.10.61:5000/openbox-poe-seat

docker push logickee/openbox-poe-seat
docker push 192.168.10.61:5000/openbox-poe-seat