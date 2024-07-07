# Simple Backend Server
---
Here is how I created it.
```bash
# Create the package.json file
npm init

# Install Dependencies
npm install express
npm install mongoDb
npm install cors
# Install as a dev dependency so it doesn't go into production
npm install nodemon --save-dev
# Going to attempt using Typescript
npm install ts-node --save-dev
npm install dotenv

```
`packageljson`
```json
  "scripts": {
    "dev": "nodemon --exec ts-node backend.ts"
  },
  ```