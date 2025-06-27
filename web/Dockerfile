# FROM node:24-alpine
FROM node:20-bookworm
WORKDIR /app
COPY . .
RUN npm i
COPY src src
COPY prisma prisma
COPY public public
CMD ["sh", "-c", "npm run build && npm run start"]