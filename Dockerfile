FROM node:18

RUN apt-get update && \
    apt-get upgrade && \
    apt-get install -y \
      curl
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -

WORKDIR /app
COPY package.json .
RUN pnpm install

COPY . .

CMD ["npm", "start"]
