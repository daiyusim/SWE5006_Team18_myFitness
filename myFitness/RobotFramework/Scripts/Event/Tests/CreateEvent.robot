*** Settings ***

Documentation       A test suite to Create Event based on parameters provided.
Resource            ../../../Helper/seleniumLibrary.robot 
Resource	        ../../../Helper/common.robot
Resource	        ../CreateEvent_Common.robot

*** Test Cases ***

| As a Organiser, I want to create Event
| | :FOR												 | ${BROWSER}                       | IN                                            | @{BROWSERLIST}
| | | Given Host Is Opened and User Logins				 | ${BROWSER}                       | ${HOST}                        
| | | And Accesses Event via Navmenu
| | | And Organiser creates a event
| | | And Exit MyFitness
