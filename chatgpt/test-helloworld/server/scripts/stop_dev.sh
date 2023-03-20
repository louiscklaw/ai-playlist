#!/usr/bin/env bash

docker compose -f docker/docker-compose.dev.yml kill
docker compose -f docker/docker-compose.dev.yml down
