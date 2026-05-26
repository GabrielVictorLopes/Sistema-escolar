import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Aluno } from './pages/aluno/aluno';
import { Professor } from './pages/professor/professor';
import { Fornecedor } from './pages/fornecedor/fornecedor';
import { Notas } from './pages/notas/notas';
import { Faltas } from './pages/faltas/faltas';
import { ContasReceber } from './pages/contas-receber/contas-receber';
import { NotaFiscal } from './pages/nota-fiscal/nota-fiscal';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'aluno',
    component: Aluno
  },
  {
    path: 'professor',
    component: Professor
  },
  {
    path: 'fornecedor',
    component: Fornecedor
  },
  {
    path: 'notas',
    component: Notas
  },
  {
    path: 'faltas',
    component: Faltas
  },
  {
    path: 'contas-receber',
    component: ContasReceber
  },
  {
  path: 'nota-fiscal',
  component: NotaFiscal
}
];