import { Component } from '@angular/core';
import {ControlCounterService} from '../control-counter.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

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
    RouterLink
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
    this.cards = this.cards.filter(card => card.id !== id);
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
