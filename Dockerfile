FROM ryanhanwu/docker-filepreview:latest

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get update && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /prj
COPY ./package.json /prj/package.json
COPY ./package-lock.json /prj/package-lock.json
RUN npm install

COPY . /prj

ENTRYPOINT [""]


