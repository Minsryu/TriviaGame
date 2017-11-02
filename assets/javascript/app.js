$(document).ready(function() {

	var questions = [

	{ 	question: "3+5",
		answers: ["3","4","6","8"],
		correct: "8"
	},
	{	question: "7*5",
		answers: ["13","35","142","40"],
		correct: "35"
	},
	{	question: "10/(4+1) ",
		answers: ["5","3","2","9"],
		correct: "2"
	}
	];

	console.log(questions[0].answers[2]);

	var questionNum = 0;
	var correctNum = 0;
	var wrongNum = 0;
	var currentAnswer = "";
	var stop;
	var time = 30;

	function reset(){

		var questionNum = 0;
		var correctNum = 0;
		var wrongNum = 0;
		var currentAnswer = "";
	}


	$("#start").on("click",function(){
		afterAnswer();
		$("#timer").text("You have " +time+ " seconds")
		timer();
	});

	function timer(){
		setInterval(count,1000);
	}

	function count (){
		time--;
		$("#timer").text("You have " +time+ " seconds")
	}

	function dislayQuestion (x){

		var current = questions[x];
		// console.log(current.question);
		var div1 = $("<div class='question-display' > Solve this problem " + current.question +"</div>")
		
		$("#question-section").append(div1);

		for (i=0;i<current.answers.length;i++){
		var div2 = $("<div class='answers-list'>"+current.answers[i] +"</div>")

		$("#question-section").append(div2);

		}
		console.log(current.correct);

		$(".answers-list").on("click",function(){
			// console.log("this worked!")
			currentAnswer = $(this).text() 
			console.log(currentAnswer);

			if(currentAnswer === questions[x].correct){
			
			correctAnswer(x);
			}
			else {
			
			wrongAnswer(x);
			}

		});


	};

	function correctAnswer (x){

		var current = questions[x];
		var div3 = $("<div class='answers-list'>Correct!</div>");
		correctNum++;
		$("#question-section").empty();
		$("#question-section").append(div3);
		questionNum++;
		setTimeout(afterAnswer,3000);

	};

	function wrongAnswer (x){
		var current = questions[x];
		var div4 = $("<div class='answers-list'> Wrong! This is the answer: "+current.correct +"</div>");
		$("#question-section").empty();
		$("#question-section").append(div4);
		questionNum++;
		setTimeout(afterAnswer,3000);
		
	}

	function outOfTime(){
		var current = questions[x];
		var div4 = $("<div class='answers-list'> Out of Time! This is the answer: "+current.correct +"</div>");
		$("#question-section").empty();
		$("#question-section").append(div4);
		questionNum++;
		setTimeout(afterAnswer,3000);
	}

	function afterAnswer (){
		$("#question-section").empty();
		dislayQuestion (questionNum);
	}	


	if(questionNum===(questions.length-1)){
		console.log("you got "+ correctNum+" right!");
		reset();
	}


});