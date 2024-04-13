set @varrr=0
set @fileName=file_with_variable.txt

call ../../../../Helper/StopAllBrowsers.bat

REM Create Profile
call hats_shell robot --report ../../../Results/Reports/Profile/CreateProfile.html --log ../../../Results/Logs/Profile/CreateProfile.html --reporttitle "Report_CreateProfile_Report" --logtitle "Log_CreateProfile_Log" ../Tests/Profile.robot 
IF exist %@fileName% (for /f "delims=" %%x in (%@fileName%) do set @varrr=%%x & del %@fileName%)
IF %@varrr% EQU 0 (Echo No error found) ELSE (exit /b %@varrr%)
