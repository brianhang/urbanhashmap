FROM node:16

WORKDIR /project

COPY package*.json .

WORKDIR /project/app
COPY ./app/package*.json .

WORKDIR /project/server
COPY ./server/package*.json .

WORKDIR /project

COPY . .

RUN npm install

RUN mkdir /project/app/node_modules/.cache && chmod -R 777 /project/app/node_modules/.cache

EXPOSE 3000

USER node
CMD npm run dev
