#!/bin/bash

container_name="coupon-service"
port=3003

#pull git project
git pull

#start/restart routing
docker kill $container_name
docker build -t $container_name .
docker run -d -p $(port):$(port) --name $container_name $container_name

