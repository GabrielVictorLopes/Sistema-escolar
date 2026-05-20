import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Aluno } from './pages/aluno/aluno';
import { Professor } from './pages/professor/professor';
import { Fornecedor } from './pages/fornecedor/fornecedor';
import { Notas } from './pages/notas/notas';
import { Faltas } from './pages/faltas/faltas';

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
  }
];