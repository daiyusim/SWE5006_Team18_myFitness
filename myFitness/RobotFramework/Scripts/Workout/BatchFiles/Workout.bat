set @varrr=0
set @fileName=file_with_variable.txt

call ../../../../Helper/StopAllBrowsers.bat

REM View Workout
call hats_shell robot --report ../../../Results/Reports/Workout/ViewWorkout.html --log ../../../Results/Logs/Workout/ViewWorkout.html --reporttitle "Report_ViewWorkout_Report" --logtitle "Log_ViewWorkout_Log" ../Tests/Workout.robot 
IF exist %@fileName% (for /f "delims=" %%x in (%@fileName%) do set @varrr=%%x & del %@fileName%)
IF %@varrr% EQU 0 (Echo No error found) ELSE (exit /b %@varrr%)
