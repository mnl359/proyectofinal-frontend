
## Subnets for high availability
resource "aws_subnet" "pizza-application-sub1" {
  vpc_id            = var.vpc_id
  cidr_block        = var.IP_paSUB1
  availability_zone = var.region_paSUB1
  tags              = var.tags
}

resource "aws_subnet" "pizza-application-sub2" {
  vpc_id            = var.vpc_id
  cidr_block        = var.IP_paSUB2
  availability_zone = var.region_paSUB2
  tags              = var.tags
}

## Route table
resource "aws_route_table" "PA-rt" {
  vpc_id       = var.vpc_id
  tags         = var.tags
  route {
        cidr_block = "0.0.0.0/0"
        gateway_id = "igw-02643ddd9e0b5ba78"
    }
}

resource "aws_route_table_association" "sub1-rtAssociation" {
  subnet_id      = aws_subnet.pizza-application-sub1.id
  route_table_id = aws_route_table.PA-rt.id
}

resource "aws_route_table_association" "sub2-rtAssociation" {
  subnet_id      = aws_subnet.pizza-application-sub2.id
  route_table_id = aws_route_table.PA-rt.id
}