#!/usr/bin/env bash

set -x

# TODO: resume me
docker image rm -f logickee/openbox-teamprompt-seat-base
docker image rm -f logickee/openbox-teamprompt-seat-apps
docker image rm -f logickee/openbox-teamprompt-seat-final
# docker image rm -f logickee/openbox-teamprompt-seat

set -ex

docker pull ubuntu:22.04
docker image tag ubuntu:22.04 logickee/openbox-teamprompt-seat-base

# build openbox as base
cd dockerfiles/ubuntu
  docker build . -t logickee/openbox-teamprompt-seat-base
cd -

# build openbox as base
cd dockerfiles/openbox
  docker build . -t logickee/openbox-teamprompt-seat-base
cd -

# # # NOTE: base end here

cd dockerfiles/apps
  docker image tag logickee/openbox-teamprompt-seat-base logickee/openbox-teamprompt-seat-apps
  docker build -f dockerfile.vnc . -t logickee/openbox-teamprompt-seat-apps
  docker build -f dockerfile.puppeteer . -t logickee/openbox-teamprompt-seat-apps
  docker build -f dockerfile.firefox . -t logickee/openbox-teamprompt-seat-apps
  docker build -f dockerfile.chrome . -t logickee/openbox-teamprompt-seat-apps
cd -

cd dockerfiles/apps/mitmproxy
  docker build . -t logickee/openbox-teamprompt-seat-apps
cd -

# # NOTE: apps end here

# finialize docker
cd dockerfiles/final
  # NOTE: do nothing but just init transfer tag at the very beginning
  docker image tag logickee/openbox-teamprompt-seat-apps logickee/openbox-teamprompt-seat-final

  docker build . \
    --build-arg="ANDROID_API_LEVEL=$ANDROID_API_LEVEL" \
    -t logickee/openbox-teamprompt-seat-final

  # TODO: tag openbox-teamprompt-seat-final here
cd -


# docker image tag logickee/openbox-teamprompt-seat-apps logickee/openbox-teamprompt-seat-final

# docker push logickee/openbox-teamprompt-seat-base
# docker push logickee/openbox-teamprompt-seat-apps
# docker push logickee/openbox-teamprompt-seat-final
# docker push logickee/openbox-teamprompt-seat

# docker image tag openbox-teamprompt-seat logickee/openbox-teamprompt-seat
# docker push logickee/openbox-teamprompt-seat

# docker run --rm -it \
#   --privileged \
#   --device /dev/kvm \
#   -p 6080:6080 \
#   -p 4723:4723 \
#   logickee/openbox-teamprompt-seat-final \
#   bash

  # -v ./share:/share \
  # -v /root/.config:/share/.config:ro \
  # -p 15900:5900 \
#   # bash
#   # bash

# docker run -d -p 127.0.0.1:5901:5901 fullaxx/ubuntu-desktop
# docker compose up -d
