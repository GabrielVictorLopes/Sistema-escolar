import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ContaReceber {
  ID_ContaReceber: number;
  ID_Cliente: string; // Nome do aluno/responsável
  Descricao: string;
  Valor_Total: number;
  Data_Emissao: string;
  Data_Vencimento: string;
  Status: 'Pendente' | 'Pago' | 'Atrasado';
  Data_Pagamento?: string;
  Valor_Pago?: number;
  Forma_Pagamento?: string;
  Numero_Parcela?: number;
  Total_Parcelas?: number;
  Juros?: number;
  Multa?: number;
}

@Component({
  selector: 'app-contas-receber',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contas-receber.html',
  styleUrl: './contas-receber.css',
})
export class ContasReceber implements OnInit {
  // Aba ativa: 'lista' ou 'cadastro'
  abaAtiva: 'lista' | 'cadastro' = 'lista';

  // Filtros
  buscaCliente: string = '';
  filtroStatus: string = '';

  // Lista de Contas
  contas: ContaReceber[] = [
    {
      ID_ContaReceber: 1,
      ID_Cliente: 'Ana Beatriz Souza',
      Descricao: 'Mensalidade Escolar - Maio',
      Valor_Total: 450.00,
      Data_Emissao: '2026-05-01',
      Data_Vencimento: '2026-05-10',
      Status: 'Pago',
      Data_Pagamento: '2026-05-09',
      Valor_Pago: 450.00,
      Forma_Pagamento: 'PIX',
      Numero_Parcela: 5,
      Total_Parcelas: 12,
      Juros: 0,
      Multa: 0
    },
    {
      ID_ContaReceber: 2,
      ID_Cliente: 'Carlos Eduardo Lima',
      Descricao: 'Mensalidade Escolar - Maio',
      Valor_Total: 450.00,
      Data_Emissao: '2026-05-01',
      Data_Vencimento: '2026-05-10',
      Status: 'Pendente',
      Valor_Pago: 0,
      Forma_Pagamento: '',
      Numero_Parcela: 5,
      Total_Parcelas: 12,
      Juros: 0,
      Multa: 0
    },
    {
      ID_ContaReceber: 3,
      ID_Cliente: 'Mariana das Dores',
      Descricao: 'Taxa de Material Didático - Anual',
      Valor_Total: 320.00,
      Data_Emissao: '2026-04-15',
      Data_Vencimento: '2026-05-05',
      Status: 'Atrasado',
      Valor_Pago: 0,
      Forma_Pagamento: '',
      Numero_Parcela: 1,
      Total_Parcelas: 1,
      Juros: 15.40,
      Multa: 10.00
    },
    {
      ID_ContaReceber: 4,
      ID_Cliente: 'João Pedro Silva',
      Descricao: 'Uniforme Escolar Completo',
      Valor_Total: 180.00,
      Data_Emissao: '2026-05-10',
      Data_Vencimento: '2026-05-25',
      Status: 'Pendente',
      Valor_Pago: 0,
      Forma_Pagamento: '',
      Numero_Parcela: 1,
      Total_Parcelas: 1,
      Juros: 0,
      Multa: 0
    },
    {
      ID_ContaReceber: 5,
      ID_Cliente: 'Gabriela Ramos Martins',
      Descricao: 'Mensalidade Escolar - Abril',
      Valor_Total: 450.00,
      Data_Emissao: '2026-04-01',
      Data_Vencimento: '2026-04-10',
      Status: 'Pago',
      Data_Pagamento: '2026-04-10',
      Valor_Pago: 450.00,
      Forma_Pagamento: 'Boleto Bancário',
      Numero_Parcela: 4,
      Total_Parcelas: 12,
      Juros: 0,
      Multa: 0
    }
  ];

  // Variáveis do Formulário de Cadastro
  novoCliente: string = '';
  novaDescricao: string = '';
  novoValorTotal: number | null = null;
  novaDataEmissao: string = new Date().toISOString().substring(0, 10);
  novaDataVencimento: string = '';
  novoStatus: 'Pendente' | 'Pago' | 'Atrasado' = 'Pendente';
  novoNumeroParcela: number = 1;
  novoTotalParcelas: number = 1;
  novoJuros: number = 0;
  novoMulta: number = 0;

  // Variáveis para Controle de Baixa (Modal/Painel inline)
  contaSelecionadaParaBaixa: ContaReceber | null = null;
  baixaDataPagamento: string = new Date().toISOString().substring(0, 10);
  baixaValorPago: number | null = null;
  baixaFormaPagamento: string = 'PIX';

  // Variáveis de Métricas
  totalRecebido: number = 0;
  totalPendente: number = 0;
  totalAtrasado: number = 0;

  ngOnInit() {
    this.calcularMetricas();
  }

  calcularMetricas() {
    this.totalRecebido = this.contas
      .filter(c => c.Status === 'Pago')
      .reduce((sum, c) => sum + (c.Valor_Pago || c.Valor_Total), 0);

    this.totalPendente = this.contas
      .filter(c => c.Status === 'Pendente')
      .reduce((sum, c) => sum + c.Valor_Total, 0);

    this.totalAtrasado = this.contas
      .filter(c => c.Status === 'Atrasado')
      .reduce((sum, c) => sum + c.Valor_Total + (c.Juros || 0) + (c.Multa || 0), 0);
  }

  // Retorna a lista de contas filtrada
  get contasFiltradas(): ContaReceber[] {
    return this.contas.filter(c => {
      const bateNome = c.ID_Cliente.toLowerCase().includes(this.buscaCliente.toLowerCase()) || 
                      c.Descricao.toLowerCase().includes(this.buscaCliente.toLowerCase());
      const bateStatus = this.filtroStatus === '' || c.Status === this.filtroStatus;
      return bateNome && bateStatus;
    });
  }

  cadastrar() {
    if (!this.novoCliente || !this.novaDescricao || !this.novoValorTotal || !this.novaDataVencimento) {
      alert('Preencha os campos obrigatórios (*)');
      return;
    }

    const novaConta: ContaReceber = {
      ID_ContaReceber: this.contas.length > 0 ? Math.max(...this.contas.map(c => c.ID_ContaReceber)) + 1 : 1,
      ID_Cliente: this.novoCliente,
      Descricao: this.novaDescricao,
      Valor_Total: Number(this.novoValorTotal),
      Data_Emissao: this.novaDataEmissao,
      Data_Vencimento: this.novaDataVencimento,
      Status: this.novoStatus,
      Numero_Parcela: this.novoNumeroParcela,
      Total_Parcelas: this.novoTotalParcelas,
      Juros: this.novoJuros || 0,
      Multa: this.novoMulta || 0,
      Valor_Pago: this.novoStatus === 'Pago' ? Number(this.novoValorTotal) : 0,
      Data_Pagamento: this.novoStatus === 'Pago' ? this.novaDataEmissao : '',
      Forma_Pagamento: this.novoStatus === 'Pago' ? 'Dinheiro' : ''
    };

    this.contas.push(novaConta);
    this.calcularMetricas();
    this.limparCampos();
    this.abaAtiva = 'lista';
    alert('Conta a receber cadastrada com sucesso!');
  }

  cancelar() {
    this.limparCampos();
    this.abaAtiva = 'lista';
  }

  limparCampos() {
    this.novoCliente = '';
    this.novaDescricao = '';
    this.novoValorTotal = null;
    this.novaDataEmissao = new Date().toISOString().substring(0, 10);
    this.novaDataVencimento = '';
    this.novoStatus = 'Pendente';
    this.novoNumeroParcela = 1;
    this.novoTotalParcelas = 1;
    this.novoJuros = 0;
    this.novoMulta = 0;
  }

  // Prepara painel para dar baixa
  iniciarBaixa(conta: ContaReceber) {
    this.contaSelecionadaParaBaixa = conta;
    this.baixaValorPago = conta.Valor_Total + (conta.Juros || 0) + (conta.Multa || 0);
    this.baixaDataPagamento = new Date().toISOString().substring(0, 10);
    this.baixaFormaPagamento = 'PIX';
  }

  cancelarBaixa() {
    this.contaSelecionadaParaBaixa = null;
  }

  confirmarBaixa() {
    if (!this.contaSelecionadaParaBaixa) return;
    if (this.baixaValorPago === null || this.baixaValorPago <= 0) {
      alert('Informe um valor pago válido.');
      return;
    }

    const conta = this.contas.find(c => c.ID_ContaReceber === this.contaSelecionadaParaBaixa?.ID_ContaReceber);
    if (conta) {
      conta.Status = 'Pago';
      conta.Data_Pagamento = this.baixaDataPagamento;
      conta.Valor_Pago = Number(this.baixaValorPago);
      conta.Forma_Pagamento = this.baixaFormaPagamento;
      
      this.calcularMetricas();
      this.contaSelecionadaParaBaixa = null;
      alert(`Baixa efetuada com sucesso para ${conta.ID_Cliente}!`);
    }
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir este lançamento financeiro?')) {
      this.contas = this.contas.filter(c => c.ID_ContaReceber !== id);
      this.calcularMetricas();
    }
  }
}
