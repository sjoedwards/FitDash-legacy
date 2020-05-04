FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json /app/
RUN yarn
CMD yarn run server
