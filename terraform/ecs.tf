# Log group for ECS
resource "aws_cloudwatch_log_group" "frontend-pizza" {
  name = "/ecs/frontend-pizza"
}

## Task definition
resource "aws_ecs_task_definition" "frontend-pizza" {
    family                = "frontend-pizza"
    container_definitions = data.template_file.ecs-task-definition.rendered
}

data "template_file" "ecs-task-definition" {
    template = file("${path.module}/templates/task-definition.json")
    vars = {
        cluster-name = "pizza-application"
        docker-img   = var.docker-image
        backend_api_url = "ecs-load-balancer-1848237400.us-east-2.elb.amazonaws.com"
        region       = var.aws_region
    }
}

## Service
resource "aws_ecs_service" "frontend-pizza-service" {
  	name            = var.ecs-service-name
  	iam_role        = aws_iam_role.ecs-service-role.arn
  	cluster         = "pizza-application"
  	task_definition = aws_ecs_task_definition.frontend-pizza.arn
  	desired_count   = var.asg_desired

  	load_balancer {
    	target_group_arn  = aws_alb_target_group.ecs-target_group.arn
    	container_port    = 3000
    	container_name    = var.ecs-service-name
	  }
    depends_on = [aws_iam_role.ecs-service-role]
}