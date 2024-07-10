FROM node:20.0.0 AS base
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

FROM base AS build
ENV PORT=80
COPY . /app
RUN yarn build
RUN echo "#!/bin/sh" > /entrypoint.sh \
 && echo "echo \"nameserver 172.16.0.51\" > /etc/resolv.conf" > /entrypoint.sh \
 && echo "echo \"nameserver 127.0.0.11\" >> /etc/resolv.conf" >> /entrypoint.sh \
 && echo "" >> /entrypoint.sh \
 && echo "yarn start --port 80 --hostname 0.0.0.0" >> /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 80
ENTRYPOINT /entrypoint.sh

