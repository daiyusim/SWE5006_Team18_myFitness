
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
${attendanceMenuIcon}								link=Attendance
${submitBtn}                        xpath=//button[@type='submit']
######################################################################################
# Input Ids
######################################################################################

######################################################################################
# Text Id Values
######################################################################################
######################################################################################
# Classes Reference
######################################################################################
${sampleAttendance}                        xpath=//*[@id="content-container"]/div/div/div[2]/div/div[2]/div/table/tbody/tr/td/div/div/div/table/tbody/tr[4]/td[5]/div/div[2]/div[1]
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

Accesses Attendance via Navmenu
    [Arguments]
    click               ${attendanceMenuIcon}

    
Save Attendance as Organizer
    [Arguments]
    Sleep               ${LONGSLEEP}
    Sleep               ${LONGSLEEP}
    click               ${sampleAttendance} 
    Sleep               ${LONGSLEEP}
    click               xpath=//input[@type='checkbox']
    Sleep               ${LONGSLEEP}
    click               xpath=//tr[2]/td[2]/label/span/input
    Sleep               ${LONGSLEEP}
    click               ${submitBtn}