# Docker Fundamentals — ITI 9-Month Professional Training

A concise, practical summary of the Docker Fundamentals course completed during the ITI 9-month professional training.

## Overview

This course introduced containerization concepts, Docker architecture, and practical workflows used in modern development and DevOps. You’ll find key concepts, common commands, examples, and best practices below — distilled from hands-on exercises and guided labs.

## What I learned

- Containers vs Virtual Machines: lightweight, fast containers share the host kernel while VMs include a full OS.
- Monolith vs Microservices: when and why to split an app into independent services.
- Docker architecture: Docker Client, Docker Daemon (dockerd), images, containers, and registries.
- Linux primitives behind containers: namespaces (isolation) and cgroups (resource limits).
- Image layering, caching, tagging, and the image lifecycle.
- Networking, port mapping, volumes, and Docker Compose for multi-container apps.

---

## Essential Docker CLI Commands

Common commands used during the course:

```bash
docker pull <image>
docker run -it --rm <image>            # run interactively and remove after exit
docker run -d -p 8080:80 --name web nginx
docker ps
docker ps -a
docker images
docker exec -it <container> /bin/sh
docker logs <container>
docker inspect <container>
docker stop <container>
docker rm <container>
docker rmi <image>
docker commit <container> <new-image>
```

Example:

```bash
docker run -it alpine /bin/bash
```

---

## Networking & Port Mapping

- Default bridge network (containers talk to each other by name).
- Host network (no network isolation; container uses host stack).
- None network (container has no network).

Port mapping example — expose container port 80 on host port 8080:

```bash
docker run -d -p 8080:80 nginx
```

Inspect container networking and IPs:

```bash
docker inspect <container>
docker network ls
docker network inspect <network>
```

Note: a container with `--network none` will only have the loopback address (127.0.0.1) inside its own namespace and cannot communicate with other containers or the host.

---

## Images, Registries & Tagging

- Build images from a Dockerfile using `docker build -t myapp:tag .`.
- Tag and push to a registry:

```bash
docker tag myapp:latest myuser/myapp:version
docker push myuser/myapp:version
```

Inspect image history:

```bash
docker history nginx
```

---

## Data persistence: Volumes vs Bind Mounts

- Volumes: managed by Docker, recommended for most persistent storage needs.
- Bind mounts: map a host directory into a container (useful for development).

Create and use a volume:

```bash
docker volume create mydata
docker run -d -v mydata:/data --name data-test nginx
```

---

## Docker Compose (multi-container apps)

Use `docker compose` to declare services, networks, and volumes in YAML and manage the lifecycle as a single application:

```yaml
version: '3.8'
services:
  web:
    image: nginx
    ports:
      - '8080:80'
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: example

```

Start and stop:

```bash
docker compose up -d
docker compose down
```

---

## Dockerfile example

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

---

## Key Takeaway

Docker standardizes environment setup, simplifies deployments, and is a foundational tool for cloud-native development, CI/CD, and microservices architectures.

---

## Credits

Special thanks to Eng. Rana Ahmed for guidance during the course and to the Information Technology Institute (ITI) for the training opportunity.

## Tags

#Docker #Containerization #DevOps #CloudNative #Microservices #ITI
