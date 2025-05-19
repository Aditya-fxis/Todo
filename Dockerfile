# Base build image
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Lightweight server image
FROM node:18-alpine

WORKDIR /app

# Install `serve` to serve the built files
RUN npm install -g serve

# Copy build output from previous stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
