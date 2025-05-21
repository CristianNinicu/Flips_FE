import { Component } from '@angular/core';
import {ControlCounterService} from '../control-counter.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

interface Flashcard {
  id: number;
  question : string;
  answer : string;
}

@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.component.html',
  imports: [
    FormsModule,
    CommonModule,
  ],
  styleUrls: ['./manage-cards.component.scss']
})
export class ManageCardsComponent {
  constructor(private counterService: ControlCounterService) {}

  cards: Flashcard[] = [];
  nextId = 1;

  newQuestion = '';
  newAnswer = '';
  editingCard: Flashcard | null = null;

  ngOnInit(): void {
    const saved = localStorage.getItem('cards');
    if (saved) {
      this.cards = JSON.parse(saved);
    }
    else {
      this.cards = [
        {
          id: 1,
          question: "What is the capital of France?",
          answer: "Paris"
        },
        {
          id: 2,
          question: "What is 5 + 7?",
          answer: "12"
        },
        {
          id: 3,
          question: "What language is primarily used for Angular?",
          answer: "TypeScript"
        },
        {
          id: 4,
          question: "Who wrote 'Romeo and Juliet'?",
          answer: "William Shakespeare"
        },
        {
          id: 5,
          question: "What planet is known as the Red Planet?",
          answer: "Mars"
        }
      ];
    }
  }

  addCard() {
    if (this.newQuestion.trim() && this.newAnswer.trim()) {
      this.cards.push({
        id: this.nextId++,
        question: this.newQuestion,
        answer: this.newAnswer
      });
      this.newQuestion = '';
      this.newAnswer = '';
    }
  }

  editCard(card: Flashcard) {
    this.editingCard = { ...card };
  }

  saveEdit() {
    const index = this.cards.findIndex(c => c.id === this.editingCard?.id);
    if (index > -1 && this.editingCard) {
      this.cards[index] = this.editingCard;
      this.editingCard = null;
    }
  }

  cancelEdit() {
    this.editingCard = null;
  }

  deleteCard(id: number) {
    if (window.confirm('Are you sure you want to delete this card?')) {
      this.cards = this.cards.filter(card => card.id !== id);
      this.onControlClick('Delete card');
    }
  }

  onControlClick(controlId: string) {
    this.counterService.increment(controlId);
    console.log(`Accesări ${controlId}:`, this.counterService.getCount(controlId));
  }

  saveAllCards(): void {
    localStorage.setItem('cards', JSON.stringify(this.cards));
    alert('All cards have been saved!');
  }
}
