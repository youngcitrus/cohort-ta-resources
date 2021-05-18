## Dockerfiles (W19D3) - Learning Objectives
1. Recognize that a Docker image is a template that Docker uses to spawn containers
- We can think of an image as a class that we use to create containers, which are like our instances of the class. We can have multiple instances that are based off the same class, just like we can have multiple containers based off the same image.

2. Execute the inspection of the metadata of an image
- By running `docker image inspect <IMAGENAME>` we can see the metadata associated with an image.
- Some standout info would be:
  - The image's `id`
  - Default environment information]
  - Exposed ports
  - Tags associated with the image
  - The command the image will run by default when a container based on the image is started
  - The hash values for the layers contained within the image (like our history of how we came up with this image)

3. Summarize the meaning of Docker image terminology: image parent, image JSON, union filesystem, image ID, tag, versions, and repository
- `image parent`: the image that this image directly descended from. Since images are layers of changes, any changes we made in our layer are changes that we implented off of this base.
- `image JSON`: basic information about the image such as creation date, author, parent image ID, and execution/runtime configuration like networking and volumes.
- `union filesystem`: combines the series of changes to the files presented in each layer of our image into one cohesive file system.
- `image ID`: a hexadecimal encoding of 256 bits assigned to each layer upon creation, used to globally identify an image.
- `tag`: the descriptive name given to an image ID so that it is human-recognizable. It's the part of the name that comes after the `:` For example, in `node:8.15-alpine`, the `8.15-alpine` is the tag.
- `versions`: When using other images as our bases, specifying an exact version means that updates to an image will not affect our own. We would want to test that these updates do not cause any ill side-effects in our app before manually changing what image we are using.
- `repository`: The part of the name that groups together many tags under a common prefix. It's the part of the name that comes before the `:`. In our example of `node:8.15-alpine`, the `node` is the repository.

4. Execute the viewing of the history of an image's layers
- The command `docker image history <IMAGENAME>` shows the history of an image's layers. There is an entry for each layer, which may not itself be a complete image, just a change from the previous layer (like a new command in a Dockerfile). Those entries will list `<missing>` under the `IMAGE` column, whereas complete images will have the image ID listed.

5. Recall that an intermediate image is created in local image creation to facilitate the use of Docker's build cache
- This is done so that the Docker Engine can efficiently build a new image if changes were to occur somewhere in the middle of the instructions.
- Say our Dockerfile has six steps to it. We build the image and have our final image created locally but also each intermediate step. Now we realize we want to make a change to step #5. Since each intermediary step is cached, the Docker Engine can start at the cached version after step #4 was completed and just implement the new step #5 and then step #6. It didn't have to start the process from scratch because the intermediary steps were cached.
- When our image is pushed to Docker Hub, or some other registry, only the final image is pushed, since we will no longer be making changes to it, just pulling the image and making a container directly or using it as a base.

6. Recall that changes in a container's read/write layer are isolated from the container's other read-only layers
- The read/write top layer of a container gives the appearance that you can modify the image, but the read-only layers below maintain their integrity by isolating any changes in the topmost R/W layer while still displaying a singular file system.
- Any changes that occur to an image are built up on top of it in the R/W layer, so they will never impact any other images that are also based off of that image.

7. Recognize how a Union File System is used to merge files for image layers to present them all as a single read-only directory
- A Union File System merges all the files for each image layer together and presents them as one single read-only directory at the union mount point. This allows the changes that we make to file structures to appear to be impacting files from previous layers, when in reality we are giving Docker instructions for how to modify them in subsequent layers, similar to how git is a series of instructions for changes to make to our files.

8. Execute the `docker build` command to build an image from a Dockerfile while differentiating between the use of `-t` and `-f` flags
- The command `docker build .` will take in the current directory as the context (the `.` in the command) and read in the file called `Dockerfile`, executing the specified commands and building the image.
- If we want to take in a different context, we can change the `.` to another path.
- If we want to use a Dockerfile that is in a different location (but still be able to use this directory as the context) we can use a `-f` flag in order to specify a different filepath. This path points to the location of the Dockerfile, it doesn't change the build context (copying files over from the "current" directory will still reference this one)
- If we want to tag our image that we are building (which is pretty much always a good idea!) we can use the `-t` flag. We generally want to follow the format of `-t <your username>/<app name>:<tag name>`. If we don't give a tag name, it will default to `latest`.
  - An example would be `docker build . -t bamorgan13/eventlight` which would create an image called `bamorgan/eventlight:latest` from my current context.

9. Recall that Docker will re-use the intermediate images (cache), to accelerate the docker build process
- All of our intermediary steps for creating an image locally are cached, so if we were to change our Dockerfile or change what is copied over in a COPY step, etc., all of the steps up to that point that were already cached will be reused so that only the new information will be used to create a new image.

10. Organize how Docker handles logging by using `stdout` and `stderr` to tell Docker where to put those logs
- We can forward the standard output and error locations for our images by telling them to send that data to our log directory managed by Docker.
- In order to do so, we can add a line in to our Dockerfile to set up that forwarding
```
# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/IMAGENAME/access.log \
    && ln -sf /dev/stderr /var/log/IMAGENNAME/error.log
```

11. Navigate Docker Hub to implement official, user-made, and open-source container images
- Docker Hub indicates that an image is official with an `OFFICIAL IMAGE` flag in the description and search results. Official images are generally our go-to because they are well maintained, have good documentation, use good practices, and are kept up to date.
- A user-made image is an image pushed up by someone other than an official publisher. They are generally extensions of an official image that adds in some sort of additional functionality. When judging the quality of a user-made image we generally use the same criteria as we do for other packages and libraries: how many downloads does it have, what are the reviews like, when was it last updated, etc.

12. Recall that the `latest` tag is a default tag applied when pulling or pushing an image and that it is usually the most recent and stable version of an image
- If we don't specify a tag, the `latest` tag is used. This applies to both pulling images to build containers from as well as pushing our own images to Docker Hub.

13. Differentiate between the `docker container run <IMAGENAME>` and `docker pull <IMAGENAME>` commands
- The `run` command will take an image, create a container based off of it, and start the container up. If the image does not exist locally, it will pull the image from the registry before creating the container.
- The `pull` command is used to simply pull the image from the registry and add it in to the local cache. No containers are created, we are just getting a local copy of the image.

14. Be able to push a custom image up to Docker Hub
- Similar to being able to push to github or heroku, logging in to docker allows us to push to our Docker Hub account very easily.
- The `docker login` command allows us to enter our Docker Hub credentials to log in. We will stay logged in until we use the `docker logout` command, so you most likely will only have to do this once.
- After we have an image created, we can push it up to Docker Hub with `docker image push <IMAGENAME>`
- If we forgot to tag our image, we can reference the image's id or old name and then retag it with the command `docker image tag <orignalImageIdOrName> <USERNAME>/<IMAGENAME>`
- To build an image based on a Dockerfile, tag it, then push that image up, for example, I could:
```bash
docker build . -t bamorgan13/eventlight
docker image push bamorgan13/eventlight
```
