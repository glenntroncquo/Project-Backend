FROM node:16.13.0-alpine as build-container
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]
RUN npm ci
COPY . .
RUN npm run build

## Now, we create a secondary container, that will be used in production
FROM node:16.13.0-alpine as production-container
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --only=production
# RUN npm install http-server -g
COPY --from=build-container /usr/src/app/dist ./dist
EXPOSE 80

CMD ["node", "dist/main"]
