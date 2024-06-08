FROM node:alpine3.19 as build

WORKDIR /user/app

COPY package*.json .

RUN npm install

USER node

COPY  --chown=node:node . .

EXPOSE 3000

CMD [ "npm","start" ]