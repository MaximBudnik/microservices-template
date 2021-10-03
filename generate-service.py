#!/usr/bin/python
import subprocess
from shutil import copytree
from re import findall

print('Enter service name:')
serviceName = input()
templateFolder = './backend/.service-template'
destinationFolder = './backend/' + serviceName
dockerComposeFile = './docker-compose.backend.yml'
dockerComposeProdFile = './docker-compose.backend.prod.yml'


def copy_template_files():
    destination = copytree(templateFolder, destinationFolder)
#     res = subprocess.run("cd {} && yarn".format(destinationFolder), shell=True)
#     print(res)


def update_docker_compose():
    set_next_line_as_port = False
    port = 0000
    with open(dockerComposeFile, 'r') as file:
        for line in file:
            if 'expose' in line:
                set_next_line_as_port = True
            elif set_next_line_as_port:
                parsed_port = int(findall(r'\b\d+\b', line)[0])
                port = parsed_port if parsed_port > port else port
                set_next_line_as_port = False
    port += 1
    with open(dockerComposeFile, "a") as file:
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
    with open(dockerComposeProdFile, "a") as file:
        file.write("""
  {0}:
    build:
      target: production
    command: node build/index.js
            """.format(serviceName))


copy_template_files()
update_docker_compose()

print('Done')
