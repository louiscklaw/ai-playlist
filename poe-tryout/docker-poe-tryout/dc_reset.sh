#!/usr/bin/env bash

set -x

docker kill $(docker ps -qa)
docker rm $(docker ps -qa)

docker image rm -f $(docker image ls -q)
docker volume rm -f $(docker volume ls -q)

docker system prune -f --volumes
docker system df
