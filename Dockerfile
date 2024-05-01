FROM node:latest

WORKDIR /app

COPY Runner.sh .
COPY Dependencies.sh .

COPY client/package.json client/package-lock.json ./client/

RUN cd client && npm i 

COPY server/package.json server/package-lock.json ./server/

RUN cd server && npm i

COPY client ./client
COPY server ./server

EXPOSE 3000
EXPOSE 5000

CMD ["/bin/bash", "./Runner.sh"]