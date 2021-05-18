docker network ls
docker network create funtimes  # --driver bridge is the default driver
docker network ls

docker container run --name nginx --net funtimes -d nginx:alpine
docker container inspect nginx  # check network

docker container run --name nginx2 --net funtimes -d nginx:alpine

docker container exec -it nginx ping nginx2  # execute a command in an interactive terminal
