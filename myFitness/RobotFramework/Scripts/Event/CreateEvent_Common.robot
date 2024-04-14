
*** Settings ***
Documentation						Common file for variables and keywords for Create Event
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

${addEventBtn}                                  xpath=//*[@id="content-container"]/div/div[1]/button

${saveBtn}                                      xpath=//*[@id="content-container"]/div/form/div/div[10]/button[2]
######################################################################################
# Input Ids
######################################################################################
${title}                                        xpath=//*[@id=":r4:"]
${category}                                     xpath=//*[@id="mui-component-select-category"]
${startDate}                                    xpath=//*[@id=":r6:"]
${endDate}                                      id=:r7:
${capacity}                                     id=:r8:
${registrationClosingDate}                      id=:r9:
${venueAddress}                                 id=address-autocomplete
${description}                                  id=:rc:
######################################################################################
# Text Id Values
######################################################################################
${workoutCategory}                              xpath=//*[@id=":r5:"]/li[1]
${venue}                                        id=address-autocomplete-option-0
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


Organiser creates a event
    [Arguments]
    click               ${addEventBtn}
    click               ${title}
    type                ${title}                            workout for beginners
    click               ${category}
    click               ${workoutCategory}
    click               ${startDate}
    type                ${startDate}                        2024-04-25T14:35
    click               ${endDate}                          
    type                ${endDate}                          2024-04-30T13:36
    click               ${capacity}                         
    type                ${capacity}                         20
    click               ${registrationClosingDate}          
    type                ${registrationClosingDate}          2024-04-28T13:36
    click               ${venueAddress}
    type                ${venueAddress}                     3 STADIUM DRIVE SPORT SINGAPORE (SPORTSG) SINGAPORE 397630
    click               ${description}                      
    type                ${description}                      for beginners only
    click               ${saveBtn}
    Sleep               ${LONGSLEEP}
    
