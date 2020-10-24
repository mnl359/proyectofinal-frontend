#!/bin/bash
echo ECS_CLUSTER="${cluster-name}" >> /etc/ecs/ecs.config;
echo ECS_BACKEND_HOST= >> /etc/ecs/ecs.config;