from django.shortcuts import render,redirect
from django.core.paginator import Paginator
from django.db import connection
from django.conf import settings
import os
import subprocess

# Cadastrar usuário
def cadastroUsuario( request ):
    if request.method == "POST":
        user = request.POST.get("input-user-cadastro")
        password = request.POST.get("input-password-cadastro")

        cursor = connection.cursor()

        try:
            cursor.execute( f"""INSERT INTO USUARIOS ( USUARIO , SENHA ) VALUES ( '{ user }' , '{ password }' )""")
            
            connection.commit()

            return redirect("/login/?status=1")
        except:
            return redirect("/login/?status=2")
            

def login( request ):
    status = request.GET.get("status")

    if request.method == "POST":
        user = request.POST.get("input-user")
        password = request.POST.get("input-password")

        cursor = connection.cursor()

        cursor.execute(f" select usuario , senha from usuarios where usuario = '{ user }' and senha = '{ password }'")
        valida_usuario = cursor.fetchall()
        
        if valida_usuario != []:

            request.session["user"] = valida_usuario[0][0]

            print( valida_usuario )

            return redirect('/index/')
        return redirect('/login/?status=3')
        

    return render( request , 'app/login.html' , { "status" : status })

# ---------------------------------------Logoff----------------------------------

def sair(request):
    request.session.flush()
    return redirect('login')

#---------------------------------------Index da Aplicação----------------------------------
def index(request):
        
        if request.session.get("user"):

            cursor = connection.cursor()
            busca = request.GET.get("busca")
            status = request.GET.get("status")

            if busca:
                cursor.execute(f"""
                            select * from acessos where empresa like '%{busca.upper()}%' or nome_maquina like '%{busca.upper()}%' order by seq_acesso
                                """)

                acessos = cursor.fetchall()
            else:
                cursor.execute(f"""SELECT * FROM acessos order by seq_acesso""")
                acessos = cursor.fetchall()
            
            paginacao = Paginator(acessos,10)
            numero_paginas = request.GET.get("page")
            page_obj = paginacao.get_page(numero_paginas)
            
            
            return render(request,'app/index.html',{'status':status , 'acessos': page_obj })
        return redirect('/login/?status=4')





#--------------------------------------Cadastrar Acesso-------------------------------------
def cadastro(request):

    cursor = connection.cursor()

    cursor.execute(
        f"""
            select count(*) from acessos where empresa = '{request.POST.get("nome_empresa").upper()}' and nome_maquina = '{request.POST.get("nome_maquina").upper()}'
        """
    )
    existe_acesso = str(cursor.fetchall()[0][0])

    if existe_acesso == '0':
        cursor.execute("""select (case when max(seq_acesso) is null then 0
            else max(seq_acesso)
            end) from acessos
            """)
        seq_acesso = int(cursor.fetchall()[0][0]) + 1
        
        
        cursor.execute(f"""
            insert into acessos(
                        empresa,
                        nome_maquina,
                        team_viewer,
                        senha_team_viewer,
                        anydesk,
                        senha_anydesk,
                        rustdesk,
                        senha_rustdesk,
                        mstc, 
                        senha_mstc,
                        observacao,
                        seq_acesso
                    )values(
                            '{request.POST.get("nome_empresa").upper()}',
                            '{request.POST.get("nome_maquina").upper()}',
                            '{request.POST.get("id_teamviewer")}',
                            '{request.POST.get("senha_teamviewer")}',
                            '{request.POST.get("id_anydesk")}',
                            '{request.POST.get("senha_anydesk")}',
                            '{request.POST.get("id_rustdesk")}',
                            '{request.POST.get("senha_rustdesk")}',
                            '{request.POST.get("id_mstc")}',
                            '{request.POST.get("senha_mstc")}',
                            '{request.POST.get("observacao")}',
                            {seq_acesso})
                    """)
        
        print(request.POST.get("observacao"))
        connection.commit()

        return redirect('/index/?status=1')
    else:
        return redirect('/index/?status=5')
    


#-------------------------------Atualizar acesso-----------------------------------
def update(request,seq_acesso):
    cursor = connection.cursor()
    
    cursor.execute(f"""
    update acessos set
                empresa = '{request.POST.get("info_nome_empresa").upper()}',
                nome_maquina = '{request.POST.get("info_nome_maquina").upper()}',
                team_viewer = '{request.POST.get("info_id_teamviewer")}',
                senha_team_viewer = '{request.POST.get("info_senha_teamviewer")}',
                anydesk = '{request.POST.get("info_id_anydesk")}',
                senha_anydesk = '{request.POST.get("info_senha_anydesk")}',
                rustdesk = '{request.POST.get("info_id_rustdesk")}',
                senha_rustdesk = '{request.POST.get("info_senha_rustdesk")}',
                mstc = '{request.POST.get("info_id_mstc")}', 
                senha_mstc = '{request.POST.get("info_senha_mstc")}',
                observacao = '{request.POST.get("info_observacao")}'
            where seq_acesso = {seq_acesso}
            """)
    connection.commit()
    return redirect("/index/?status=2")



#---------------------------Acesso automatizado Team Viewer-------------------------------
def acesso_teamviewer(request,seq_acesso):
    cursor = connection.cursor()
    cursor.execute(f"select team_viewer,senha_team_viewer from acessos where seq_acesso = {seq_acesso}")
    dados = cursor.fetchall()
    if dados[0][0]!= '':
        os.chdir("C:\Program Files (x86)\TeamViewer")
        script = f'''TeamViewer.exe -i "{dados[0][0]}" -p {dados[0][1]}'''
        subprocess.Popen(script, stdout=subprocess.PIPE, shell=True)
        
        return redirect('/index/?status=3')
    return redirect('/index/?status=7')
    



#---------------------------Acesso automatizado Anydesk-------------------------------
def acesso_anydesk(request,seq_acesso):
    cursor = connection.cursor()
    cursor.execute(f"select anydesk , senha_anydesk from acessos where seq_acesso = {seq_acesso}")     
    conexao_anydesk = cursor.fetchall()

    if conexao_anydesk[0][0] != '':
        os.chdir("C:\Program Files (x86)\AnyDesk")
        script = f'''AnyDesk.exe --with-password={conexao_anydesk[0][1]} --address {conexao_anydesk[0][0]}'''
        print(script)
        subprocess.Popen(script, stdout=subprocess.PIPE, shell=True)
        return redirect('/index/?status=3')
    return redirect('/index/?status=6')    



# ---------------------------------Deletar Acesso----------------------------------------
def deletar(request,seq_acesso):
     cursor = connection.cursor()
     cursor.execute(f"delete from acessos where seq_acesso = {seq_acesso}")
     connection.commit()

     return redirect("/index/?status=4")



# -----------------------------Configurações de Temas-------------------------------------
def configuracao_imagem(request):
    if request.method == "POST":
        arquivo = request.FILES.get("customFileLang")
        print(arquivo)
        if arquivo:
            caminho = os.path.join(settings.MEDIA_ROOT , "static" , "img" , "background.jpg" )

            with open(caminho, "wb+") as caminho_destinatario:
                for chunk in arquivo.chunks():
                    caminho_destinatario.write(chunk)

        return redirect('/index/')

# -----------------------------Página de Ferramentas-------------------------------------
def ferramentas(request):
    if request.session.get("user"):
        cursor = connection.cursor()

        cursor.execute("select * from tools where status = 'A' order by titulo")

        allTools = cursor.fetchall()

        return render(request , "app/ferramentas.html",{ "ferramentas" : allTools })
    return redirect('/login/?status=4')

# ----------------------------- Cadastrar nova Tool -----------------------------
def cadastroFerramentas(request):
    if request.method == "POST":

        cursor = connection.cursor()

        titleTool = request.POST.get("title-tool" , "")
        bodyTool = request.POST.get("body-tool" , "")

        cursor.execute(f"insert into tools( titulo , body , status ) values($${ titleTool }$$ , $${ bodyTool }$$ , 'A' )")

        connection.commit()
        
        return redirect("/ferramentas/")
    

# ----------------------------- Atualizar Tools -----------------------------
def updateTools( request , id ):

    if request.method == 'POST':
        attTitle = request.POST.get("title-tool-att")
        attBody = request.POST.get("body-tool-att")

        cursor = connection.cursor()
        cursor.execute(f"update tools set titulo = '{ attTitle }' , body= '{ attBody }' where id = { id } ")

        connection.commit()

    return redirect('/ferramentas/')

# ----------------------------- Deletar Tool -----------------------------
def deleteTools( request , id ):
    cursor = connection.cursor()

    cursor.execute(f"update tools set status = 'E' where id = {id}")

    connection.commit()

