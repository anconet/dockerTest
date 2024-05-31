# DockerTest
---
A simple repo for trying out docker
- Front End React/Next App
- Back End App
- Mongo DB

## Docker Install

See [Notes on Docker Install](https://github.com/anconet/notes/blob/docker.md)

## Front End Setup
---
### Creat the Front End Project
[Manual Install Intructions at nextjs.org](https://nextjs.org/docs/getting-started/installation#manual-installation)

```bash
mkdir <projectName>
cd <projectName>
npm install next@latest
npm install react@latest
npm install react-dom@latest
```
Add the following to:

`package.json`

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
```

```bash
mkdir <projectName>/app
cd /app
touch layout.tsx
touch page.tsx
```
Edit the files

`layout.tsx`
```typescript
export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

`page.tsx`
```typescript
import App from "./App";
export default function Page() {
    return <App></App>
}
```

`App.tsx`
```typescript
export default function App() {
    return <p>Hello</p>
}
```

Test it out on the terminal:
```bash
npm run dev
```
---
### Create frontent docker file
`docker`
```bash
FROM node:latest
COPY . /app/
WORKDIR /app
RUN npm install
CMD ["npm","run","dev"]
```
### Quick test the front end docker file 
```bash
sudo docker build --tag frontend-image:0.0.1 .
sudo docker images
sudo docker run --detach --publish 3000:3000 --name frontend-container frontend-image:0.0.1
sudo ps --all
sudo docker logs frontend-container
sudo docker exec -it front 
```
## DataBase Setup
This will be Mongo DB plus Mongo DB Express to monitor the DB.

### Create the network
```bash
sudo docker network create mongo-network
sudo docker network ls
```
(TODO) Is there way to see what is connected on the docker network?

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
```
### Create containers with docker-compose
Create the .yaml file....
Docker Compose auto creates a network where the host names are the image names.
Environment variables for the API containter can follow the same method as Mongo and Mongo Express
```bash
# Creates containers from images and starts them up
sudo docker compose -f compose.yaml up
# Distroys containers 
sudo docker compose -f compose.yaml down
```