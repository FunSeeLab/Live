FROM node:8.10.0-alpine

WORKDIR /home/project

COPY ./package.json /home/project

RUN npm install --production

COPY ./ /home/project

EXPOSE 3000

CMD ["npm","start"]