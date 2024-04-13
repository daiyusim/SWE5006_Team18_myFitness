
*** Settings ***
Documentation						Common file for variables and keywords for Profile
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
${profileMenuIcon}								xpath=//*[@id="main-container"]/div/div/div[1]/header/header/div/div/div[4]/a
${setUpProfileBtn}                              xpath=//*[@id="content-container"]/div/div/div[3]/div/div/div/div/div/div/button

${addBtn}                                       xpath=/html/body/div[3]/form/div/div[2]/div/button[2]
######################################################################################
# Input Ids
######################################################################################
${genderRB}                                     xpath=/html/body/div[3]/form/div/div[1]/div[2]/div/div[1]/fieldset/div/div/div[2]/span/input
${interestDD}                                   xpath=//*[@id="interests"]
${height}                                       xpath=//*[@id="height"]
${weight}                                       xpath=//*[@id="weight"]
${goals}                                        xpath=//*[@id="goals"]
######################################################################################
# Text Id Values
######################################################################################
${workoutInterest}                              xpath=//*[@id=":r5:"]/li[1]
${fitnessInterest}                              xpath=//*[@id=":r5:"]/li[2]
${removeBackground}                             xpath=//div[@id='menu-interests']/div
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
# Profile Functionality
######################################################################################

Accesses Profile via Navmenu
    [Arguments]
    click               ${profileMenuIcon}


User create profile
    [Arguments]
    click               ${setUpProfileBtn}
    click               ${genderRB}
    click               ${interestDD}
    click               ${workoutInterest}
    click               ${fitnessInterest}
    click               ${removeBackground}
    Sleep               ${LONGSLEEP}
    click               ${height}
    type                ${height}                               171
    click               ${weight}        
    type                ${weight}                               50
    click               ${goals}    
    type                ${goals}                                 keep fit
    click               ${addBtn}
    Sleep               ${LONGSLEEP}
    
