FROM node:6.5

RUN npm install --silent -g babel-cli webpack yarn

# Fix bug https://github.com/npm/npm/issues/9863
RUN cd $(npm root -g)/npm \
  && npm install fs-extra \
  && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js

ADD . /var/www/unleash

WORKDIR /var/www/unleash

RUN yarn

CMD npm start
