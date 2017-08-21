$.fn.trivia = function() {
	var videoGt = this;
	var userPick =  null;
	var answers = {
			correct: 0,
			incorrect: 0
		};
	var count = 30;
	var current = 0;
	var questions = [{

		question: 'Who is the fastest of these video game characters?',
		choices: ['Mario', 'Sonic', 'Donkey Kong', 'The Paper Boy'],
		correct: 0
},		{

		question: 'In the game HALO, what is the name of Master Chiefs AI system',
		choices: ['Cortana', 'Arbiter', '343 Guilty Spark', 'Ghost'],
		correct: 1

}, 		{
		question: 'What video game console has the highest number of video game sales of all time?',
		choices: ['XBox', 'Nintendo 64', 'Wii', 'Playstation 2'],
		correct: 2

},		{
		question: 'What was Nintendos first try at an arcade game?',
		choices: ['Super Mario Bros', 'Final Fantasy', 'Donkey Kong', 'Donkey Kong Jr'],
		correct: 3

},		{
		question: 'What is the name of Chris Redfields sister in Resident Evil?',
		choices: ['Beth', 'Samantha', 'Claire', 'Stephanie'],
		correct: 4
},		{

		question: 'Who is the hero in the Legend of Zelda series?',
		choices: ['Zelda', 'Link', 'Ganondorf', 'Epona'],
		correct: 5
},		{

		question: 'What game is the famous phrase "The cake is a lie" from?',
		choices: ['God of War', 'Portal', 'Skyrim', 'Minecraft'],
		correct: 6
},		{

		question: 'Who is the final boss in the original God of War game?',
		choices: ['Zeus', 'Ares', 'Hermes', 'Poseidon'],
		correct: 7
},		{

		question: 'Who is the main villain in Final Fantasy 7?',
		choices: ['Squall', 'Cloud', 'Sephiroth', 'Titus'],
		correct: 8
},		{

		question: 'Which one of these is not an Elder Scrolls game?',
		choices: ['Mario', 'Sonic', 'Donkey Kong', 'The Paper Boy'],
		correct: 9
}];

	ask = function() {
		if (questions[current]) {
			$('#timer').html('Time remaining: ' + '00:' + count + 'secs');
			$('#questionDiv').html(questions[current].question);
			var choicesArr = questions[current].choices;
			var buttonsArr = [];

			for (var i = 0; i < choicesArr.length; i++) {
				var button = $('<button>');
				button.text(choicesArr[i]);
				button.attr('data-id', i);
				$('#choicesDiv').append(button);
			}
			window.triviaCounter = setInterval(timer, 1000);
		} else {
			$('body').append($('<div />', {
				text: 'Unanswered: ' + (
				questions.length - (answers.correct + answers.incorrect)),
					class: 'result'			
			}));
			$('#start_button').text('Restart').appendTo('body').show();
		}
	};

	timer = function() {
		count--;
		if (count <= 0) {
			setTimeout(function() {
				nextQuestion();
			});
		} else {
			$('#timer').html('Time remaining: ' + '00:' + count + ' secs');
		}
	};
	nextQuestion = function() {
		current++;
		clearInterval(window.triviaCounter);
		count = 30;
		$('#timer').html('');
		setTimeout(function() {
			cleanUp();
			ask();
		}, 1000);
	};
	cleanUp = function() {
		$('div[id]').each(function(item) {
			$(this).html('');
		});
		$('.correct').html('Correct answers: ' + answers.correct);
		$('.incorrect').html('Incorrect answers: ' + answers.incorrect);
	};
	answer = function(correct) {
		var string = correct ? 'correct' : 'incorrect';
		answers[string]++;
		$('.' + string).html(string + ' answers: ' + answers[string]);
	};
	return videoGt;
};

var Trivia;

$('#start_button').click(function() {
	$(this).hide();
	$('.result').remove();
	$('div').html('');
	Trivia = new $(window).trivia();
	ask();
});

$('#choicesDiv').on('click', 'button', function(e) {
	var userPick = $(this).data('id'),
	videoGt = Trivia || $(window).trivia(),
	index = questions[current].correct,
	correct = questions[current].choices[index];

	if (userPick !== index) {
		$('#choicesDiv').text('Wrong Answer! The correct answer is: ' + correct);
		answer(false);
	} else {
		$('#choicesDiv').text('Correct!! The correct answer is: ' + correct);
		answer(true);
	}
		nextQuestion();
});





































































