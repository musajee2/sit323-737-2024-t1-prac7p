# SIT323/SIT737 – Cloud Native Application Development  
## Task 9.1P – Adding a Database to Your Application

This project demonstrates how to integrate MongoDB into a containerized Node.js microservice and deploy it to a Kubernetes cluster using persistent volumes and secrets. It satisfies the requirements of SIT323/SIT737 Task 9.1P.

---

## Overview

The application consists of:
- A **Node.js Express microservice** (`node-app`) that performs CRUD operations.
- A **MongoDB database** deployed as a single-instance service in Kubernetes.
- Proper **persistent storage**, **initialization script**, and **secure credentials** setup via Secrets and ConfigMaps.

---


## How to Deploy

> Make sure Docker, kubectl, and a Kubernetes cluster (e.g., Minikube or MicroK8s) are installed.

### Clone the Repository

```bash
git clone https://github.com/your-username/sit323-task9.1p.git
cd sit323-task9.1p

 Apply Kubernetes Configurations
# MongoDB PVC and Secret
kubectl apply -f k8s/mongo-pvc.yaml
kubectl apply -f k8s/mongo-secret.yaml

# MongoDB Deployment & Service
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/mongo-service.yaml

# Node App Deployment & Service
kubectl apply -f k8s/node-app-deployment.yaml
```

# MongoDB Initialization
A file named mongo-init.js is mounted into the MongoDB container under /docker-entrypoint-initdb.d/ and creates a root user:
```
db.createUser({
  user: "admin",
  pwd: "pass123",
  roles: [ { role: "root", db: "admin" } ]
});
```
This ensures authentication is enabled and credentials are set on first run.


# Security
MongoDB credentials (admin / pass123) are stored securely in a Kubernetes Secret.

The database is run with --auth and initialized only once during container startup.

# Testing the Application
You can test the connection using mongosh:
```
mongosh "mongodb://admin:pass123@localhost:27017/admin"
Or check logs to confirm user was created:
kubectl logs deployment/mongo | grep createUser
To test the Node.js app, use:
curl http://localhost:<NodePort>/items

```
# Backup & Monitoring (Basic)
Data persistence is handled via PVC (mongo-pvc.yaml).

Monitoring is available through kubectl logs and pod inspection.

Advanced backup strategies (e.g., using mongodump + cronjob) can be implemented optionally.
