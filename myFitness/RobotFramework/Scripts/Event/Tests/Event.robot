*** Settings ***

Documentation       A test suite to User based on parameters provided.
Resource            ../../../Helper/seleniumLibrary.robot 
Resource	        ../../../Helper/common.robot
Resource	        ../Event_Common.robot

*** Test Cases ***

| As a User, I want to view event 
| | :FOR												 | ${BROWSER}                       | IN                                            | @{BROWSERLIST}
| | | Given Host Is Opened								 | ${BROWSER}                       | ${HOST}                        
| | | And Accesses Event via Navmenu
| | | And Exit MyFitness
