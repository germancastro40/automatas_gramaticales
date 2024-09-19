import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ButtonModule,
    RouterOutlet, 
    ReactiveFormsModule, 
    CommonModule,
    CardModule,
    InputTextareaModule,
    MessagesModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'automatas_gramaticales';
  messages!: Message[];
  declarationForm: FormGroup;
  validationMessage: string | null = null;
  valid: boolean | null = null;

  constructor(private fb: FormBuilder) {
    this.declarationForm = this.fb.group({
      declaration: ['', Validators.required],
    });
  }

  onSubmit() {
    const input = this.declarationForm.get('declaration')?.value;
    this.validateDeclaration(input);
  }

  validateDeclaration(input: string): any {
    // Expresión regular para la validación completa de la sentencia
    const regex = /^declare\s+([a-zA-Z_][a-zA-Z0-9_]{0,14})(,\s*[a-zA-Z_][a-zA-Z0-9_]{0,14})*\s+(entero|real|cadena|lógico|fecha)\s*;$/i;

    if (!regex.test(input)) {
      this.valid = false;
      this.messages = [{ severity: 'error', detail: 'La sentencia es inválida. Revise el formato y los identificadores.' }];
      return;
    }

    this.valid = true;
    this.messages = [{ severity: 'success', detail: 'La sentencia es válida.' }];
  }
}
