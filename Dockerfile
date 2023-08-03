FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm i --omit=dev
RUN npm i -g @nestjs/cli
RUN npm run prisma:generate
RUN npm run build

CMD [ "npm", "run", "start" ]

EXPOSE 3000
