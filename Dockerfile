# Stage 1
FROM node:13
WORKDIR /usr/app

RUN apt-get update
RUN apt-get install musl-dev openssl -y
RUN ln -s /usr/lib/x86_64-linux-musl/libc.so /lib/libc.musl-x86_64.so.1

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn prisma:generate
RUN yarn build

# Stage 2
FROM node:13
WORKDIR /usr/app

RUN apt-get update
RUN apt-get install musl-dev openssl -y
RUN ln -s /usr/lib/x86_64-linux-musl/libc.so /lib/libc.musl-x86_64.so.1

COPY package*.json ./

RUN yarn --only=production

COPY --from=0 /usr/app/prisma ./prisma
COPY --from=0 /usr/app/dist ./dist

RUN yarn prisma:generate

ENV NODE_ENV=production

EXPOSE 3333
CMD ["node", "dist/server.js"]
