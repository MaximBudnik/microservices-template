#!/usr/bin/python
import subprocess
from shutil import copytree
from re import findall
from json import load, dump

# Backend service algorithm
# copy template
# update docker-compose.backend.yml
# update docker-compose.backend.prod.yml

print('Choose service type: [f]rontend/[b]ackend')
serviceType = input()
print('Enter service name:')
serviceName = input()

backendTemplateFolder = './backend/.service-template'
backendDestinationFolder = './backend/' + serviceName
backendDockerComposeFile = './docker-compose.backend.yml'
backendDockerComposeProdFile = './docker-compose.backend.prod.yml'

frontendRootFolder = './frontend/root/'

frontendTemplateFolder = './frontend/.service-template'
frontendDestinationFolder = './frontend/' + serviceName
frontendDockerComposeFile = './docker-compose.frontend.yml'


def copy_template_files(template, destination):
    destination = copytree(template, destination)


#     res = subprocess.run("cd {} && yarn".format(destinationFolder), shell=True)
#     print(res)


def get_port(docker_compose_file):
    set_next_line_as_port = False
    res = 0000
    with open(docker_compose_file, 'r') as file:
        for line in file:
            if 'expose' in line:
                set_next_line_as_port = True
            elif set_next_line_as_port:
                parsed_port = int(findall(r'\b\d+\b', line)[0])
                res = parsed_port if parsed_port > res else res
                set_next_line_as_port = False
    res += 1
    return res


def update_backend_docker_compose():
    port = get_port(backendDockerComposeFile)
    with open(backendDockerComposeFile, "a") as file:
        file.write("""
  {0}:
    build:
      network: host
      context: backend/{0}
      dockerfile: Dockerfile
      target: base
    volumes:
      - ./backend/{0}/src:/home/node/app/src
      - ./backend/{0}/nodemon.json:/home/node/app/nodemon.json
    container_name: {0}
    expose:
      - '{1}'
    ports:
      - '{1}:{1}'
    command: yarn dev
        """.format(serviceName, port))
    with open(backendDockerComposeProdFile, "a") as file:
        file.write("""
  {0}:
    build:
      target: production
    command: node build/index.js
            """.format(serviceName))


def update_frontend_docker_compose():
    port = get_port(frontendDockerComposeFile)
    with open(frontendDockerComposeFile, "a") as file:
        file.write("""
  {0}:
    build:
      network: host
      context: frontend/{0}
      dockerfile: Dockerfile
      target: base
    environment:
      - NODE_ENV=development
      - CHOKIDAR_USEPOLLING=true
    volumes:
      - ./frontend/{0}:/app
      - /app/node_modules
    container_name: {0}
    expose:
      - '{1}'
    ports:
      - '{1}:{1}'
    command: yarn start
          """.format(serviceName, port))


# Frontend service algorithm
# copy template
# update docker-compose.frontend.yml
# update federation.json in copied folder
# update federation.json in root folder
# update environment.json in root folder
# update microservices.ts in root folder

if serviceType == "b":
    copy_template_files(backendTemplateFolder, backendDestinationFolder)
    update_backend_docker_compose()
elif serviceType == "f":
    copy_template_files(frontendTemplateFolder, frontendDestinationFolder)
    update_frontend_docker_compose()
    frontendPort = get_port(frontendDockerComposeFile)

    json_object = None
    with open(frontendDestinationFolder + '/federation.json', "r") as copiedFederationJson:
        json_object = load(copiedFederationJson)
    json_object["port"] = frontendPort
    json_object["name"] = serviceName
    json_object["filename"] = serviceName + ".js"
    with open(frontendDestinationFolder + '/federation.json', "w") as copiedFederationJson:
        dump(json_object, copiedFederationJson)
    json_object = None
    with open(frontendRootFolder + 'federation.json', "r") as rootFederationJson:
        json_object = load(rootFederationJson)
    json_object["remotes"][serviceName] = "{0}@http://localhost:{1}/{0}.js".format(serviceName, frontendPort)
    with open(frontendRootFolder + 'federation.json', "w") as rootFederationJson:
        dump(json_object, rootFederationJson)
    json_object = None
    with open(frontendRootFolder + 'environment.json', "r") as rootEnvironmentJson:
        json_object = load(rootEnvironmentJson)
    json_object["microservices"][serviceName] = {}
    json_object["microservices"][serviceName]["url"] = "http://localhost:{1}/{0}.js".format(serviceName, frontendPort)
    with open(frontendRootFolder + 'environment.json', "w") as rootEnvironmentJson:
        dump(json_object, rootEnvironmentJson)

    print("Please add following code to {0}src/microservices.ts:".format(frontendRootFolder))
    print("""
    {0}: {{
            url: config.microservices.{0}.url,
            scope: '{0}',
            module: './Service',
        }}
    """.format(serviceName))
else:
    print('Wrong service type')
    exit()

print('Done')
