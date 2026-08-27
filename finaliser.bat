@echo off
setlocal
rem ============================================================
rem  Deux finitions demandees par JC le 27/08/2026 :
rem   1. supprimer les quatre fichiers jetables de Projects\Vincent
rem   2. init + commit + push du depot compagnon
rem
rem  Sans pause intermediaire : ce script est lance a distance et
rem  personne ne peut appuyer sur une touche en cours de route.
rem  GIT_TERMINAL_PROMPT=0 : si git manque d'identifiants, il
rem  echoue proprement au lieu de bloquer sur une invite.
rem
rem  Sortie complete dans sortie-finaliser.txt
rem ============================================================

set "COMPAGNON=%~dp0"
set "VINCENT=%~dp0..\Vincent"
set "LOG=%~dp0sortie-finaliser.txt"
set GIT_TERMINAL_PROMPT=0

call :RUN > "%LOG%" 2>&1
type "%LOG%"
echo.
echo ============================================================
echo Termine. Sortie complete dans compagnon\sortie-finaliser.txt
echo ============================================================
pause
exit /b 0

:RUN
echo ############ 1. MENAGE DANS VINCENT ############
cd /d "%VINCENT%"
echo Dossier : %CD%
echo.
echo -- avant :
dir /b
echo.
for %%F in (retirer-aef.bat deplacer-agent.bat sortie-retrait-aef.txt sortie-deplacer-agent.txt) do (
  if exist "%%F" ( del /F /Q "%%F" & echo    supprime : %%F ) else ( echo    absent   : %%F )
)
echo.
echo -- apres :
dir /b
echo.

echo ############ 2. DEPOT COMPAGNON ############
cd /d "%COMPAGNON%"
echo Dossier : %CD%
echo.
where git >nul 2>nul
if errorlevel 1 ( echo ERREUR : git introuvable dans le PATH & exit /b 2 )

if exist ".git" ( echo Depot deja initialise. ) else ( echo -- git init & git init & git branch -M main )
echo.

echo -- git add
git add .
echo.
echo -- etat
git status --short
echo.

echo -- commit
git commit -m "compagnon 0.2.0 : doctrine, P9 regle provisoire, P10 confiance non etablie"
echo [exit=%errorlevel%]
echo.

echo -- remote
git remote get-url origin >nul 2>nul
if errorlevel 1 ( git remote add origin https://github.com/webdigit/compagnon.git & echo remote ajoute ) else ( git remote get-url origin )
echo.

echo -- push
git push -u origin main
echo [exit=%errorlevel%]
echo.

echo ############ 3. ETAT FINAL ############
git log --oneline -5
echo.
git status --short --branch
echo.
echo -- fichiers versionnes :
git ls-files
exit /b 0
