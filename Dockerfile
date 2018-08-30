FROM telemark/docker-node-unoconv:latest

WORKDIR /prj
COPY ./package.json /prj/package.json
COPY ./package-lock.json /prj/package-lock.json
RUN npm install

COPY . /prj

ENTRYPOINT [""]


