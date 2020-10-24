variable "profile" {
  description = "Profile for Terraform"
  type        = string
  default     = "default"
}

variable "aws_region" {
  description = "Region: Ohio"
  type        = string
  default     = "us-east-2"
}


variable "tags" {
  description = "Description tags for resources"
  type        = map(string)
  default     = {"owner":"manuela.carrasco", 
                 "project":"Proyecto Final",
                 "provisioner":"Terraform"}
}

## Network variables
# VPC

variable "vpc_id" {
  type    = string
  default = "vpc-065096dade2890697"
}

variable "IP_paSUB1" {
  description = "IP for subnet availability zone 1"
  type        = string
  default     = "172.30.3.0/24"
}

variable "region_paSUB1" {
  description = "Region for subnet availability zone 1"
  type        = string
  default     = "us-east-2a"
}

variable "IP_paSUB2" {
  description = "IP for subnet availability zone 2"
  type        = string
  default     = "172.30.4.0/24"
}

variable "region_paSUB2" {
  description = "Region for subnet availability zone 2"
  type        = string
  default     = "us-east-2b"
}

## ECS
variable "frontend_port" {
  description = "Port to connect to the frontend"
  type        = string
  default     = "3000"
}

## Autoscaling group variables
variable "asg_max-instances" {
  description = "Maximum running instances in group"
  type        = string
  default     = "2"
}

variable "asg_min-instances" {
  description = "Manimum running instances in group"
  type        = string
  default     = "1"
}

variable "asg_desired" {
  description = "Desired running instances in group"
  type        = string
  default     = "2"
}

# Instances configuration
variable "ec2_amiid" {
  description = "The EC2 image ID to launch"
  type        = string
  default     = "ami-0d9ef3d936a8fa1c6"
}

variable "ec2_type" {
  description = "Instance type"
  type        = string
  default     = "t2.micro"
}

variable "docker-image" {
  description = "Docker image for instances"
  type        = string
  default     = "mcarras1/pizza-frontend:latest"
}

# ECS service
variable "ecs-service-name" {
  description = "ECS service name"
  type        = string
  default     = "frontend-pizza"
}
