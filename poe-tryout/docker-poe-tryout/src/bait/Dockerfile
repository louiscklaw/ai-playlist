FROM node:lts-buster-slim

ENV DEBIAN_FRONTEND noninteractive
RUN ln -fs /usr/share/zoneinfo/Asia/Hong_Kong /etc/localtime

RUN apt update && apt install -qy git curl wget sudo

RUN npm i -g live-server

WORKDIR /app

EXPOSE 8080

CMD ["live-server","./public","--host=0.0.0.0"]
