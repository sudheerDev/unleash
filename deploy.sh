#! /bin/bash
set -ev

TAG=$1
docker login -e="$DOCKER_EMAIL" -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
docker build -t xteam/unleash:$TAG .
docker push xteam/unleash:$TAG
