#!/usr/bin/env bash

set -x

docker rmi openbox-firefox-ubuntu

set -ex

# build openbox as base
cd src/openbox-firefox
  ./build_docker.sh
cd -


# docker run -d -p 127.0.0.1:5901:5901 fullaxx/ubuntu-desktop
docker compose kill
docker compose down
docker compose up -d

# docker compose ps -a
docker compose logs -f
