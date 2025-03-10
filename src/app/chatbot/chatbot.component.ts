import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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
  userMessage: string = '';

  
  constructor(private chatBotService: ChatBotService) {}


  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ sender: 'user', text: this.userMessage });
      setTimeout(() => {
        this.messages.push({ sender: 'bot', text: 'I am a simple bot. How can I help? ' });
      }, 1000);
      this.userMessage = '';
    }
  }

  sendMessage1() {
    if (this.userMessage.trim()) {
      // Add user message
      this.messages.push({ sender: 'user', text: this.userMessage });

      // Call the API to get bot's response
      this.chatBotService.createQuery(this.userMessage).subscribe({
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

      // Clear user message input
      this.userMessage = '';
    }
  }
}
