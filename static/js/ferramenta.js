// Seleção dos elementos
const titleTools = document.querySelectorAll(".title-tool") 

const inputSearch = document.querySelector("#search-tool") 


// Eventos 
titleTools.forEach( ( titlo ) => {
    titlo.addEventListener("click" , ( e ) => {
        const elementoTitle = e.target 
        const paiTitle = elementoTitle.closest("div")

        const paragraph = paiTitle.querySelector(".tool-paragraph")

        if (paragraph.style.maxHeight){
            paragraph.style.maxHeight = null;
        }else {
            paragraph.style.maxHeight = paragraph.scrollHeight + "px";
          }
    })
})

inputSearch.addEventListener("keyup" , ( e ) => {
    
    const titleTools = document.querySelectorAll(".title-tool") 
    const titleSearch = e.target.value.toLowerCase()


    titleTools.forEach( ( elemento ) => {
        
        const textTitulo = elemento.innerText.toLowerCase()
        const paiTitulo = elemento.closest("div")
        

        if( !textTitulo.includes( titleSearch )){
            paiTitulo.style.display = "none"
        }else{
            paiTitulo.style.display = "block"
        }
    })

})