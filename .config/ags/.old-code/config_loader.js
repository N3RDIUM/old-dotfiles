const config_path = '/home/n3rdium/.config/ags/custom_config.json';
const config_contents = Utils.readFile(config_path);
export default JSON.parse(config_contents)