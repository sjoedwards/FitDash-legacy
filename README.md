### Access mongo command line
docker-compose up mongo
docker exec -it fitdash_mongo_1 /bin/bash

### Autopopulating data:
docker-compose up mongo
cd mongodb
sh ./test-data-populate.sh