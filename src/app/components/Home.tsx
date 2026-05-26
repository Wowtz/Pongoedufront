import { Link } from "react-router";
import {
  ArrowRight,
  Atom,
  Award,
  Beaker,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  FlaskConical,
  GraduationCap,
  Leaf,
  LockKeyhole,
  Microscope,
  Play,
  Route,
  Sparkles,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { MascotLogo } from "./mascot-logo";

export function Home() {
  return (
    <div className="min-h-screen bg-[#fbfbff] text-slate-900">
      <Header />

      <main>
        <HeroSection />
        <HowItWorksSection />
        <PopularTrailsSection />
        <GamificationSection />
        <TeacherResourcesSection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-[0_4px_18px_rgba(15,23,42,0.05)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-[70px] w-[60px] items-center justify-center">
            <MascotLogo />
          </div>

          <div>
            <h1 className="text-2xl font-bold leading-none">
              <span className="text-green-600">Pongo</span>
              <span className="text-violet-600">Edu</span>
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Gestão educacional e laboratorial
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <button className="flex items-center gap-2 rounded-xl border border-violet-300 bg-white px-8 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50">
              <ArrowRight className="h-4 w-4" />
              Entrar
            </button>
          </Link>

          <Link to="/criar-conta">
            <button className="rounded-xl bg-gradient-to-r from-violet-500 to-purple-700 px-8 py-3 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(109,40,217,0.25)] transition hover:scale-[1.02]">
              Criar conta
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20">
      <div className="absolute left-[50%] top-20 h-4 w-4 rounded-full bg-violet-500" />
      <div className="absolute right-24 top-48 h-5 w-5 rounded-full bg-blue-500 opacity-80" />
      <div className="absolute right-8 top-80 h-36 w-36 rounded-full border border-violet-200 bg-violet-100/40" />
      <div className="absolute left-10 top-72 h-3 w-3 rounded-full bg-green-500" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-100 px-5 py-2 text-sm font-bold text-violet-700">
            <Star className="h-4 w-4" />
            Plataforma de Trilhas e Gamificação
          </div>

          <h2 className="max-w-2xl text-5xl font-bold leading-tight text-slate-950">
            Aprendizado em{" "}
            <span className="text-violet-600">trilhas</span>
            <br />
            que <span className="text-green-600">engajam</span> seus alunos
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-600">
            Professores organizam conteúdos, atividades e práticas em trilhas
            gamificadas. Alunos avançam por níveis, ganham badges e evoluem com
            mais motivação.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/criar-conta">
              <button className="flex items-center gap-3 rounded-2xl bg-green-600 px-9 py-4 font-bold text-white shadow-[0_14px_24px_rgba(22,163,74,0.25)] transition hover:scale-[1.02]">
                Começar agora
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>

            <button className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-9 py-4 font-bold text-slate-800 shadow-sm transition hover:bg-slate-50">
              <Play className="h-5 w-5 fill-slate-900" />
              Ver demonstração
            </button>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            <MiniBenefitCard
              icon={<Zap className="h-7 w-7 text-green-600" />}
              title="+Engajamento"
              description="Alunos mais motivados"
            />

            <MiniBenefitCard
              icon={<Route className="h-7 w-7 text-violet-600" />}
              title="Trilhas por níveis"
              description="Aprendizado estruturado"
            />

            <MiniBenefitCard
              icon={<Trophy className="h-7 w-7 text-green-600" />}
              title="Badges e rankings"
              description="Reconhecimento real"
            />
          </div>
        </div>

        <StudentDashboardPreview />
      </div>
    </section>
  );
}

function StudentDashboardPreview() {
  return (
    <div className="relative">
      <div className="rounded-[28px] border border-violet-200 bg-white p-7 shadow-[0_24px_60px_rgba(109,40,217,0.16)]">
        <div className="mb-7 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-950">Olá, Maria! 👋</h3>
            <p className="mt-1 text-sm text-slate-500">
              Continue sua jornada de aprendizado
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900">Nível 6</p>
              <p className="text-xs text-slate-500">2.450 XP</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 text-white shadow-lg">
              <Award className="h-7 w-7" />
            </div>
          </div>
        </div>

        <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Progresso da trilha
              </p>
              <p className="font-bold text-slate-950">Química Geral</p>
            </div>

            <span className="text-sm font-bold text-slate-800">78%</span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[78%] rounded-full bg-green-600" />
          </div>
        </div>

        <div className="mb-7">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-bold text-slate-900">Próximos módulos</h4>
            <button className="text-sm font-semibold text-violet-600">
              Ver todos
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <ModulePreviewCard
              icon={<Zap className="h-7 w-7 text-green-600" />}
              title="Propriedades da Matéria"
              level="Nível 3"
              done
            />

            <ModulePreviewCard
              icon={<FlaskConical className="h-8 w-8 text-violet-600" />}
              title="Ligações Químicas"
              level="Nível 4"
              active
            />

            <ModulePreviewCard
              icon={<LockKeyhole className="h-7 w-7 text-slate-400" />}
              title="Estequiometria"
              level="Nível 5"
              locked
            />
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h4 className="mb-3 font-bold text-slate-900">
              Atividades próximas
            </h4>

            <div className="space-y-2">
              <PreviewActivity title="Exercícios: Ligações iônicas" xp="100 XP" />
              <PreviewActivity title="Simulação: Reações Químicas" xp="150 XP" />
              <PreviewActivity title="Quiz: Balanceamento" xp="80 XP" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-bold text-slate-900">Badges recentes</h4>
              <button className="text-xs font-semibold text-violet-600">
                Ver todos
              </button>
            </div>

            <div className="flex gap-3">
              <BadgeIcon color="green" icon={<FlaskConical />} />
              <BadgeIcon color="purple" icon={<Star />} />
              <BadgeIcon color="orange" icon={<Trophy />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <section className="border-t border-slate-100 bg-white px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-slate-950">
          Como funciona a{" "}
          <span className="text-green-600">trilha</span>{" "}
          <span className="text-violet-600">de estudos</span>
        </h2>

        <div className="grid items-center gap-8 lg:grid-cols-[1fr_80px_1fr_80px_1fr]">
          <HowCard
            icon={<ClipboardList className="h-9 w-9 text-green-600" />}
            title="Professor cria módulos e níveis"
            description="Organize conteúdos, atividades e critérios em uma trilha personalizada."
            color="green"
          />

          <ArrowDivider />

          <HowCard
            icon={<GraduationCap className="h-9 w-9 text-violet-600" />}
            title="Aluno avança por atividades"
            description="Completa desafios, práticas e quizzes para liberar novos níveis."
            color="purple"
          />

          <ArrowDivider />

          <HowCard
            icon={<Trophy className="h-9 w-9 text-green-600" />}
            title="Badge é conquistada ao concluir a trilha"
            description="Reconhecimento que incentiva e celebra cada conquista."
            color="green"
          />
        </div>
      </div>
    </section>
  );
}

function PopularTrailsSection() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[230px_1fr]">
        <div className="pt-8">
          <div className="mb-6 inline-flex rounded-full border border-violet-200 bg-violet-100 px-5 py-2 text-sm font-bold uppercase text-violet-600">
            Trilhas populares
          </div>

          <h2 className="mb-6 text-4xl font-bold leading-tight text-slate-950">
            Trilhas em{" "}
            <span className="text-violet-600">destaque</span>
          </h2>

          <p className="mb-8 text-slate-600">
            Escolha uma trilha e comece agora sua jornada.
          </p>

        
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <TrailHighlightCard
            icon={<FlaskConical className="h-8 w-8 text-white" />}
            title="Química"
            description="Explore os fundamentos da química com práticas e desafios."
            levels="8"
            progress="78%"
            badge="Explorador"
            color="purple"
            featured
          />

          <TrailHighlightCard
            icon={<Leaf className="h-8 w-8 text-white" />}
            title="Biologia"
            description="Do microscópio ao ecossistema: aprenda fazendo."
            levels="7"
            progress="60%"
            badge="Naturalista"
            color="green"
          />

          <TrailHighlightCard
            icon={<Atom className="h-8 w-8 text-white" />}
            title="Física"
            description="Leis, fenômenos e experimentos na prática."
            levels="6"
            progress="45%"
            badge="Investigador"
            color="blue"
          />
        </div>
      </div>
    </section>
  );
}

function GamificationSection() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[260px_1fr]">
        <div>
          <h2 className="text-3xl font-bold leading-tight text-slate-950">
            <span className="text-green-600">Gamificação</span> que incentiva o{" "}
            <span className="text-violet-600">aprendizado</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          <GamificationCard
            icon={<Zap className="h-6 w-6 text-blue-600" />}
            title="XP e progresso"
            description="Acompanhe sua evolução e desbloqueie novos níveis."
          >
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-xs text-slate-500">
                <span>2.450 / 3.000 XP</span>
                <span>Nível 6</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[72%] rounded-full bg-green-600" />
              </div>
            </div>
          </GamificationCard>

          <GamificationCard
            icon={<Star className="h-6 w-6 text-violet-600" />}
            title="Badges de conquista"
            description="Conquiste badges por realizações e desafios."
          >
            <div className="mt-5 flex gap-2">
              <BadgeIcon color="green" icon={<FlaskConical />} small />
              <BadgeIcon color="purple" icon={<Star />} small />
              <BadgeIcon color="orange" icon={<Trophy />} small />
              <BadgeIcon color="blue" icon={<Atom />} small />
            </div>
          </GamificationCard>

          <GamificationCard
            icon={<Trophy className="h-6 w-6 text-orange-500" />}
            title="Ranking por turma"
            description="Veja sua posição e compita de forma saudável."
          >
            <div className="mt-4 space-y-2 text-xs">
              <RankingLine position="1º" name="Maria S." xp="2.450 XP" />
              <RankingLine position="2º" name="João P." xp="2.100 XP" />
              <RankingLine position="3º" name="Ana L." xp="1.850 XP" />
            </div>
          </GamificationCard>

          <GamificationCard
            icon={<Award className="h-6 w-6 text-violet-600" />}
            title="Sequência de estudos"
            description="Mantenha sua ofensiva e ganhe bônus de XP!"
          >
            <div className="mt-5 flex items-center gap-3">
              <span className="text-4xl">🔥</span>
              <div>
                <p className="text-xl font-bold text-green-600">7 dias</p>
                <p className="text-sm text-slate-500">Sequência atual</p>
              </div>
            </div>
          </GamificationCard>
        </div>
      </div>
    </section>
  );
}

function TeacherResourcesSection() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <div className="rounded-[26px] border border-slate-200 bg-white p-8 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
          <h2 className="mb-7 text-2xl font-bold text-slate-950">
            Recursos para o professor
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <TeacherFeature
              icon={<BookOpen className="h-7 w-7 text-green-600" />}
              title="Organização de conteúdos"
              description="Estruture módulos, aulas e materiais com facilidade."
              color="green"
            />

            <TeacherFeature
              icon={<CalendarDays className="h-7 w-7 text-violet-600" />}
              title="Agenda e prazos"
              description="Defina datas, prazos e lembretes automáticos."
              color="purple"
            />

            <TeacherFeature
              icon={<ClipboardList className="h-7 w-7 text-violet-600" />}
              title="Avaliações e quizzes"
              description="Crie avaliações, quizzes e corrija com agilidade."
              color="purple"
            />

            <TeacherFeature
              icon={<Users className="h-7 w-7 text-blue-600" />}
              title="Acompanhamento da turma"
              description="Acompanhe o desempenho e a evolução em tempo real."
              color="blue"
            />
          </div>
        </div>

        <div className="rounded-[26px] border border-green-100 bg-gradient-to-br from-green-50 to-white p-8 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_220px]">
            <div>
              <h2 className="mb-5 text-3xl font-bold leading-tight text-slate-950">
                Ideal para aulas{" "}
                <span className="text-green-600">práticas</span> e{" "}
                <span className="text-violet-600">teóricas</span>
              </h2>

              <p className="text-slate-600">
                Conecte professor, aluno, conteúdo e prática em um só lugar.
              </p>
            </div>

            <div className="flex h-56 items-center justify-center rounded-full bg-slate-100">
              <div className="flex items-end gap-5">
                <Microscope className="h-28 w-28 text-slate-700" />
                <Beaker className="h-20 w-20 text-green-600" />
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-4">
            <SmallResource icon={<BookOpen />} title="Conteúdo" subtitle="Materiais e aulas" />
            <SmallResource icon={<FlaskConical />} title="Laboratório" subtitle="Práticas e roteiros" />
            <SmallResource icon={<FileText />} title="Roteiros" subtitle="Passo a passo" />
            <SmallResource icon={<ClipboardList />} title="Atividades" subtitle="Desafios e quizzes" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-4 py-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-green-500 via-blue-500 to-violet-700 px-8 py-14 text-center shadow-[0_18px_45px_rgba(79,70,229,0.22)]">
        <Sparkles className="absolute left-16 top-14 h-12 w-12 text-white/20" />
        <Sparkles className="absolute right-40 top-12 h-8 w-8 text-white/20" />
        <Trophy className="absolute bottom-12 right-16 h-16 w-16 text-white/15" />

        <h2 className="mx-auto max-w-2xl text-4xl font-bold leading-tight text-white">
          Pronto para transformar a aprendizagem da sua turma?
        </h2>

        <p className="mt-5 text-lg text-white/90">
          Trilhas estruturadas, gamificação e acompanhamento que geram resultados.
        </p>

        <Link to="/criar-conta">
          <button className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-14 py-4 font-bold text-violet-600 shadow-xl transition hover:scale-[1.02]">
            Comece gratuitamente
            <ArrowRight className="h-5 w-5 text-violet-600" />
          </button>
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div>
          <h2 className="text-2xl font-bold leading-none">
            <span className="text-green-600">Pongo</span>
            <span className="text-violet-600">Edu</span>
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Gestão educacional e laboratorial
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-10 text-sm font-medium text-slate-600">
          <a href="#">Recursos</a>
          <a href="#">Planos</a>
          <a href="#">Demonstração</a>
          <a href="#">Blog</a>
          <a href="#">Suporte</a>
        </nav>

        <p className="text-sm text-slate-500">
          © 2026 PongoEdu. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

function MiniBenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {icon}
      <p className="mt-3 font-bold text-slate-900">{title}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}

function ModulePreviewCard({
  icon,
  title,
  level,
  active,
  done,
  locked,
}: {
  icon: React.ReactNode;
  title: string;
  level: string;
  active?: boolean;
  done?: boolean;
  locked?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl border bg-white p-4 ${
        active
          ? "border-violet-400 shadow-[0_10px_25px_rgba(109,40,217,0.12)]"
          : "border-slate-200"
      }`}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50">
        {icon}
      </div>

      {done && (
        <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 fill-green-500 text-white" />
      )}

      {locked && (
        <LockKeyhole className="absolute right-3 top-3 h-4 w-4 text-slate-400" />
      )}

      <p className="text-sm font-bold text-slate-900">{title}</p>
      <p className="mt-1 text-xs text-slate-500">{level}</p>
    </div>
  );
}

function PreviewActivity({ title, xp }: { title: string; xp: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3">
      <div className="flex items-center gap-3">
        <FlaskConical className="h-4 w-4 text-violet-600" />
        <p className="text-sm font-medium text-slate-700">{title}</p>
      </div>

      <span className="text-xs font-bold text-slate-700">{xp}</span>
    </div>
  );
}

function BadgeIcon({
  icon,
  color,
  small = false,
}: {
  icon: React.ReactElement;
  color: "green" | "purple" | "orange" | "blue";
  small?: boolean;
}) {
  const colors = {
    green: "from-green-400 to-green-700",
    purple: "from-violet-400 to-purple-700",
    orange: "from-amber-400 to-orange-600",
    blue: "from-blue-400 to-indigo-600",
  };

  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-gradient-to-br ${
        colors[color]
      } text-white shadow-lg ${small ? "h-10 w-10" : "h-12 w-12"}`}
    >
      {icon}
    </div>
  );
}

function HowCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "green" | "purple";
}) {
  return (
    <div className="flex items-center gap-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <div
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${
          color === "green" ? "bg-green-100" : "bg-violet-100"
        }`}
      >
        {icon}
      </div>

      <div>
        <h3 className="mb-2 font-bold text-slate-950">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function ArrowDivider() {
  return (
    <div className="hidden items-center justify-center lg:flex">
      <div className="h-0.5 w-full border-t-2 border-dashed border-violet-300" />
      <ArrowRight className="-ml-2 h-5 w-5 text-violet-300" />
    </div>
  );
}

function TrailHighlightCard({
  icon,
  title,
  description,
  levels,
  progress,
  badge,
  color,
  featured,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  levels: string;
  progress: string;
  badge: string;
  color: "purple" | "green" | "blue";
  featured?: boolean;
}) {
  const config = {
    purple: {
      card: "border-violet-300",
      button: "bg-violet-600 text-white border-violet-600",
      icon: "from-violet-400 to-purple-700",
      progress: "text-green-600 border-green-500",
    },
    green: {
      card: "border-slate-200",
      button: "bg-white text-green-600 border-green-400",
      icon: "from-green-400 to-green-700",
      progress: "text-green-600 border-green-500",
    },
    blue: {
      card: "border-slate-200",
      button: "bg-white text-blue-600 border-blue-400",
      icon: "from-blue-400 to-indigo-600",
      progress: "text-blue-600 border-blue-500",
    },
  }[color];

  return (
    <div
      className={`relative rounded-[26px] border bg-white p-7 shadow-[0_14px_35px_rgba(15,23,42,0.06)] ${config.card}`}
    >
      

      <div className="mb-6 flex items-center gap-5">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${config.icon} shadow-lg`}
        >
          {icon}
        </div>

        <h3 className="text-xl font-bold text-slate-950">{title}</h3>
      </div>

      <p className="mb-8 min-h-[64px] text-sm leading-relaxed text-slate-600">
        {description}
      </p>

      <div className="mb-8 grid grid-cols-3 items-center gap-3 text-center">
        <div>
          <p className="text-2xl font-bold text-slate-950">{levels}</p>
          <p className="text-xs text-slate-500">Níveis</p>
        </div>

        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full border-[5px] bg-white text-sm font-bold ${config.progress}`}
        >
          {progress}
        </div>

        <div>
          <Award className="mx-auto mb-1 h-7 w-7 text-amber-400" />
          <p className="text-xs font-semibold text-slate-600">{badge}</p>
          <p className="text-xs text-slate-400">Badge</p>
        </div>
      </div>

      
    </div>
  );
}

function GamificationCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50">
        {icon}
      </div>

      <h3 className="mb-3 font-bold text-slate-950">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>

      {children}
    </div>
  );
}

function RankingLine({
  position,
  name,
  xp,
}: {
  position: string;
  name: string;
  xp: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{position}</span>
      <span className="font-semibold text-slate-700">{name}</span>
      <span className="text-slate-500">{xp}</span>
    </div>
  );
}

function TeacherFeature({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "green" | "purple" | "blue";
}) {
  const colorClass = {
    green: "bg-green-100",
    purple: "bg-violet-100",
    blue: "bg-blue-100",
  }[color];

  return (
    <div className="flex min-w-0 gap-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colorClass}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="mb-2 break-words text-lg font-bold leading-snug text-slate-950">
          {title}
        </h3>

        <p className="break-words text-sm leading-relaxed text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}

function SmallResource({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactElement;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-violet-600">
        {icon}
      </div>

      <p className="text-sm font-bold text-slate-800">{title}</p>
      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}