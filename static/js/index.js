function valida_campos() {
    const campos = document.querySelectorAll(".campo-acesso");

    for (const campo of campos) {
        const id = campo.getAttribute("id");

        if (id.includes("id_")) {
            const proximoCampo = document.querySelector(`#${campo.nextElementSibling.getAttribute("id")}`);

            if (campo.value.length > 0) {
                proximoCampo.setAttribute("required", "true");
            } else {
                proximoCampo.removeAttribute("required");
            }
        }

        if (id.includes("senha_")) {
            const campoAnterior = document.querySelector(`#${campo.previousElementSibling.getAttribute("id")}`);

            if (campo.value.length > 0) {
                campoAnterior.setAttribute("required", "true");
            } else {
                campoAnterior.removeAttribute("required");
            }
        }
    }
}


//---------------Remoção da mensagem na tela-----------------

const remove_mensagem = setTimeout(()=>{
    window.document.getElementsByClassName("alert")[0].style.display = 'none'
},5000)


// ---------------Confirmação exclusão de Acesso ----------------

function deleteAcesso(seq_acesso){
    if ( window.confirm("Deseja deletar este acesso?") == true ){
        fetch(`/delete/${seq_acesso}`)
        window.location.replace("/index/?status=4")
    }
}


// ----------------- Seleção Componentes-----------------------------
let linksNav = document.querySelectorAll("#navegacao a")
let itemCorNav = document.querySelector("#color_nav")
let itemCorLetraNav = document.querySelector("#colorLetrasNav")
let barraNavegacao = document.querySelector("#navegacao")
let footer = document.querySelector("#footer")
let dataHora = document.querySelector(".data-hora")
const camposAcesso = document.querySelectorAll(".campo-acesso")


//---------------------------Adição dos eventos change aos componentes----------------------

camposAcesso.forEach( ( element ) => {
    element.addEventListener("change",valida_campos)
})

// ----------------- Nav---------------------------------

itemCorNav.addEventListener("change", () =>{

    const cor_selecionada = itemCorNav.value
    
    salvarCorNoLocalStorage(cor_selecionada)
    atualizaCorNoFooter(cor_selecionada)
    atualizarCorNaNavegacao(cor_selecionada)
})

function salvarCorNoLocalStorage(cor){
    localStorage.setItem("corNav" , cor)
}

function atualizarCorNaNavegacao(cor){
    barraNavegacao.style.backgroundColor = cor

    const menuDropdown = document.querySelectorAll(".dropdown-menu-cadastro a")
    menuDropdown.forEach( elemento => elemento.style.backgroundColor = cor)

    const menuDropdownPerfil = document.querySelectorAll(".dropdown-menu-user a")
    menuDropdownPerfil.forEach( elemento => elemento.style.backgroundColor = cor)
}

// -----------------Letras Nav----------------------------

itemCorLetraNav.addEventListener("change" , () =>{
    const cor_selecionada = itemCorLetraNav.value
    salvarCorLetrasNavNoLocalStorage(cor_selecionada)
    atualizarCorLetraNaNavegacao(cor_selecionada)
    atualizaCorLetrasNoFooter(cor_selecionada)
})

function atualizarCorLetraNaNavegacao(cor){
    document.querySelectorAll(".itemNav").forEach(item => {
        item.style.color = cor;
    });
    }

function salvarCorLetrasNavNoLocalStorage(cor){
    localStorage.setItem("corLetrasNav" , cor)
}

//------------------------Footer---------------------------------
function atualizaCorNoFooter(cor){
    footer.style.backgroundColor = cor
}

function atualizaCorLetrasNoFooter(cor){
    footer.style.color = cor
}
// ------------------------Onload--------------------------------
function carregarCores(){
    const corArmazenada = localStorage.getItem("corNav")
    const corLetraArmazenada = localStorage.getItem("corLetrasNav")

    if (corArmazenada){
        atualizarCorNaNavegacao(corArmazenada)
        atualizaCorNoFooter(corArmazenada)
        itemCorNav.value = corArmazenada
    }

    if (corLetraArmazenada){
        atualizarCorLetraNaNavegacao(corLetraArmazenada)
        atualizaCorLetrasNoFooter(corLetraArmazenada)
        itemCorLetraNav.value = corLetraArmazenada
    }
}


// ---------------------------------Data e hora do footer---------------------------------

function atualizarDataHora() {
    // Obter a data atual
    var dataAtual = new Date();

    // Formatar a data e hora
    var dataFormatada = `${formatarNumero(dataAtual.getDate())}/${formatarNumero(dataAtual.getMonth() + 1)}/${dataAtual.getFullYear()}`;
    var horaFormatada = `${formatarNumero(dataAtual.getHours())}:${formatarNumero(dataAtual.getMinutes())}:${formatarNumero(dataAtual.getSeconds())}`;

    // Atualizar o elemento HTML
    dataHora.innerText = `Data: ${dataFormatada} | Hora: ${horaFormatada}`;
}

function formatarNumero(numero) {
    return numero < 10 ? '0' + numero : numero;
}

// Formatação quebra de linha dos paragrafos da tela de Ferramentas
function formataParagrafo(){
    
    const paragrafosTools = document.querySelectorAll(".tool-paragraph")
    
    paragrafosTools.forEach( ( elemento ) => {
        let textoParagrafo = elemento.innerHTML.replace(/\n/g , "<br>")
        
       elemento.innerHTML = textoParagrafo
    })
    
}


// Evento botão cadastro
const buttonCadastro = document.querySelector(".dropdown-principal");
const dropdownMenuCadastro = document.querySelector(".dropdown-menu-cadastro");

const dropdownMenuPerfil = document.querySelector(".dropdown-menu-user");
const buttonPerfil = document.querySelector(".dropdown-secundario");


buttonCadastro.addEventListener("click", (e) => {

    const elementLink = e.target

    console.log(elementLink)

    elementLink.querySelector("i").classList.toggle("rotacionar")
    elementLink.querySelector("i").classList.toggle("desrotacionar")
    
    dropdownMenuCadastro.classList.toggle("hide");  
      
});

// Atualizar a cada segundo (1000 milissegundos)
setInterval(atualizarDataHora, 1000);

// Chamar a função inicialmente para evitar um atraso de um segundo na exibição
atualizarDataHora();

formataParagrafo();