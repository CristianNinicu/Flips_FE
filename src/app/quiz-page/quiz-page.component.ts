import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ControlCounterService} from '../control-counter.service';

interface Flashcard {
  id: number;
  question : string;
  answer : string;
}

@Component({
  selector: 'quiz-page',
  templateUrl: './quiz-page.component.html',
  imports: [
    FormsModule,
    CommonModule,
  ],
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizComponent implements OnInit {
  constructor(private counterService: ControlCounterService) {}
  cards: Flashcard[] = [];
  quizStarted = false;
  quizEnded = false; // Ensure this matches the template
  currentIndex = 0;
  currentCard: Flashcard | null = null;
  userAnswer = '';
  showResult = false;
  isCorrect = false;
  score = 0;

  ngOnInit(): void {
    this.loadCardsFromStorage();
  }

  loadCardsFromStorage() {
    const storedCards = localStorage.getItem('cards');
    if (storedCards) {
      try {
        this.cards = JSON.parse(storedCards);
      } catch (e) {
        console.error('Invalid JSON in localStorage', e);
        this.cards = [];
      }
    }

    // Fallback demo cards if none are found
    if (!this.cards || this.cards.length === 0) {
      this.cards = [
        {
          question: 'What is the capital of France?', answer: 'Paris',
          id: 0
        },
        {
          question: 'What is 2 + 2?', answer: '4',
          id: 1
        },
        {
          question: 'What color is the sun?', answer: 'Yellow',
          id: 2
        }
      ];
    }
  }

  startQuiz() {
    this.quizStarted = true;
    this.quizEnded = false;
    this.currentIndex = 0;
    this.score = 0;
    this.loadCurrentCard();
  }

  loadCurrentCard() {
    this.currentCard = this.cards[this.currentIndex];
    this.userAnswer = '';
    this.showResult = false;
  }

  checkAnswer() {
    if (!this.currentCard) return;
    this.isCorrect = this.userAnswer.trim().toLowerCase() === this.currentCard.answer.toLowerCase();
    if (this.isCorrect) {
      this.score++;
    }
    this.showResult = true;
  }

  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex >= this.cards.length) {
      this.quizEnded = true;
      this.quizStarted = false;
    } else {
      this.loadCurrentCard();
    }
  }

  restartQuiz() {
    this.startQuiz();
  }
  onControlClick(controlId: string) {
    this.counterService.increment(controlId);
    console.log(`Accesări ${controlId}:`, this.counterService.getCount(controlId));
  }
}
