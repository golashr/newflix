#!/bin/bash
echo "Building cinemaworld service docker image"
cd cinemaworld
sudo docker build . -t golra03/cinemaworld:latest -t golra03/cinemaworld:v1.1 

echo "pushing cinemaworld service docker image to the Docker hub"
sudo docker push golra03/cinemaworld:latest
sudo docker push golra03/cinemaworld:v1.1

echo "Building filmworld service docker image"
cd ../filmworld
sudo docker build . -t golra03/filmworld:latest -t golra03/filmworld:v1.1

echo "pushing cinemaworld service docker image to the Docker hub"
sudo docker push golra03/filmworld:latest
sudo docker push golra03/filmworld:v1.1

echo "Building webjetserver service docker image"
cd ../webjetserver
sudo docker build . -t golra03/webjetserver:latest -t golra03/webjetserver:v1.1

echo "pushing webjetserver service docker image to the Docker hub"
sudo docker push golra03/webjetserver:latest
sudo docker push golra03/webjetserver:v1.1