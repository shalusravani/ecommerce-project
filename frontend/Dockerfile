FROM node:16 as build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Fix permissions more aggressively
RUN chmod -R 777 /app/node_modules
RUN find /app/node_modules/.bin -type f -exec chmod +x {} \;

# Copy project files
COPY . .

# Try a different build approach
RUN npm rebuild node-sass
RUN NODE_ENV=production CI=false npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
