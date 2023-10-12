FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV ADDRESS=0.0.0.0 PORT=3003
EXPOSE 3003
CMD ["node", "server.js"]