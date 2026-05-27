import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ContaPagar {
  id: number;
  fornecedor: string;
  categoria: string;
  descricao: string;
  valorTotal: number;
  dataEmissao: string;
  dataVencimento: string;
  status: 'Pago' | 'Aberto' | 'Vencido';
  formaPagamento?: string;
  numeroParcela?: number;
  totalParcelas?: number;
  juros?: number;
  multa?: number;
  centroCusto?: string;
}

@Component({
  selector: 'app-contas-pagar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contas-pagar.html',
  styleUrls: ['./contas-pagar.css']
})
export class ContasPagar implements OnInit {

  abaAtiva = 'lista';

  buscaFornecedor = '';
  filtroStatus = '';

  contas: ContaPagar[] = [];

  contaSelecionada: ContaPagar | null = null;

  pagamentoData = '';
  pagamentoValor = 0;
  pagamentoForma = 'PIX';

  novoFornecedor = '';
  novaCategoria = '';
  novaDescricao = '';
  novoValorTotal: number | null = null;
  novaDataEmissao = '';
  novaDataVencimento = '';
  novoStatus: 'Pago' | 'Aberto' | 'Vencido' = 'Aberto';
  novaFormaPagamento = 'PIX';
  novoNumeroParcela: number | null = null;
  novoTotalParcelas: number | null = null;
  novoJuros: number | null = null;
  novaMulta: number | null = null;
  novoCentroCusto = '';

  ngOnInit(): void {

    this.contas = [
      {
        id: 1,
        fornecedor: 'Fornecedor Escolar LTDA',
        categoria: 'Material Escolar',
        descricao: 'Compra de materiais',
        valorTotal: 3500,
        dataEmissao: '2026-06-01',
        dataVencimento: '2026-06-15',
        status: 'Aberto',
        centroCusto: 'Pedagógico'
      },
      {
        id: 2,
        fornecedor: 'Companhia Energia',
        categoria: 'Infraestrutura',
        descricao: 'Conta de energia',
        valorTotal: 1800,
        dataEmissao: '2026-06-01',
        dataVencimento: '2026-06-10',
        status: 'Vencido',
        multa: 50,
        juros: 20,
        centroCusto: 'Infraestrutura'
      },
      {
        id: 3,
        fornecedor: 'Serviços de Limpeza LTDA',
        categoria: 'Limpeza',
        descricao: 'Serviço de limpeza mensal',
        valorTotal: 1200,
        dataEmissao: '2026-06-01',
        dataVencimento: '2026-06-15',
        status: 'Aberto',
        centroCusto: 'Administração'
      },
      {
        id: 4,
        fornecedor: 'Manutenção Predial LTDA',
        categoria: 'Infraestrutura',
        descricao: 'Serviço de manutenção predial',
        valorTotal: 2500,
        dataEmissao: '2026-06-01',
        dataVencimento: '2026-06-20',
        status: 'Aberto',
        centroCusto: 'Infraestrutura'
      },
      {
        id: 5,
        fornecedor: 'Fornecedor Escolar LTDA',
        categoria: 'Material Escolar', 
        descricao: 'Compra de materiais',
        valorTotal: 4000,
        dataEmissao: '2026-06-01',  
        dataVencimento: '2026-06-15',
        status: 'Pago',
        formaPagamento: 'PIX',
        centroCusto: 'Pedagógico'
      }

    ];
  }

  get contasFiltradas() {
    return this.contas.filter(conta => {

      const busca =
        !this.buscaFornecedor ||
        conta.fornecedor
          .toLowerCase()
          .includes(this.buscaFornecedor.toLowerCase());

      const status =
        !this.filtroStatus ||
        conta.status === this.filtroStatus;

      return busca && status;
    });
  }

  get totalPago() {
    return this.contas
      .filter(c => c.status === 'Pago')
      .reduce((acc, c) => acc + c.valorTotal, 0);
  }

  get totalAberto() {
    return this.contas
      .filter(c => c.status === 'Aberto')
      .reduce((acc, c) => acc + c.valorTotal, 0);
  }

  get totalVencido() {
    return this.contas
      .filter(c => c.status === 'Vencido')
      .reduce((acc, c) => acc + c.valorTotal, 0);
  }

  cadastrar() {

    if (
      !this.novoFornecedor ||
      !this.novaDescricao ||
      !this.novoValorTotal ||
      !this.novaDataVencimento
    ) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    this.contas.push({
      id: this.contas.length + 1,
      fornecedor: this.novoFornecedor,
      categoria: this.novaCategoria,
      descricao: this.novaDescricao,
      valorTotal: this.novoValorTotal,
      dataEmissao: this.novaDataEmissao,
      dataVencimento: this.novaDataVencimento,
      status: this.novoStatus,
      formaPagamento: this.novaFormaPagamento,
      numeroParcela: this.novoNumeroParcela ?? undefined,
      totalParcelas: this.novoTotalParcelas ?? undefined,
      juros: this.novoJuros ?? undefined,
      multa: this.novaMulta ?? undefined,
      centroCusto: this.novoCentroCusto
    });

    alert('Conta cadastrada com sucesso!');

    this.cancelar();
    this.abaAtiva = 'lista';
  }

  cancelar() {
    this.novoFornecedor = '';
    this.novaCategoria = '';
    this.novaDescricao = '';
    this.novoValorTotal = null;
    this.novaDataEmissao = '';
    this.novaDataVencimento = '';
    this.novoStatus = 'Aberto';
    this.novaFormaPagamento = 'PIX';
    this.novoNumeroParcela = null;
    this.novoTotalParcelas = null;
    this.novoJuros = null;
    this.novaMulta = null;
    this.novoCentroCusto = '';
  }

  iniciarPagamento(conta: ContaPagar) {
    this.contaSelecionada = conta;
    this.pagamentoValor = conta.valorTotal;
    this.pagamentoData = '';
    this.pagamentoForma = 'PIX';
  }

  confirmarPagamento() {

    if (!this.contaSelecionada) return;

    this.contaSelecionada.status = 'Pago';
    this.contaSelecionada.formaPagamento =
      this.pagamentoForma;

    alert('Pagamento realizado!');

    this.cancelarPagamento();
  }

  cancelarPagamento() {
    this.contaSelecionada = null;
  }

  excluir(id: number) {

    const confirmar = confirm(
      'Deseja excluir esta conta?'
    );

    if (!confirmar) return;

    this.contas =
      this.contas.filter(c => c.id !== id);
  }
}