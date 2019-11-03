const root = document.getElementById("main-wrapper");

root.innerHTML = "MAIIN";

export default {
    show: () => {
        root.classList.add("stage-visible");
    },
    hide: () => {
        root.classList.remove("stage-visible");
    }
}