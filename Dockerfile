FROM node:8.10.0-alpine

WORKDIR /home/project

RUN npm install --production

EXPOSE 3000

CMD ["npm","start"]