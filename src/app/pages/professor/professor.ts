import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-professor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './professor.html',
  styleUrl: './professor.css',
})
export class Professor {
  constructor(private http: HttpClient) {}

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

  if (this.cpf.length !== 11) {
    alert('CPF inválido');
    return;
  }

  if (!this.nome.trim()) {
    alert('Informe o nome do professor');
    return;
  }

  const dados = {
    nome: this.nome,
    cpf: this.cpf,
    rg: this.rg,
    sexo: this.sexo,
    telefone: this.telefone,
    email: this.email,
    disciplina: this.disciplina,
    formacao: this.formacao,
    rua: this.rua,
    bairro: this.bairro,
    numero: this.numero,
    cep: this.cep,
    complemento: this.complemento
  };

  this.http.post(
    'https://sistema-escolar-api-production.up.railway.app/professor',
    dados
  ).subscribe({
    next: () => {
      alert('Professor cadastrado com sucesso!');
      this.cancelar();
    },
    error: (erro) => {
      console.error(erro);
      alert('Erro ao cadastrar professor');
    }
  });
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