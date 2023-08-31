```bash
docker login -u rdgcode
docker pull rdgcode/dm
docker volume create dm
docker run -d --name dm1 -e EXPRESS_PORT=3001 -v dm:/home/node/app/src rdgcode/dm

# local enviroment test
EXPRESS_PORT=3000 node src/app.js
```
