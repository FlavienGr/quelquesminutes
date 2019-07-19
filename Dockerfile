FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
CMD ["npm", "run", "start"]
EXPOSE 5000
