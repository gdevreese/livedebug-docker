FROM node:21-alpine

EXPOSE 3030
COPY . /livedebug
WORKDIR /livedebug
CMD ["sh", "-c", "npm install && node app.js"]
