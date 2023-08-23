![Static Badge](https://img.shields.io/badge/backend-black?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/v18.16.0-version?logo=nodedotjs&color=%23339933&labelColor=white&label=Node%2EJS) ![Static Badge](https://img.shields.io/badge/v9.x-version?logo=nestjs&logoColor=gray&color=gray&labelColor=white&label=NestJS) ![Static Badge](https://img.shields.io/badge/v5.x-version?logo=typescript&color=blue&labelColor=white&label=TypeScript)

![Static Badge](https://img.shields.io/badge/database-black?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/v8.X-version?logo=mysql&color=%234169E1&labelColor=white&label=MySQL) ![Static Badge](https://img.shields.io/badge/v9.x-version?logo=typeorm&logoColor=%232D3748&color=%232D3748&labelColor=white&label=TypeORM)

![Static Badge](https://img.shields.io/badge/environment-black?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/v23.x-version?logo=docker&color=%232496ED&labelColor=white&label=Docker)

# 🍔 Fast & Foodious [![CircleCI](https://dl.circleci.com/status-badge/img/gh/rodrigo-ottero/fast-n-foodious/tree/main.svg?style=shield&circle-token=cdecd596e539bf2fa591f72946e9de612e83bda3)](https://dl.circleci.com/status-badge/redirect/gh/rodrigo-ottero/fast-n-foodious/tree/main) ![Static Badge](https://img.shields.io/badge/v2.0.0-version?logo=&color=%232496ED&labelColor=white&label=fast-n-foodious) 
Sistema de auto-atendimento de fast food. Projeto de conclusão da Fase 02 da pós gradução em Software Architecture.

* [Arquitetura](#arquitetura)
* [Instalação de Dependências Node](#-instalação-de-dependências-node)
* [Build da Aplicação](#-build-da-aplicação)
* [Executando a Aplicação](#%EF%B8%8F-executando-a-aplicação)
    * [Variáveis de Ambiente](#-variáveis-de-ambiente)
    * [Execução em modo local (in-memory repository)](#%EF%B8%8F-execução-em-modo-local-in-memory-repository)
    * [Execução em modo local (mysql repository)](#%EF%B8%8F-execução-em-modo-local-mysql-repository)
    * [**Execução em modo produção (Avaliação FIAP)**](#%EF%B8%8F-execução-em-modo-produção-avaliação-fiap)
        * [Docker Compose (Modo Fácil!)](#-docker-compose-modo-fácil)
        * [Docker (Modo Desbravador!)](#-docker-modo-desbravador)
        * [Kubernetes (Modo Fácil!)](#-kubernetes-modo-fácil)
        * [Kubernetes (Modo Desbravador!)](#-kubernetes-modo-desbravador)
    * [Documentação da API](#-documentação-da-api)
* [Testes](#-testes)
* [Estrutura Base do Projeto](#%EF%B8%8F-estrutura-base-do-projeto)
* [DDD](#ddd)
    * [Dicionário de Linguagem Ubíqua](/docs/dicionario-linguagem-ubiqua.md)
    * [Domain Storytelling](#domain-storytelling)
        * [Auto Cadastro de Clientes](#auto-cadastro-de-clientes)
        * [Realização de Pedidos](#realização-de-pedidos)
        * [Pagamento de Pedidos](#pagamento-de-pedidos)
        * [Preparo de Pedidos](#preparo-de-pedidos)
        * [Entrega de Pedidos](#entrega-de-pedidos)
        * [Fluxo de etapas dos Pedidos](#fluxo-de-etapas-dos-pedidos)

## Arquitetura
//TODO: Criar diagrama fnf clean arch
![fast-n-foodious-clean](docs/diagramas/fast-n-foodious-clean.png)

- Arquitetura Clean & Modular
    - Camada de Application, Enterprise, Presentation e Infrastructure
    - Módulo Main, Application, Presentation e Infrastructure
- Principais Tecnologias/Frameworks
    - Docker, Kubernetes, Helm, Kubectl, NodeJS, NestJS, TypeORM, NPM, Mysql, Swagger, Typescript, Jest
- Qualidade / Testes
    - Validações pré-commit/push
        - Validação de cobertura de testes (threshold 95%)
        - Testes unitários, e2e em memória (all green)
        - Validação de implementação de testes (modo alerta para implementação de testes de rest apis, services, validators, repositories)
    - CI/CD
        - Pipeline CircleCI para integração com a ```main```
            - ci/circleci: run-unit-tests       - Execução de testes unitários (all green)
            - ci/circleci: run-e2e-mysql        - Execução de testes e2e com mysql (all green)
            - ci/circleci: run-e2e-in-memory    - Execução de testes e2e em memória (all green)
            - ci/circleci: run-coverage-tests   - Execução de validação de cobertura de testes (all green)
            - ci/circleci: run-check-test-impl  - Execução de validação de implementação de testes (mandatório para rest apis, services, validators, repositories)
            - ci/circleci: build                - Build de imagens docker (AMD & ARM) e publicação no DockerHub
            
            [![CircleCI](https://dl.circleci.com/insights-snapshot/gh/rodrigo-ottero/fast-n-foodious/main/workflow/badge.svg?window=7d&circle-token=b58fa7f3f1c216768f2d59e57b0b9b257c68c36f)](https://app.circleci.com/insights/github/rodrigo-ottero/fast-n-foodious/workflows/workflow/overview?branch=main&reporting-window=last-7-days&insights-snapshot=true)

## 🚀 Instalação de Dependências Node
```bash
$ npm install
```

## 🧩 Build da Aplicação
```bash
$ npm run build
```

## ⚡️ Executando a Aplicação
O sistema pode ser executado com ou sem dependências externas.
### 📦 Variáveis de Ambiente
`NODE_ENV` como variável de ambiente, com os seguintes valores:

```bash
# env_name:
- local                   # Variáveis usadas para rodar a aplicação em ambiente local, COM dependência de container mysql
                          # Presume mysql rodando e a necessidade de atachar a aplicação ao container para desenvolver
                          # Exemplo de caso de uso: debugar local e apontando para o banco no container.
                          # $ NODE_ENV=local npm run start:debug

- local-mock-repository   # Variáveis usadas para rodar a aplicação em ambiente local, SEM dependência de container mysql
                          # Exemplo de caso de uso: debugar local rodando com o banco em memória
                          # $ NODE_ENV=local-mock-repository npm run start:debug

- prod                    # Variáveis usadas para rodar a aplicação em ambiente de produção, COM dependøencia de container mysql
                          # $ NODE_ENV=prod npm run start:debug

# Desenvolvimento
$ NODE_ENV={env_name} npm run start

# Modo Watch
$ NODE_ENV={env_name} npm run start:dev

# Modo Debug
$ NODE_ENV={env_name} npm run start:debug

# Modo Produção
$ npm run start:prod
```
**Nota:** Se informado o env_name DIFERENTE de `local-mock-repository`, o modo de desenvolvimento, watch, debug e produção vai depender de ter um container mysql em execução.

### ⚡️ Execução em modo local (in-memory repository)
Utilizado **`apenas para desenvolvimento local, modo watch, debug, testes unitários e e2e`**. Executa a aplicação em modo local, com repositório em memória:
```
$ NODE_ENV=local-mock-repository npm run start
```

### ⚡️ Execução em modo local (mysql repository)
Utilizado **`apenas para desenvolvimento local, modo watch, debug, testes e2e `**. Inicia o contianer mysql com as variáveis locais e inicia a aplicação `(fora do container)`com as variáveis locais:
```
$ docker-compose --env-file ./envs/local.env up mysql
$ docker ps
CONTAINER ID   IMAGE       COMMAND                  CREATED         STATUS         PORTS                               NAMES
83c9b4d8880a   mysql:8.0   "docker-entrypoint.s…"   3 seconds ago   Up 2 seconds   0.0.0.0:3306->3306/tcp, 33060/tcp   mysql

# Executa a aplicação com as variáveis locais, conectando no container do mysql
$ NODE_ENV=local npm run start
```

### 🚨⚡️ Execução em modo produção (Avaliação FIAP)
Utilizado **`apenas para produção e para avaliação dos instrutores FIAP`**.

#### 🫧 Docker Compose (Modo Fácil!)
Inicia o container da aplicação e do mysql com as variáveis de produção, utilizando o docker compose:
```
$ docker-compose --env-file ./envs/prod.env up -d
$ docker ps
CONTAINER ID   IMAGE                 COMMAND                  CREATED         STATUS         PORTS                               NAMES
2a0f11e4ffe3   fast-n-foodious       "docker-entrypoint.s…"   5 seconds ago   Up 4 seconds   0.0.0.0:3000->3000/tcp              fast-n-foodious
06ebf6b90fa7   mysql:8.0             "docker-entrypoint.s…"   5 seconds ago   Up 4 seconds   0.0.0.0:3306->3306/tcp, 33060/tcp   mysql
```

#### 💀 Docker (Modo Desbravador!)
Inicia o container da aplicação e do mysql com as variáveis de produção, utilizando *`imagens docker`* do mysql e da aplicação:
```
$ docker network create fast-n-foodious-network

$ docker run -d --rm --name mysql -p 3306:3306 \
    --env-file ./envs/prod.env --network fast-n-foodious-network \
    -v ./scripts/schema:/docker-entrypoint-initdb.d \
    -v mysql-data:/data/db \
    mysql:8.0

$ docker run -d --rm --name fast-n-foodious -p 3000:3000 \
    --env-file ./envs/prod.env --network fast-n-foodious-network \
    ottero/fast-n-foodious

$ docker ps
CONTAINER ID   IMAGE                                COMMAND                  CREATED         STATUS         PORTS                               NAMES
88bf7eae7e46   ottero/fast-n-foodious               "docker-entrypoint.s…"   2 seconds ago   Up 1 second    0.0.0.0:3000->3000/tcp              fast-n-foodious
8b0268d435a6   mysql:8.0                            "docker-entrypoint.s…"   6 seconds ago   Up 5 seconds   0.0.0.0:3306->3306/tcp, 33060/tcp   mysql
```
#### 🫧 Kubernetes (Modo Fácil!)
Inicia o pod da aplicação e do mysql com as variáveis de produção, assim como suas dependências (services, deployments, replicasets, hpas, configmaps, secrets, pv, pvc) utilizando o helm:
*Nota: Assume k8s pod/metrics-server up & running para habilitação de escalabilidade via HPA*
```
$ helm install fast-n-foodious helm/

NAME: fast-n-foodious
LAST DEPLOYED: Mon Aug 21 22:02:05 2023
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None

$ kubectl get all

NAME                                   READY   STATUS    RESTARTS        AGE
pod/fast-n-foodious-5c6cbcbf76-v4bgd   1/1     Running   1 (2m29s ago)   3m28s
pod/mysql-595c5c9d4f-x7grb             1/1     Running   0               3m28s

NAME                          TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
service/fast-n-foodious-svc   LoadBalancer   10.97.158.122    localhost     80:30000/TCP   3m28s
service/kubernetes            ClusterIP      10.96.0.1        <none>        443/TCP        9d
service/mysql                 ClusterIP      10.109.101.116   <none>        3306/TCP       3m28s

NAME                              READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/fast-n-foodious   1/1     1            1           3m28s
deployment.apps/mysql             1/1     1            1           3m28s

NAME                                         DESIRED   CURRENT   READY   AGE
replicaset.apps/fast-n-foodious-5c6cbcbf76   1         1         1       3m28s
replicaset.apps/mysql-595c5c9d4f             1         1         1       3m28s

NAME                                                      REFERENCE                    TARGETS           MINPODS   MAXPODS   REPLICAS   AGE
horizontalpodautoscaler.autoscaling/fast-n-foodious-hpa   Deployment/fast-n-foodious   46%/70%, 0%/70%   1         3         1          3m28s
```
#### 💀 Kubernetes (Modo Desbravador!)
Inicia o pod da aplicação e do mysql com as variáveis de produção, assim como suas dependências (services, deployments, replicasets, hpas, configmaps, secrets, pv, pvc) utilizando o CLI kubectl:
*Nota: Assume k8s pod/metrics-server up & running para habilitação de escalabilidade via HPA*
```
$ kubectl apply -f k8s/fast-n-foodious-secret.yml 
secret/fast-n-foodious-secret created

$ kubectl apply -f k8s/fast-n-foodious-configmap.yml 
configmap/fast-n-foodious-env created
configmap/mysql-env created

$ kubectl apply -f k8s/fast-n-foodious-pv.yml 
persistentvolume/fast-n-foodious-pv created

$ kubectl apply -f k8s/fast-n-foodious-pvc.yml 
persistentvolumeclaim/fast-n-foodious-pvc created

$ kubectl apply -f k8s/fast-n-foodious-deployment.yml 
deployment.apps/fast-n-foodious created
deployment.apps/mysql created

$ kubectl apply -f k8s/fast-n-foodious-service.yml 
service/fast-n-foodious-svc created
service/mysql created

$ kubectl apply -f k8s/fast-n-foodious-hpa.yml 
horizontalpodautoscaler.autoscaling/fast-n-foodious-hpa created

$ kubectl get all
NAME                                   READY   STATUS    RESTARTS   AGE
pod/fast-n-foodious-7fc6f95bdb-krcnm   1/1     Running   0          2m58s
pod/mysql-595c5c9d4f-5vpj8             1/1     Running   0          2m58s

NAME                          TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
service/fast-n-foodious-svc   LoadBalancer   10.110.74.44   localhost     80:30000/TCP     2m53s
service/kubernetes            ClusterIP      10.96.0.1      <none>        443/TCP          5m52s
service/mysql                 ClusterIP      10.108.3.249   <none>        3306/TCP         2m53s

NAME                              READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/fast-n-foodious   1/1     1            1           2m59s
deployment.apps/mysql             1/1     1            1           2m59s

NAME                                         DESIRED   CURRENT   READY   AGE
replicaset.apps/fast-n-foodious-7fc6f95bdb   1         1         1       2m59s
replicaset.apps/mysql-595c5c9d4f             1         1         1       2m58s

NAME                                                      REFERENCE                    TARGETS           MINPODS   MAXPODS   REPLICAS   AGE
horizontalpodautoscaler.autoscaling/fast-n-foodious-hpa   Deployment/fast-n-foodious   69%/80%, 0%/80%   1         3         1          2m48s 
```
### 🧾 Documentação da API (Swagger)
`docker`    http://localhost:3000/api
`k8s`       http://localhost:80/api

### 🎮 Extras Docker Compose

```bash
# Build com docker-compose utilizando env específica
$ docker-compose --env-file ./envs/{env-name}.env build

# Execução dos serviços registrados no docker-compose utilizando env específica
$ docker-compose --env-file ./envs/{env-name}.env up

# Execução de um serviço registrados no docker-compose utilizando env específica
$ docker-compose --env-file ./envs/{env-name}.env up {service}

# Interrupção dos serviços registrados no docker-compose utilizando env específica
$ docker-compose --env-file ./envs/{env-name}.env down

# Interrupção de um serviço registrados no docker-compose utilizando env específica
$ docker-compose --env-file ./envs/{env-name}.env down {service}
```
**Nota:** Os serviços registrados no docker-compose são:
```
- fast-n-foodious
- mysql
```
## 🧪 Testes
O projeto cobre testes unitários, testes e2e e testes isolados de api (para desenvolvedor), além de verifiar a cobertura dos testes:
```bash
# Execução de testes unitários
$ npm run test

# Execução de cobertura de testes
$ npm run test:cov

# Execução de testes e2e SEM dependência de banco de dados (in-memory repository)
$ NODE_ENV=local-mock-repository npm run test:e2e

# Execução de testes e2e COM dependência de banco de dados (mysql repository)
# 1. Necessita do container mysql em execução!
# 2. Considere remover o volume criado no mysql caso execute o teste mais de uma vez!
$ NODE_ENV=local npm run test:e2e
```
### 🧪 Testes Stress 
Excução de testes de stress cluster k8s, utilizando job k6.
*Nota: A execução tem duração de 60s, estressando o path /v1/categoria. Assume a aplicação e mysql up & running no cluster kubernetes*
```
$ kubectl apply -f k8s/fast-n-foodious-job.yml 
job.batch/k6-stress-job created
configmap/k6-stress-env created

$ kubectl get po
NAME                               READY   STATUS    RESTARTS        AGE
fast-n-foodious-5c6cbcbf76-n5vn5   1/1     Running   1 (6m49s ago)   7m46s
fast-n-foodious-5c6cbcbf76-q5q7t   1/1     Running   0               106s
k6-stress-job-fkjv9                1/1     Running   0               6s
mysql-595c5c9d4f-chlrx             1/1     Running   0               7m46s

$ kubectl logs -f k6-stress-job-fkjv9

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
```
# 🏛️ Estrutura Base do Projeto
```
.circleci/                              # Configurações de pipelines CI/CD
docs/                                   # Documentação da aplicação
envs/                                   # Configurações de ambiente
helm/                                   # Configuração de descriptors Helm
k8s/                                    # Configuração de descriptors kubernetes
scripts/                                # Scripts gerais de inicialização e validação (git prepush, precommit - cobertura de testes, testes unitários, e2e MySQL e memória)
src/                                    # Source da solução
├── application                         # Camada de Application (use cases, validators)    
│   ├── categoria
│   ├── cliente
│   │   └── service                     # Serviços (controllers) de composição de casos de uso
│   │   └── usecase                     # Casos de usos
│   ├── item-pedido
│   ├── pedido
│   └── produto
├── enterprise                          # Camada Enterprise (domínio)
│   ├── categoria
│   ├── cliente
│   │   ├── model                       # Entidades de domínio
│   │   └── validation                  # Validators (regras de negócio)
│   ├── exception                       # Exceções de domínio
│   ├── item-pedido
│   ├── pedido
│   ├── produto
│   ├── repository                      # Portas de repositórios da camana de domínio
│   ├── service                         # Portas de serviços da camana de domínio
│   └── validation                      # Contrato de validações da camada de domínio
├── infrastructure                      # Camada Infrastructure (banco de dados, ORM)
│   ├── exception                       # Exceções de infraestrutura
│   └── persistence
│       ├── cliente
│       │   ├── entity                  # Entitdades ORM
│       │   └── repository              # Repositórios (mysql, in-memory)
│       ├── item-pedido
│       ├── mysql                       # Configurações de banco de dados MySQL 
│       ├── pedido
│       ├── produto
├── presentation                        # Camada Presentation (rest api)
│   └── rest
│       ├── categoria
│       ├── cliente
│       │   ├── api                     # Rest API
│       │   ├── request                 # Contratos de entrada
│       │   └── response                # Contratos de saída
│       ├── handler                     # Handlers para tratamento centralizado de exceções (ValidationException, DomainException)
│       ├── item-pedido
│       ├── pagamento
│       ├── pedido
│       ├── produto
└── shared                              # Itens compartilhados
test/                                   # Implementações de testes
├── api                                 # Testes de API (utilitário de desenvolvimento)
├── e2e                                 # Testes E2E
└── stress                              # Testes de stress (k6 e/ou cluster k8s)
````

## DDD
### Domain Storytelling
#### Auto Cadastro de Clientes 
![01-Auto-Cadastro-De-Clientes](docs/ddd/01-Auto-Cadastro-De-Clientes.png)

#### Realização de Pedidos
![02-Realizacao-De-Pedidos](docs/ddd/02-Realizacao-De-Pedidos.png)

#### Pagamento de Pedidos
![03-Pagamento-De-Pedidos](docs/ddd/03-Pagamento-De-Pedidos.png)

#### Preparo de Pedidos
![04-Preparo-De-Pedidos](docs/ddd/04-Preparo-De-Pedidos.png)

#### Entrega de Pedidos
![05-Entrega-De-Pedidos](docs/ddd/05-Entrega-De-Pedidos.png)

#### Fluxo de Etapas dos Pedidos
![Fluxo-De-Etapas-Do-Pedido](docs/ddd/Fluxo-De-Etapas-Do-Pedido.png)
