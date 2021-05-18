## Alpine Linux and Python Threading (W19D1) - Learning Objectives

### Alpine Linux - Learning Objectives
1. How to install packages using Alpine Package Keeper (apk)
2. How to make sure your network is configured properly using the `ifconfig` command

### Python Threading - Learning Objectives
1. Identify that JavaScript is a single-threaded language
2. Identify that Python is a pseudo-multi-threaded language
3. Describe what a lock is for thread synchronization purposes
4. Recall what the Global Interpreter Lock (GIL) is in CPython
5. Use the threading.Lock thread synchronization primitive in Python code
6. Use join to wait on executing threads


## Docker Containers (W19D2) - Learning Objectives
1. Recognize that Docker is an open-source project used to create, deploy, and run application with containers
2. Differentiate between virtual machines and containers
3. Differentiate between the two main types of hypervisors that enable virtualization: bare metal and hosted
4. Recall that containers are used to run processes in isolated environments
5. Summarize that a container is a unit of software that packages code and dependencies so an application can run quickly and reliably between different environments
6. Explain the lifecycle of a docker container
7. Summarize what a Docker image is
8. Explain how to start a container and the various flags that we may use with the command
9. Explain what happens when a container is started; what is the process for getting and starting an instance of the image?
10. Differentiate between how volumes and bind mounts store persistent data for containers.
11. Execute the `docker volume` command to store data and connect to none, one, or multiple containers at once
12. Implement the default `bridge` driver to define your own bridge network when running multiple containers
13. Recognize other Docker network drivers (`overlay`, `host`, `macvlan`, and `none`)
14. Execute a health check on a container with the `docker container run ...` command, a Dockerfile, or Docker Compose
15. Interpret the meaning of the three health statuses: `starting`, `healthy`, and `unhealthy`
16. Execute the `docker container ls` command to view health checks


## Dockerfiles (W19D3) - Learning Objectives
1. Recognize that a Docker image is a template that Docker uses to spawn containers
2. Execute the inspection of the metadata of an image
3. Summarize the meaning of Docker image terminology: image parent, image JSON, union filesystem, image ID, tag, versions, and repository
4. Execute the viewing of the history of an image's layers
5. Recall that an intermediate image is created in local image creation to facilitate the use of Docker's build cache
6. Recall that changes in a container's read/write layer are isolated from the container's other read-only layers
7. Recognize how a Union File System is used to merge files for image layers to present them all as a single read-only directory
8. Execute the `docker build` command to build an image from a Dockerfile while differentiating between the use of `-t` and `-f` flags
9. Recall that Docker will re-use the intermediate images (cache), to accelerate the docker build process
10. Organize how Docker handles logging by using `stdout` and `stderr` to tell Docker where to put those logs
11. Navigate Docker Hub to implement official, user-made, and open-source container images
12. Recall that the `latest` tag is a default tag applied when pulling or pushing an image and that it is usually the most recent and stable version of an image
13. Differentiate between the `docker container run <IMAGENAME>` and `docker pull <IMAGENAME>` commands
14. Be able to push a custom image up to Docker Hub


## Docker Compose (W19D4) - Learning Objectives
1. Summarize the most important features of Docker Compose
2. Define services that make up your app by understanding the general breakdown of a docker-compose.yml file
3. Use the docker-compose --help command to reference Docker Compose CLI flags and commands
4. Implement the main docker-compose commands to interact with your containers using simple single line commands
