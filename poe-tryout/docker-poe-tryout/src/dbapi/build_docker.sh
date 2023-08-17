#!/usr/bin/env bash

set -x

docker build . -t poe-tryout-dbapi

docker image tag poe-tryout-dbapi logickee/poe-tryout-dbapi
docker image tag poe-tryout-dbapi 192.168.10.61:5000/poe-tryout-dbapi

docker push logickee/poe-tryout-dbapi
docker push 192.168.10.61:5000/poe-tryout-dbapi
