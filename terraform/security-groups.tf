## Security group for ECS
resource "aws_security_group" "ecs-sg" {
  name          = "ecs-frontend-sg"
  description   = "Security group for ECS frontend"
  vpc_id        = var.vpc_id
  tags          = var.tags
}

resource "aws_security_group_rule" "ecs_egress" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.ecs-sg.id
}

resource "aws_security_group_rule" "ecs_ingress" {
  type                     = "ingress"
  from_port                = 0
  to_port                  = var.frontend_port
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.lb-sg.id
  security_group_id        = aws_security_group.ecs-sg.id
}

## Security group for load balancer
resource "aws_security_group" "lb-sg" {
  name          = "frontend-lb-sg"
  description   = "Security group for Application Load Balancer"
  vpc_id        = var.vpc_id
  tags          = var.tags
}

resource "aws_security_group_rule" "lb_egress" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.lb-sg.id
}

resource "aws_security_group_rule" "lb_ingress" {
  type                     = "ingress"
  from_port                = 0
  to_port                  = var.frontend_port
  protocol                 = "tcp"
  cidr_blocks              = ["0.0.0.0/0"]
  security_group_id        = aws_security_group.lb-sg.id
}
