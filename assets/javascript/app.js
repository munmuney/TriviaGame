var count = 0; // keep count what question user is on
var timekeeper; // used to keep track of time
var time = 20; // time limit for each question
var rightPick = 0; // number of answers user picked correctly
var wrongPick = 0; // number of answers user picked incorrectly
var missedPick = 0; // number of answers user didn't pick

//----------Multiple Choice Question Array----------//
var questions = [
	{
		question: "1. What does the acronym IPA stand for on a beer bottle? ", 
		choices: ["India Pale Ale","India Porter Ale","International Pale Ale","Internet Protocol Address"],
		answer: "India Pale Ale", 
		image: "<img src = 'https://c1.staticflickr.com/5/4045/5079016189_f6f70b63e8_b.jpg' alt = 'Beer' />"
	},
	{
		question: "2. The first McDonald's restaurant opened in which U.S. state?", 
		choices: ["New York","Texas","California","Arizona"],
		answer: "California", 
		image: "<img src = 'https://www.mcdonalds.com/content/dam/usa/nutrition/items/evm/h-mcdonalds-Quarter-Pounder-with-Cheese-Extra-Value-Meals.png' alt = 'McD' />"
	},
	{
		question: "3. Roquefort is a French blue cheese made from the milk of what animal? ", 
		choices: ["Cow","Goat","Sheep","Alpaca"],
		answer: "Sheep", 
		image: "<img src = 'http://www.manusmenu.com/wp-content/uploads/2016/02/1-Roquefort-Fig-Spelt-Crostini-10-1-of-1.jpg' alt = 'cheese' />"
	},
	{
		question: "4. What fast food franchise has the most worldwide locations?", 
		choices: ["McDonald","Subway","In-N-Out","Burger King"],
		answer: "Subway", 
		image: "<img src = 'https://img.grouponcdn.com/deal/dz89R99RhGUmpX5enBaM/xa-960x576/v1/c700x420.jpg' alt = 'sandwich' />"
	},
	{
		question: "5. Dijon mustard originated in the city of Dijon, located in what country?", 
		choices: ["United States","France","England","Italy"],
		answer: "France", 
		image: "<img src = 'https://www.webstaurantstore.com/images/products/extra_large/196070/716557.jpg' alt = 'mustard' />"
	},
	{
		question: "6. Pupusas, handmade thick stuffed corn tortillas, are a traditional dish from what country?", 
		choices: ["Mexico","Venezuela","Argentina","El Salvador"],
		answer: "El Salvador", 
		image: "<img src = 'http://cdn.noshon.it/wp-content/uploads/2014-02-14-pupusas-step-14-plated-pupusas-2.jpg' alt = 'pupusas' />"
	},
	{
		question: "7. Samgyeopsal, a dish is wildly popular in Korean barbecues, is made from what cut of meat?", 
		choices: ["Pork Belly","Pork Butt","Pork Shoulder","Pork Snout"],
		answer: "Pork Belly", 
		image: "<img src = 'http://www.bibimbaplondon.com/wp-content/uploads/2015/03/tumblr_lovdrpVGEA1qkshn5.jpg' alt = 'pork' />"
	},
	{
		question: "8. Which item is not cooked in Shabu Shabu? ", 
		choices: ["Beef","Rice","Pumpkin","Cabbage"],
		answer: "Rice", 
		image: "<img src = 'https://gurunavi.com/en/japanfoodie/img/kisoji-2.jpg' alt = 'Hot Pot' />"
	},
	{
		question: "9. Which is the best seat in the sushi restaurant to eat?", 
		choices: ["Counter seat which is closest to the entrance","Middle of the counter","Counter seat which is farthest from the entrance","Table seat"],
		answer: "Counter seat which is closest to the entrance", 
		image: "<img src = 'https://www.theurbanlist.com/content/article/Sashimi.jpg' alt = 'sushi' />"
	},
	{
		question: "10. What popular soda beverage was originally developed as a mixer for whiskey?", 
		choices: ["Coca-Cola","Mountain Dew","7-Up","Root Beer"],
		answer: "Mountain Dew", 
		image: "<img src = 'http://cdn.inquisitr.com/wp-content/uploads/2016/03/6-Reasons-To-Never-Drink-Mountain-Dew-Again-Plus-A-Do-It-Yourself-Energy-Drink-Recipe-900x440.jpg' alt = 'soda' />"
	}


];



//----------Start Game----------//
function start() {				
	ready();
}

function ready() {
	$("#game").html("<h2>Ready...</h2>");
	setTimeout(set,1000);
}

function set() {
	$("#game").html("<h2>Set...</h2>");
	setTimeout(go,1000);
}

function go() {
	$("#game").html("<h2>Go!</h2>"); 		
	setTimeout(nextQuestion,1000);
}

//----------Question Time----------//
function queryTime() {

	//-----adding the question to html-----//
	console.log("Question: " + questions[count].question);
	var query = $("<p>").attr("class","query").text(questions[count].question);
	$("#game").append(query); 

	//-----loops thru choices and displays on html-----//
	for(var i = 0; i < questions[count].choices.length; i++) {
		console.log("Choices: " + questions[count].choices[i]);
		var questionChoices = $("<p>").attr("class","choices").text(questions[count].choices[i]);
	$("#game").append(questionChoices);
	}
}

//----------Timer----------//
function timer() {

	//-----counts down the timer by 1 second-----//
	timekeeper = setInterval(function() {

		//-----check conditions of time-----//
		if (time > 0) {
			time--; // subtracts 1 each time
		}
		else if (time < 1) {
			clearInterval(timekeeper); //stops the setInterval

			//-----Time's Up!-----//
			if (time === 0) {

				//-----changing to Times Up page-----//
				var timesUp = $("<p>").html("Times Up!");
				$("#game").html(timesUp);
				var answer = 	questions[count].answer;
				$("#game").append("<p>The answer was <span class='answer'><b>" + answer + "</b></span></p><p>No picture for you!</p>");
				
				//-----waiting 4 seconds for the next question-----//
				setTimeout(nextQuestion, 4000);
				
				//-----needs to add count++ at the end so it wont affect the jQuery above-----//
				count++;
				missedPick++;
				console.log("User Picked Nothing");
			}
		}

		//-----changes the html Time each second-----//			
		$("#timer").html("<b>" + time + "</b>");
	}, 1000);
}

//----------Correct Choice----------//
function correctAnswer() {

	//-----changing the html to the correct page-----//
	var answer = questions[count].answer;
	var right = $("<p>").html("Nice..RIGHT ANSWER<br>The answer is <b>" + answer + "</b>");
	var pic = $("<p>").attr("class","images").html("Picture time..<br>" + questions[count].image);
	$("#game").html(right);
	$("#game").append(pic);

	//-----waiting 4 seconds for the next question-----//
	setTimeout(nextQuestion, 4000);

	//-----needs to add count++ at the end so it wont affect the jQuery above-----//
	count++;
	rightPick++;
}

//----------Incorrect Choice----------//
function incorrectAnswer() {

	//-----changing the html to the incorrect page-----//
	var answer = questions[count].answer;			
	var wrong = $("<p>").html("Sorry..WRONG ANSWER<br>The answer is <b>" + answer + "</b><br>No pictures for you!!!");
	$("#game").html(wrong);

	//-----waiting 4 seconds for the next question-----//		
	setTimeout(nextQuestion, 4000);
	
	//-----needs to add count++ at the end so it wont affect the jQuery above-----//
	count++;
	wrongPick++;	
}

//----------NEXT QUESTION!----------//
function nextQuestion() {

	//-----checks whether or not to move to the next question-----//
	if (count < questions.length) {
		time = 30;
		var timeDisplay = $("<h3>").html("You have <span id='timer'><b>" + time + "</b></span> seconds left!");
		$("#game").html(timeDisplay);
		queryTime(); // calls the questions
		timer(); //calls the timer
	}
	else {
		resultsTime();
	}
console.log("Question Index# " + count);
console.log("Ans: " + questions[count].answer);
}

//----------Results Time----------//
function resultsTime() {

	//-----changing html to results page-----//
	var result = $("<div>").attr("id","result").html("<p>You got <b>" + rightPick + "</b> answers right.</p>" + "<p>You got <b>" + wrongPick + "</b> answers wrong.</p>" + "<p>You missed <b>" + missedPick + "</b> question(s).</p>");
	$("#game").html(result);

	//-----adding a Restart Button to play again-----//
	$("#game").append("<button id='start'>Restart</button>");
	reset();
	$("#start").click(nextQuestion);
}

//----------I want to reset----------//
function reset() {
	count = 0;
	rightPick = 0;
	wrongPick = 0;
}

//----------Click button to start the game----------//
$("#start").click(start);

//-----------Click button to pick the choices----------//
$("#game").on("click", ".choices", (function() {
	
	//-----User Choice-----//
	var userChoice = $(this).text();
	console.log("User Pick: " + userChoice);

	//-----checks whether user picks correctly or not-----//
	if (userChoice === questions[count].answer) {
		clearInterval(timekeeper);
		correctAnswer();
	}
	else {
		clearInterval(timekeeper);
		incorrectAnswer();
	}
}));