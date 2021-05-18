# Containers vs. Virtual Machines - what's the difference?
- 


# Demo Code
docker container run --name nginx -p 8080:80 nginx
docker container ls
docker container ls -a
docker container rm <containerNameOrId>
docker container ls -a
docker container run -d --name nginx -p 8080:80 nginx
docker container ls
docker container stop nginx
docker container start nginx
docker container ls
docker container inspect nginx
docker container stats
docker container top nginx
docker container run -d --name nginx2 8081:80 nginx
docker container ls
docker container rm -f nginx nginx2
docker container ls -a
