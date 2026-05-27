import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './notas.html',
  styleUrl: './notas.css',
})
export class Notas {

  aluno = '';
  disciplina = '';
  bimestre = '';
  nota: number | null = null;
  observacao = '';

  notas: any[] = [];

  salvar() {

    if (
      !this.aluno ||
      !this.disciplina ||
      !this.bimestre ||
      this.nota === null
    ) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    this.notas.push({
      aluno: this.aluno,
      disciplina: this.disciplina,
      bimestre: this.bimestre,
      nota: this.nota,
      observacao: this.observacao
    });

    alert('Nota lançada com sucesso!');
    this.cancelar();
  }

  cancelar() {
    this.aluno = '';
    this.disciplina = '';
    this.bimestre = '';
    this.nota = null;
    this.observacao = '';
  }

  getSituacao(nota: number): string {

    if (nota >= 7) {
      return 'Aprovado';
    }

    if (nota >= 5) {
      return 'Recuperação';
    }

    return 'Reprovado';
  }
}