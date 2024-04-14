
*** Settings ***
Documentation						Common file for variables and keywords for Edit Event
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

${editMenuIcon}                                 xpath=/html/body/div[1]/div[2]/div/div/div[2]/div/div/div[3]/div[3]/div/div[1]/div[2]/button

${editBtn}                                      xpath=/html/body/div[5]/div[3]/ul/li

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
# Event Functionality
######################################################################################

Accesses Event via Navmenu
    [Arguments]
    click               ${eventMenuIcon}


Organiser edits event
    [Arguments]
    click               ${editMenuIcon}
    click               ${editBtn}
    click               ${capacity}                         
    type                ${capacity}                         50
    click               ${description}                      
    type                ${description}                      for beginners and novice only
    click               ${saveBtn}
    Sleep               ${LONGSLEEP}
    
