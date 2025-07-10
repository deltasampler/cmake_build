const os = require("os");
const {execSync} = require("child_process");

const config = {
    name: "project",
    windows: {
        preset: "windows-x64-release",
        vsdevcmd: "C:\\Program Files\\Microsoft Visual Studio\\2022\\Community\\Common7\\Tools\\vsdevcmd.bat"
    },
    linux: {
        preset: "linux-x64-release",
        vcpkg_root: "~/vcpkg"
    }
};

function build() {
    const commands = [];
    const env = {};

    const platform = os.platform();

    if (platform === "win32") {
        const windows = config.windows;

        commands.push(`"${windows.vsdevcmd}"`);
        commands.push(`cmake --preset "${windows.preset}"`);
        commands.push(`ninja -C "out/build/${windows.preset}/"`);
        commands.push(`cd out/build/${windows.preset}/`);
        commands.push(`.\\${config.name}.exe`);
    } else if (platform === "linux") {
        const linux = config.linux;

        commands.push(`cmake --preset "${linux.preset}"`);
        commands.push(`ninja -C "out/build/${linux.preset}/"`);
        commands.push(`cd out/build/${linux.preset}/`);
        commands.push(`./${config.name}`);

        env.VCPKG_ROOT = linux.vcpkg_root;
    } else {
        console.error(`Building for "${platform}" is not supported`);

        return;
    }

    try {
        execSync(
            commands.join(" && "),
            {
                env: {
                    ...process.env,
                    ...env
                },
                shell: true,
                stdio: "inherit"
            }
        );
    } catch (e) {
        console.error(e.message);
    }
}

build()
