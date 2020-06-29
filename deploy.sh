#!/bin/bash

echo "Deployment script starting."

rm -rf ${DEPLOYMENT_PATH}/*
cp -R ${ROOT_DIR}/build ${DEPLOYMENT_PATH}
mv ${DEPLOYMENT_PATH}/build/* ${DEPLOYMENT_PATH}
rm -rf ${DEPLOYMENT_PATH}/build
cd ${DEPLOYMENT_PATH}
git add -A
git commit -m "Update"
git push origin master

echo "Deployment script finished."

