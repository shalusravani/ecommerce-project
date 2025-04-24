FROM node:16 as build
WORKDIR /app

# Add the node_modules/.bin to PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies
COPY package*.json ./
RUN npm install
RUN npm install react-scripts -g

# Copy project files
COPY . .

# Build the app
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
