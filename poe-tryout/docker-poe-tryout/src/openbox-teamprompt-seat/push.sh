#!/usr/bin/env bash

set -x

docker push logickee/openbox-teamprompt-seat-base
docker push logickee/openbox-teamprompt-seat-apps
docker push logickee/openbox-teamprompt-seat-final

# docker push logickee/openbox-teamprompt-seat