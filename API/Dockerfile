FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install

CMD [ "node", "index.js" ]