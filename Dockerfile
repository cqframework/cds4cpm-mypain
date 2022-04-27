FROM nginx:1.21.6-alpine

ENV PUBLIC_URL=.

RUN apk add -U --no-cache nghttp2-dev nodejs yarn

RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
COPY default.conf /etc/nginx/conf.d/default.conf
CMD ["/bin/sh", "-c", "export REACT_APP_PUBLIC_URL=${PUBLIC_URL} && yarn build && cp -r /home/node/app/build/* /usr/share/nginx/html && cd /usr/share/nginx/html && nginx -g \"daemon off;\""]