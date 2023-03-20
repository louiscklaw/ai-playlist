# CREDIT: https://github.com/shren207/nextjs-docker-compose
# Dockerfile
FROM node:18-buster

RUN npm i -g npm-run-all
RUN npm i -g concurrently
RUN npm i -g nodemon

RUN mkdir -p /app
RUN mkdir -p /app/node_modules
RUN chown 1000:1000 -R /app

USER 1000:1000
