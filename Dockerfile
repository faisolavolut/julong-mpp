# Stage 1: Install dependencies
FROM node:20 as base
WORKDIR /app
COPY . . 
RUN npm install
RUN npm run build
EXPOSE 3000/tcp
CMD ["node ", ".next/standalone/server.js"]
