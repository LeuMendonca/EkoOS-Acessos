// Seleções de elementos
const formsContainer = document.querySelectorAll(".container-login")
const linkLogin = document.querySelector(".link-login")
const btnReturn = document.querySelector(".btn-return")

// Eventos

linkLogin.addEventListener("click" , ( e ) => {

    e.preventDefault();

    visibleForm();

})

btnReturn.addEventListener("click" , ( e ) => {

    e.preventDefault();

    visibleForm();

})

// Funções
const visibleForm = ( ) => {

    formsContainer.forEach( ( formulario ) => {
        
        formulario.classList.toggle("invisible")

    })
}

formsContainer.forEach( ( formulario ) => {

    const inputForm = formulario.querySelectorAll("input")

    inputForm.value = ""
})

//---------------Remoção da mensagem na tela-----------------

const remove_mensagem = setTimeout(() => {
    
    window.document.getElementsByClassName("alert")[0].style.display = 'none'

},5000)