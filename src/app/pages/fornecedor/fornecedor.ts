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