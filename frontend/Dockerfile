# Use a smaller, more up-to-date Node.js image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json separately for better caching
COPY package.json package-lock.json ./

# Install dependencies with production flag (ignores devDependencies)
RUN npm ci --only=production

# Copy the rest of the application
COPY . .

# Build the React app (output will be in the 'build' folder)
RUN npm run build

# Use a minimal web server in the final image (Nginx)
FROM nginx:alpine

# Copy the built React app to Nginx's default HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (default for Nginx)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]