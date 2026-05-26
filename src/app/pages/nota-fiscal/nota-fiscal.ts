import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nota-fiscal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nota-fiscal.html',
  styleUrl: './nota-fiscal.css'
})
export class NotaFiscal {

  // ==========================
  // DADOS DO CLIENTE
  // ==========================

  cliente = '';
  cpfCnpj = '';
  inscricaoEstadual = '';
  email = '';
  telefone = '';
  cidade = '';
  uf = '';

  // ==========================
  // DADOS DA NOTA
  // ==========================

  numeroNota = '';
  numeroRps = '';
  serieRps = '';
  tipoRps = 'NFS-e';

  dataEmissao = '';
  dataCompetencia = '';

  status = 'Rascunho';

  // ==========================
  // PRODUTO / SERVIÇO
  // ==========================

  descricaoServico = '';
  quantidade = 1;
  valorUnitario = 0;
  desconto = 0;
  observacao = '';

  // ==========================
  // IMPOSTOS
  // ==========================

  iss = 0;
  pis = 0;
  cofins = 0;
  irpj = 0;
  csll = 0;
  deducoes = 0;

  // ==========================
  // RESTRIÇÕES INPUT
  // ==========================

  apenasNumeros(event: KeyboardEvent) {
    const tecla = event.key;

    if (!/[0-9]/.test(tecla) &&
      tecla !== 'Backspace' &&
      tecla !== 'Delete' &&
      tecla !== 'Tab') {
      event.preventDefault();
    }
  }

  apenasLetras(event: KeyboardEvent) {
    const tecla = event.key;

    if (!/^[a-zA-ZÀ-ÿ\s]$/.test(tecla) &&
      tecla !== 'Backspace' &&
      tecla !== 'Delete' &&
      tecla !== 'Tab') {
      event.preventDefault();
    }
  }

  // ==========================
  // CÁLCULOS ERP
  // ==========================

  get valorBruto(): number {
    return this.quantidade * this.valorUnitario;
  }

  get totalImpostos(): number {
    return (
      Number(this.iss) +
      Number(this.pis) +
      Number(this.cofins) +
      Number(this.irpj) +
      Number(this.csll)
    );
  }

  get valorLiquido(): number {
    return (
      this.valorBruto -
      Number(this.desconto) -
      this.totalImpostos -
      Number(this.deducoes)
    );
  }

  // ==========================
  // AÇÕES
  // ==========================

  salvarRascunho() {
    alert('Nota salva como rascunho!');
  }

  emitirNota() {
    alert('Nota fiscal emitida com sucesso!');
  }

  cancelar() {
    this.cliente = '';
    this.cpfCnpj = '';
    this.inscricaoEstadual = '';
    this.email = '';
    this.telefone = '';
    this.cidade = '';
    this.uf = '';

    this.numeroNota = '';
    this.numeroRps = '';
    this.serieRps = '';
    this.tipoRps = 'NFS-e';

    this.dataEmissao = '';
    this.dataCompetencia = '';

    this.status = 'Rascunho';

    this.descricaoServico = '';
    this.quantidade = 1;
    this.valorUnitario = 0;
    this.desconto = 0;
    this.observacao = '';

    this.iss = 0;
    this.pis = 0;
    this.cofins = 0;
    this.irpj = 0;
    this.csll = 0;
    this.deducoes = 0;
  }
}