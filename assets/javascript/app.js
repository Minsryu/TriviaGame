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


	var questionNum = 0;
	var correctNum = 0;
	var wrongNum = 0;
	var UnanswerNum = 0;
	var currentAnswer = "";
	var stop = "";
	var time = 5;

	function reset(){

		questionNum = 0;
		correctNum = 0;
		wrongNum = 0;
		UnanswerNum = 0;
		currentAnswer = "";
		stop = "";
		time = 5;
		afterAnswer();

	}


	$("#start").on("click",function(){
		afterAnswer();
	});


	$(document).on("click","#reset",function(){
		reset();
	});

	function count (){
		time--;
		$("#timer").text("You have " +time+ " seconds")
		if(time===0){
		outOfTime(questionNum);
		}	
	}


	function dislayQuestion(x){

		$("#timer").text("You have " +time+ " seconds")
		stop = setInterval(count,1000);

		if(questionNum===(questions.length)){
			//clear interval doesn't work becuz timer function did not happen
			clearInterval(stop);
			var div1 = $("<div class='question-display' > Correct: " + correctNum +"</div>")
			var div2 = $("<div class='question-display' > Wrong: " + wrongNum +"</div>")
			var div3 = $("<div class='question-display' > Unanswered: " + UnanswerNum +"</div>")

			$("#question-section").append(div1, div2, div3);
			var div4 = $("<button id='reset'>Start Over?</button> ")
			$("#question-section").append(div4);
			
		}
		else{
			var current = questions[x];
			// console.log(current.question);
			var div1 = $("<div class='question-display' > Solve this problem " + current.question +"</div>")
			// console.log("QL"+ questions.length)
			// console.log("Q#" +questionNum);
			$("#question-section").append(div1);

			for (i=0;i<current.answers.length;i++){
			var div2 = $("<div class='answers-list'>"+current.answers[i] +"</div>")

			$("#question-section").append(div2);

			}

			$(".answers-list").on("click",function(){
				// console.log("this worked!")
				currentAnswer = $(this).text() 
				console.log(currentAnswer);
				$("#question-section").empty();

				if(currentAnswer === questions[x].correct){
				
				correctAnswer(x);
				}
				else {
				wrongAnswer(x);
				}
			});
		}
	};

	function correctAnswer (x){
		var current = questions[x];
		var div3 = $("<div class='answers-list'>Correct!</div>");
		correctNum++;
		clearInterval(stop);
		$("#question-section").append(div3);
		questionNum++;
		setTimeout(afterAnswer,1000);
	};

	function wrongAnswer (x){
		var current = questions[x];
		var div4 = $("<div class='answers-list'> Wrong! This is the answer: "+current.correct +"</div>");
		clearInterval(stop);
		$("#question-section").append(div4);
		wrongNum++;
		questionNum++;
		setTimeout(afterAnswer,1000);
	}

	function outOfTime(x){
		var current = questions[x];
		var div4 = $("<div class='answers-list'> Out of Time! This is the answer: "+current.correct +"</div>");
		$("#question-section").empty();
		$("#question-section").append(div4);
		clearInterval(stop);
		questionNum++;
		UnanswerNum++;
		setTimeout(afterAnswer,1000);
	}

	function afterAnswer (){
		$("#question-section").empty();
		time = 10;
		dislayQuestion (questionNum);
	}

});