FROM node:alpine
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn
CMD yarn run server
