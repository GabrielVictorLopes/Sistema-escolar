import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './notas.html',
  styleUrl: './notas.css',
})
export class Notas {

  aluno = '';
  disciplina = '';
  bimestre = '';
  nota = '';
  observacao = '';

  salvar() {

    if (!this.aluno || !this.disciplina || !this.nota) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    alert('Nota lançada com sucesso!');
  }

  cancelar() {
    this.aluno = '';
    this.disciplina = '';
    this.bimestre = '';
    this.nota = '';
    this.observacao = '';
  }
}