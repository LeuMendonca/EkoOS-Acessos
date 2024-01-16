function valida_campos(){
//-----------------------------Validação dos Campos de Cadastro-------------------------------
    if (window.document.querySelector("input#id_teamviewer").value.length > 0){
        window.document.querySelector("input#senha_teamviewer").setAttribute("required","true")
    }else{
        window.document.querySelector("input#senha_teamviewer").removeAttribute("required")
    }

    if (window.document.querySelector("input#id_anydesk").value.length > 0){
        window.document.querySelector("input#senha_anydesk").setAttribute("required","true")
    }else{
        window.document.querySelector("input#senha_anydesk").removeAttribute("required")
    }

    if (window.document.querySelector("input#id_rustdesk").value.length > 0){
        window.document.querySelector("input#senha_rustdesk").setAttribute("required","true")
    }else{
        window.document.querySelector("input#senha_rustdesk").removeAttribute("required")
    }

                        /* Se digitar na senha , obrigatorio por o ID */
    if (window.document.querySelector("input#senha_teamviewer").value.length > 0){
        window.document.querySelector("input#id_teamviewer").setAttribute("required","true")
    }else{
        window.document.querySelector("input#id_teamviewer").removeAttribute("required")
    }

    if (window.document.querySelector("input#senha_anydesk").value.length > 0){
        window.document.querySelector("input#id_anydesk").setAttribute("required","true")
    }else{
        window.document.querySelector("input#id_anydesk").removeAttribute("required")
    }

    if (window.document.querySelector("input#senha_rustdesk").value.length > 0){
        window.document.querySelector("input#id_rustdesk").setAttribute("required","true")
    }else{
        window.document.querySelector("input#id_rustdesk").removeAttribute("required")
    }
}

//---------------------------Adição dos eventos change aos componentes----------------------
window.document.querySelector("input#id_teamviewer").addEventListener("change",valida_campos)
window.document.querySelector("input#id_anydesk").addEventListener("change",valida_campos)
window.document.querySelector("input#id_rustdesk").addEventListener("change",valida_campos)
window.document.querySelector("input#senha_teamviewer").addEventListener("change",valida_campos)
window.document.querySelector("input#senha_anydesk").addEventListener("change",valida_campos)
window.document.querySelector("input#senha_rustdesk").addEventListener("change",valida_campos)


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

let itemCorNav = window.document.querySelector("#color_nav")
let itemCorLetraNav = window.document.querySelector("#colorLetrasNav")
let barraNavegacao = window.document.querySelector("nav#navegacao")
let footer = window.document.querySelector("#footer")

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
    footer.innerText = `Data: ${dataFormatada} | Hora: ${horaFormatada}`;
}

function formatarNumero(numero) {
    return numero < 10 ? '0' + numero : numero;
}

// Atualizar a cada segundo (1000 milissegundos)
setInterval(atualizarDataHora, 1000);

// Chamar a função inicialmente para evitar um atraso de um segundo na exibição
atualizarDataHora();