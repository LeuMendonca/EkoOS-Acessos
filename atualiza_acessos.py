import os

os.chdir("c:\ekoos_teste")

if '.git' not in os.listdir():
    os.system("git init")
    os.system("git remote add origin https://github.com/LeuMendonca/EkoOS-Acessos.git")

os.system("git pull https://github.com/LeuMendonca/EkoOS-Acessos.git")
