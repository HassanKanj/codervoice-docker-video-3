FROM node:12-alpine
WORKDIR /my-app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "server.js"]

