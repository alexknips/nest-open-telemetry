# Introduction
This repo shows how to use OpenTelemetry with multiple NestJS apps. I will later how some of the hurdles in other explanations were overcome.

Guidance from https://www.tomray.dev/nestjs-open-telemetry was used but modified 

## Running

### Run everything via `docker-compose`

* Run Jaeger backend and the three nestjs apps with `docker compose up --build`
* Access Jaeger UI at http://localhost:16686 
* Make a call to nest1 app with `curl --location 'http://localhost:3001/deepcalls'`

Below does not work yet but will in the future

### Run everything in Kubernetes

```bash
kustomize build ./kubernetes | kubectl apply -f -
kubectl port-forward -n example-hotrod service/example-hotrod 8080:frontend
# In another terminal
kubectl port-forward -n example-hotrod service/jaeger 16686:frontend

# To cleanup
kustomize build ./kubernetes | kubectl delete -f -
```

Access Jaeger UI at http://localhost:16686 and HotROD app at http://localhost:8080

### Run Jaeger backend

An all-in-one Jaeger backend is packaged as a Docker container with in-memory storage.

```bash
docker run \
  --rm \
  --name jaeger \
  -p6831:6831/udp \
  -p16686:16686 \
  -p14268:14268 \
  jaegertracing/all-in-one:latest
```

Jaeger UI can be accessed at http://localhost:16686.
