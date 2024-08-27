FROM node:22.7-alpine3.20 
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
# EXPOSE 3006
CMD ["yarn", "dev", "--host"]

