import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fornecedor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './fornecedor.html',
  styleUrl: './fornecedor.css',
})
export class Fornecedor {

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

    alert('Fornecedor cadastrado com sucesso!');
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