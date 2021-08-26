window.addEventListener("DOMContentLoaded", () => {
    const reemplazarTexto = (selector, text) => {
        const elemento = document.getElementById(selector)
        if (elemento) elemento.innerHTML = text;
    }
    for ( const type of ["chrome", "node", "electron"]){
        reemplazarTexto(`${type}--version`, process.version[type])
    }
});