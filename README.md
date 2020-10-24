# RampUp 2020: Pizza application

[![RampUp](https://circleci.com/gh/mnl359/pizzas-frontend/tree/master.svg?style=shield
)](https://app.circleci.com/pipelines/github/mnl359/pizzas-frontend)

Pizza application in React and deploy in AWS S3 Bucket.



## Architecture

![](images/infrastructure.png)

Only for the application frontend, an S3 bucket will be deploying it. The application backend is located [here](https://github.com/mnl359/pizzas-back/tree/master)

## Software requirements

To run this application without a CI/CD tool, the software needed is:

- NPM
- terraform

Also, an AWS and CircleCI account is required.

## Deploy

1. You need to create an S3 bucket and a DynamoDB table to store the Terraform state. Also, change the following variables in the [state_config.tf](terraform/state-config.tf):

| Line | Variable | Description |
| ---- | -------- | ----------- |
| 3    | bucket   | Your bucket name |
| 4    | key      | Path to the state file in the bucket |
| 6    | dynamodb_table | Table to store the terraform Lock |

1. Change the projects [variables](terraform/variables.tf)

| Line | Variable | Description |
| ---- | -------- | ----------- |
| 1    | profile  | AWS profile to execute the terraform |
| 14   | tags     | Adjust the tags for your needs |
| 23   | s3_name  | Bucket name |

### Manual

1. Install the node modules.
```sh
npm i
```

---
**NOTE**

You can launch the test runner with:

```sh
npm test
```

Also, you can run the app in the development mode:

http://localhost:3000

```sh
npm start
```

---


2. Set the API endpoint into .env
```sh
echo "REACT_APP_API_URL=$BACKEND_API_ENV" >> .env
```

3. Build it.
```sh
npm run build
```

4. Enter the terraform directory and run the following commands:

```sh
# Initialize Terraform
terraform init
# Infrastructure checkout
terraform plan
# Infrastructure deploy
terraform apply
```

5. Upload the built frontend to the bucket
```sh

aws s3 sync . s3://<bucket name>
```

### Pipeline

1. Follow the project from your CircleCI account.

2. Set the environment variables in CircleCI:

| Variable | Description |
| -------- | ----------- |
| AWS_ACCESS_KEY_ID | AWS access key |
| AWS_DEFAULT_REGION | AWS default region |
| AWS_SECRET_ACCESS_KEY | AWS secret access key |
| BACKEND_API | Backend API URL |

3. You need to change the configuration pipeline in the step deploy to change the bucket name

```sh
aws s3 sync . s3://<bucket name>
```

4. Build the project.

## Usage

In the terraform output, a variable called website_endpoint contains the application URL.

---
**NOTE**

To destroy the application manually:

```sh
terraform destroy
```

In the pipeline, commit to a branch called "destroy".

---
