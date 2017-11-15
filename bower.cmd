IF EXIST "%DEPLOYMENT_TARGET%\bower.json" (
call .\node_modules\.bin\bower install
IF !ERRORLEVEL! NEQ 0 goto error
)
