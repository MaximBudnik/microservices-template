FROM node:16.2-alpine as base

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build
