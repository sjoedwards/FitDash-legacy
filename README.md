# Fitdash

Project to log and visualise fitness progression, with a specific focus on strength training :muscle:

## Technologies

- MongoDB
- Express
- React
- Node
- Typescript
- Docker
- GraphQL
- Apollo

## Working documentation

### Access mongo command line
- `$ docker-compose up mongo`
- `$ docker exec -it fitdash_mongo_1 /bin/bash`

### Importing CSV data to dockerized mongoDB:
- WIP
- `$ docker-compose up`
- `$ npm run docker:web:bash`
- In docker container:
- `$ npm run autopopulate`