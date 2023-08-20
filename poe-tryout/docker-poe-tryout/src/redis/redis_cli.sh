#!/usr/bin/env bash

set -ex

docker compose exec -it redis redis-cli
