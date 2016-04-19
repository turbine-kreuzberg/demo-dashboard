# A VOTUM project dashboard

## Getting started

### Prerequisites

Install [Docker](https://docs.docker.com/linux/)

```bash
docker build -t vtm-dashboard .
```

```bash
sudo docker run -it --rm -p 172.17.0.1:3030:3030 --name vtm-dashboard vtm-dashboard
```

Check out http://fabiocaseri.github.io/dashing-js for more information.
