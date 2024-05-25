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
```