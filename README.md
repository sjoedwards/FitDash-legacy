### Access mongo command line
docker-compose up mongo
docker exec -it fitdash_mongo_1 /bin/bash

### Importing CSV data to dockerized mongoDB:
- Place .csv in folder `mongodb`, with the name being the container you want to import into
- Start docker container using `$ docker-compose up mongo`
- `$ cd mongodb`
- `$ sh ./test-data-populate.sh`
- Check has imported into MongoDB using `$ docker-compose up mongo-express` and visiting `http://localhost:8081/`