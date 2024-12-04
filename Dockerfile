# Stage 1: Install dependencies
FROM node:20 AS deps
WORKDIR /app
COPY . . 
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]
