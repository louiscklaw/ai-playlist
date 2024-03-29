#!/usr/bin/env bash

set -x

# TODO: resume me
docker image rm -f logickee/openbox-seat-tester-base
docker image rm -f logickee/openbox-seat-tester-apps
docker image rm -f logickee/openbox-seat-tester-final
docker image rm -f logickee/openbox-seat-tester

docker pull ubuntu:22.04
docker image tag ubuntu:22.04 logickee/openbox-seat-tester-base

# build openbox as base
cd dockerfiles/ubuntu
  docker build . -t logickee/openbox-seat-tester-base
cd -

# build openbox as base
cd dockerfiles/openbox
  docker build . -t logickee/openbox-seat-tester-base
cd -

# NOTE: base end here

cd dockerfiles/apps
  docker image tag logickee/openbox-seat-tester-base logickee/openbox-seat-tester-apps
  docker build -f dockerfile.puppeteer . -t logickee/openbox-seat-tester-apps
  docker build -f dockerfile.vnc . -t logickee/openbox-seat-tester-apps
  docker build -f dockerfile.firefox . -t logickee/openbox-seat-tester-apps
  docker build -f dockerfile.chrome . -t logickee/openbox-seat-tester-apps
cd -

cd dockerfiles/apps/mitmproxy
  docker build . -t logickee/openbox-seat-tester-apps
cd -

# NOTE: apps end here

# finialize docker
cd dockerfiles/final
  # NOTE: do nothing but just init transfer tag at the very beginning
  docker image tag logickee/openbox-seat-tester-apps logickee/openbox-seat-tester-final

  docker build . \
    --build-arg="ANDROID_API_LEVEL=$ANDROID_API_LEVEL" \
    -t logickee/openbox-seat-tester-final

  # TODO: tag openbox-poe-seat-final here
cd -


# # docker image tag logickee/openbox-seat-tester-apps logickee/openbox-seat-tester-final

docker push logickee/openbox-seat-tester-base
docker push logickee/openbox-seat-tester-apps
docker push logickee/openbox-seat-tester-final
# # docker push logickee/openbox-seat-tester

# # docker image tag openbox-poe-seat logickee/openbox-seat-tester
# # docker push logickee/openbox-seat-tester

# # docker run --rm -it \
# #   --privileged \
# #   --device /dev/kvm \
# #   -p 6080:6080 \
# #   -p 4723:4723 \
# #   openbox-poe-seat \
# #   bash

#   # -v ./share:/share \
#   # -v /root/.config:/share/.config:ro \
#   # -p 15900:5900 \
# #   # bash
# #   # bash

# # docker run -d -p 127.0.0.1:5901:5901 fullaxx/ubuntu-desktop
# # docker compose up -d
