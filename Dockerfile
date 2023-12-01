FROM node:18.17.1-alpine as builder

WORKDIR /app

COPY . ./

ARG ACTIVE_ENV

RUN npm install \
    && npm run build:${ACTIVE_ENV}

FROM nginx:1.25.3-alpine-slim

COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]