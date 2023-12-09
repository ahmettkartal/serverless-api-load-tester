# check is nmp is installed
if ! [ -x "$(command -v npm)" ]; then
  echo -e "\033[0;31mError: npm is not installed.\033[0m" >&2
  echo 'Please install npm' >&2
  echo "You are redirecting to the npm installation page in 3 seconds" >&2
  printf "3 " >&2
  sleep 1
  printf "2 " >&2
  sleep 1
  echo "Redirecting . . ." >&2
  sleep 1
  open https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
  exit 1
fi

# check is nodemon is installed
if ! [ -x "$(command -v nodemon)" ]; then
  echo -e "\033[0;31mError: nodemon is not installed.\033[0m" >&2
  echo 'Installing now' >&2
  npm install -g nodemon
fi

#export local environment variables
export PROJECT_APP_STAGE="LOCAL"
export PROJECT_DEFAULT_PORT="3000"
export PREFERRED_REGION="eu-central-1"
export LOAD_TEST_SQS_QUEUE_ARN="YOUR_SQS_QUEUE_ARN_HERE"
export LOAD_TEST_SQS_QUEUE_URL="YOUR_SQS_QUEUE_URL_HERE"

# install dependencies
npm install

#run command for node js
nodemon
