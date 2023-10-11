import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { QuestionsResponse } from 'src/app/models/questionsResponse.interface';
import { PreguntadosService } from 'src/app/services/preguntados.service';
import { Subscription } from 'rxjs';
import { PuntuacionService } from 'src/app/services/puntuacion.service';
import { FlaticonService } from 'src/app/services/flaticon.service';
import { LifesComponent } from 'src/app/components/lifes/lifes.component';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent implements OnInit, OnDestroy {
  @ViewChild(LifesComponent) lifes!: LifesComponent;
  questionsFromService?: QuestionsResponse[];
  currentQuestion?: QuestionsResponse;
  private questionSub!: Subscription;
  answers: string[] = [];
  gameStarted = false;
  
  hits = 0;
  points = 0;
  guessed = false;
  notGuessed = false;
  isFinished = false;
  maxMistakes = 7;
  mistakesRemaining:number = this.maxMistakes;

  ngOnInit(): void {
    if (!this.questionSub) {
      this.questionSub = this.preguntadosService.getRandomQuestions().subscribe((data) => {
        this.questionsFromService = data;
        this.mistakesRemaining = this.maxMistakes;
      });
    }
  }
  ngOnDestroy(): void {
    this.questionSub.unsubscribe();
  }
  constructor(private preguntadosService: PreguntadosService, private puntuacionService: PuntuacionService, private flaticonService: FlaticonService) {
  }

  startGame() {

    this.gameStarted = true;
    if (this.questionsFromService!.length > 0) {
      this.chooseRandomQuestion();
    }
  }

  getRandomAnswers() {
    let answers: string[] = [];
    answers.push(...this.currentQuestion!.incorrectAnswers);
    let random = Math.floor(Math.random() * answers.length)
    answers.splice(random, 0, this.currentQuestion!.correctAnswer);

    this.answers = answers;

  }

  checkAnswer(currentAnswer: string) {
    if (currentAnswer.trim() === this.currentQuestion!.correctAnswer.trim()) {
      this.guessed = true;
      this.notGuessed = false;
      this.hits += 1;
      this.points += 5;
    } else {
      this.notGuessed = true;
      this.guessed = false;
      this.mistakesRemaining--;
      this.lifes.decreaseMistakesRemaining(true)
    }

    if (this.mistakesRemaining === 0) {
      this.isFinished = true;
      this.puntuacionService.saveScore("Preguntados", this.points, "S/D")
    } else {
      this.chooseRandomQuestion();
    }


  }

  chooseRandomQuestion() {

    this.questionSub = this.preguntadosService.getRandomQuestions().subscribe((data) => {
      this.questionsFromService = data;      
      //random question from data
      this.currentQuestion = this.questionsFromService![Math.floor(Math.random() * this.questionsFromService!.length)];
      this.getImage(this.currentQuestion.category);
      this.getRandomAnswers();
    });
  }

  resetGame() {
    this.mistakesRemaining = this.maxMistakes;
    this.points = 0;
    this.guessed = false;
    this.notGuessed = false;
    this.isFinished = false;
    this.chooseRandomQuestion();
  }

  image:string = "";
  getImage(category: string) {
    this.flaticonService.getImage(category).then(blob => {
      blob.subscribe(image => {
        const blob = new Blob([image], { type: 'image/jpeg' }); // Asegúrate de establecer el tipo MIME correcto

        // Crea una URL (Object URL) para el Blob
        this.image = URL.createObjectURL(blob);
      })
    })
  }

  getCategorySpanish(category: string | undefined) {
    switch (category) {
      case "society_and_culture":
        return "Sociedad y cultura"
      case "film_and_tv":
        return "Cine y televisión"
      case "music":
        return "Música"
      case "science":
        return "Ciencia"
      case "entertainment":
        return "Entretenimiento";
      case "general_knowledge":
        return "Conocimiento general"
      case "history":
        return "Historia"
      case "sport_and_leisure":
        return "Deporte y recreación"
      case "geography":
        return "Geografía"
      case "arts_and_literature":
        return "Arte y literatura"
      default:
        return "Categoria inexistente"
    }
  }


}