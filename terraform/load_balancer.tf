## Autoscaling group
resource "aws_autoscaling_group" "ecs-autoscaling-group" {
    name                        = "frontend-autoscaling-group"
    max_size                    = var.asg_max-instances
    min_size                    = var.asg_min-instances
    desired_capacity            = var.asg_desired
    vpc_zone_identifier         = [aws_subnet.pizza-application-sub1.id,aws_subnet.pizza-application-sub2.id]
    launch_configuration        = aws_launch_configuration.ecs-launch-configuration.name
    health_check_type           = "EC2"
}

### Load balancer
resource "aws_alb" "ecs-load-balancer" {
    name                = "frontend-load-balancer"
    security_groups     = [aws_security_group.lb-sg.id]
    subnets             = [aws_subnet.pizza-application-sub1.id,aws_subnet.pizza-application-sub2.id]
}

## Target group for load balancer and ECS
resource "aws_alb_target_group" "ecs-target_group" {
    name                = "ecsTargetgroup"
    port                = var.frontend_port
    protocol            = "HTTP"
    vpc_id              = var.vpc_id

    health_check {
        healthy_threshold   = "5"
        unhealthy_threshold = "2"
        interval            = "30"
        matcher             = "200"
        path                = "/"
        port                = "traffic-port"
        protocol            = "HTTP"
        timeout             = "5"
    }
}

## Listener of frontend port
resource "aws_alb_listener" "alb-listener" {
    load_balancer_arn = aws_alb.ecs-load-balancer.arn
    port              = var.frontend_port
    protocol          = "HTTP"
    
    default_action {
        target_group_arn = aws_alb_target_group.ecs-target_group.arn
        type             = "forward"
    }
}

## Launch configuration for instances
resource "aws_launch_configuration" "ecs-launch-configuration" {
    name                        = "ecs-launch-configuration"
    image_id                    = var.ec2_amiid
    instance_type               = var.ec2_type
    iam_instance_profile        = aws_iam_instance_profile.ecs-instance-profile.name 
    security_groups             = [aws_security_group.ecs-sg.id]
    associate_public_ip_address = "true"
    user_data                   = data.template_file.ecs-launch-configuration-user-data.rendered
}

data "template_file" "ecs-launch-configuration-user-data" {
    template = file("${path.module}/templates/user-data.tpl")
    vars = {
        cluster-name = "pizza-application"
    }
}