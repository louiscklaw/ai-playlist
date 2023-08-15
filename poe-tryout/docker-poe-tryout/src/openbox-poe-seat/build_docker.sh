#!/usr/bin/env bash

set -x

docker rmi openbox-poe-seat

set -ex

# build openbox as base
cd dockerfiles/ubuntu
  docker build . -t openbox-poe-seat
cd -

# build openbox as base
cd dockerfiles/openbox
  docker build . -t openbox-poe-seat
cd -

cd dockerfiles/apps
  docker build -f dockerfile.puppeteer . -t openbox-poe-seat
  docker build -f dockerfile.vnc . -t openbox-poe-seat
  docker build -f dockerfile.firefox . -t openbox-poe-seat
  docker build -f dockerfile.chrome . -t openbox-poe-seat
cd -

cd dockerfiles/apps/mitmproxy
  docker build . -t openbox-poe-seat
cd -

# finialize docker
cd dockerfiles/final
  docker build . \
    --build-arg="ANDROID_API_LEVEL=$ANDROID_API_LEVEL" \
    -t openbox-poe-seat
cd -

# docker image tag openbox-poe-seat logickee/openbox-poe-seat
# docker push logickee/openbox-poe-seat

# docker run --rm -it \
#   --privileged \
#   --device /dev/kvm \
#   -p 6080:6080 \
#   -p 4723:4723 \
#   openbox-poe-seat \
#   bash

  # -v ./share:/share \
  # -v /root/.config:/share/.config:ro \
  # -p 15900:5900 \
#   # bash
#   # bash

# docker run -d -p 127.0.0.1:5901:5901 fullaxx/ubuntu-desktop
# docker compose up -d
