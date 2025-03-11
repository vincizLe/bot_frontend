import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatBotService } from '../services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  imports:[
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatBotComponent {
  messages: { sender: string, text: string }[] = [];
  question: string = '';

  
  constructor(private chatBotService: ChatBotService) {}


  sendMessage() {
    if (this.question.trim()) {
      this.messages.push({ sender: 'user', text: this.question });
      setTimeout(() => {
        this.messages.push({ sender: 'bot', text: 'I am a simple bot. How can I help? ' });
      }, 1000);
      this.question = '';
    }
  }

  sendMessage1() {
    if (this.question.trim()) {
      // Add user message
      this.messages.push({ sender: 'user', text: this.question });

      // Call the API to get bot's response
      this.chatBotService.createQuery(this.question).subscribe({
        next: (result) => {
          this.messages.push({ sender: 'bot', text: result.response });
        },
        error: (error) => {
          console.error('Error:', error);
          this.messages.push({ sender: 'bot', text: 'Lo siento, algo salió mal.' });
        },
        complete: () => {
          console.log('API call completed.');
        }
      });

      // Clear user question input
      this.question = '';
    }
  }
}
