FROM node:22-alpine

WORKDIR /app

# https://stackoverflow.com/a/34399661
COPY frontend/package* .

RUN npm install

# To prevent Cache Invalidation Error
COPY frontend/ .

EXPOSE 3000

CMD ["npm", "start"]
