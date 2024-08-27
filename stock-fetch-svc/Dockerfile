FROM node:22.7-alpine3.20 AS development
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

FROM node:alpine as production
WORKDIR /app
COPY package*.json ./
RUN npm install --only=prod
COPY . .
COPY --from=development /app/dist ./dist
CMD ["node", "dist/main"]
