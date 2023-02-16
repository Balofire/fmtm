import os
from dotenv import dotenv_values

# Python Environment Variable setup required on System or .env file
# Access the variable like below
# print(config_env["VAR_NAME"])
config_env = {
    **dotenv_values(".env"),  # load local file development variables
    **os.environ,  # override loaded values with system environment variables
}


def is_docker():
    '''Determines whether api is running in a docker container'''
    path = '/proc/self/cgroup'
    return (
        os.path.exists('/.dockerenv') or
        os.path.isfile(path) and any('docker' in line for line in open(path))
    )


def get_redirect_url():
    pass
