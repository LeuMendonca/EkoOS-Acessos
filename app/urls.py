from django.urls import path
from .views import index,cadastro,update,deletar,acesso_teamviewer,acesso_anydesk,configuracao_imagem,ferramentas,cadastroFerramentas , deleteTools , cadastroUsuario ,login,sair , updateTools

urlpatterns = [
    path('index/',index,name="index"),
    path('cadastrar/',cadastro,name="cadastro"),
    path('update/<int:seq_acesso>',update,name="update"),
    path('delete/<int:seq_acesso>',deletar,name="deletar"),
    path('configuracao/',configuracao_imagem , name="configuracao"),
    path('acessar_teamviewer/<int:seq_acesso>',acesso_teamviewer,name='acesso_teamviewer'),
    path('acessar_anydesk/<int:seq_acesso>' , acesso_anydesk , name='acesso_anydesk'),

    path('ferramentas/', ferramentas , name="ferramentas"),
    path('cadastrar-tools/', cadastroFerramentas , name="cadastrar_tools"),
    path('delete_tools/<int:id>' , deleteTools , name= 'delete_tools'),
    path('atualizar-tools/<int:id>' , updateTools , name= 'atualizar_tools'),


    path('login/' , login , name="login"),
    path('cadastro-usuarios/' , cadastroUsuario , name="cadastro_usuario"),
    path('logoff/' , sair , name="logoff")
]