# Stage 1
FROM node:13
WORKDIR /usr/app

RUN apt-get update
RUN apt-get install musl-dev openssl -y
RUN ln -s /usr/lib/x86_64-linux-musl/libc.so /lib/libc.musl-x86_64.so.1

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prisma:generate
RUN npm run build

# Stage 2
FROM node:13
WORKDIR /usr/app

RUN apt-get update
RUN apt-get install musl-dev openssl -y
RUN ln -s /usr/lib/x86_64-linux-musl/libc.so /lib/libc.musl-x86_64.so.1

COPY package*.json ./

RUN npm install --production

COPY --from=0 /usr/app/prisma ./prisma
COPY --from=0 /usr/app/dist ./dist

RUN npm run prisma:generate

ENV NODE_ENV=production

EXPOSE 3333
CMD ["node", "dist/server.js"]
