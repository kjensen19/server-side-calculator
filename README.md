#Server Side Calculator
A basic calculator designed to collect inputs on the client side, send them to the server where the calculations are done and the results are sent back and rendered to the DOM.
Can conduct basic math as well as follow basic calculator logic. Potential issues were addressed throughout development:
***Logic was added to handle multiple operator presses in a manner consistent with what most users would desire (the last operator pressed is the active one).
***A check was added to handle attempting to enter multiple decimal points in one string of numbers. Initially considered disabling the button, but settled on checking the string before adding one.
***If the user presses an operator after the answer is displayed that value is taken as the first part of the next equation, otherwise if a number is pressed the value is changed to that number.
***The post function checks to ensure there are two value strings before sending to the server and generates an error message if the criteria are not met.
***The data is passed to the server where the strings are converted to numbers and the correct operator is applied through an if/else.  The resulting data is added to the historical data object and sent back to the client.
***The client then displays the data on the DOM
***Historical equations are clickable and when clicked set the screen (and current string value) to the equation answer.
***The C clears current inputs and AC clears all data both current and historical on the server (via a delete request)

Duration: 4 days

<!-- Link to heroku here -->
<!-- Screenshot here -->



Installation:
1. Fork and clone repository
2. Open project folder in VSCODE
3. run npm install in the terminal to install dependency modules
4. Start server from folder with node server/server.js
5. A message should indicate that the server is listening on port 5000
6. Navigate to localhost:5000 in the browser
7. Begin calculations

Usage:
1. Enter calculations by clicking calculator buttons
2. As numbers are clicked they are added to a string (which is displayed on the screen)
3. When an operator (+-/*) is pressed the operator is stored and a second string is created for the second half of the equation.
4. Multiple operators may be selected and only the last will be used in the equation

Built with:
HTML/CSS/JS/JQ
Node.JS
Express

Thanks to the L'engle cohort for a host of ideas, design inspiration and general support throughout development.

If you have suggestions or issues please email me at kjensen19@gmail.com
