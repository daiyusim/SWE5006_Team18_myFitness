@echo off

for /f "tokens=1 delims=" %%# in ('qprocess.exe^|find /i /c /n "MicrosoftEdg"') do (
    set count=%%#
)

taskkill /F /IM MicrosoftEdge.exe /T

echo Number of Microsoft Edge processes removed: %count%

for /f "tokens=1 delims=" %%# in ('qprocess.exe^|find /i /c /n "firefox"') do (
    set foxcount=%%#
)

taskkill /IM firefox.exe /F

echo Number of Firefox processes removed: %foxcount%

for /f "tokens=1 delims=" %%# in ('qprocess.exe^|find /i /c /n "iexplore"') do (
    set iecount=%%#
)

taskkill /IM iexplore.exe /F

echo Number of Internet Explorer processes removed: %iecount%



