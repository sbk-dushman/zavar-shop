npm run build
cd dist 
pause 
git init
git add -A
 git commit -m 'deploy %date% и %time%'
git push -f https://github.com/sbk-dushman/zavar-demo.git master:gh-pages
pause

