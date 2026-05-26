import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotaFiscalService {

  private notas = [
    {
      id: 1,
      cliente: 'João Silva',
      descricao: 'Mensalidade Escolar',
      valor: 350,
      status: 'Pendente'
    }
  ];

  getNotas(): Observable<any[]> {
    return of(this.notas);
  }

  alterarStatus(id: number, novoStatus: string) {
    const nota = this.notas.find(n => n.id === id);

    if (nota) {
      nota.status = novoStatus;
    }

    return of(true);
  }

  getLinkPdf(id: number): string {
    return '#';
  }

  downloadXml(id: number): void {
    alert(`Download XML da nota ${id}`);
  }
}