*** Settings ***

Documentation       A test suite to view individual attendance as participant based on parameters provided.
Resource            ../../../Helper/seleniumLibrary.robot 
Resource	        ../../../Helper/common.robot
Resource	        ../ViewAttendanceAsParticipant_Common.robot

*** Test Cases ***

| As a Participant, I want to view individual attendance as participant
| | :FOR												 | ${BROWSER}                       | IN                                            | @{BROWSERLIST}
| | | Given Host Is Opened and User Logins				 | ${BROWSER}                       | ${HOST}                        
| | | And Accesses Attendance via Navmenu
| | | And View Attendance as Participant
| | | And Exit MyFitness
