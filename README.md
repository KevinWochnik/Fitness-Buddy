# Fitness buddy
Simple app that helps you stay fit, created with pure css and js.
## Table of contents
* [Introduction](#introduction)
* [Technologies](#technologies)
* [Launch](#launch)
* [Content](#content)
* [Examples of use](#examples_of_use)
* [Project status](#project_status)
* [Inspiration](#inspiration)

## Introduction
The main goal of my first project was to sum up some of the technologies I`ve learned during frontend courses, including css, pure js or git. The whole process of writing html, styling it with css and then programming it in object oriented javascript took me about 16 hours of work. Also I tried to make it clear of errors by typing a lot of random values in all inputs, just to make sure everything works. My main goal was to learn how to create an app from scratch just by myself.

## Technologies
* HTML5
* CSS 3
* JavaSctipt ES6
* GIT

## Launch
* Preview of the app available on https://kevinwochnik.github.io/Fitness-Buddy/. (Best on Chrome)
* For launching it on your own computer, just use git clone. No additional files needed.
* After cloning please change the path of the css file in index.html to a relative path, because i had to change it in order to make it work on GitHubPages.

## Content
Fitness buddy app contains 3 folders, app folder which contains all javascript classes used in the app, style folder containing style.css and src folder with index.html and run.js, to run the app. The javascript code was written based on OOP using 4 different classes, in which every one of them describes the work of a section in the whole app.

### Class Buddy_Output
* Contains inputs from all other classes.
* Creates instances of all other classes in its constructor.
* Gathers all crucial html elements, and enters the paths into other classes.
* Handles the functions of changing the page's colors and updating the app's texts.
* Sets the event listeners on buttons in some sections.
* Renders initial text in the output section and refreshes it after every change in every input.

### Class CaloriesCalculator
* Checks the values of inputs in the section - calorieCalculator.
* Calculates different values (macros), and passes them to the render function.
* Renders the right values into the app display and clears all inputs after calculating is done.
* Passes the information of calculated values to the Buddy_Output class.

### Class List
* Checks the values of inputs in the section - foodList.
* Contains a ToDoList like tool, to collect the input values and display them on the list.
* Provides a remove button on every item on the list.
* Renders the right values into the app display and clears all inputs after adding an item to the list.
* Passes the information of calculated values to the Buddy_Output class.

## Class WaterCalculator
* Checks the values of inputs in the section - water.
* Renders an initial text in the water section.
* Handles the feedback info in the section after collecting data from the input.
* Passes the information of collected values to the Buddy_Output class.

## Examples of use
This app can be used to:
* calculate your daily demand of calories,
* calculate how many calories you have already eaten,
* check how much water should you drink during the day,
* after passing all data to the app, checking how much more calories should you eat to stay in shape, and how much water should you dring not to get dehydrated.


## Project status
The status of the project is finnished, but I highly appreciate any code rewiew on this app, or any feedback from the usage of my project. In the future, I will probably rewrite it in React using CreateReactApp and rewrite styles using sass and tailwind. The next project will contain media querrys to get access to mobile devices.

## Inspiration
The knowledge of how to do such apps was obtained through courses from the best frontend mentor i know [Samuraj Programowania](https://websamuraj.pl/), and of course partly by uncle google :)
