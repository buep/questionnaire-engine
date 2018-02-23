SERVICE_NAME=$1

destroy_service() {
  echo "Destroying service $1..."
  fargate service scale $SERVICE_NAME 0
  fargate service destroy $SERVICE_NAME
}

destroy_service