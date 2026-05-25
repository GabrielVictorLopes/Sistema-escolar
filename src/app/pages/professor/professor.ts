import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-professor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './professor.html',
  styleUrl: './professor.css',
})
export class Professor {

  nome = '';
  cpf = '';
  rg = '';
  sexo = '';

  telefone = '';
  email = '';

  disciplina = '';
  formacao = '';

  rua = '';
  bairro = '';
  numero = '';
  cep = '';
  complemento = '';

  // Apenas números
  apenasNumeros(event: KeyboardEvent) {
    const tecla = event.key;

    // teclas permitidas
    const teclasPermitidas = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab'
    ];

    if (
      !/[0-9]/.test(tecla) &&
      !teclasPermitidas.includes(tecla)
    ) {
      event.preventDefault();
    }
  }

  // Apenas letras
  apenasLetras(event: KeyboardEvent) {
    const tecla = event.key;

    const teclasPermitidas = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      ' '
    ];

    if (
      !/^[a-zA-ZÀ-ÿ\s]$/.test(tecla) &&
      !teclasPermitidas.includes(tecla)
    ) {
      event.preventDefault();
    }
  }


  cadastrar() {

    // validação cpf
    if (this.cpf.length !== 11) {
      alert('CPF inválido');
      return;
    }

     // validação nome
    if (!this.nome.trim()) {
      alert('Informe o nome do aluno');
      return;
    }

    alert('Professor cadastrado com sucesso!');
  }

  cancelar() {
    this.nome = '';
    this.cpf = '';
    this.rg = '';
    this.sexo = '';

    this.telefone = '';
    this.email = '';

    this.disciplina = '';
    this.formacao = '';

    this.rua = '';
    this.bairro = '';
    this.numero = '';
    this.cep = '';
    this.complemento = '';
  }
}