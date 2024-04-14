set @varrr=0
set @fileName=file_with_variable.txt

call ../../../../Helper/StopAllBrowsers.bat

REM ViewEvent 
REM call hats_shell robot --report ../../../Results/Reports/Event/ViewEvent.html --log ../../../Results/Logs/Event/ViewEvent.html --reporttitle "Report_ViewEvent_Report" --logtitle "Log_ViewEvent_Log" ../Tests/Event.robot 
REM IF exist %@fileName% (for /f "delims=" %%x in (%@fileName%) do set @varrr=%%x & del %@fileName%)
REM IF %@varrr% EQU 0 (Echo No error found) ELSE (exit /b %@varrr%)

REM CreateEvent 
REM call hats_shell robot --report ../../../Results/Reports/Event/CreateEvent.html --log ../../../Results/Logs/Event/CreateEvent.html --reporttitle "Report_CreateEvent_Report" --logtitle "Log_CreateEvent_Log" ../Tests/CreateEvent.robot 
REM IF exist %@fileName% (for /f "delims=" %%x in (%@fileName%) do set @varrr=%%x & del %@fileName%)
REM IF %@varrr% EQU 0 (Echo No error found) ELSE (exit /b %@varrr%)

REM CancelEvent 
REM call hats_shell robot --report ../../../Results/Reports/Event/CancelEvent.html --log ../../../Results/Logs/Event/CancelEvent.html --reporttitle "Report_CancelEvent_Report" --logtitle "Log_CancelEvent_Log" ../Tests/CancelEvent.robot 
REM IF exist %@fileName% (for /f "delims=" %%x in (%@fileName%) do set @varrr=%%x & del %@fileName%)
REM IF %@varrr% EQU 0 (Echo No error found) ELSE (exit /b %@varrr%)

REM EditEvent 
call hats_shell robot --report ../../../Results/Reports/Event/EditEvent.html --log ../../../Results/Logs/Event/EditEvent.html --reporttitle "Report_EditEvent_Report" --logtitle "Log_EditEvent_Log" ../Tests/EditEvent.robot 
IF exist %@fileName% (for /f "delims=" %%x in (%@fileName%) do set @varrr=%%x & del %@fileName%)
IF %@varrr% EQU 0 (Echo No error found) ELSE (exit /b %@varrr%)
