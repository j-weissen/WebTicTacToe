FROM node:18

EXPOSE 3000

WORKDIR /app
COPY . /app
RUN npm i

CMD ["npm", "run", "start"]