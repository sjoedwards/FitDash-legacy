#!/bin/bash
docker exec fitdash_mongo_1 rm -rf /tmp/*
find . -iname '*.csv' -exec docker cp {} fitdash_mongo_1:/tmp/{} \;
for f in *.csv
do
  echo /tmp/${f}
  docker exec fitdash_mongo_1 mongoimport -u "root" -p "root" --authenticationDatabase admin -d test -c ${f%.csv} --type csv --headerline --file "/tmp/${f}"
done

