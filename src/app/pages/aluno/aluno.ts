import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './aluno.html',
  styleUrl: './aluno.css',
})
export class Aluno {

  nome = '';
  cpf = '';
  rg = '';
  sexo = '';

  nomeMae = '';
  telMae = '';

  nomePai = '';
  telPai = '';

  medicamento = '';
  observacao = '';

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

    alert('Aluno cadastrado com sucesso!');
  }

  cancelar() {
    this.nome = '';
    this.cpf = '';
    this.rg = '';
    this.sexo = '';

    this.nomeMae = '';
    this.telMae = '';

    this.nomePai = '';
    this.telPai = '';

    this.medicamento = '';
    this.observacao = '';

    this.rua = '';
    this.bairro = '';
    this.numero = '';
    this.cep = '';
    this.complemento = '';
  }
}