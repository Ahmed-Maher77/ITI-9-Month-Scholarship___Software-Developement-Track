# Docker Assignment 2

## Objective
Practice Docker fundamentals through three hands-on problems:
- Managing containers and persistent data with Docker volumes
- Building a custom image using a Dockerfile
- Orchestrating multi-container applications using Docker Compose

---

## Problem 1: Nginx Container with Volume Mount

### Requirements
1. Run an Nginx container named `my-nginx` and attach a volume using volume mount.
2. Use the volume to store a static HTML file.
3. Edit the HTML content.
4. Remove the container.
5. Run a new container that:
   - Reuses the same volume from the previous container (volume mount)
   - Maps container port 80 to host port 8080
   - Serves the HTML file in your browser

### Suggested Steps

#### 1) Create a named volume
~~~bash
docker volume create nginx_html
~~~

#### 2) Run the first Nginx container with the volume mounted
~~~bash
docker run -d --name my-nginx -v nginx_html:/usr/share/nginx/html nginx
~~~

#### 3) Add or edit static HTML content inside the mounted volume
~~~bash
docker exec -it my-nginx sh -c "echo '<h1>Welcome from Volume</h1><p>First container</p>' > /usr/share/nginx/html/index.html"
~~~

#### 4) Verify the content (optional)
~~~bash
docker exec -it my-nginx cat /usr/share/nginx/html/index.html
~~~

#### 5) Remove the first container (volume remains)
~~~bash
docker rm -f my-nginx
~~~

#### 6) Run a new container with the same volume and port mapping
~~~bash
docker run -d --name my-nginx-v2 -p 8080:80 -v nginx_html:/usr/share/nginx/html nginx
~~~

#### 7) Access from browser
Open:
- http://localhost:8080

You should see the same HTML content because it is stored in the persistent volume.

---

## Problem 2: Build and Run a Python Script with Dockerfile

### Requirements
1. Create a Dockerfile.
2. Use an official Python image.
3. Copy the Python script into the image.
4. Run the script when the container starts.

### Suggested Files

#### `app.py`
~~~python
print("Hello from Dockerized Python script!")
~~~

#### `Dockerfile`
~~~dockerfile
FROM python:3.12-slim

WORKDIR /app
COPY app.py .

CMD ["python", "app.py"]
~~~

### Build and Run
~~~bash
docker build -t python-script-app .
docker run --rm python-script-app
~~~

Expected output:
~~~text
Hello from Dockerized Python script!
~~~

---

## Problem 3: Docker Compose with Nginx and MySQL

### Requirements
- Create Docker Compose configuration with two services: `nginx` and `mysql`
- Add required ports and environment variables for both services
- Configure `nginx` to depend on `mysql`

### `docker-compose.yml`
~~~yaml
version: "3.9"

services:
  mysql:
    image: mysql:8.0
    container_name: mysql-service
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: appdb
      MYSQL_USER: appuser
      MYSQL_PASSWORD: apppass
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  nginx:
    image: nginx:latest
    container_name: nginx-service
    restart: always
    depends_on:
      - mysql
    ports:
      - "8080:80"

volumes:
  mysql_data:
~~~

### Run Compose
~~~bash
docker compose up -d
~~~

### Verify Running Services
~~~bash
docker compose ps
~~~

### Stop and Clean Up
~~~bash
docker compose down
~~~

---

## Submission Checklist
- [ ] Problem 1 completed with persistent volume and browser verification on port 8080
- [ ] Problem 2 includes `Dockerfile` and successful script execution
- [ ] Problem 3 includes valid `docker-compose.yml` with `nginx` depending on `mysql`
- [ ] Screenshots or command output evidence attached (if requested by instructor)
