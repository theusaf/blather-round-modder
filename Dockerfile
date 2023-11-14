FROM node:20

RUN apt-get update && \
    apt-get upgrade && \
    apt-get install -y \
      curl
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -

WORKDIR /app
COPY package.json .
RUN pnpm install

COPY . .

RUN pnpm run build
RUN pnpm run migrate

CMD ["npm", "start"]
