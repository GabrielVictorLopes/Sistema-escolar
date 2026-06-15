import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

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
    this.carregarContas();
  }

  carregarCategorias() {
    this.http.get<any[]>(
      'https://sistema-escolar-api-production.up.railway.app/categoria'
    ).subscribe({
      next: (dados) => {
        this.categorias = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar categorias:', erro);
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
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar fornecedores', erro);
      }
    });
  }

  carregarContas() {
    this.http.get<any[]>(
      'https://sistema-escolar-api-production.up.railway.app/contas-pagar'
    ).subscribe({
      next: (dados) => {
        if (!dados) return;

        const contasMapeadas = dados.map(c => {
          let fornNome = c.fornecedor || c.fornecedor_nome;
          if (c.Fornecedor && c.Fornecedor.empresa) fornNome = c.Fornecedor.empresa;
          if (c.fornecedor && c.fornecedor.empresa) fornNome = c.fornecedor.empresa;

          let catNome = c.categoria || c.categoria_nome;
          if (c.Categoria && c.Categoria.nome) catNome = c.Categoria.nome;
          if (c.categoria && c.categoria.nome) catNome = c.categoria.nome;

          return {
            id: c.id,
            fornecedor: fornNome || 'Não informado',
            categoria: catNome || 'Geral',
            descricao: c.descricao || '',
            valorTotal: Number(c.valorTotal || c.valor_total || 0),
            dataEmissao: c.dataEmissao || c.data_emissao || '',
            dataVencimento: c.dataVencimento || c.data_vencimento || '',
            status: c.status || 'Aberto',
            numeroParcela: c.numeroParcela || c.numero_parcela,
            totalParcelas: c.totalParcelas || c.total_parcelas
          };
        });

        this.contas = [...contasMapeadas];
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar contas:', erro);
      }
    });
  }

  get contasFiltradas() {
    if (!this.contas) return [];
    return this.contas.filter(conta => {
      const nomeFornecedor = conta.fornecedor ? String(conta.fornecedor).toLowerCase() : '';
      const bateFornecedor = !this.buscaFornecedor || nomeFornecedor.includes(this.buscaFornecedor.toLowerCase());
      const bateStatus = !this.filtroStatus || conta.status === this.filtroStatus;
      return bateFornecedor && bateStatus;
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
    if (!this.novoFornecedor || !this.novaCategoria || !this.novaDescricao || !this.novoValorTotal || !this.novaDataVencimento) {
      console.warn('Campos obrigatórios vazios.');
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
        this.cancelar();
        this.carregarContas();
        this.abaAtiva = 'lista';
      },
      error: (erro) => {
        console.error(erro);
      }
    });
  }

  cancelar() {
    this.novoFornecedor = this.fornecedores.length > 0 ? this.fornecedores[0].id : null;
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
    this.cdr.detectChanges();
  }

  iniciarPagamento(conta: ContaPagar) {
    this.contaSelecionada = conta;
    this.pagamentoValor = conta.valorTotal; // Preenche automaticamente o valor total da conta
    this.pagamentoData = new Date().toISOString().substring(0, 10); // Preenche com a data de hoje (AAAA-MM-DD)
    this.pagamentoForma = 'PIX'; // Define PIX como padrão
  }

  confirmarPagamento() {
    if (!this.contaSelecionada) return;

    // Monta o objeto exatamente como o backend espera receber
    const dadosPagamento = {
      status: 'Pago',
      data_pagamento: this.pagamentoData,
      valor_pago: this.pagamentoValor,
      forma_pagamento: this.pagamentoForma
    };

    const url = `https://sistema-escolar-api-production.up.railway.app/contas-pagar/${this.contaSelecionada.id}`;

    this.http.put(url, dadosPagamento).subscribe({
      next: (resposta) => {
        console.log('Pagamento processado no servidor:', resposta);
        this.cancelarPagamento(); // Fecha o modal de forma limpa
        this.carregarContas(); // Recarrega a tabela e atualiza os blocos de métricas na hora!
      },
      error: (erro) => {
        console.error('Erro ao enviar requisição de pagamento:', erro);
        alert('Não foi possível salvar o pagamento no servidor.');
      }
    });
  }

  cancelarPagamento() {
    this.contaSelecionada = null;
  }

  excluir(id: number) {
    const confirmar = confirm('Deseja excluir esta conta?');
    if (!confirmar) return;

    const url = `https://sistema-escolar-api-production.up.railway.app/contas-pagar/${id}`;

    // Opcional: Enviando a deleção real para o banco via HTTP DELETE
    this.http.delete(url).subscribe({
      next: () => {
        this.contas = this.contas.filter(c => c.id !== id);
        this.carregarContas();
      },
      error: (erro) => {
        console.error('Erro ao deletar conta no banco de dados:', erro);
        // Fallback local se a API não possuir a rota DELETE mapeada ainda
        this.contas = this.contas.filter(c => c.id !== id);
        this.cdr.detectChanges();
      }
    });
  }
}