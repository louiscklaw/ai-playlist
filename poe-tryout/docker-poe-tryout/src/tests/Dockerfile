FROM node:latest

RUN apt update
RUN apt install -qqy entr

WORKDIR /src

USER 1000:1000

ENTRYPOINT ["sleep", "infinity"]
