docker build -t rallycoding/multi-client-k8s:latest -t rallycoding/multi-client-k8s:$SHA -f ./client/Dockerfile ./client
docker build -t rallycoding/multi-server-k8s:latest -t rallycoding/multi-server-k8s:$SHA -f ./server/Dockerfile ./server
docker build -t rallycoding/multi-worker-k8s:latest -t rallycoding/multi-worker-k8s:$SHA -f ./worker/Dockerfile ./worker

docker push rallycoding/multi-client-k8s:latest
docker push rallycoding/multi-server-k8s:latest
docker push rallycoding/multi-worker-k8s:latest

docker push rallycoding/multi-client-k8s:$SHA
docker push rallycoding/multi-server-k8s:$SHA
docker push rallycoding/multi-worker-k8s:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=rallycoding/multi-server-k8s:$SHA
kubectl set image deployments/client-deployment client=rallycoding/multi-client-k8s:$SHA
kubectl set image deployments/worker-deployment worker=rallycoding/multi-worker-k8s:$SHA