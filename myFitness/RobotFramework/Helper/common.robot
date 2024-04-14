
*** Settings ***
Documentation			Common Helper File
Library					String
Library					DateTime
Library					OperatingSystem
Library					Process
Library					Collections

######################################################################################

*** Variables ***

######################################################################################
# System Variables   
######################################################################################
${chrome}				chrome
${fox}					firefox

	
@{BROWSERLIST} =       ${chrome}   ${fox}  

${HOST}					https://localhost:44482/

${TIMEOUT}				2 seconds
${LONGSLEEP}			5 seconds
${PAUSE}				10 seconds
${LONGPAUSE}			15 seconds

######################################################################################
# Key Variables
######################################################################################

${attendanceMenuIcon}							link=Attendance
${profileMenuIcon}								link=Profile
${workoutMenuIcon}								link=Workouts

${email}										id=email
${password}										id=password
${loginBtn}										xpath=//*[@id="main-container"]/div/div/div/div/form/div/div[3]/button


*** Keywords ***
######################################################################################
# Access Methods
######################################################################################
Open MyFitness		
	[Arguments]									${BROWSER}					${ENV}
    Open Browser								${ENV}						${BROWSER}
	Check Browser
    Maximize Browser Window
	Set Selenium Speed							0.1 seconds
	Set Selenium Timeout						15 seconds
	Check Browser

Exit MyFitness
	Go Page Top
	Sleep										${LONGSLEEP}
    Close Browser

Login as User 
	[Arguments]									${BROWSER}					
	click										${email}
	Run Keyword If								'${BROWSER}' == 'firefox'				Type			${email}					lpz@test.com
	Run Keyword If								'${BROWSER}' == 'chrome'				Type			${email}					lpz@test.com			
	click										${password}	
	Run Keyword If								'${BROWSER}' == 'firefox'				Type			${password}					Password123!
	Run Keyword If								'${BROWSER}' == 'chrome'				Type			${password}					Password123!
	click										${loginBtn}
	Sleep										${LONGPAUSE}

Host Is Opened and User Logins
	[Arguments]									${BROWSER}					${HOST}							
	Open MyFitness  							${BROWSER}					${HOST}
	Check Browser
	Check Browser	
	Login as User								${BROWSER}
	Sleep										${LONGPAUSE}

######################################################################################
# Teardown
######################################################################################
Check Test Results
	[Arguments]		
	Run Keyword If Test Failed					Set Result to File			1
	Run Keyword If Test Failed					Fatal Error

Set Result to File
	[Arguments]									${res}
	Create File									${EXECDIR}/${ResultFile}	${res}

######################################################################################
# Browser Methods
######################################################################################
Check Browser
	Wait For Condition		return document.readyState=="complete"

Move to Element
	[Arguments]				${ELEMENT}
	Execute Javascript		$(window).scrollTop($('#${ELEMENT}').offset().top - 150)

Move to ElementV2
	[Arguments]				${ELEMENT}			${offset}
	Execute Javascript		$(window).scrollTop($('#${ELEMENT}').offset().top - ${offset})

Move to Position
	[Arguments]				${ptn}
	Execute Javascript		$(window).scrollTop(${ptn} - 150)

Move to Element of Class
	[Arguments]				${targetClass}			${ind}
	Execute Javascript		$(window).scrollTop($('.${targetClass}').eq(${ind}).offset().top - 150)

Click Element of Class
	[Arguments]				${targetClass}			${ind}
	Execute Javascript		$('.${targetClass}').eq(${ind}).trigger('click')

Go Page Top
	Execute Javascript		window.scrollTo(0, 0);

Go Page Bottom
	Execute Javascript		window.scrollTo(0, $(document).height());

