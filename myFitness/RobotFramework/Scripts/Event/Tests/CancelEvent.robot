*** Settings ***

Documentation       A test suite to Cancel Event based on parameters provided.
Resource            ../../../Helper/seleniumLibrary.robot 
Resource	        ../../../Helper/common.robot
Resource	        ../CancelEvent_Common.robot

*** Test Cases ***

| As a Participant, I want to Cancel Event
| | :FOR												 | ${BROWSER}                       | IN                                            | @{BROWSERLIST}
| | | Given Host Is Opened and User Logins				 | ${BROWSER}                       | ${HOST}                        
| | | And Accesses Event via Navmenu
| | | And Participant cancels event						 | ${BROWSER}			
| | | And Exit MyFitness
