FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run db:migrate
RUN npm run db:populate

EXPOSE 3000

CMD ["npm", "run", "dev"]
