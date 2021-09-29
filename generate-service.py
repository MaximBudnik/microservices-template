#!/usr/bin/python
import subprocess
import sys
from shutil import copytree

if len(sys.argv) < 2:
    sys.exit('Please provide service name')

serviceName = sys.argv[1]

templateFolder = './backend/.service-template'
destinationFolder = './backend/' + serviceName

print('Service name:', serviceName)
print('Copying files from {} to {}'.format(templateFolder, destinationFolder))
destination = copytree(templateFolder, destinationFolder)
res = subprocess.run("cd {} && yarn".format(destinationFolder), shell=True)
print(res)
print('Done. Don`t forget to manually configure docker-compose.yml')
