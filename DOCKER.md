# Docker Deployment Guide

This guide explains how to deploy the LogisticTrack application using Docker and Docker Compose.

## Prerequisites

- Docker Engine 20.10 or higher
- Docker Compose V2 or higher
- At least 2GB of free disk space

## Quick Start

### 1. Clone and Navigate to Project

```bash
cd /path/to/Tracking
```

### 2. Build and Start Services

```bash
docker-compose up -d
```

This command will:
- Pull the MongoDB 7 image
- Build the backend Node.js application
- Build the frontend React application
- Start all services in detached mode

### 3. Verify Services

```bash
docker-compose ps
```

You should see three services running:
- `logistics-mongodb` (MongoDB database)
- `logistics-backend` (Node.js API)
- `logistics-frontend` (Nginx serving React app)

### 4. Access the Application

- **Frontend**: http://localhost:4001
- **Backend API**: http://localhost:4000
- **MongoDB**: localhost:27017

## Docker Compose Services

### MongoDB Service
- **Image**: mongo:7
- **Port**: 27017
- **Volumes**:
  - `mongodb_data` - Database files
  - `mongodb_config` - Configuration files
- **Health Check**: Verifies MongoDB is responding

### Backend Service
- **Build Context**: ./backend
- **Port**: 4000
- **Environment Variables**:
  - `PORT=4000`
  - `MONGODB_URI=mongodb://mongodb:27017/logistics-tracking`
  - `NODE_ENV=production`
- **Dependencies**: Waits for MongoDB to be healthy
- **Health Check**: Verifies API /health endpoint

### Frontend Service
- **Build Context**: ./LOGISTIC
- **Port**: 4001 (mapped to internal port 80)
- **Build**: Multi-stage build with Nginx
- **Dependencies**: Waits for backend to start

## Configuration

### Environment Variables

Backend environment variables are configured in `docker-compose.yml`. To customize:

1. Create a `.env` file in the project root:
```bash
cp .env.example .env
```

2. Edit variables as needed:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/logistics-tracking
NODE_ENV=production
```

3. Update `docker-compose.yml` to use the `.env` file:
```yaml
backend:
  env_file:
    - .env
```

### Frontend API URL

The frontend API URL is configured at build time. To change it:

1. Update the `VITE_API_URL` in `docker-compose.yml`:
```yaml
frontend:
  build:
    args:
      - VITE_API_URL=http://your-api-url:4000/api
```

2. Rebuild the frontend:
```bash
docker-compose up -d --build frontend
```

## Common Commands

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Rebuild Services
```bash
# Rebuild all
docker-compose up -d --build

# Rebuild specific service
docker-compose up -d --build backend
```

### Restart Services
```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
```

### Check Service Status
```bash
docker-compose ps
```

### Execute Commands in Containers
```bash
# Access backend shell
docker-compose exec backend sh

# Access MongoDB shell
docker-compose exec mongodb mongosh logistics-tracking
```

## Data Persistence

MongoDB data is persisted in Docker volumes:
- `mongodb_data`: Database files
- `mongodb_config`: Configuration files

To view volumes:
```bash
docker volume ls
```

To backup MongoDB data:
```bash
docker-compose exec mongodb mongodump --out=/data/backup
docker cp logistics-mongodb:/data/backup ./mongodb-backup
```

To restore MongoDB data:
```bash
docker cp ./mongodb-backup logistics-mongodb:/data/backup
docker-compose exec mongodb mongorestore /data/backup
```

## Production Deployment

### Security Considerations

1. **MongoDB Authentication**: Enable authentication for production:
```yaml
mongodb:
  environment:
    - MONGO_INITDB_ROOT_USERNAME=admin
    - MONGO_INITDB_ROOT_PASSWORD=secure_password
```

2. **Environment Variables**: Use Docker secrets or external secret management

3. **HTTPS**: Add SSL/TLS certificates for production:
   - Update nginx.conf to listen on port 443
   - Mount SSL certificate volumes
   - Redirect HTTP to HTTPS

4. **Remove Port Exposure**: Only expose necessary ports:
```yaml
mongodb:
  ports: [] # Don't expose MongoDB publicly
```

### Resource Limits

Add resource limits for production:
```yaml
backend:
  deploy:
    resources:
      limits:
        cpus: '1'
        memory: 512M
      reservations:
        cpus: '0.5'
        memory: 256M
```

### Scaling

Scale specific services:
```bash
docker-compose up -d --scale backend=3
```

Note: You'll need a load balancer for multiple backend instances.

## Troubleshooting

### Services Won't Start

1. Check logs:
```bash
docker-compose logs
```

2. Verify Docker is running:
```bash
docker info
```

3. Check port conflicts:
```bash
# Linux/Mac
lsof -i :4001
lsof -i :4000
lsof -i :27017
```

### MongoDB Connection Errors

1. Verify MongoDB is healthy:
```bash
docker-compose ps mongodb
```

2. Check MongoDB logs:
```bash
docker-compose logs mongodb
```

3. Test connection:
```bash
docker-compose exec mongodb mongosh logistics-tracking --eval "db.stats()"
```

### Frontend Can't Connect to Backend

1. Verify backend is running:
```bash
curl http://localhost:4000/api/health
```

2. Check network connectivity:
```bash
docker-compose exec frontend ping backend
```

3. Rebuild frontend with correct API URL:
```bash
docker-compose up -d --build frontend
```

### Clear Everything and Start Fresh

```bash
# Stop and remove containers, networks
docker-compose down

# Remove volumes (WARNING: deletes all data)
docker-compose down -v

# Remove images
docker-compose down --rmi all

# Rebuild from scratch
docker-compose up -d --build
```

## Development vs Production

### Development Setup
For development, use the regular npm dev servers:
```bash
cd backend && npm run dev
cd frontend && npm run dev
```

### Production Setup
For production, use Docker Compose as described in this guide.

## Health Checks

The docker-compose configuration includes health checks:

- **MongoDB**: Pings database every 10 seconds
- **Backend**: Checks /api/health endpoint every 30 seconds

View health status:
```bash
docker-compose ps
```

## Networking

All services are connected via the `logistics-network` bridge network:
- Services can communicate using service names as hostnames
- Backend connects to MongoDB using `mongodb://mongodb:27017`
- Frontend is served on host port 4001
- Backend API is accessible on host port 4000

## Stopping and Cleaning Up

### Stop services (keeps data)
```bash
docker-compose stop
```

### Stop and remove containers
```bash
docker-compose down
```

### Remove containers and volumes (deletes all data)
```bash
docker-compose down -v
```

### Remove everything including images
```bash
docker-compose down -v --rmi all
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Docker Hub](https://hub.docker.com/_/mongo)
- [Node.js Docker Hub](https://hub.docker.com/_/node)
- [Nginx Docker Hub](https://hub.docker.com/_/nginx)
