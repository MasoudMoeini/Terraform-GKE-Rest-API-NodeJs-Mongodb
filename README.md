# Terraform-GKE Deploy Rest-API-NodeJs Application with Mongodb
[Refrence:Provision a GKE Cluster](https://learn.hashicorp.com/tutorials/terraform/gke)<br>
Configure gcloud sdk on Mac
```
brew install --cask google-cloud-sdk
```
```
gcloud init
```
```
gcloud auth application-default login
```
## Setup Terraform
Update terraform.tfvars file with your project_id, and region<br>
You can easily get your prooject_id by running<br>
```
gcloud config get-value project
```
Start Provision with Terraform
```
terraform init -upgrade
```
```
terraform apply
```
## Set up Rest API Nodejs - Mongodb 
[Reference:Nodejs-rest-api](https://github.com/MasoudMoeini/Jenkins-Deploy-App-to-kubernetes/tree/node-rest-api)<br>
```
npm install
```
RUN API locally 
```
npm run devStart
``` 
Install Rest Client extension on VS-Code<br>
You may test rest api application on route.rest file or by Postman<br>
### Building Docker image from app and push it to hub
```
docker build -t masodatc/rest-api-nodejs:01 .
```
```
docker push masodatc/rest-api-nodejs:01 
```
## Set up kubernetes deployment
Configure connection to Google Cloud Kubernetes Engine<br>
```
gcloud container clusters get-credentials $(terraform output -raw kubernetes_cluster_name) --region $(terraform output -raw region)
```
Test connection with kuberenetes cluster 
```
kubectl get all
```
Deploy Node Js Rest Api to GKE
```
kubectl apply -k ./
```
```
kubectl get svc
```
Rest API can be tested on 
```
http://EXTERNAL-IP:<port from rest-node-app-svc>
```
RUN route.rest file GET,POST,PATCH, DELETE connections to test API<br>
## Clean up Resources
```
terraform destroy
```
