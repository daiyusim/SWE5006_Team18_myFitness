set @varrr=0
set @fileName=file_with_variable.txt

call ../../../../Helper/StopAllBrowsers.bat

REM ViewEvent 
call hats_shell robot --report ../../../Results/Reports/Event/ViewEvent.html --log ../../../Results/Logs/Event/ViewEvent.html --reporttitle "Report_ViewEvent_Report" --logtitle "Log_ViewEvent_Log" ../Tests/Event.robot 
IF exist %@fileName% (for /f "delims=" %%x in (%@fileName%) do set @varrr=%%x & del %@fileName%)
IF %@varrr% EQU 0 (Echo No error found) ELSE (exit /b %@varrr%)
