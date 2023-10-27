@echo off
setlocal
:PROMPT
SET /P AREYOUSURE=You are about to build and deploy. Have you set all IS_DEVELOPMENT variables to false? (Y/[N])? 
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

npm run build-and-move && firebase deploy

:END
endlocal
