## Build image
FROM node:14 as build

RUN apt-get update \
  && apt-get install -y build-essential python perl-modules
RUN mkdir -p /data
WORKDIR /data
COPY ./package*.json /data/
RUN npm ci --only=production

## Release image
FROM node:14-alpine

RUN mkdir -p /data
COPY --from=build /data/node_modules /data/node_modules
COPY ./ /data
WORKDIR /data
ENV PORT 1880
ENV NODE_ENV=production
ENV NODE_PATH=/data/node_modules
EXPOSE 1880

CMD ["node", "/data/lib/index.js"]
