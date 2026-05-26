import { useState, type ReactNode } from "react";
import {
  Bell,
  BookOpen,
  Calendar,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Download,
  Edit,
  Eye,
  FlaskConical,
  GraduationCap,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";

interface Aluno {
  id: string;
  nome: string;
  email: string;
  matricula: string;
  status: "ativo" | "inativo";
  progresso: number;
}

interface Turma {
  id: string;
  nome: string;
  periodo: "Manhã" | "Tarde" | "Noite";
  disciplina: "Química" | "Biologia" | "Ciências";
  totalAlunos: number;
  status: "ativa" | "inativa";
  presencaMedia: number;
  atividadesPendentes: number;
  proximaAula: string;
  alunos: Aluno[];
}

const turmasMock: Turma[] = [
  {
    id: "1",
    nome: "3º Ano A",
    periodo: "Manhã",
    disciplina: "Química",
    totalAlunos: 14,
    status: "ativa",
    presencaMedia: 92,
    atividadesPendentes: 2,
    proximaAula: "14/05",
    alunos: [
      {
        id: "a1",
        matricula: "2024001",
        nome: "Ana Carolina Silva",
        email: "ana.silva@escola.edu.br",
        progresso: 95,
        status: "ativo",
      },
      {
        id: "a2",
        matricula: "2024002",
        nome: "Bruno Santos",
        email: "bruno.santos@escola.edu.br",
        progresso: 88,
        status: "ativo",
      },
      {
        id: "a3",
        matricula: "2024003",
        nome: "Camila Oliveira",
        email: "camila.oliveira@escola.edu.br",
        progresso: 76,
        status: "ativo",
      },
      {
        id: "a4",
        matricula: "2024004",
        nome: "Daniel Costa",
        email: "daniel.costa@escola.edu.br",
        progresso: 91,
        status: "ativo",
      },
      {
        id: "a5",
        matricula: "2024005",
        nome: "Eduarda Ferreira",
        email: "eduarda.ferreira@escola.edu.br",
        progresso: 82,
        status: "ativo",
      },
    ],
  },
  {
    id: "2",
    nome: "2º Ano B",
    periodo: "Tarde",
    disciplina: "Biologia",
    totalAlunos: 18,
    status: "ativa",
    presencaMedia: 88,
    atividadesPendentes: 4,
    proximaAula: "15/05",
    alunos: [],
  },
  {
    id: "3",
    nome: "1º Ano C",
    periodo: "Manhã",
    disciplina: "Ciências",
    totalAlunos: 22,
    status: "ativa",
    presencaMedia: 95,
    atividadesPendentes: 1,
    proximaAula: "16/05",
    alunos: [],
  },
];

export function TurmasPage() {
  const [turmas] = useState<Turma[]>(turmasMock);
  const [expandedTurma, setExpandedTurma] = useState<string | null>("1");
  const [searchTerm, setSearchTerm] = useState("");

  const filtrarAlunos = (alunos: Aluno[]) => {
    if (!searchTerm.trim()) return alunos;

    const termo = searchTerm.toLowerCase();

    return alunos.filter(
      (aluno) =>
        aluno.nome.toLowerCase().includes(termo) ||
        aluno.email.toLowerCase().includes(termo) ||
        aluno.matricula.includes(searchTerm)
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 text-slate-900">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">
              Minhas Turmas
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Gerencie suas turmas e alunos
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(22,163,74,0.22)] transition hover:bg-green-700">
            <Plus className="h-4 w-4" />
            Nova Turma
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            <StatsCards />

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Buscar turma, aluno, email ou matrícula..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-3">
                  <FilterButton icon={<GraduationCap />} label="Ano/Série" />
                  <FilterButton icon={<BookOpen />} label="Disciplina" />
                  <FilterButton icon={<Clock />} label="Turno" />
                  <FilterButton
                    icon={<span className="h-2 w-2 rounded-full bg-green-500" />}
                    label="Status"
                  />
                </div>

                <button className="flex items-center gap-2 rounded-xl border border-green-300 bg-white px-5 py-2.5 text-sm font-semibold text-green-600 transition hover:bg-green-50">
                  <Download className="h-4 w-4" />
                  Exportar
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {turmas.map((turma) => {
                const alunosFiltrados = filtrarAlunos(turma.alunos);
                const isExpanded = expandedTurma === turma.id;

                return (
                  <TurmaCard
                    key={turma.id}
                    turma={turma}
                    alunosFiltrados={alunosFiltrados}
                    isExpanded={isExpanded}
                    onToggle={() =>
                      setExpandedTurma(isExpanded ? null : turma.id)
                    }
                  />
                );
              })}
            </div>
          </div>

          <RightPanel />
        </div>
      </div>
    </div>
  );
}

function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4">
      <StatCard
        icon={<Users className="h-7 w-7 text-green-600" />}
        title="Turmas ativas"
        value="8"
        color="green"
      />

      <StatCard
        icon={<Users className="h-7 w-7 text-violet-600" />}
        title="Total de alunos"
        value="126"
        color="purple"
      />

      <StatCard
        icon={<Calendar className="h-7 w-7 text-blue-600" />}
        title="Aulas hoje"
        value="5"
        color="blue"
      />

      <StatCard
        icon={<Clock className="h-7 w-7 text-orange-500" />}
        title="Pendências"
        value="3"
        color="orange"
      />
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  color,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  color: "green" | "purple" | "blue" | "orange";
}) {
  const colorClass = {
    green: "bg-green-100",
    purple: "bg-violet-100",
    blue: "bg-blue-100",
    orange: "bg-orange-100",
  }[color];

  return (
    <div className="flex min-w-0 items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${colorClass}`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-950">{value}</p>
      </div>
    </div>
  );
}

function FilterButton({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
      <span className="flex h-4 w-4 items-center justify-center">{icon}</span>
      {label}
      <ChevronDown className="h-4 w-4 text-slate-400" />
    </button>
  );
}

function TurmaCard({
  turma,
  alunosFiltrados,
  isExpanded,
  onToggle,
}: {
  turma: Turma;
  alunosFiltrados: Aluno[];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <button
          onClick={onToggle}
          className="flex min-w-0 flex-1 items-center gap-4 text-left"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-600">
            <Users className="h-6 w-6 text-white" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold text-slate-950">
                {turma.nome}
              </h2>

              <Tag color="orange" icon={<Clock />} label={turma.periodo} />
              <Tag
                color={
                  turma.disciplina === "Química"
                    ? "purple"
                    : turma.disciplina === "Biologia"
                    ? "green"
                    : "blue"
                }
                icon={
                  turma.disciplina === "Química" ? (
                    <FlaskConical />
                  ) : turma.disciplina === "Biologia" ? (
                    <Eye />
                  ) : (
                    <BookOpen />
                  )
                }
                label={turma.disciplina}
              />
              <Tag
                color="blue"
                icon={<Users />}
                label={`${turma.totalAlunos} alunos`}
              />
              <Tag
                color="green"
                icon={<span className="h-2 w-2 rounded-full bg-green-600" />}
                label="Ativa"
              />
            </div>
          </div>
        </button>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <IconButton icon={<Edit className="h-4 w-4" />} />
          <IconButton icon={<MoreHorizontal className="h-4 w-4" />} />

          {isExpanded && (
            <button className="flex items-center gap-2 rounded-xl border border-green-400 px-4 py-2 text-sm font-semibold text-green-600 transition hover:bg-green-50">
              <Plus className="h-4 w-4" />
              Adicionar Aluno
            </button>
          )}

          <button
            onClick={onToggle}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-5 pb-5">
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <TurmaMetric
              icon={<TrendingArrow />}
              title="Presença média"
              value={`${turma.presencaMedia}%`}
              color="green"
            />

            <TurmaMetric
              icon={<ClipboardIcon />}
              title="Atividades pendentes"
              value={`${turma.atividadesPendentes}`}
              color="purple"
            />

            <TurmaMetric
              icon={<Calendar className="h-6 w-6 text-blue-600" />}
              title="Próxima aula"
              value={turma.proximaAula}
              color="blue"
            />
          </div>

          <StudentsTable alunos={alunosFiltrados} totalAlunos={turma.totalAlunos} />
        </div>
      )}
    </div>
  );
}

function Tag({
  icon,
  label,
  color,
}: {
  icon: ReactNode;
  label: string;
  color: "green" | "purple" | "blue" | "orange";
}) {
  const colorClass = {
    green: "bg-green-100 text-green-700 border-green-200",
    purple: "bg-violet-100 text-violet-700 border-violet-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  }[color];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${colorClass}`}
    >
      <span className="flex h-3.5 w-3.5 items-center justify-center">
        {icon}
      </span>
      {label}
    </span>
  );
}

function TurmaMetric({
  icon,
  title,
  value,
  color,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  color: "green" | "purple" | "blue";
}) {
  const colorClass = {
    green: "bg-green-100",
    purple: "bg-violet-100",
    blue: "bg-blue-100",
  }[color];

  return (
    <div className="flex min-w-0 items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/80 px-5 py-4">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${colorClass}`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-950">{value}</p>
      </div>
    </div>
  );
}

function StudentsTable({
  alunos,
  totalAlunos,
}: {
  alunos: Aluno[];
  totalAlunos: number;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200 text-left text-xs font-semibold text-slate-500">
              <th className="px-5 py-3">Matrícula</th>
              <th className="px-5 py-3">Nome</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Progresso</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Ações</th>
            </tr>
          </thead>

          <tbody>
            {alunos.map((aluno) => (
              <tr
                key={aluno.id}
                className="border-b border-slate-100 text-sm last:border-b-0 hover:bg-slate-50"
              >
                <td className="px-5 py-3 font-medium text-slate-700">
                  {aluno.matricula}
                </td>

                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                      {getInitials(aluno.nome)}
                    </div>
                    <span className="font-medium text-slate-800">
                      {aluno.nome}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-3 text-slate-500">{aluno.email}</td>

                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="w-9 text-sm font-semibold text-slate-700">
                      {aluno.progresso}%
                    </span>
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full ${
                          aluno.progresso >= 80
                            ? "bg-green-500"
                            : "bg-orange-400"
                        }`}
                        style={{ width: `${aluno.progresso}%` }}
                      />
                    </div>
                  </div>
                </td>

                <td className="px-5 py-3">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Ativo
                  </span>
                </td>

                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <button className="text-slate-500 hover:text-green-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Exibindo 1–{alunos.length} de {totalAlunos} alunos
        </p>

        <div className="flex items-center gap-2">
          <PaginationButton icon={<ChevronLeft className="h-4 w-4" />} />
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-green-400 bg-green-50 font-semibold text-green-600">
            1
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100">
            2
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100">
            3
          </button>
          <PaginationButton icon={<ChevronRight className="h-4 w-4" />} />
        </div>
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <aside className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <h2 className="font-bold text-slate-950">Próximas aulas</h2>
        </div>

        <div className="space-y-3">
          <NextClass
            time="08:00"
            title="Química Orgânica"
            place="3º Ano A • Sala 12"
            color="green"
            icon={<FlaskConical />}
          />

          <NextClass
            time="10:30"
            title="Biologia Celular"
            place="2º Ano B • Laboratório"
            color="blue"
            icon={<Eye />}
          />

          <NextClass
            time="14:00"
            title="Ciências da Natureza"
            place="1º Ano C • Sala 08"
            color="orange"
            icon={<FlaskConical />}
          />
        </div>

        <button className="mt-5 w-full rounded-xl border border-green-400 py-3 text-sm font-semibold text-green-600 transition hover:bg-green-50">
          Ver agenda completa
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5 text-blue-600" />
          <h2 className="font-bold text-slate-950">Avisos rápidos</h2>
        </div>

        <div className="space-y-3">
          <Notice
            icon={<Clock />}
            title="Atividades pendentes"
            description="2 atividades precisam de correção"
            color="orange"
          />

          <Notice
            icon={<ClipboardIcon />}
            title="Entrega de trabalhos"
            description="5 trabalhos entregues hoje"
            color="purple"
          />
        </div>

        <button className="mt-5 w-full rounded-xl border border-green-400 py-3 text-sm font-semibold text-green-600 transition hover:bg-green-50">
          Ver todos os avisos
        </button>
      </div>
    </aside>
  );
}

function NextClass({
  time,
  title,
  place,
  color,
  icon,
}: {
  time: string;
  title: string;
  place: string;
  color: "green" | "blue" | "orange";
  icon: ReactNode;
}) {
  const borderClass = {
    green: "border-l-green-500",
    blue: "border-l-blue-500",
    orange: "border-l-orange-500",
  }[color];

  const textClass = {
    green: "text-green-600",
    blue: "text-blue-600",
    orange: "text-orange-500",
  }[color];

  return (
    <div
      className={`flex items-center justify-between rounded-xl border border-l-4 border-slate-200 ${borderClass} bg-white px-4 py-3`}
    >
      <div>
        <p className={`mb-1 text-sm font-bold ${textClass}`}>{time}</p>
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{place}</p>
      </div>

      <span className={`flex h-6 w-6 items-center justify-center ${textClass}`}>
        {icon}
      </span>
    </div>
  );
}

function Notice({
  icon,
  title,
  description,
  color,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  color: "orange" | "purple";
}) {
  const colorClass = {
    orange: "bg-orange-50 text-orange-500",
    purple: "bg-violet-50 text-violet-600",
  }[color];

  return (
    <div
      className={`flex items-center justify-between rounded-xl px-4 py-3 ${colorClass}`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center">
          {icon}
        </span>

        <div>
          <p className="text-sm font-bold text-slate-900">{title}</p>
          <p className="text-xs text-slate-600">{description}</p>
        </div>
      </div>

      <ChevronRight className="h-4 w-4 text-slate-500" />
    </div>
  );
}

function IconButton({ icon }: { icon: ReactNode }) {
  return (
    <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50">
      {icon}
    </button>
  );
}

function PaginationButton({ icon }: { icon: ReactNode }) {
  return (
    <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
      {icon}
    </button>
  );
}

function TrendingArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-green-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 16L9 11L13 15L20 8" />
      <path d="M15 8h5v5" />
    </svg>
  );
}

function ClipboardIcon() {
  return <CalendarDays className="h-6 w-6 text-violet-600" />;
}

function getInitials(nome: string) {
  return nome
    .split(" ")
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();
}