FROM node:20.0.0 AS base
ENV TZ="Asia/Tokyo"
WORKDIR /app
RUN npm install -g pnpm
COPY package.json ./
COPY pnpm-lock.yaml ./

ARG BACKEND_ORIGIN_CLIENT
ENV REACT_APP_BACKEND_ORIGIN_CLIENT=${BACKEND_ORIGIN_CLIENT}

RUN pnpm install --frozen-lockfile


FROM base AS build
ENV PORT=80
COPY . /app
RUN pnpm build
RUN echo "pnpm start --port 80 --hostname 0.0.0.0" >> /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 80
ENTRYPOINT /entrypoint.sh

