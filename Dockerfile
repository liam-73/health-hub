FROM node:16

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY ./src ./src

EXPOSE 8080
CMD [ "node", "index.js" ]