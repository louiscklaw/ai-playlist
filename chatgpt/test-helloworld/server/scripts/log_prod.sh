#!/usr/bin/env bash

set -ex

docker compose -f docker/docker-compose.prod.yml logs -f
