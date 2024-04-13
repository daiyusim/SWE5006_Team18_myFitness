*** Settings ***

Documentation       A test suite to Workout based on parameters provided.
Resource            ../../../Helper/seleniumLibrary.robot 
Resource	        ../../../Helper/common.robot
Resource	        ../Workout_Common.robot

*** Test Cases ***

| As a User, I want to view Workout Dashboard
| | :FOR												 | ${BROWSER}                       | IN                                            | @{BROWSERLIST}
| | | Given Host Is Opened and User Logins				 | ${BROWSER}                       | ${HOST}                        
| | | And Accesses Workout via Navmenu	
| | | And User view Workout Dashboard					
| | | And Exit MyFitness	
