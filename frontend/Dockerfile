FROM node:16-alpine as build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Set ownership and permissions
RUN mkdir -p node_modules/.bin && chmod -R 777 node_modules/.bin

# Copy project files
COPY . .

# Try both approaches for building
RUN set -x && \
    npm run build || \
    npx react-scripts build || \
    ./node_modules/.bin/react-scripts build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
