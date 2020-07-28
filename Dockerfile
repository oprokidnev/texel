FROM node:13 
WORKDIR /usr/src/app 
CMD [ "npx", "ts-node", "backend/index.ts"]