*** Settings ***

Documentation       A test suite to Profile based on parameters provided.
Resource            ../../../Helper/seleniumLibrary.robot 
Resource	        ../../../Helper/common.robot
Resource	        ../Profile_Common.robot

*** Test Cases ***

| As a User, I want to create profile 
| | :FOR												 | ${BROWSER}                       | IN                                            | @{BROWSERLIST}
| | | Given Host Is Opened and User Logins				 | ${BROWSER}                       | ${HOST}                        
| | | And Accesses Profile via Navmenu	
| | | And User create profile							
| | | And Exit MyFitness	
