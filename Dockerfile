FROM node:argon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

ENV PATH=$PATH:/usr/src/app/node_modules/phantomjs/bin/
ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "start" ]
