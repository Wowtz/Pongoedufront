import type { ReactNode } from "react";
import {
  Award,
  BookOpen,
  ChevronRight,
  ClipboardList,
  Flame,
  FlaskConical,
  Gamepad2,
  Heart,
  Leaf,
  Play,
  Sparkles,
  Star,
  Target,
  Trophy,
} from "lucide-react";

export function AlunoDashboard() {
  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Próxima aula */}
        <section className="relative overflow-hidden rounded-[28px] border border-purple-200 bg-gradient-to-br from-white via-purple-50/70 to-violet-100/70 p-8 shadow-[0_18px_45px_rgba(109,40,217,0.10)]">
      

          <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-[34px] bg-gradient-to-br from-purple-100 to-violet-200">
                  <FlaskConical className="h-20 w-20 text-violet-600 drop-shadow-lg" />
                </div>

                <div className="flex flex-1 flex-col justify-center">
                  <p className="mb-3 text-sm font-bold uppercase tracking-wide text-violet-600">
                    Próxima aula
                  </p>

                  <h1 className="mb-4 text-3xl font-bold text-slate-950">
                    Ligações Químicas
                  </h1>

                  <p className="max-w-md text-lg leading-relaxed text-slate-600">
                    Entenda como os átomos se conectam e formam substâncias.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                      +25 XP
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
                      <FlaskConical className="h-4 w-4" />
                      Química
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
                  <span>Seu progresso</span>
                  <span>65%</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-violet-100">
                  <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-violet-400 to-purple-700" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-8">
              <MoleculeIllustration />

              <button className="flex w-full items-center justify-center gap-4 rounded-[22px] bg-gradient-to-r from-violet-500 to-purple-700 px-8 py-5 text-lg font-bold text-white shadow-[0_14px_26px_rgba(109,40,217,0.30)] transition hover:scale-[1.02]">
                <Play className="h-6 w-6 fill-white" />
                Continuar agora
              </button>
            </div>
          </div>
        </section>

        {/* Cards de status */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatusCard
            icon={<Flame className="h-9 w-9 fill-orange-500 text-orange-500" />}
            title="Ofensiva (dias)"
            value="7"
            description="Continue assim!"
            valueClassName="text-orange-500"
            cardClassName="border-orange-200 bg-gradient-to-br from-orange-50 to-white"
          />

          <StatusCard
            icon={<Star className="h-9 w-9 text-amber-500" />}
            title="XP Total"
            value="1240"
            description="+80 esta semana"
            valueClassName="text-amber-500"
            cardClassName="border-amber-200 bg-gradient-to-br from-amber-50 to-white"
          />

          <StatusCard
            icon={<Trophy className="h-9 w-9 text-green-600" />}
            title="Posição na turma"
            value="#3"
            description="Entre 28 alunos"
            valueClassName="text-green-600"
            cardClassName="border-green-200 bg-gradient-to-br from-green-50 to-white"
          />

          <StatusCard
            icon={<Heart className="h-9 w-9 fill-red-500 text-red-500" />}
            title="Energia"
            value="5/5"
            description="Cheia!"
            valueClassName="text-red-500"
            cardClassName="border-red-200 bg-gradient-to-br from-red-50 to-white"
          />
        </section>

        {/* Minhas trilhas */}
        <section>
          <SectionHeader
            icon={<BookOpen className="h-6 w-6 text-violet-600" />}
            title="Minhas trilhas"
            action="Ver todas as trilhas"
          />

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
            <TrailCard
              icon={
                <FlaskConical className="h-9 w-9 text-white drop-shadow-sm" />
              }
              title="Química"
              subtitle="Nível atual: 1 - Átomo"
              progress={65}
              completed="2 de 3 níveis concluídos"
              buttonText="Continuar trilha"
              theme="purple"
            />

            <TrailCard
              icon={<Leaf className="h-9 w-9 text-white drop-shadow-sm" />}
              title="Biologia"
              subtitle="Nível atual: 1 - Célula"
              progress={33}
              completed="1 de 3 níveis concluídos"
              buttonText="Continuar trilha"
              theme="green"
            />
          </div>
        </section>

        {/* Atividades + Ranking */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
            <SectionHeader
              icon={<ClipboardList className="h-6 w-6 text-violet-600" />}
              title="Próximas atividades"
              action="Ver todas"
              compact
            />

            <div className="space-y-5">
              <ActivityRow
                icon={<FlaskConical className="h-6 w-6 text-violet-600" />}
                title="Prática: Titulação Ácido-Base"
                subtitle="Turma 6º Ano C • Química"
                badge="Amanhã"
                date="10/05"
                badgeClassName="bg-red-50 text-red-500"
                iconClassName="bg-violet-100"
              />

              <ActivityRow
                icon={<BookOpen className="h-6 w-6 text-green-600" />}
                title="Relatório de Laboratório"
                subtitle="Turma 6º Ano C • Biologia"
                badge="3 dias"
                date="13/05"
                badgeClassName="bg-amber-50 text-amber-500"
                iconClassName="bg-green-100"
              />

              <ActivityRow
                icon={<Gamepad2 className="h-6 w-6 text-violet-600" />}
                title="Game Química N2"
                subtitle="Turma 6º Ano C • Química"
                badge="5 dias"
                date="15/05"
                badgeClassName="bg-green-50 text-green-600"
                iconClassName="bg-violet-100"
              />
            </div>

            <button className="mx-auto mt-7 flex items-center gap-2 text-sm font-semibold text-violet-700">
              Ver todas as atividades
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
            <SectionHeader
              icon={<Trophy className="h-6 w-6 text-amber-500" />}
              title="Ranking da turma"
              action="Ver ranking"
              compact
            />

            <div className="space-y-4">
              <RankingRow
                position="1"
                name="Ana"
                xp="1500 XP"
                avatar="👩🏻"
                medalClassName="bg-amber-300 text-amber-900"
              />

              <RankingRow
                position="2"
                name="Carlos"
                xp="1320 XP"
                avatar="👦🏻"
                medalClassName="bg-slate-200 text-slate-600"
              />

              <RankingRow
                position="3"
                name="Você"
                xp="1240 XP"
                avatar="👩🏻"
                medalClassName="bg-orange-300 text-orange-900"
                current
              />
            </div>
          </div>
        </section>

        {/* Conquistas recentes */}
        <section className="rounded-[24px] border border-slate-200 bg-white p-7 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
          <SectionHeader
            icon={<Award className="h-6 w-6 text-green-600" />}
            title="Conquistas recentes"
            action="Ver todas"
            compact
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <AchievementCard
              icon={<FlaskConical className="h-10 w-10 text-white" />}
              title="Químico Iniciante"
              description="Concluiu 5 aulas de Química"
              color="green"
            />

            <AchievementCard
              icon={<Target className="h-10 w-10 text-white" />}
              title="Foco Total"
              description="Manteve 7 dias de ofensiva"
              color="purple"
            />

            <AchievementCard
              icon={<Trophy className="h-10 w-10 text-white" />}
              title="Explorador"
              description="Iniciou 2 trilhas diferentes"
              color="green"
            />

            <AchievementCard
              icon={<Gamepad2 className="h-10 w-10 text-white" />}
              title="Gamer"
              description="Completou 3 games com sucesso"
              color="purple"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function StatusCard({
  icon,
  title,
  value,
  description,
  valueClassName,
  cardClassName,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  description: string;
  valueClassName: string;
  cardClassName: string;
}) {
  return (
    <div className={`rounded-[22px] border p-6 ${cardClassName}`}>
      <div className="mb-5 flex items-center gap-4">
        {icon}
        <p className="text-sm font-medium text-slate-700">{title}</p>
      </div>

      <p className={`mb-2 text-4xl font-bold ${valueClassName}`}>{value}</p>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  action,
  compact = false,
}: {
  icon: ReactNode;
  title: string;
  action: string;
  compact?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between ${compact ? "mb-6" : "mb-5"}`}>
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      </div>

      <button className="flex items-center gap-2 text-sm font-semibold text-violet-700">
        {action}
        {!compact && <ChevronRight className="h-5 w-5" />}
      </button>
    </div>
  );
}

function TrailCard({
  icon,
  title,
  subtitle,
  progress,
  completed,
  buttonText,
  theme,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  progress: number;
  completed: string;
  buttonText: string;
  theme: "purple" | "green";
}) {
  const isPurple = theme === "purple";

  return (
    <div
      className={`relative overflow-hidden rounded-[22px] border p-7 shadow-[0_12px_35px_rgba(15,23,42,0.04)] ${
        isPurple
          ? "border-violet-200 bg-gradient-to-br from-white to-violet-50"
          : "border-green-200 bg-gradient-to-br from-white to-green-50"
      }`}
    >
      <div
        className={`absolute right-8 top-5 h-24 w-24 rounded-full opacity-20 ${
          isPurple ? "bg-violet-300" : "bg-green-300"
        }`}
      />

      <div
        className={`absolute right-16 top-20 h-12 w-12 rounded-full opacity-20 ${
          isPurple ? "bg-violet-300" : "bg-green-300"
        }`}
      />

      <div className="relative">
        <div className="mb-7 flex items-center gap-5">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg ${
              isPurple
                ? "bg-gradient-to-br from-violet-400 to-purple-700"
                : "bg-gradient-to-br from-lime-400 to-green-700"
            }`}
          >
            {icon}
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>

        <div className="mb-3 h-3 overflow-hidden rounded-full bg-slate-200/80">
          <div
            className={`h-full rounded-full ${
              isPurple
                ? "bg-gradient-to-r from-violet-400 to-purple-700"
                : "bg-gradient-to-r from-lime-400 to-green-600"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mb-5 flex items-center justify-between text-sm">
          <span className="text-slate-500">{completed}</span>
          <span className="font-semibold text-slate-700">{progress}%</span>
        </div>

        <button
          className={`w-full rounded-2xl border bg-white/70 py-4 text-base font-semibold ${
            isPurple
              ? "border-violet-300 text-violet-700"
              : "border-green-300 text-green-700"
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

function ActivityRow({
  icon,
  title,
  subtitle,
  badge,
  date,
  badgeClassName,
  iconClassName,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  badge: string;
  date: string;
  badgeClassName: string;
  iconClassName: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconClassName}`}>
          {icon}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="text-right">
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${badgeClassName}`}>
          {badge}
        </span>
        <p className="mt-2 text-sm text-slate-500">{date}</p>
      </div>
    </div>
  );
}

function RankingRow({
  position,
  name,
  xp,
  avatar,
  medalClassName,
  current = false,
}: {
  position: string;
  name: string;
  xp: string;
  avatar: string;
  medalClassName: string;
  current?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl px-4 py-3">
      <div className="flex items-center gap-4">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${medalClassName}`}
        >
          {position}
        </span>

        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-amber-100 text-3xl">
          {avatar}
        </span>

        <p className={`font-semibold ${current ? "text-violet-700" : "text-slate-800"}`}>
          {name}
        </p>
      </div>

      <p className="font-bold text-violet-700">{xp}</p>
    </div>
  );
}

function AchievementCard({
  icon,
  title,
  description,
  color,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  color: "green" | "purple";
}) {
  const colorClass =
    color === "green"
      ? "from-lime-400 via-green-500 to-green-700"
      : "from-violet-400 via-purple-500 to-purple-800";

  return (
    <div className="flex flex-col items-center border-slate-200 text-center sm:border-r last:border-r-0">
      <div
        className={`mb-4 flex h-24 w-24 items-center justify-center bg-gradient-to-br ${colorClass} shadow-lg`}
        style={{
          clipPath:
            "polygon(25% 6%, 75% 6%, 100% 30%, 100% 70%, 75% 94%, 25% 94%, 0 70%, 0 30%)",
        }}
      >
        {icon}
      </div>

      <h3 className="mb-2 font-bold text-slate-900">{title}</h3>
      <p className="max-w-[150px] text-sm leading-relaxed text-slate-500">
        {description}
      </p>
    </div>
  );
}

function MoleculeIllustration() {
  return (
    <div className="relative h-40 w-56">
      {/* estrelas decorativas */}
      <div className="absolute left-2 top-8 text-violet-300">
        <Sparkles className="h-5 w-5 fill-current" />
      </div>
      <div className="absolute right-4 top-10 text-violet-300">
        <Sparkles className="h-3.5 w-3.5 fill-current" />
      </div>
      <div className="absolute right-16 bottom-2 text-violet-300">
        <Sparkles className="h-4 w-4 fill-current" />
      </div>

      {/* conexões */}
      <div className="absolute left-[88px] top-[73px] h-[8px] w-[74px] rotate-[-50deg] rounded-full bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-300 shadow-sm" />
      <div className="absolute left-[92px] top-[84px] h-[8px] w-[62px] rotate-[13deg] rounded-full bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-300 shadow-sm" />
      <div className="absolute left-[44px] top-[98px] h-[8px] w-[72px] rotate-[-35deg] rounded-full bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-300 shadow-sm" />

      {/* átomo central */}
      <div className="absolute left-[56px] top-[54px] h-20 w-20 rounded-full bg-[radial-gradient(circle_at_35%_30%,#eef2ff_0%,#c7d2fe_38%,#a5b4fc_68%,#818cf8_100%)] shadow-[inset_-8px_-10px_16px_rgba(99,102,241,0.22),inset_10px_10px_18px_rgba(255,255,255,0.7),0_8px_18px_rgba(99,102,241,0.18)]" />

      {/* átomo superior */}
      <div className="absolute left-[126px] top-[12px] h-14 w-14 rounded-full bg-[radial-gradient(circle_at_35%_30%,#eef2ff_0%,#c7d2fe_38%,#a5b4fc_68%,#818cf8_100%)] shadow-[inset_-6px_-8px_12px_rgba(99,102,241,0.22),inset_8px_8px_14px_rgba(255,255,255,0.7),0_6px_14px_rgba(99,102,241,0.16)]" />

      {/* átomo direito */}
      <div className="absolute left-[150px] top-[84px] h-14 w-14 rounded-full bg-[radial-gradient(circle_at_35%_30%,#eef2ff_0%,#c7d2fe_38%,#a5b4fc_68%,#818cf8_100%)] shadow-[inset_-6px_-8px_12px_rgba(99,102,241,0.22),inset_8px_8px_14px_rgba(255,255,255,0.7),0_6px_14px_rgba(99,102,241,0.16)]" />

      {/* átomo inferior esquerdo */}
      <div className="absolute left-[18px] top-[108px] h-11 w-11 rounded-full bg-[radial-gradient(circle_at_35%_30%,#eef2ff_0%,#c7d2fe_38%,#a5b4fc_68%,#818cf8_100%)] shadow-[inset_-5px_-6px_10px_rgba(99,102,241,0.22),inset_6px_6px_10px_rgba(255,255,255,0.7),0_5px_12px_rgba(99,102,241,0.14)]" />
    </div>
  );
}