from django.shortcuts import render,redirect
from django.core.paginator import Paginator
from django.db import connection
from django.conf import settings
import os
import subprocess
# Create your views here.

def index(request):

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
        
        paginacao = Paginator(acessos,8)
        numero_paginas = request.GET.get("page")
        page_obj = paginacao.get_page(numero_paginas)
        
        
        return render(request,'app/index.html',{'status':status , 'acessos': page_obj })

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
        connection.commit()

        return redirect('/index/?status=1')
    else:
        return redirect('/index/?status=5')
    
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

def acesso_teamviewer(request,seq_acesso):
        cursor = connection.cursor()
        cursor.execute(f"select team_viewer,senha_team_viewer from acessos where seq_acesso = {seq_acesso}")
        dados = cursor.fetchall()
        
        os.chdir("C:\Program Files (x86)\TeamViewer")
        comando = f'''TeamViewer.exe -i "{dados[0][0]}" -p {dados[0][1]}'''
        subprocess.Popen(comando, stdout=subprocess.PIPE, shell=True)
        
        print(f"Conectando ID {dados[0]}")
        return redirect('/index/?status=3')

def deletar(request,seq_acesso):
     cursor = connection.cursor()
     cursor.execute(f"delete from acessos where seq_acesso = {seq_acesso}")
     connection.commit()

     return redirect("/index/?status=4")


def configuracao_imagem(request):
    if request.method == "POST":
        print("passou aqui")
        arquivo = request.FILES.get("customFileLang")
        print(arquivo.name)

        caminho = os.path.join(settings.MEDIA_ROOT , "static" , "img" , "background.jpg" )

        with open(caminho, "wb+") as caminho_destinatario:
            for chunk in arquivo.chunks():
                 caminho_destinatario.write(chunk)

    return redirect('/index/')