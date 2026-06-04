# Docker Assignments

## CMD vs ENTRYPOINT

- **Purpose**:
  - `ENTRYPOINT`: Defines the container's main executable — it makes the image behave like a binary. Intended for the primary application the container runs.
  - `CMD`: Provides default arguments to the container. If no command is provided at `docker run`, Docker uses the `CMD` value.

- **Forms**:
  - Exec form (recommended): `ENTRYPOINT ["executable", "param1"]`, `CMD ["param1", "param2"]`.
  - Shell form: `ENTRYPOINT command param` or `CMD command param` (runs via `/bin/sh -c`).

- **Behavior / Overriding**:
  - If **only** `CMD` is set, `docker run <image> <args>` overrides `CMD`.
  - If **ENTRYPOINT** is set and **CMD** is present, `CMD` provides default arguments to `ENTRYPOINT`.
  - Arguments provided to `docker run` are appended to `ENTRYPOINT` (they do not replace it) unless you override `ENTRYPOINT` with `--entrypoint`.

- **When to use what**:
  - Use `ENTRYPOINT` for the fixed executable (the app). Use `CMD` for sensible defaults or optional arguments. This combination gives both a strong default behavior and the ability to pass runtime options.

---

# Problems & Solutions

## Problem 1
Tasks:
- Run the container `nginx`
- Check the container status
- Start the stopped container
- Remove the container
- Remove the image

Commands / Steps:

1. Run `nginx` in detached mode:

```
docker run -d --name my-nginx -p 8080:80 nginx:latest
```

2. Check container status (running and all):

```
docker ps            # running containers
docker ps -a         # all containers (running + stopped)
```

3. Stop and start the container:

```
docker stop my-nginx
docker start my-nginx
```

4. Remove the container (must be stopped first):

```
docker stop my-nginx || true
docker rm my-nginx
```

5. Remove the image:

```
docker rmi nginx:latest
```

Notes: If `docker rmi` fails because an image is used by other containers, remove those containers first.

---

## Problem 2
Tasks:
- Run container `ubuntu` in interactive mode
- Run `echo docker` inside the container
- Open a bash shell in the container and `touch` a file named `hello-docker`
- Stop and remove the container and comment on `hello-docker`
- Remove all stopped containers

Commands / Steps:

1. Run an interactive Ubuntu container (drops you into a shell):

```
docker run -it --name ubuntu-shell ubuntu:latest bash
```

2. Inside the container (shell):

```
echo docker
touch hello-docker
ls -l hello-docker
exit
```

3. Stop and remove the container (from host):

```
docker stop ubuntu-shell || true
docker rm ubuntu-shell
```

Comment on `hello-docker`:

- The file `hello-docker` was created inside the container's writable layer. When the container is removed, the file is lost unless you either:
  - Commit the container to a new image (`docker commit`), or
  - Mount a host directory or named volume to persist it.

4. Remove all stopped containers:

```
docker container prune -f
```

Alternative (remove by IDs):

```
docker rm $(docker ps -aq -f status=exited)
```

---

## Problem 3
Task: Deploy a MySQL database called `app-database` using `mysql:latest`, set `MYSQL_ROOT_PASSWORD` to `P4sSw0rd0!`, run in background.

Command:

```
docker run -d --name app-database -e MYSQL_ROOT_PASSWORD='P4sSw0rd0!' mysql:latest
```

Notes:
- Optionally expose the port to host: `-p 3306:3306` if you need external access.
- Check logs to confirm initialization: `docker logs -f app-database`.

---

## Problem 4
Tasks:
- Run the `nginx` image
- Add HTML static files to the container and make sure they are accessible
- Commit the container as `IMAGE_NAME`

Steps / Commands:

1. Run `nginx` and publish to host port 8080:

```
docker run -d --name web-server -p 8080:80 nginx:latest
```

2. Copy static files from host into the container (example `index.html`):

```
# from host (assumes ./site/index.html exists)
docker cp ./site/index.html web-server:/usr/share/nginx/html/index.html

# verify from host
curl http://localhost:8080/
```

3. Commit the container to an image named `IMAGE_NAME`:

```
docker commit web-server IMAGE_NAME:latest
```

Notes:
- Committing creates a new image containing the current container state (including the static files).
- Prefer building a Dockerfile when making reproducible images instead of committing container changes when possible.

Example Dockerfile (recommended):

```
FROM nginx:latest
COPY ./site /usr/share/nginx/html
```

---

## Problem 5
Task: Create 2 `nginx` containers on 2 different bridge networks, enter one and `curl` the other's content.

Steps / Commands:

1. Create two bridge networks:

```
docker network create --driver bridge net1
docker network create --driver bridge net2
```

2. Run each `nginx` on a different network:

```
docker run -d --name nginx1 --network net1 nginx:latest
docker run -d --name nginx2 --network net2 nginx:latest
```

3. To allow `nginx1` to reach `nginx2` by name, connect `nginx1` to `net2` as well (so both containers share `net2`):

```
docker network connect net2 nginx1
```

4. Enter `nginx1` and curl `nginx2`:

```
docker exec -it nginx1 bash
curl http://nginx2
```

Notes:
- Containers must be attached to the same user-defined bridge network to resolve each other by container name. If you do not want to connect networks, you can instead publish ports and curl the host port (e.g., `curl http://host.docker.internal:8082` on supported platforms).

---

## Final Notes
- Use volumes for persistent data (databases, app data). Containers are ephemeral by default.
- Prefer Dockerfiles for reproducible images instead of committing container changes when possible.
- Use `docker-compose` for multi-container setups and declarative networking.

If you want, I can also create example Dockerfiles and a `docker-compose.yml` for Problems 3 and 4.
