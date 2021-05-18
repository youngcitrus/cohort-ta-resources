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
