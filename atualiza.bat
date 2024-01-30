@echo off

if exist "C:\EkoOS Acessos" (
    cd c:\EkoOS Acessos
    git init
	git remote add origin https://github.com/LeuMendonca/EkoOS-Acessos.git
	git pull https://github.com/LeuMendonca/EkoOS-Acessos.git
) else (
    mkdir "c:\EkoOS Acessos"
	git init
	git remote add origin https://github.com/LeuMendonca/EkoOS-Acessos.git
	git pull https://github.com/LeuMendonca/EkoOS-Acessos.git
)
pause
exit;
