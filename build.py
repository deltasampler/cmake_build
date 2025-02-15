import platform
import os
import subprocess

config = {}

config['name'] = 'project'

config['windows'] = {
    'preset': 'windows-x64-release',
    'vsdevcmd': r'C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\vsdevcmd.bat'
}

config['linux'] = {
    'preset': 'linux-x64-release',
    'vcpkg_root': '~/vcpkg'
}

def build():
    commands = []

    if platform.system() == 'Windows':
        windows = config['windows']

        commands = [
            f'"{windows['vsdevcmd']}"',
            f'cmake --preset "{windows['preset']}"',
            f'ninja -C "out/build/{windows['preset']}/"',
            f'cd out/build/{windows['preset']}/{config['name']}/',
            f'.\\{config['name']}.exe'
        ]
    elif platform.system() == 'Linux':
        linux = config['linux']

        commands = [
            f'cmake --preset "{linux['preset']}"',
            f'ninja -C "out/build/{linux['preset']}/"',
            f'cd out/build/{linux['preset']}/{config['name']}/',
            f'./{config['name']}'
        ]

        os.environ['VCPKG_ROOT'] = linux['vcpkg_root']
    else:
        print(f'Building for {platform.system()} is not supported')

        return

    command = ' && '.join(commands)

    subprocess.run(command, shell=True, check=True)

build()
