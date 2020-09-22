
# Base image is Alpine with latest stable Node installed. 
FROM node:alpine

# set working directory for subsequent commands
WORKDIR /back-end

# leverage build cache by copying npm package files first
COPY ./package*.json ./

RUN yarn

COPY ./ ./

# port
EXPOSE 3001

CMD ["yarn","dev"]