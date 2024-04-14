set @varrr=0
set @fileName=file_with_variable.txt

call ../../../../Helper/StopAllBrowsers.bat

REM ViewAttendanceModule
REM call hats_shell robot --report ../../../Results/Reports/Attendance/ViewAttendance.html --log ../../../Results/Logs/Attendance/ViewAttendance.html --reporttitle "Report_ViewAttendance_Report" --logtitle "Log_ViewAttendance_Log" ../Tests/ViewAttendance.robot 
REM IF exist %@fileName% (for /f "delims=" %%x in (%@fileName%) do set @varrr=%%x & del %@fileName%)
REM IF %@varrr% EQU 0 (Echo No error found) ELSE (exit /b %@varrr%)

REM ViewAttendanceAsParticipant
REM call hats_shell robot --report ../../../Results/Reports/Attendance/ViewAttendanceAsParticipant.html --log ../../../Results/Logs/Attendance/ViewAttendanceAsParticipant.html --reporttitle "Report_ViewAttendanceAsParticipant" --logtitle "Log_ViewAttendanceAsParticipant" ../Tests/ViewAttendanceAsParticipant.robot 
REM IF exist %@fileName% (for /f "delims=" %%x in (%@fileName%) do set @varrr=%%x & del %@fileName%)
REM IF %@varrr% EQU 0 (Echo No error found) ELSE (exit /b %@varrr%)


REM SaveAttendanceAsOrganizer
call hats_shell robot --report ../../../Results/Reports/Attendance/SaveAttendanceAsOrganizer.html --log ../../../Results/Logs/Attendance/SaveAttendanceAsOrganizer.html --reporttitle "Report_SaveAttendanceAsOrganizer" --logtitle "Log_SaveAttendanceAsOrganizer" ../Tests/SaveAttendanceAsOrganizer.robot 
IF exist %@fileName% (for /f "delims=" %%x in (%@fileName%) do set @varrr=%%x & del %@fileName%)
IF %@varrr% EQU 0 (Echo No error found) ELSE (exit /b %@varrr%)