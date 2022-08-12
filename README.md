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
# Clean up Resources
```
terraform destroy
```
