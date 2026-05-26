import { useState, type ReactNode } from "react";
import {
  Calendar,
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  ClipboardList,
  FlaskConical,
  Info,
  Plus,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import {
  addMonths,
  format,
  getDay,
  getDaysInMonth,
  isSameDay,
  isSameMonth,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";

interface TimeSlot {
  id: string;
  horarioInicio: string;
  horarioFim: string;
  duracao: string;
  status: "disponivel" | "ocupado";
}

interface Laboratorio {
  id: string;
  nome: string;
  tipo: string;
  capacidade: string;
  horarios: TimeSlot[];
}

interface ProximaPratica {
  id: string;
  data: string;
  diaSemana: string;
  horario: string;
  atividade: string;
  laboratorio: string;
  color: "purple" | "green" | "orange";
}

const laboratorios: Laboratorio[] = [
  {
    id: "1",
    nome: "Lab Química",
    tipo: "Química Geral",
    capacidade: "30 alunos",
    horarios: [
      {
        id: "q1",
        horarioInicio: "08:00",
        horarioFim: "10:00",
        duracao: "2h",
        status: "disponivel",
      },
      {
        id: "q2",
        horarioInicio: "10:30",
        horarioFim: "12:30",
        duracao: "2h",
        status: "ocupado",
      },
      {
        id: "q3",
        horarioInicio: "14:00",
        horarioFim: "16:00",
        duracao: "2h",
        status: "disponivel",
      },
      {
        id: "q4",
        horarioInicio: "16:30",
        horarioFim: "18:30",
        duracao: "2h",
        status: "disponivel",
      },
      {
        id: "q5",
        horarioInicio: "19:00",
        horarioFim: "21:00",
        duracao: "2h",
        status: "ocupado",
      },
    ],
  },
  {
    id: "2",
    nome: "Lab Biologia",
    tipo: "Biologia Geral",
    capacidade: "25 alunos",
    horarios: [
      {
        id: "b1",
        horarioInicio: "08:00",
        horarioFim: "10:00",
        duracao: "2h",
        status: "ocupado",
      },
      {
        id: "b2",
        horarioInicio: "10:30",
        horarioFim: "12:30",
        duracao: "2h",
        status: "disponivel",
      },
      {
        id: "b3",
        horarioInicio: "14:00",
        horarioFim: "16:00",
        duracao: "2h",
        status: "disponivel",
      },
      {
        id: "b4",
        horarioInicio: "16:30",
        horarioFim: "18:30",
        duracao: "2h",
        status: "ocupado",
      },
    ],
  },
  {
    id: "3",
    nome: "Lab Multidisciplinar",
    tipo: "Práticas integradas",
    capacidade: "35 alunos",
    horarios: [
      {
        id: "m1",
        horarioInicio: "08:00",
        horarioFim: "10:00",
        duracao: "2h",
        status: "disponivel",
      },
      {
        id: "m2",
        horarioInicio: "10:30",
        horarioFim: "12:30",
        duracao: "2h",
        status: "disponivel",
      },
      {
        id: "m3",
        horarioInicio: "14:00",
        horarioFim: "16:00",
        duracao: "2h",
        status: "ocupado",
      },
      {
        id: "m4",
        horarioInicio: "16:30",
        horarioFim: "18:30",
        duracao: "2h",
        status: "disponivel",
      },
    ],
  },
];

const proximasPraticas: ProximaPratica[] = [
  {
    id: "1",
    data: "11/05/2026",
    diaSemana: "Seg",
    horario: "08:00 – 10:00",
    atividade: "Prática de Titulação",
    laboratorio: "Lab Química",
    color: "purple",
  },
  {
    id: "2",
    data: "13/05/2026",
    diaSemana: "Qua",
    horario: "10:30 – 12:30",
    atividade: "Biologia Celular",
    laboratorio: "Lab Biologia",
    color: "green",
  },
  {
    id: "3",
    data: "16/05/2026",
    diaSemana: "Sáb",
    horario: "14:00 – 16:00",
    atividade: "Células da Natureza",
    laboratorio: "Lab Multidisciplinar",
    color: "orange",
  },
];

export function AgendamentosPage() {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 4, 9));
  const [visibleMonth, setVisibleMonth] = useState(new Date(2026, 4, 1));
  const [selectedLabIndex, setSelectedLabIndex] = useState(0);
  const [selectedSlotId, setSelectedSlotId] = useState("q3");

  const selectedLab = laboratorios[selectedLabIndex];
  const selectedSlot = selectedLab.horarios.find(
    (slot) => slot.id === selectedSlotId
  );

  const changeLab = (direction: "previous" | "next") => {
    setSelectedLabIndex((currentIndex) => {
      const nextIndex =
        direction === "previous"
          ? currentIndex === 0
            ? laboratorios.length - 1
            : currentIndex - 1
          : currentIndex === laboratorios.length - 1
          ? 0
          : currentIndex + 1;

      const nextLab = laboratorios[nextIndex];
      const firstAvailableSlot = nextLab.horarios.find(
        (slot) => slot.status === "disponivel"
      );

      setSelectedSlotId(firstAvailableSlot?.id ?? nextLab.horarios[0].id);

      return nextIndex;
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 text-slate-900">
      <div className="mx-auto max-w-[1500px]">
        <PageHeader />

        <StatsCards />

        <FiltersBar selectedDate={selectedDate} selectedLab={selectedLab} />

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[410px_1fr_450px]">
          <CalendarCard
            selectedDate={selectedDate}
            visibleMonth={visibleMonth}
            onSelectDate={setSelectedDate}
            onPreviousMonth={() => setVisibleMonth((date) => subMonths(date, 1))}
            onNextMonth={() => setVisibleMonth((date) => addMonths(date, 1))}
          />

          <AvailableHoursCard
            selectedDate={selectedDate}
            selectedLab={selectedLab}
            selectedSlotId={selectedSlotId}
            onPreviousLab={() => changeLab("previous")}
            onNextLab={() => changeLab("next")}
            onSelectSlot={setSelectedSlotId}
          />

          <ScheduleSupportCard
            selectedDate={selectedDate}
            selectedLab={selectedLab}
            selectedSlot={selectedSlot}
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_540px]">
          <UpcomingPracticesCard />

          <SpacesAvailabilityCard />
        </div>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">
          Reservas do Laboratório
        </h1>

        <p className="mt-2 text-base text-slate-500">
          Consulte a disponibilidade dos laboratórios e agende suas práticas.
        </p>
      </div>

      <button className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(22,163,74,0.22)] transition hover:bg-green-700">
        <Plus className="h-5 w-5" />
        Nova reserva
      </button>
    </div>
  );
}

function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        icon={<CalendarCheck className="h-8 w-8 text-green-600" />}
        title="Salas disponíveis hoje"
        value="3"
        color="green"
      />

      <StatCard
        icon={<Clock className="h-8 w-8 text-violet-600" />}
        title="Próxima disponibilidade"
        value="Hoje, 14:00"
        description="Lab Química"
        color="purple"
      />

      <StatCard
        icon={<Calendar className="h-8 w-8 text-blue-600" />}
        title="Minhas práticas agendadas"
        value="3"
        description="Esta semana"
        color="blue"
      />

      <StatCard
        icon={<FlaskConical className="h-8 w-8 text-orange-500" />}
        title="Horários livres hoje"
        value="6"
        description="Slots disponíveis"
        color="orange"
      />
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  description,
  color,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  description?: string;
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
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${colorClass}`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>

        {description && (
          <p className="mt-1 text-sm font-medium text-slate-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function FiltersBar({
  selectedDate,
  selectedLab,
}: {
  selectedDate: Date;
  selectedLab: Laboratorio;
}) {
  return (
    <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
        <FilterField label="Laboratório / Sala" value={selectedLab.nome} />

        <FilterField
          label="Data"
          value={format(selectedDate, "dd/MM/yyyy")}
          icon={<Calendar className="h-5 w-5 text-slate-500" />}
        />

        <FilterField label="Turno" value="Todos" />

        <FilterField label="Tipo de prática" value="Todos" />

        <button className="flex h-[68px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
          <RotateCcw className="h-4 w-4" />
          Limpar filtros
        </button>
      </div>
    </div>
  );
}

function FilterField({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
}) {
  return (
    <button className="flex h-[68px] items-center justify-between rounded-xl border border-slate-200 bg-white px-5 text-left transition hover:bg-slate-50">
      <div>
        <p className="text-sm font-semibold text-slate-500">{label}</p>
        <p className="mt-1 text-base font-bold text-slate-800">{value}</p>
      </div>

      {icon ?? <ChevronDown className="h-5 w-5 text-slate-500" />}
    </button>
  );
}

function CalendarCard({
  selectedDate,
  visibleMonth,
  onSelectDate,
  onPreviousMonth,
  onNextMonth,
}: {
  selectedDate: Date;
  visibleMonth: Date;
  onSelectDate: (date: Date) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}) {
  const calendarDays = buildCalendarDays(visibleMonth);

  return (
    <Card>
      <SectionTitle
        icon={<Calendar className="h-5 w-5 text-green-600" />}
        title="Calendário"
      />

      <div className="mt-7 flex items-center justify-between px-2">
        <button
          onClick={onPreviousMonth}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <h3 className="text-lg font-bold text-slate-950">
          {capitalize(format(visibleMonth, "MMMM yyyy", { locale: ptBR }))}
        </h3>

        <button
          onClick={onNextMonth}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-7 grid grid-cols-7 text-center text-sm font-medium text-slate-500">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-7 gap-y-4 text-center">
        {calendarDays.map((item) => {
          const selected = isSameDay(item.date, selectedDate);
          const currentMonth = isSameMonth(item.date, visibleMonth);
          const marker = getCalendarMarker(item.date, currentMonth);

          return (
            <div key={item.key} className="flex justify-center">
              <button
                onClick={() => onSelectDate(item.date)}
                className={`relative flex h-9 w-9 items-center justify-center rounded-full text-base font-medium transition ${
                  selected
                    ? "bg-green-600 text-white shadow-[0_8px_18px_rgba(22,163,74,0.28)]"
                    : currentMonth
                    ? "text-slate-700 hover:bg-slate-100"
                    : "text-slate-300 hover:bg-slate-50"
                }`}
              >
                {format(item.date, "d")}

                {marker && !selected && (
                  <span
                    className={`absolute bottom-0.5 h-1.5 w-1.5 rounded-full ${marker}`}
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="-mx-6 mt-7 border-t border-slate-200 px-6 pt-4">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="font-bold text-slate-900">Legenda</span>
          <LegendDot color="green" label="Disponível" />
          <LegendDot color="orange" label="Ocupado" />
        </div>
      </div>
    </Card>
  );
}

function AvailableHoursCard({
  selectedDate,
  selectedLab,
  selectedSlotId,
  onPreviousLab,
  onNextLab,
  onSelectSlot,
}: {
  selectedDate: Date;
  selectedLab: Laboratorio;
  selectedSlotId: string;
  onPreviousLab: () => void;
  onNextLab: () => void;
  onSelectSlot: (id: string) => void;
}) {
  return (
    <Card>
      <SectionTitle
        icon={<CalendarCheck className="h-5 w-5 text-green-600" />}
        title={`Horários disponíveis — ${format(
          selectedDate,
          "dd 'de' MMMM 'de' yyyy",
          { locale: ptBR }
        )}`}
      />

      <div className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-violet-50 p-1 text-sm font-bold text-slate-800">
        <button
          type="button"
          onClick={onPreviousLab}
          className="flex h-9 w-9 items-center justify-center rounded-full text-violet-600 transition hover:bg-violet-100"
          aria-label="Laboratório anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex min-w-[170px] items-center justify-center gap-3 px-2">
          <FlaskConical className="h-5 w-5 text-violet-600" />
          <span>{selectedLab.nome}</span>
        </div>

        <button
          type="button"
          onClick={onNextLab}
          className="flex h-9 w-9 items-center justify-center rounded-full text-violet-600 transition hover:bg-violet-100"
          aria-label="Próximo laboratório"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {selectedLab.horarios.map((slot) => (
          <TimeSlotRow
            key={slot.id}
            slot={slot}
            selected={slot.id === selectedSlotId}
            onSelect={() => onSelectSlot(slot.id)}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
        <RefreshCw className="h-4 w-4" />
        Atualizado agora há pouco
      </div>
    </Card>
  );
}

function TimeSlotRow({
  slot,
  selected,
  onSelect,
}: {
  slot: TimeSlot;
  selected: boolean;
  onSelect: () => void;
}) {
  const isAvailable = slot.status === "disponivel";

  const statusClass = {
    disponivel: "bg-green-100 text-green-700",
    ocupado: "bg-orange-100 text-orange-600",
  }[slot.status];

  const statusLabel = {
    disponivel: "Disponível",
    ocupado: "Ocupado",
  }[slot.status];

  return (
    <div
      className={`grid grid-cols-1 items-center gap-3 rounded-xl border px-5 py-3 md:grid-cols-[1fr_70px_150px_150px] ${
        selected
          ? "border-green-300 bg-green-50"
          : "border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      <p className="text-lg font-semibold text-slate-800">
        {slot.horarioInicio} – {slot.horarioFim}
      </p>

      <p className="text-sm font-medium text-slate-500">{slot.duracao}</p>

      <span
        className={`inline-flex justify-center rounded-lg px-4 py-2 text-sm font-bold ${statusClass}`}
      >
        {statusLabel}
      </span>

      {isAvailable && (
        <button
          onClick={onSelect}
          className="rounded-xl border border-green-500 bg-white px-5 py-2.5 text-sm font-bold text-green-600 transition hover:bg-green-50"
        >
          Selecionar
        </button>
      )}
    </div>
  );
}

function ScheduleSupportCard({
  selectedDate,
  selectedLab,
  selectedSlot,
}: {
  selectedDate: Date;
  selectedLab: Laboratorio;
  selectedSlot?: TimeSlot;
}) {
  return (
    <Card>
      <SectionTitle
        icon={<CalendarDays className="h-6 w-6 text-violet-600" />}
        title="Apoio para agendamento"
      />

      <div className="mt-6 rounded-2xl border border-green-300 bg-green-50/50 p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-violet-100">
              <FlaskConical className="h-9 w-9 text-violet-600" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Sala selecionada
              </p>

              <h3 className="text-2xl font-bold text-slate-950">
                {selectedLab.nome}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Capacidade: {selectedLab.capacidade}
              </p>

              <p className="text-sm text-slate-500">
                Tipo: {selectedLab.tipo}
              </p>
            </div>
          </div>

          <span className="rounded-lg bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
            Disponível
          </span>
        </div>
      </div>

      <SupportInfo
        icon={<Calendar className="h-7 w-7 text-slate-600" />}
        title="Data selecionada"
        value={format(selectedDate, "dd 'de' MMMM 'de' yyyy (EEEE)", {
          locale: ptBR,
        })}
      />

      <SupportInfo
        icon={<Clock className="h-7 w-7 text-slate-600" />}
        title="Horário selecionado"
        value={
          selectedSlot
            ? `${selectedSlot.horarioInicio} – ${selectedSlot.horarioFim} (${selectedSlot.duracao})`
            : "Nenhum horário selecionado"
        }
      />

      <button className="mt-5 w-full rounded-xl bg-green-600 py-4 text-lg font-bold text-white shadow-[0_12px_24px_rgba(22,163,74,0.22)] transition hover:bg-green-700">
        Solicitar agendamento
      </button>

      <p className="mt-4 text-center text-sm text-slate-500">
        Você poderá revisar os detalhes antes de confirmar.
      </p>
    </Card>
  );
}

function SupportInfo({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="mt-4 flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <p className="text-lg font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function UpcomingPracticesCard() {
  return (
    <Card>
      <SectionTitle
        icon={<ClipboardList className="h-5 w-5 text-violet-600" />}
        title="Minhas próximas práticas"
      />

      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
        {proximasPraticas.map((practice) => (
          <div
            key={practice.id}
            className="grid grid-cols-1 items-center gap-3 border-b border-slate-100 px-5 py-3 last:border-b-0 md:grid-cols-[130px_70px_150px_1fr_170px]"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Clock className="h-4 w-4 text-slate-400" />
              {practice.data}
            </div>

            <p className="text-sm font-medium text-slate-500">
              {practice.diaSemana}
            </p>

            <p className="text-sm font-semibold text-slate-500">
              {practice.horario}
            </p>

            <p className="text-base font-bold text-slate-800">
              {practice.atividade}
            </p>

            <span
              className={`w-fit rounded-lg px-4 py-2 text-sm font-bold ${getPracticeTagClass(
                practice.color
              )}`}
            >
              {practice.laboratorio}
            </span>
          </div>
        ))}
      </div>

      <button className="mx-auto mt-5 block text-sm font-bold text-green-600">
        Ver todas
      </button>
    </Card>
  );
}

function SpacesAvailabilityCard() {
  return (
    <Card>
      <SectionTitle
        icon={<CalendarCheck className="h-5 w-5 text-blue-600" />}
        title="Disponibilidade dos espaços"
      />

      <div className="mt-6 space-y-4">
        <SpaceAvailability
          name="Lab Química"
          status="Disponível agora"
          color="green"
        />

        <SpaceAvailability
          name="Lab Biologia"
          status="Disponível agora"
          color="green"
        />

        <SpaceAvailability
          name="Lab Multidisciplinar"
          status="Próxima: 14:00"
          color="orange"
        />
      </div>

      <div className="mt-7 flex items-center gap-2 text-sm text-slate-500">
        <Info className="h-4 w-4" />
        Os horários são atualizados em tempo real.
      </div>
    </Card>
  );
}

function SpaceAvailability({
  name,
  status,
  color,
}: {
  name: string;
  status: string;
  color: "green" | "orange";
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-base font-bold text-slate-800">{name}</p>

      <span
        className={`rounded-lg px-5 py-2 text-sm font-bold ${
          color === "green"
            ? "bg-green-100 text-green-700"
            : "bg-orange-100 text-orange-600"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {children}
    </section>
  );
}

function SectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
    </div>
  );
}

function LegendDot({
  color,
  label,
}: {
  color: "green" | "orange";
  label: string;
}) {
  const colorClass = {
    green: "bg-green-500",
    orange: "bg-orange-400",
  }[color];

  return (
    <span className="flex items-center gap-2 text-slate-500">
      <span className={`h-2.5 w-2.5 rounded-full ${colorClass}`} />
      {label}
    </span>
  );
}

function buildCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const totalDays = getDaysInMonth(monthDate);
  const firstDayOfWeek = getDay(new Date(year, month, 1));

  const previousMonth = subMonths(monthDate, 1);
  const previousMonthTotalDays = getDaysInMonth(previousMonth);

  const days: { date: Date; key: string }[] = [];

  for (let index = firstDayOfWeek - 1; index >= 0; index--) {
    const day = previousMonthTotalDays - index;
    const date = new Date(
      previousMonth.getFullYear(),
      previousMonth.getMonth(),
      day
    );

    days.push({
      date,
      key: `previous-${day}`,
    });
  }

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day);

    days.push({
      date,
      key: `current-${day}`,
    });
  }

  const nextMonth = addMonths(monthDate, 1);
  let nextDay = 1;

  while (days.length < 42) {
    const date = new Date(
      nextMonth.getFullYear(),
      nextMonth.getMonth(),
      nextDay
    );

    days.push({
      date,
      key: `next-${nextDay}`,
    });

    nextDay++;
  }

  return days;
}

function getCalendarMarker(date: Date, currentMonth: boolean) {
  if (!currentMonth) return null;

  const day = Number(format(date, "d"));

  const availableDays = [10, 11, 12, 15, 17, 18, 24];
  const occupiedDays = [4, 5, 14];

  if (availableDays.includes(day)) return "bg-green-500";
  if (occupiedDays.includes(day)) return "bg-orange-400";

  return null;
}

function getPracticeTagClass(color: "purple" | "green" | "orange") {
  const colors = {
    purple: "bg-violet-100 text-violet-700",
    green: "bg-green-100 text-green-700",
    orange: "bg-orange-100 text-orange-600",
  };

  return colors[color];
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}