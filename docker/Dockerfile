FROM golang:alpine3.20
WORKDIR /app/backend
COPY backend/ .
RUN go mod tidy
RUN go build -o myapp .

FROM node:22-alpine
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ .
COPY --from=0 /app/backend/myapp /app/backend/myapp

WORKDIR /app
EXPOSE 3000 8080

CMD ["sh", "-c", "./backend/myapp & cd frontend && npm start >/dev/null 2>/dev/null"]
