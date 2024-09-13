# Use a slim Node.js image
FROM node:22-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY frontend/ .

# Build the React application
RUN npm run build

# Install a simple HTTP server to serve the built files
RUN npm install -g serve

# Expose the port on which the application will run
EXPOSE 5000

# Command to run the HTTP server
CMD ["serve", "-s", "build", "-l", "5000"]
