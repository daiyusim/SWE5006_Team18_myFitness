
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

Accesses Attendance via Navmenu
    [Arguments]
    click               ${attendanceMenuIcon}

    
