from django.urls import path
from .views import index,cadastro,update,deletar,acesso_teamviewer,configuracao_imagem

urlpatterns = [
    path('index/',index,name="index"),
    path('cadastro/',cadastro,name="cadastro"),
    path('update/<int:seq_acesso>',update,name="update"),
    path('acessar_teamviewer/<int:seq_acesso>',acesso_teamviewer,name='acesso_teamviewer'),
    path('delete/<int:seq_acesso>',deletar,name="deletar"),
    path('configuracao/',configuracao_imagem , name="configuracao")
]