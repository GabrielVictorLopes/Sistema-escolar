import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotaFiscalService } from '../services/nota-fiscal';

@Component({
  selector: 'app-nota-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nota-lista.html'
})
export class NotaListaComponent implements OnInit {

  notas: any[] = [];

  constructor(
    private notaService: NotaFiscalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarNotas();
  }

  carregarNotas(): void {
  this.notaService.getNotas().subscribe({
    next: (dados) => {
      this.notas = dados || [];
      this.cdr.detectChanges();
    },

    error: (erro: any) => {
      console.error('Erro ao buscar notas:', erro);
    }
  });
}

  mudarStatus(id: number, novoStatus: string) {
    this.notaService.alterarStatus(id, novoStatus)
      .subscribe(() => {
        this.carregarNotas();
      });
  }

  abrirPdf(id: number) {
    window.open(
      this.notaService.getLinkPdf(id),
      '_blank'
    );
  }

  abrirXml(id: number): void {
    this.notaService.downloadXml(id);
  }
}