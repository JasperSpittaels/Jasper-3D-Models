@echo off
git add .
git commit -m "Deploy Jasper 3D Models"
git branch -M main
git push -u origin main --force
pause