
function RemoveModal(){
    let oldm = document.querySelector(".modal")
    if (oldm != null)
        oldm.remove();
}

window.addEventListener("load",()=>{

    document.querySelectorAll("figure").forEach((fig)=>{ 
        fig.onclick = (evt)=>{
            let mdl = `            
                    <span class="close">&times;</span>
                    <img class="modal-content" src="${evt.currentTarget.querySelector("img").src}">
            `
            let el = document.createElement("div")
            el.classList.add("modal")
            el.innerHTML = mdl;
            el.onclick = RemoveModal
            
            el.querySelector("img").onclick = (ev)=>{ ev.stopPropagation(); }
            
            document.body.append(el);
        } 
    });
})