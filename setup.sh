#!/bin/bash

container_name="template-service"
port=3000

#pull git project
git pull

#start/restart routing
docker kill $container_name
docker build -t $container_name .
docker run -d -p 3000:3000 --name $container_name $container_name

