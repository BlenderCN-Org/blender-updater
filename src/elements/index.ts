import InputDirectory from "./directory";
export { default as InputButton } from "./button";

const elements = {
    "directory": InputDirectory,
    "button": ""
}

export function createFromConfig(config) {
    console.log(config);
}