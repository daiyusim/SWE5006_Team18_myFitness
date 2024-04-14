*** Settings ***

Documentation       A test suite to Edit Event based on parameters provided.
Resource            ../../../Helper/seleniumLibrary.robot 
Resource	        ../../../Helper/common.robot
Resource	        ../EditEvent_Common.robot

*** Test Cases ***

| As a Organiser, I want to Edit Event
| | :FOR												 | ${BROWSER}                       | IN                                            | @{BROWSERLIST}
| | | Given Host Is Opened and User Logins				 | ${BROWSER}                       | ${HOST}                        
| | | And Accesses Event via Navmenu
| | | And Organiser edits event
| | | And Exit MyFitness
