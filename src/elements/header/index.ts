import "./header.scss"
import { remote } from "electron";

const { shell } = remote;

export default {
    init: () => {

        document.getElementById("logo").addEventListener("mousedown", () => {
            shell.openExternal("https://www.blender.org")
        })

        document.getElementById("header-close").addEventListener("mousedown", () => {
            window.close();
        });

        document.getElementById("header-minimize").addEventListener("mousedown", () => {
            //remote.BrowserWindow.getFocusedWindow().minimize();
        });
    }
}