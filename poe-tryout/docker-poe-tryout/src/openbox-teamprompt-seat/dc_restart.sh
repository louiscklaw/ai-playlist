#!/usr/bin/env bash

set -ex

docker compose -f ../docker-compose.gen.yml restart openbox-teamprompt-seat1
