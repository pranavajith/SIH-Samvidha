FROM node:22-slim

WORKDIR /app

COPY frontend/ .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
