#! /bin/bash

cd client

echo "Installing frontend dependencies"
npm i --save-dev

echo "Installing backend dependencies"
cd ../server
npm i 