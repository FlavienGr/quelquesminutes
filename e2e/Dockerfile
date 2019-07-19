FROM cypress/base:10
WORKDIR '/app/'

COPY ./package*.json ./
ENV CI=1
RUN npm install && npm cache clean --force

COPY . .

RUN npx cypress verify
CMD ["npm", "run", "test"]
