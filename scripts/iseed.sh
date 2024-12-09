#!/bin/sh

iseed() {
  mkdir -p "./seeds/$1"
  sudo docker compose exec database /usr/bin/mongoexport --username admin --password admin --authenticationDatabase admin --db payload --type json --jsonArray --collection "$1" > "./seeds/$1/index.json"
}

# Globals
iseed globals

# Uploads
iseed banner-backgrounds
iseed logos
iseed og-banners
iseed screenshots

# Collections
iseed works
iseed translations
