FROM node:16 as build

RUN mkdir -p /usr/local/src/things2do/backend
WORKDIR /usr/local/src/things2do/backend

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

COPY .babelrc ./.babelrc
COPY src ./src
RUN npm run build

FROM node:16 as production

ENV PORT=3000
ENV NODE_ENV=production

RUN mkdir -p /usr/local/bin/things2do/backend
WORKDIR /usr/local/bin/things2do/backend

COPY --from=build /usr/local/src/things2do/backend/package.json ./package.json
COPY --from=build /usr/local/src/things2do/backend/package-lock.json ./package-lock.json
RUN npm install --production

COPY --from=build /usr/local/src/things2do/backend/dist ./dist

EXPOSE 3000

CMD npm run start
