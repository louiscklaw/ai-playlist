#!/usr/bin/env bash

set -ex


ffmpeg -ss 30 -t 3 -i input.mp4 \
    -vf "fps=24,scale=800:-1" \
    -loop 0 output.gif
