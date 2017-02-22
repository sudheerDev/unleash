#!/usr/bin/env bash

# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

configure_aws_cli() {
  aws --version
  aws configure set default.region us-west-2
  aws configure set default.output json
}

deploy_cluster() {
    family="x-team-unleash"

    make_task_def
    register_definition
    if [[ $(aws ecs update-service --cluster x-team-unleash-cluster --service x-team-unleash-service --task-definition $revision | \
                   $JQ '.service.taskDefinition') != $revision ]]; then
        echo "Error updating service."
        return 1
    fi
}

make_task_def() {
  task_template='[
    {
      "name": "web",
      "image": "%s.dkr.ecr.us-west-2.amazonaws.com/x-team-unleash:%s",
      "essential": true,
      "memory": 400,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "awslogs-x-team-unleash",
          "awslogs-region": "us-west-2"
        }
      },
      "environment": [
        { "name": "firebaseApiKey", "value": "%s" },
        { "name": "firebaseAuthDomain", "value": "%s" },
        { "name": "firebaseDatabaseURL", "value": "%s" },
        { "name": "firebaseStorageBucket", "value": "%s" },
        { "name": "firebaseMessagingSenderId", "value": "%s" },
        { "name": "skills_api_url", "value": "%s" },
        { "name": "goals_api_url", "value": "%s" },
        { "name": "profiles_api_url", "value": "%s" },
        { "name": "paths_api_url", "value": "%s" }
      ],
      "portMappings": [
        {
          "hostPort": 0,
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ]
    }
  ]'

  task_def=$(printf "$task_template" $AWS_ACCOUNT_ID $TRAVIS_BUILD_NUMBER $FIREBASE_API_KEY $FIREBASE_AUTH_DOMAIN $FIREBASE_DATABASE_URL $FIREBASE_STORAGE_BUCKET $FIREBASE_MESSAGING_SENDER_ID, $SKILLS_API_URL, $GOALS_API_URL, $PROFILES_API_URL, $PATHS_API_URL)
}

push_ecr_image() {
  eval $(aws ecr get-login --region us-west-2)
  docker push $AWS_ACCOUNT_ID.dkr.ecr.us-west-2.amazonaws.com/x-team-unleash:$TRAVIS_BUILD_NUMBER
}

register_definition() {

    if revision=$(aws ecs register-task-definition --container-definitions "$task_def" --family $family | $JQ '.taskDefinition.taskDefinitionArn'); then
        echo "Revision: $revision"
    else
        echo "Failed to register task definition"
        return 1
    fi

}

configure_aws_cli
push_ecr_image
deploy_cluster
