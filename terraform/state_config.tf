terraform { 
    backend "s3" {
        bucket          = "terraform-pizzas-application"
        key             = "terraform-pizza-app-front/state"
        region          = "us-east-2"
        dynamodb_table  = "terraform-pizzas-application"
        encrypt         = true
    }
}
