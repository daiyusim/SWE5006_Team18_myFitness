*** Settings ***

Documentation       A test suite to Register Event based on parameters provided.
Resource            ../../../Helper/seleniumLibrary.robot 
Resource	        ../../../Helper/common.robot
Resource	        ../RegisterEvent_Common.robot

*** Test Cases ***

| As a Participant, I want to Register for Event
| | :FOR												 | ${BROWSER}                       | IN                                            | @{BROWSERLIST}
| | | Given Host Is Opened and User Logins				 | ${BROWSER}                       | ${HOST}                        
| | | And Accesses Event via Navmenu
| | | And Participant register for event				 | ${BROWSER}			
| | | And Exit MyFitness
