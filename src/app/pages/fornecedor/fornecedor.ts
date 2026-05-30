import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fornecedor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './fornecedor.html',
  styleUrl: './fornecedor.css',
})
export class Fornecedor {
  constructor(private http: HttpClient) {}

  empresa = '';
  cnpj = '';
  responsavel = '';

  telefone = '';
  email = '';

  produto = '';
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

  if (this.cnpj.length !== 14) {
    alert('CNPJ inválido');
    return;
  }

  const dados = {
    empresa: this.empresa,
    cnpj: this.cnpj,
    responsavel: this.responsavel,
    telefone: this.telefone,
    email: this.email,
    produto: this.produto,
    observacao: this.observacao,
    rua: this.rua,
    bairro: this.bairro,
    numero: this.numero,
    cep: this.cep,
    complemento: this.complemento
  };

  this.http.post(
    'https://sistema-escolar-api-production.up.railway.app/fornecedor',
    dados
  ).subscribe({
    next: () => {
      alert('Fornecedor cadastrado com sucesso!');
      this.cancelar();
    },
    error: (erro) => {
      console.error(erro);
      alert('Erro ao cadastrar fornecedor');
    }
  });

}

  cancelar() {

    this.empresa = '';
    this.cnpj = '';
    this.responsavel = '';

    this.telefone = '';
    this.email = '';

    this.produto = '';
    this.observacao = '';

    this.rua = '';
    this.bairro = '';
    this.numero = '';
    this.cep = '';
    this.complemento = '';
  }
}