# Phase 0:
```bash
docker container run --name nginx -d -p 81:80 nginx 
docker container run --name httpd -d -p 8080:80 httpd
docker container run --name mysql -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql  
# cleanup
docker container stop nginx httpd mysql
docker container rm nginx httpd mysql
```

# Phase 1:
```bash
# docker container run -it <IMAGENAME> <ARG>
docker container run -it --name web nginx bash
# docker container exec
docker container exec -it web bash
```

(curl http://artscene.textfiles.com/asciiart/unicorn if parrot.live is down)
## Phase 1b:
```bash
docker container run -it --name ubuntu ubuntu bash
apt-get update
apt-get install -y curl
curl parrot.live
exit
docker container ls

docker container run -it --name notliketheother ubuntu bash
curl parrot.live
```

# Phase 2:
```bash
docker container run --name characters -d alpine:3.7.3 /bin/sh -c "while :; do wget -qO- https://swapi.co/api/people/?search=r2; printf '\n'; sleep 5s; done"
docker container logs characters  # check logs a couple times
docker container stop characters
docker container rm characters
```

// OLD PHASE 2 (DEPRECATED)
// docker container run  --name quotes -d alpine /bin/sh -c "while :; do wget -qO- https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&_fields=content&per_page=1; printf '/n'; sleep 5; done"
// docker container stop quotes
// docker container rm quotes

# Phase 3:
```bash
docker network create robin
docker container run -d --name elastic1 --net robin --net-alias bird elasticsearch:2
docker container run -d --name elastic2 --net robin --net-alias bird elasticsearch:2
docker container inspect elastic1
docker container inspect elastic2
docker container run --name lookup --net robin alpine:3.11.2 nslookup bird  # specify 3.11.2: server can't find bird.hsd1.ca.comcast.net: NXDOMAIN, https://github.com/gliderlabs/docker-alpine/issues/539
docker container run --name curler --net robin centos curl -s bird:9200
docker container restart curler  # (a couple times)
docker container logs curler
```

# Phase 4:
```bash
docker container run -d --name DogsRGood nginx
docker exec -it DogsRGood bash
mkdir rad
  touch rad/randomrad.txt
  echo "great doggo" >> rad/randomrad.txt
  cat rad/randomrad.txt
docker run  \
  -d --name DogsRGreat \
  --mount type=bind,source="$(pwd)"/rad,target=/rad \
  nginx
docker exec -it DogsRGreat bash
```

## Phase 4b:
```bash
docker volume create psql-data
docker volume inspect psql-data
docker container run -d --name psql -v psql-data:/var/lib/postgresql/data postgres:9.6.1
docker logs psql
docker container exec -it psql psql -U postgres

CREATE TABLE cats
    (
    id SERIAL PRIMARY KEY,
    name VARCHAR (255) NOT NULL
    );
INSERT INTO
    cats (name)
    VALUES
    ('Jet');

# (\q to quit psql)

docker container run -d --name psql2 -v psql-data:/var/lib/postgresql/data postgres:9.6.2
docker container exec -it psql2 psql -U postgres
SELECT * FROM cats;

docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```