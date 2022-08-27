FROM node:16.15

ENV PORT=3333

WORKDIR /home/node/app

COPY . .

COPY ./.docker/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

RUN yarn

EXPOSE ${PORT}

CMD [ "/entrypoint.sh" ]