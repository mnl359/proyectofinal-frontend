FROM node:14.14.0-stretch

MAINTAINER Manuela Carrasco

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD  ["npm", "run", "start"]