docker image inspect mysql
# Look for the "Volumes" key to see where the image is storing its data

docker container run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=true -v mysql_data:/var/lib/mysql mysql
docker container inspect mysql
# Look for the "Mounts" key to see where the data is being mounted
# (where it is stored in Docker and where it points in the container)

docker volume inspect mysql_data
docker container rm -f mysql
docker volume ls

docker container run -d --name mysql2 -e MYSQL_ALLOW_EMPTY_PASSWORD=true -v mysql_data:/var/lib/mysql mysql
docker container inspect mysql2
docker volume ls

docker container rm -f mysql2
docker volume rm mysql_data
