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

  cadastrar() {

    if (this.cpf.length !== 11) {
      alert('CPF inválido');
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