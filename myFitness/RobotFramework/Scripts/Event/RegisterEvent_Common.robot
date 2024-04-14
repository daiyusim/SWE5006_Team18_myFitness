
*** Settings ***
Documentation						Common file for variables and keywords for Register Event
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

${registerMenuBtnFirst}                         xpath=//*[@id="content-container"]/div/div[3]/div[2]/div/div[1]/div[2]/button
${registerMenuBtnSecond}                        xpath=//*[@id="content-container"]/div/div[3]/div[5]/div/div[1]/div[2]/button

${registerBtnFirst}                             xpath=//*[@id="event-menu-661aa3a3366d4a15082bad19"]/div[3]/ul/li
${registerBtnSecond}                            xpath=//*[@id="event-menu-661b723b83719ce86e211937"]/div[3]/ul/li

${registerBtn}                                  xpath=/html/body/div[8]/div[3]/form/div/button[2]
                                                      
######################################################################################
# Input Ids
######################################################################################
${termCheckboxFirst}                           xpath=/html/body/div[8]/div[3]/form/fieldset/div/label[1]/span/input
${termCheckboxSecond}                          xpath=/html/body/div[8]/div[3]/form/fieldset/div/label[2]/span/input
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


Participant register for event
	[Arguments]									${BROWSER}		
    Run Keyword If								'${BROWSER}' == 'firefox'				Click			${registerMenuBtnFirst}					
	Run Keyword If								'${BROWSER}' == 'chrome'				Click			${registerMenuBtnSecond}
    Run Keyword If								'${BROWSER}' == 'firefox'				Click			${registerBtnFirst}					
	Run Keyword If								'${BROWSER}' == 'chrome'				Click			${registerBtnSecond}
    click               ${termCheckboxFirst}
    click               ${termCheckboxSecond}
    click               ${registerBtn}
    Sleep               ${LONGSLEEP}
    
