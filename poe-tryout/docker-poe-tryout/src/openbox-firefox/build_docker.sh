#!/usr/bin/env bash

set -x

docker rmi openbox-firefox-ubuntu

set -ex

# build openbox as base
cd dockerfiles/ubuntu
  docker build . -t openbox-firefox-ubuntu
cd -

# build openbox as base
cd dockerfiles/openbox
  docker build . -t openbox-firefox-ubuntu
cd -

cd dockerfiles/apps
  docker build -f dockerfile.puppeteer . -t openbox-firefox-ubuntu
  docker build -f dockerfile.vnc . -t openbox-firefox-ubuntu
  docker build -f dockerfile.firefox . -t openbox-firefox-ubuntu
cd -

# finialize docker
cd dockerfiles/final
  docker build . \
    --build-arg="ANDROID_API_LEVEL=$ANDROID_API_LEVEL" \
    -t openbox-firefox-ubuntu
cd -

# docker image tag openbox-firefox-ubuntu logickee/openbox-firefox-ubuntu
# docker push logickee/openbox-firefox-ubuntu

# docker run --rm -it \
#   --privileged \
#   --device /dev/kvm \
#   -v ./share:/share \
#   -p 6080:6080 \
#   -p 4723:4723 \
#   --name logickee_docker_android openbox-firefox-ubuntu
#   # bash

  # -v /root/.config:/share/.config:ro \
  # -p 15900:5900 \
#   # bash
#   # bash

# docker run -d -p 127.0.0.1:5901:5901 fullaxx/ubuntu-desktop
docker compose up -d
