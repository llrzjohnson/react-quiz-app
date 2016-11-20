import React from 'react'

export default class Study extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			quiz: this.props.quiz,
			complete: false,
			answer: null,
			score: 0
		}
		this.nextQuestion = this.nextQuestion.bind(this);
		this.correctAnswer = this.correctAnswer.bind(this);
		this.wrongAnswer = this.wrongAnswer.bind(this);
	}
	correctAnswer() { this.setState({ answer: true, score: this.state.score + 1 }) }
	wrongAnswer() { this.setState({ answer: false }) }
	nextQuestion() {
		const length = this.props.quiz.questions.length;
		const { index } = this.state;
		if (index === length - 1) {
			this.setState({
				complete: true
			});
		} else {
			this.setState({
				index: this.state.index + 1,
				answer: null
			});
		}
	}
	render() {
		const { index, quiz } = this.state;
		const currentQuestion = quiz.questions[index];
		return (
			<div className = 'studyWrapper'>
				<div className = 'studyContainer'>
					<h1 className = 'quizTitle'>{this.props.quiz.title}</h1>
					
					{ !this.state.complete &&
						<div>
							<h3 className = 'quizLength'>Question {this.state.index + 1} of {quiz.questions.length}</h3>
							<h1 className = 'questionTitle'>{currentQuestion.questionTitle}</h1>
						</div> }

						{ !this.state.complete && currentQuestion.answers.map( (answer, idx) => {
							if (this.state.answer === null) {
								if (currentQuestion.correctAnswer === idx) {
									return (
										<div
											key = {idx}
											className = 'answerContainer'
											onClick = {this.correctAnswer}>
											<h2>{answer}</h2>
										</div>	
									)
								} else {
									return (
										<div
											key = {idx}
											className = 'answerContainer'
											onClick = {this.wrongAnswer}>
											<h2>{answer}</h2>
										</div>
									)
								}
							} else if (this.state.answer) {
								if (currentQuestion.correctAnswer === idx) {
									return (
										<div
											key = {idx}
											className = 'answerContainer' id = 'correctWinner'>
											<h2>{answer}</h2>
										</div>	
									)
								} else {
									return (
										<div
											key = {idx}
											className = 'answerContainer' id = 'wrongWinner'>
											<h2>{answer}</h2>
										</div>
									)
								}
							} else {
								if (currentQuestion.correctAnswer === idx) {
									return (
										<div
											key = {idx}
											className = 'answerContainer' id = 'correctLoser'>
											<h2>{answer}</h2>
										</div>	
									)
								} else {
									return (
										<div
											key = {idx}
											className = 'answerContainer' id = 'wrongLoser'>
											<h2>{answer}</h2>
										</div>
									)
								}				
							}
						}) }

					{ this.state.answer !== null && !this.state.complete &&
						<div>
							{ this.state.answer ? <h1 className = 'correctAnswer'>Correct, nice job!</h1> : <h1 className = 'wrongAnswer'>Sorry, that's not correct!</h1> }
							<button onClick = {this.nextQuestion}>Next Question</button>
						</div> }

					{ this.state.complete &&
						<div>
							<h1>You scored {this.state.score} correct out of {this.props.quiz.questions.length} questions!</h1>
							<button onClick = {this.props.endStudy}>Finish Study</button>
						</div> }

				</div>
			</div>
		);
	}
};