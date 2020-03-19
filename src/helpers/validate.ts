import { remote } from "electron";
const fs = remote.require("fs");

export default {
    //Check if path is a valid dir to store the blender project
    blenderPath: (p: string) => {
        return true;
    }
};