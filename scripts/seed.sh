#!/bin/sh

seed() {
sudo docker run --rm --network=host -v ./seeds:/seeds -w /seeds \
  -e DB_URI='mongodb://admin:admin@127.0.0.1:27017/payload?authSource=admin' \
  -e DROP_DATABASE=true \
  ghcr.io/pkosiec/mongo-seeding
}

printf "WARNING! THIS WILL DROP THE DATABASE BEFORE SEEDING. Continue? [y/N] "
read -r choice
case "$choice" in
  y|Y ) seed;;
  n|N ) exit 1;;
  * ) exit 1;;
esac
