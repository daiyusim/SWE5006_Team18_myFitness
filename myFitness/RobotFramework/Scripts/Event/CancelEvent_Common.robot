
*** Settings ***
Documentation						Common file for variables and keywords for Cancel Event
Resource							../../../Helper/common.robot
*** Variables ***

######################################################################################
# System Variables
######################################################################################
${TIMEOUT}				2 seconds
${LONGSLEEP}			5 seconds
######################################################################################
# Common URLs
######################################################################################

# Button Ids
######################################################################################
${eventMenuIcon}								link=Events

${cancelMenuBtnFirst}                           xpath=//*[@id="content-container"]/div/div[3]/div[2]/div/div[1]/div[2]/button
${cancelMenuBtnSecond}                          xpath=//*[@id="content-container"]/div/div[3]/div[5]/div/div[1]/div[2]/button

${cancelBtnFirst}                               xpath=//*[@id="event-menu-661aa3a3366d4a15082bad19"]/div[3]/ul/li
${cancelBtnSecond}                              xpath=//*[@id="event-menu-661b723b83719ce86e211937"]/div[3]/ul/li

${verifyCancelBtn}                              xpath=/html/body/div[8]/div[3]/div/button[2]
                                                      
######################################################################################
# Input Ids
######################################################################################

######################################################################################
# Text Id Values
######################################################################################

######################################################################################
# Classes Reference
######################################################################################

######################################################################################
# Comparison Strings
######################################################################################

######################################################################################
# Sample Values
######################################################################################

######################################################################################
# Sample Lists
######################################################################################

*** Keywords ***

######################################################################################
# Workout Functionality
######################################################################################

Accesses Event via Navmenu
    [Arguments]
    click               ${eventMenuIcon}


Participant cancels event
	[Arguments]									${BROWSER}		
    Run Keyword If								'${BROWSER}' == 'firefox'				Click			${cancelMenuBtnFirst}					
	Run Keyword If								'${BROWSER}' == 'chrome'				Click			${cancelMenuBtnSecond}							
	Run Keyword If						        '${BROWSER}' == 'firefox'				Click			${cancelBtnFirst}					
	Run Keyword If								'${BROWSER}' == 'chrome'				Click			${cancelBtnSecond}							
    click               ${verifyCancelBtn}  
    Sleep               ${LONGSLEEP}
    
