# Dockerfile for React (Frontend)
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the static build files
RUN npm install -g serve

# Expose port 3000 (default for serve)
EXPOSE 3000

# Serve the built files on port 3000
CMD ["serve", "-s", "build"]