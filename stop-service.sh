#!/bin/bash

docker compose -f "./Services/$1/docker-compose.yml" down
