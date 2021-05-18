# Containers are Ephemeral and Immutable

docker container run -p 8080:80 -d --name custom_nginx --mount type=bind,source="$(pwd)",target="/usr/share/nginx/html" nginx
docker container run -p 8081:80 -d --name nginx nginx

docker container ls

docker container exec -it nginx bash
cd usr/share/nginx/html
cat index.html
exit

docker container exec -it custom_nginx bash
cd usr/share/nginx/html
cat index.html
exit
