
# Stage 1 - Build app
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2 - Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /app/dist/todo-app/ /usr/share/nginx/html
# EXPOSE 80