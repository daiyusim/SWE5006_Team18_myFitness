*** Settings ***

Documentation       A test suite to View Attendance based on parameters provided.
Resource            ../../../Helper/seleniumLibrary.robot 
Resource	        ../../../Helper/common.robot
Resource	        ../SaveAttendanceAsOrganizer_Common.robot

*** Test Cases ***

| As a Organiser, I want to save attendance as organizer
| | :FOR												 | ${BROWSER}                       | IN                                            | @{BROWSERLIST}
| | | Given Host Is Opened and User Logins				 | ${BROWSER}                       | ${HOST}                        
| | | And Accesses Attendance via Navmenu
| | | And Save Attendance as Organizer
| | | And Exit MyFitness
