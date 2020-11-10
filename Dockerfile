FROM node:12-alpine

WORKDIR /source/flashcards-api

COPY package.json /source/flashcards-api

RUN cd /source/flashcards-api && yarn --only=production

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
