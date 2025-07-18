#!/bin/bash

docker stop $1
docker rm $1
docker compose -f "Services/$1/docker-compose.yml" up -d