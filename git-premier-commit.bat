@echo off
setlocal
rem ============================================================
rem  compagnon : premier commit et publication
rem  Double-cliquer ce fichier, il est a la racine du depot.
rem
rem  Il s'arrete AVANT le push et te demande une touche.
rem  Le push publie sur https://github.com/webdigit/compagnon.git
rem  avec TES identifiants git. Ferme la fenetre pour annuler.
rem ============================================================

cd /d "%~dp0"
echo Depot local : %CD%
echo.

where git >nul 2>nul
if errorlevel 1 echo ERREUR : git introuvable dans le PATH & pause & exit /b 2

if exist ".git" (
  echo Depot git deja initialise, on continue.
) else (
  echo === git init ===
  git init
  git branch -M main
)
echo.

echo === Ce qui va etre versionne ===
git add .
git status --short
echo.

echo === Commit ===
git commit -m "compagnon 0.1.0 : la doctrine avant l'outil"
echo [exit=%errorlevel%]
echo.

echo === Remote ===
git remote get-url origin >nul 2>nul
if errorlevel 1 (
  git remote add origin https://github.com/webdigit/compagnon.git
  echo remote origin ajoute.
) else (
  echo remote origin deja present :
  git remote get-url origin
)
echo.

echo ============================================================
echo  ETAPE SUIVANTE : PUSH. Cela PUBLIE le contenu sur GitHub.
echo  Appuie sur une touche pour pousser, ou ferme la fenetre
echo  pour t'arreter ici (le commit local est deja fait).
echo ============================================================
pause
echo.

echo === Push ===
git push -u origin main
echo [exit=%errorlevel%]
echo.

echo === Etat final ===
git log --oneline -3
git status --short --branch
echo.
pause
