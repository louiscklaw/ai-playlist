#!/usr/bin/env bash

set -x

docker rmi openbox-seat-ubuntu

set -ex

# build openbox as base
cd dockerfiles/ubuntu
  docker build . -t openbox-seat-ubuntu
cd -

# build openbox as base
cd dockerfiles/openbox
  docker build . -t openbox-seat-ubuntu
cd -

cd dockerfiles/apps
  docker build -f dockerfile.puppeteer . -t openbox-seat-ubuntu
  docker build -f dockerfile.vnc . -t openbox-seat-ubuntu
  docker build -f dockerfile.firefox . -t openbox-seat-ubuntu
  docker build -f dockerfile.chrome . -t openbox-seat-ubuntu
cd -

cd dockerfiles/apps/mitmproxy
  docker build . -t openbox-seat-ubuntu
cd -

# finialize docker
cd dockerfiles/final
  docker build . \
    --build-arg="ANDROID_API_LEVEL=$ANDROID_API_LEVEL" \
    -t openbox-seat-ubuntu
cd -

# docker image tag openbox-seat-ubuntu logickee/openbox-seat-ubuntu
# docker push logickee/openbox-seat-ubuntu

# docker run --rm -it \
#   --privileged \
#   --device /dev/kvm \
#   -p 6080:6080 \
#   -p 4723:4723 \
#   openbox-seat-ubuntu \
#   bash

  # -v ./share:/share \
  # -v /root/.config:/share/.config:ro \
  # -p 15900:5900 \
#   # bash
#   # bash

# docker run -d -p 127.0.0.1:5901:5901 fullaxx/ubuntu-desktop
# docker compose up -d
