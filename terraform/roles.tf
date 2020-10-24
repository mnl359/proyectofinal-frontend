## ECS instance role
resource "aws_iam_role" "ecs-instance-role" {
    name                = "ecs-instance-role"
    path                = "/"
    assume_role_policy  = data.aws_iam_policy_document.ecs-instance-policy.json
}

data "aws_iam_policy_document" "ecs-instance-policy" {
    statement {
        actions = ["sts:AssumeRole"]

        principals {
            type        = "Service"
            identifiers = [
                "ec2.amazonaws.com"
            ]
        }
    }
}

resource "aws_iam_role_policy_attachment" "ecs-instance-role-attachmentECS" {
    role       = aws_iam_role.ecs-instance-role.name
    policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

# Instance profile for launch configuration
resource "aws_iam_instance_profile" "ecs-instance-profile" {
    name = "ecs-instance-profile"
    path = "/"
    role = "ecs-instance-role"
}

## Role for ECS
resource "aws_iam_role" "ecs-service-role" {
    name                = "ecs-service-role"
    path                = "/"
    assume_role_policy  = data.aws_iam_policy_document.ecsAssumeRole-policy.json
}

data "aws_iam_policy_document" "ecsAssumeRole-policy" {
    statement {
        actions = ["sts:AssumeRole"]

        principals {
            type        = "Service"
            identifiers = [
                "ecs.amazonaws.com"
            ]
        }
    }
}

data "aws_iam_policy_document" "ecs-service-policy" {
    statement {
        actions = [
            "ec2:AuthorizeSecurityGroupIngress",
            "ec2:Describe*",
            "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
            "elasticloadbalancing:DeregisterTargets",
            "elasticloadbalancing:Describe*",
            "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
            "elasticloadbalancing:RegisterTargets"
        ]
        resources = ["*"]
    }
}

resource "aws_iam_policy" "ecs-service-policy" {
  name   = "ecs-service-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.ecs-service-policy.json
}

resource "aws_iam_role_policy_attachment" "ecs-attach" {
  role       = aws_iam_role.ecs-service-role.name
  policy_arn = aws_iam_policy.ecs-service-policy.arn
}