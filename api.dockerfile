FROM node:16

WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

COPY ./api ./api
COPY ./common ./common

RUN yarn install --frozen-lockfile

WORKDIR /app/api

CMD yarn --cwd ./api start:dev