FROM node:11.9-alpine

WORKDIR /app
RUN mkdir -p /app

COPY package.json yarn.lock /app/
RUN yarn
COPY app.js /app/

EXPOSE 3000
ENTRYPOINT ["yarn"]
CMD ["start"]

