# DockerTest
---
A simple repo for trying out docker
- Front End React/Next App
- Back End App using the Express Framework and MongoDb API
- Mongo DB
- Mongo DB Express for a gui into Mongo DB
- Nginx for a reverse proxy to hide everything.

## Todo
---
- Production
    - build Frontend and run out the container.
    - nginx port forward

## Docker Install

See [Notes on Docker Install](https://github.com/anconet/notes/blob/main/docker.md)

## Front End Setup
---
### Creat the Front End Project
I used `npm create-next-app`

`page.tsx` is the entry point.

```
Test it out on the terminal:
```bash
npm run dev
```

Assuming at this point that MongoDb will be access from the backend server.
```bash
# To pickup my utilities for accessing Mongo.
npm install mongodb
```

---
### Create frontent docker file
`dockerfile`

### Quick test the front end docker file 
```bash
sudo docker build --tag frontend-image:0.0.1 .
sudo docker images
sudo docker run --detach --publish 3000:3000 --name frontend-container frontend-image:0.0.1
sudo ps --all
sudo docker logs frontend-container
sudo docker exec -it front 

## OR

sudo docker compose -f compose.Development.Frontend.yaml up
sudo docker compose -f compose.Development.Frontend.yaml down
```
## Backend Setup
See [backend/Readme](/backend/readMe.md)

## DataBase Setup
This will be Mongo DB plus Mongo DB Express to monitor the DB.

### Create the network
Note the network is auto created with compose.
```bash
sudo docker network create mongo-network
sudo docker network ls
```
(TODO) Is there way to see what is connected on the docker network? No

### Create the containers from the vanilla images
```bash
# Run the Mongo DB Container
sudo docker run \
--publish 27017:27017 \
--net mongo-network \
--detach \
--env-file mongoDb.env \
--name mongo-db-container \
mongo
# Run the Mongo DB Express Container
sudo docker run \
--publish 8081:8081 \
--net mongo-network \
--detach \
--env-file mongoDbExpress.env \
--name mongo-express-container \
mongo-express

#OR
sudo docker compose -f compose.Development.Db.yaml up
sudo docker compose -f compose.Development.Db.yaml down
```

## Create containers with docker-compose
Create the .yaml file....
Docker Compose auto creates a network where the host names are the image names.
Environment variables for the API containter can follow the same method as Mongo and Mongo Express
```bash
# Creates containers from images and starts them up
sudo docker compose -f compose.yaml up
# Distroys containers 
sudo docker compose -f compose.yaml down
```