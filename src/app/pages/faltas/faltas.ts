import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-faltas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faltas.html',
  styleUrls: ['./faltas.css']
})
export class Faltas {

  aluno = '';
  disciplina = '';
  data = '';
  quantidade: number | null = null;
  justificativa = '';

  faltas: any[] = [];

  salvar() {

    if (
      !this.aluno ||
      !this.disciplina ||
      !this.data ||
      this.quantidade === null
    ) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    this.faltas.push({
      aluno: this.aluno,
      disciplina: this.disciplina,
      data: this.data,
      quantidade: this.quantidade,
      justificativa: this.justificativa
    });

    alert('Falta lançada com sucesso!');
    this.cancelar();
  }

  cancelar() {
    this.aluno = '';
    this.disciplina = '';
    this.data = '';
    this.quantidade = null;
    this.justificativa = '';
  }

  getStatus(justificativa: string): string {
    return justificativa?.trim()
      ? 'Justificada'
      : 'Não Justificada';
  }
}