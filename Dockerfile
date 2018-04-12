FROM node:8.10.0-alpine

WORKDIR /home/project

EXPOSE 3000

CMD ["npm","start"]