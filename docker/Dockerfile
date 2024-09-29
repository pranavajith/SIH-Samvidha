FROM golang:alpine3.20
WORKDIR /app/backend
COPY backend/ .
RUN go mod tidy
RUN go build -o myapp .

FROM node:22-bookworm
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ .
COPY --from=0 /app/backend/myapp /app/backend/myapp

RUN apt-get install gnupg curl
RUN curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
RUN echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
RUN apt-get update
RUN apt-get install -y mongodb-org

WORKDIR /app
EXPOSE 3000 8080 27017

CMD ["sh", "-c", "mongod --logpath /var/log/mongodb.log && ./backend/myapp & cd frontend && npm start >/dev/null 2>/dev/null"]
