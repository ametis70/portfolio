#!/bin/sh

sudo docker run --rm --network=host -v ./seeds:/seeds -w /seeds \
  -e DB_URI='mongodb://admin:admin@127.0.0.1:27017/payload?authSource=admin' \
  -e DROP_DATABASE=true \
  ghcr.io/pkosiec/mongo-seeding


