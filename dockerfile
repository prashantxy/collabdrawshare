FROM node:alpine
 
WORKDIR /usr/src/app
 
COPY package.json ./
COPY package-lock.json ./
 
COPY apps/api/package.json ./apps/api/package.json
 
RUN npm install
 
COPY . .
 
EXPOSE 8080
 
CMD [ "node", "apps/api/server.js" ]