import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-faltas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './faltas.html',
  styleUrl: './faltas.css',
})
export class Faltas {

  aluno = '';
  disciplina = '';
  data = '';
  quantidade = '';
  justificativa = '';

  salvar() {

    if (!this.aluno || !this.disciplina) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    alert('Falta lançada com sucesso!');
  }

  cancelar() {
    this.aluno = '';
    this.disciplina = '';
    this.data = '';
    this.quantidade = '';
    this.justificativa = '';
  }
}