# Michelin Kitchen 

Michelin Kitchen is a fullstack **social media application** for sharing, browsing, and saving your favorite recipes.

## 🛠️ Built with:
- **ReactJs ⚛️** 
- **Spring Boot 🌿** 
- **MySQL 🐬**
- **Docker & Docker Compose 🐳**

## 📦 Features:
- **Full CRUD functionalities for blogs and users**
- **Post and browse blogs** 
- **User registration & authentication using JSON Web Token (JWT)** 
- **Email verification**

# 🔥 Installation 

## 1. Prerequisites
- Docker & Docker Compose if not yet installed
https://docs.docker.com/get-docker/
- Verify the installation
```bash
docker --version
docker compose version
```

## 2. Clone the Repository
```bash
git clone https://github.com/quocanhxemer/michelin-kitchen.git
cd michelin-kitchen
```
Or just download the repository and unzip it.

## 3. Create an environment file
In the root directory, create a `.env` file like following:
```env
MYSQL_DB_URL=jdbc:mysql://mysql-db:3306/michelin_db
MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=michelin_db
MYSQL_USER=michelin
MYSQL_PASSWORD=michelin

JWT_ENCRYPTION_SECRET=<secretkey_256>

SMTP_USERNAME=<email.address@mail.com>
SMTP_PASSWORD=email_password

REACT_APP_URL=http://localhost:5173/
SPRING_APP_URL=http://localhost:8080/
```

## 4. Run the App
Make sure Docker is up and running in the background, then run this command.
```bash
docker compose up --build
```
- ReactJS frontend: http://localhost:5173/ 
- Spring Boot backend: http://localhost:8080/ 

# ☁️ Running on the cloud
## 1. Update `.env`
Replace `localhost` with the server's public IP address or domain name:
```env
REACT_APP_URL=http://<your-server-ip-or-domain>:5173/
SPRING_APP_URL=http://<your-server-ip-or-domain>:8080/
```

## 2. Change the API constant called by ReactJS
Change the API baseURL accordingly in `client/src/utils/api.js` to match the new server:
```js
export default `http://${your_server_ip_or_domain}:8080/api`;
```

## 3. Open Firewall Ports
⚠️ Make sure your server is accessible from the public internet and that the necessary ports (5173 and 8080) are open in your firewall settings.
