FROM node:lts-iron

WORKDIR /app

COPY . .

RUN npm i -g @nestjs/cli
RUN npm i
RUN npx prisma generate
RUN npm run build

CMD [ "npm", "run", "start:prod" ]

EXPOSE 3000
