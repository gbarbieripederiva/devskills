export default new(class ErrorToastPlugin{
    install(vue:any):void{// eslint-disable-line
        require("./style.css");
        vue.prototype.$showErrorToast = (errorMessage:string) => {
            const div = document.createElement("div");
            const p = document.createElement("p");
            div.appendChild(p);
            p.textContent = errorMessage;
            div.classList.add("error-toast");
            document.body.appendChild(div);
            setTimeout(() => {
                document.body.removeChild(div);
            }, 3000);
        }
    }
})