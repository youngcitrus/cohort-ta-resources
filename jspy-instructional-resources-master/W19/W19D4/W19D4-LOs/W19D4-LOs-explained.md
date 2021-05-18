## Docker Compose (W19D4) - Learning Objectives
1. Summarize the most important features of Docker Compose
  - The ability to deploy multiple container easily.
  - Automatic configuration of a single network for your app. Each container for a service joins the created network and is reachable by all the other containers on that network by their service name.
  - Preservation of volume data when containers are created. When docker-compose up runs, if it finds any containers from previous runs, it copies the volumes from the old container to the new container it is creating.
  - Only recreate containers that have changed. Compose caches the configuration used to create a container. When you restart a service and nothing has changed, Compose re-uses the existing containers.
  - Compose allows you to use variables in the Compose file.

2. Define services that make up your app by understanding the general breakdown of a docker-compose.yml file
- The first line of a docker-compose.yml file is the version of Compose you will be using.
- The `services` key starts the containers that we define (the nested keys)
- See below for descriptions of what each key can do for us. The keys with `<>` indicate that those are user-defined names (like `servicename` and `psql` below) whereas the names without `<>` are defined names by Docker Compose that have special meaning and are generally pointing to a value.
- Each key that can accept multiple values (defining `environment` variables, `netoworks`, `ports`, `volumes`, etc.) is written as a new 
- There are a lot of different keys and ways that we can customize our compose file, check out all the different options: https://docs.docker.com/compose/compose-file/ 
```yaml
# If no version is specified, then version 1.0 is assumed. 
# Recommend version 2 at the minimum
version: '3.1'  

services:  # Will start up containers (is the same as using docker container run).
  <servicename>: # Friendly name (postgres, node, etc.), also the DNS name inside your network.
    image: # Image this service will use
    build: # Optional, if we have a Dockerfile and want to build an image locally, specifies where the file is located (generally same location and named `Dockerfile`, so we use `.` as the value that `build` points to.)
    command: # Optional, will replace the default CMD specified by the image
    environment: # Optional, same as -e in docker container run
      <variable-name>: value
      <variable-name>: value
    env_file: # Optional, points to a .env file instead of specifying environment variables directly
      - 'file path'
    networks: # Optional, same as --net in docker container run
      - 'network name'
      - 'network name'
    ports: # Optional, same as -p in docker container run
      - '<host port>:<image port>'
      - '<host port>:<image port>'
    volumes: # Optional, same as -v in docker container run
      - 'volume name'
      - 'volume name'
  <psql>: # servicename2

volumes: # Optional, same as docker volume create
  <volumename>: # Optional, name of the volume to create. Does not point to a value, the key is used as the name. Allows us to use this name in the `volumes` section of a service

networks: # Optional, same as docker network create
  <networkname>: # Optional, name of the network to create. Does not point to a value, the key is used as the name. Allows us to use this name in the `networks` section of a service
```
- Example docker-compose.yaml:
```yaml
# docker-compose.yml
version: "3"
services:
  db:
    image: postgres:11-alpine
    # set up a volume so our database info persists
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
  web:
    # building our own docker image
    build:
      context: .
      dockerfile: Dockerfile
    # name our image
    image: bamorgan13/cha-aux-rails
    volumes:
      - .:/myapp
    ports:
      - "3000:3000"
    depends_on:
      # setting up a dependency on our database container
      - db
    environment:
      DATABASE_URL: postgres://postgres@db
    env_file:
      - .env
```

3. Use the docker-compose --help command to reference Docker Compose CLI flags and commands
- Just like our other command line tools, we can add --help to see the different commands available to us.
- After this basic info, you can also check out more details for that specific command by chaining it on, such as `docker-compose up --help`. The Docker docs are pretty well organized and easy to navigate as well, often having example implementation. Check them out here:
  - https://docs.docker.com/compose/reference/overview/ 
- Here's what the output for `docker-compose --help` looks like for the current version of docker-compose, as an example:
```bash
Define and run multi-container applications with Docker.

Usage:
  docker-compose [-f <arg>...] [options] [COMMAND] [ARGS...]
  docker-compose -h|--help

Options:
  -f, --file FILE             Specify an alternate compose file
                              (default: docker-compose.yml)
  -p, --project-name NAME     Specify an alternate project name
                              (default: directory name)
  --verbose                   Show more output
  --log-level LEVEL           Set log level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
  --no-ansi                   Do not print ANSI control characters
  -v, --version               Print version and exit
  -H, --host HOST             Daemon socket to connect to

  --tls                       Use TLS; implied by --tlsverify
  --tlscacert CA_PATH         Trust certs signed only by this CA
  --tlscert CLIENT_CERT_PATH  Path to TLS certificate file
  --tlskey TLS_KEY_PATH       Path to TLS key file
  --tlsverify                 Use TLS and verify the remote
  --skip-hostname-check       Don't check the daemon's hostname against the
                              name specified in the client certificate
  --project-directory PATH    Specify an alternate working directory
                              (default: the path of the Compose file)
  --compatibility             If set, Compose will attempt to convert keys
                              in v3 files to their non-Swarm equivalent

Commands:
  build              Build or rebuild services
  bundle             Generate a Docker bundle from the Compose file
  config             Validate and view the Compose file
  create             Create services
  down               Stop and remove containers, networks, images, and volumes
  events             Receive real time events from containers
  exec               Execute a command in a running container
  help               Get help on a command
  images             List images
  kill               Kill containers
  logs               View output from containers
  pause              Pause services
  port               Print the public port for a port binding
  ps                 List containers
  pull               Pull service images
  push               Push service images
  restart            Restart services
  rm                 Remove stopped containers
  run                Run a one-off command
  scale              Set number of containers for a service
  start              Start services
  stop               Stop services
  top                Display the running processes
  unpause            Unpause services
  up                 Create and start containers
  version            Show the Docker-Compose version information
```

4. Implement the main docker-compose commands to interact with your containers using simple single line commands
- The basic commands for starting up and taking down your containers are the `up` and `down` commands.
- We can specify that we want to rebuild images when we execute `up` by specifying the `--build` flag instead of using cached images.
- When we take down our containers, our volumes will persist. If we would like to remove our volumes, we can add the `-v` flag when we execute `down`.
- Summary of our docker-compose commands:

| Command	                    | Description                                                                  |
|:--------------------------- |:---------------------------------------------------------------------------- |
| `docker-compose --help`     | List all Docker-Compose commands and options available.                      |
| `docker-compose up`         | Set up your volumes, networks, and start the specified containers.           |
| `docker-compose up --build`	| Build images before setting up volumes and networks to start the containers. |
| `docker-compose down`       |	Stop and remove all containers and networks.                                 |
| `docker-compose down -v`	  | Stop and remove all volumes, containers, and networks.                       |
