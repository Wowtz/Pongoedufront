import { useState } from "react";
import { TestTube, Plus, Search, Edit, Trash2, Filter } from "lucide-react";

interface Reagente {
  id: string;
  nome: string;
  formula: string;
  quantidade: number;
  unidade: string;
  localizacao: string;
  minimoEstoque: number;
  tipo: "reagente" | "vidraria" | "equipamento" | "outros";
}

const mockReagentes: Reagente[] = [
  {
    id: "1",
    nome: "Ácido Clorídrico",
    formula: "HCl",
    quantidade: 500,
    unidade: "ml",
    localizacao: "Armário A1 - Prateleira 2",
    minimoEstoque: 200,
    tipo: "reagente",
  },
  {
    id: "2",
    nome: "Hidróxido de Sódio",
    formula: "NaOH",
    quantidade: 150,
    unidade: "g",
    localizacao: "Armário A2 - Prateleira 1",
    minimoEstoque: 200,
    tipo: "reagente",
  },
  {
    id: "3",
    nome: "Sulfato de Cobre",
    formula: "CuSO₄",
    quantidade: 50,
    unidade: "g",
    localizacao: "Armário B1 - Prateleira 3",
    minimoEstoque: 100,
    tipo: "reagente",
  },
  {
    id: "4",
    nome: "Béquer 500ml",
    formula: "-",
    quantidade: 0,
    unidade: "unidades",
    localizacao: "Armário C1 - Prateleira 1",
    minimoEstoque: 10,
    tipo: "vidraria",
  },
  {
    id: "5",
    nome: "Ácido Sulfúrico",
    formula: "H₂SO₄",
    quantidade: 750,
    unidade: "ml",
    localizacao: "Armário A1 - Prateleira 1",
    minimoEstoque: 300,
    tipo: "reagente",
  },
  {
    id: "6",
    nome: "Permanganato de Potássio",
    formula: "KMnO₄",
    quantidade: 80,
    unidade: "g",
    localizacao: "Armário B2 - Prateleira 2",
    minimoEstoque: 100,
    tipo: "reagente",
  },
  {
    id: "7",
    nome: "Pipeta Volumétrica 25ml",
    formula: "-",
    quantidade: 8,
    unidade: "unidades",
    localizacao: "Armário C2 - Gaveta 1",
    minimoEstoque: 10,
    tipo: "vidraria",
  },
  {
    id: "8",
    nome: "Nitrato de Prata",
    formula: "AgNO₃",
    quantidade: 120,
    unidade: "g",
    localizacao: "Armário A3 - Cofre",
    minimoEstoque: 50,
    tipo: "reagente",
  },
];

type TipoFiltro = "todos" | "reagente" | "vidraria" | "equipamento" | "outros";

export function ReagentesManagement() {
  const [reagentes] = useState<Reagente[]>(mockReagentes);
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState<TipoFiltro>("todos");

  const getStatus = (reagente: Reagente): { label: string; color: string } => {
    const { quantidade, minimoEstoque } = reagente;

    if (quantidade === 0) {
      return { label: "Esgotado", color: "bg-gray-100 text-gray-600 border-gray-200" };
    } else if (quantidade < minimoEstoque / 2) {
      return { label: "Crítico", color: "bg-red-100 text-red-600 border-red-200" };
    } else if (quantidade <= minimoEstoque) {
      return { label: "Baixo", color: "bg-yellow-100 text-yellow-600 border-yellow-200" };
    } else {
      return { label: "Disponível", color: "bg-green-100 text-green-600 border-green-200" };
    }
  };

  const filteredReagentes = reagentes.filter((r) => {
    const matchesSearch =
      r.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.localizacao.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTipo = tipoFiltro === "todos" || r.tipo === tipoFiltro;

    return matchesSearch && matchesTipo;
  });

  const tipoOptions: { value: TipoFiltro; label: string }[] = [
    { value: "todos", label: "Todos" },
    { value: "reagente", label: "Reagentes" },
    { value: "vidraria", label: "Vidrarias" },
    { value: "equipamento", label: "Equipamentos" },
    { value: "outros", label: "Outros" },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <TestTube className="w-8 h-8 text-primary" />
            <h1 className="text-3xl">Reagentes</h1>
          </div>
          <p className="text-muted-foreground">
            Gerencie o estoque de reagentes, vidrarias e materiais do laboratório
          </p>
        </div>
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
          <Plus size={20} />
          <span>Novo Reagente</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nome, fórmula ou localização..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-border bg-background focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Type Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <select
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value as TipoFiltro)}
            className="pl-10 pr-8 py-3 rounded-xl border-2 border-border bg-background focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer min-w-[180px]"
          >
            {tipoOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Exibindo {filteredReagentes.length} de {reagentes.length} itens
        </p>
      </div>

      {/* Table */}
      <div className="bg-card border-2 border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-accent border-b-2 border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">Nome</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Fórmula</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Quantidade</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Unidade</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Localização</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredReagentes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <TestTube className="w-12 h-12 text-muted-foreground/50" />
                      <p>Nenhum item encontrado</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredReagentes.map((reagente) => {
                  const status = getStatus(reagente);
                  return (
                    <tr
                      key={reagente.id}
                      className="border-b border-border hover:bg-accent/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium">{reagente.nome}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-muted-foreground">
                          {reagente.formula}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={reagente.quantidade === 0 ? "text-red-600 font-medium" : ""}>
                          {reagente.quantidade}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">{reagente.unidade}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">{reagente.localizacao}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            className="p-2 hover:bg-accent rounded-lg transition-colors text-primary"
                            title="Editar"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="p-2 hover:bg-accent rounded-lg transition-colors text-red-600"
                            title="Excluir"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
          <p className="text-sm text-green-600 mb-1">Disponível</p>
          <p className="text-2xl font-bold text-green-700">
            {reagentes.filter((r) => r.quantidade > r.minimoEstoque).length}
          </p>
        </div>
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-600 mb-1">Baixo</p>
          <p className="text-2xl font-bold text-yellow-700">
            {
              reagentes.filter(
                (r) => r.quantidade <= r.minimoEstoque && r.quantidade >= r.minimoEstoque / 2
              ).length
            }
          </p>
        </div>
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-600 mb-1">Crítico</p>
          <p className="text-2xl font-bold text-red-700">
            {reagentes.filter((r) => r.quantidade < r.minimoEstoque / 2 && r.quantidade > 0).length}
          </p>
        </div>
        <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-1">Esgotado</p>
          <p className="text-2xl font-bold text-gray-700">
            {reagentes.filter((r) => r.quantidade === 0).length}
          </p>
        </div>
      </div>
    </div>
  );
}
