import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  abaAtiva = 'lista';

  buscaFornecedor = '';
  filtroStatus = '';

  contas: ContaPagar[] = [];
  categorias: any[] = [];
  fornecedores: any[] = [];

  contaSelecionada: ContaPagar | null = null;

  pagamentoData = '';
  pagamentoValor = 0;
  pagamentoForma = 'PIX';

  novoFornecedor: number | null = null;
  novaCategoria: number | null = null;
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
    this.carregarCategorias();
    this.carregarFornecedores();

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
  carregarCategorias() {

    this.http.get<any[]>(
      'https://sistema-escolar-api-production.up.railway.app/categoria'
    ).subscribe({

      next: (dados) => {

        this.categorias = dados;

        if (dados.length > 0) {
          this.novaCategoria = dados[0].id;
        }

      },

      error: (erro) => {
        console.error(erro);
      }

    });

  }

  carregarFornecedores() {

    this.http.get<any[]>(
      'https://sistema-escolar-api-production.up.railway.app/fornecedor'
    ).subscribe({

      next: (dados) => {

        this.fornecedores = dados;

        if (dados.length > 0 && !this.novoFornecedor) {
          this.novoFornecedor = dados[0].id;
        }

      },

      error: (erro) => {
        console.error('Erro ao carregar fornecedores', erro);
      }

    });

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
    console.log({
      fornecedor_id: this.novoFornecedor,
      categoria_id: this.novaCategoria,
      descricao: this.novaDescricao,
      valor_total: this.novoValorTotal,
      data_emissao: this.novaDataEmissao,
      data_vencimento: this.novaDataVencimento,
      status: this.novoStatus
    });

    if (
      !this.novoFornecedor ||
      !this.novaCategoria ||
      !this.novaDescricao ||
      !this.novoValorTotal ||
      !this.novaDataVencimento
    ) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    const dados = {
      fornecedor_id: this.novoFornecedor,
      categoria_id: this.novaCategoria,
      descricao: this.novaDescricao,
      valor_total: this.novoValorTotal,
      data_emissao: this.novaDataEmissao,
      data_vencimento: this.novaDataVencimento,
      status: this.novoStatus,
      juros: this.novoJuros ?? 0,
      multa: this.novaMulta ?? 0,
      numero_parcela: this.novoNumeroParcela,
      total_parcelas: this.novoTotalParcelas,
      centro_custo: this.novoCentroCusto,
      codigo_boleto: null
    };

    this.http.post(
      'https://sistema-escolar-api-production.up.railway.app/contas-pagar',
      dados
    ).subscribe({
      next: () => {

        alert('Conta cadastrada com sucesso!');

        this.cancelar();

        this.abaAtiva = 'lista';

      },

      error: (erro) => {

        console.error(erro);

        alert('Erro ao cadastrar conta.');

      }
    });

  }

  cancelar() {
    this.novoFornecedor = null;
    this.novaCategoria = null;
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