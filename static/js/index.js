function valida_campos(){
                        /* Se digitar o ID , tem que por a senha */
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

window.document.querySelector("input#id_teamviewer").addEventListener("change",valida_campos)
window.document.querySelector("input#id_anydesk").addEventListener("change",valida_campos)
window.document.querySelector("input#id_rustdesk").addEventListener("change",valida_campos)
window.document.querySelector("input#senha_teamviewer").addEventListener("change",valida_campos)
window.document.querySelector("input#senha_anydesk").addEventListener("change",valida_campos)
window.document.querySelector("input#senha_rustdesk").addEventListener("change",valida_campos)



const remove_mensagem = setTimeout(()=>{
    window.document.getElementsByClassName("alert")[0].style.display = 'none'
},5000)



function deleteAcesso(seq_acesso){
    if ( window.confirm("Deseja deletar este acesso?") == true ){
        fetch(`/delete/${seq_acesso}`)
        window.location.replace("/index/?status=4")
    }
}

