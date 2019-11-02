const { remote } = require("electron");
const mainProcess = remote.require("./index");
document.getElementById("input").addEventListener("click", _ => {
  mainProcess.selectDirectory().then(res => {
    console.log(res);
  });
});
