FROM node:16.2-alpine as base

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .
