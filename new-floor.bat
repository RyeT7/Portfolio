SETLOCAL ENABLEDELAYEDEXPANSION

IF "%1"=="" (
    FOR /F %%I IN ('dir /b /a-d "./src/floor" 2^>nul ^| find /c /v ""') DO (
        set "count=%%I"
    )
    set /a floorName=!count! - 1
) ELSE (
    set "floorName=%1"
)

cp ./src/floor/_TEMPLATE.tsx ./src/floor/%floorName%.tsx

ENDLOCAL