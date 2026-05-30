import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './aluno.html',
  styleUrl: './aluno.css',
})
export class Aluno {
  constructor(private http: HttpClient) {}

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

  // validação nome
  if (!this.nome.trim()) {
    alert('Informe o nome do aluno');
    return;
  }

  // validação cpf
  if (this.cpf.length !== 11) {
    alert('CPF inválido');
    return;
  }

  // validação telefone mãe
  if (this.telMae && this.telMae.length < 10) {
    alert('Telefone da mãe inválido');
    return;
  }

  // validação telefone pai
  if (this.telPai && this.telPai.length < 10) {
    alert('Telefone do pai inválido');
    return;
  }

  const dados = {
    nome: this.nome,
    cpf: this.cpf,
    rg: this.rg,
    sexo: this.sexo,
    nomeMae: this.nomeMae,
    telMae: this.telMae,
    nomePai: this.nomePai,
    telPai: this.telPai,
    medicamento: this.medicamento,
    observacao: this.observacao,
    rua: this.rua,
    bairro: this.bairro,
    numero: this.numero,
    cep: this.cep,
    complemento: this.complemento
  };

  this.http.post(
    'https://sistema-escolar-api-production.up.railway.app/aluno',
    dados
  ).subscribe({
    next: () => {
      alert('Aluno cadastrado com sucesso!');
      this.cancelar();
    },
    error: (erro) => {
      console.error(erro);
      alert('Erro ao cadastrar aluno');
    }
  });
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