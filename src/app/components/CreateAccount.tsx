import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  FlaskConical,
  Home,
  Lock,
  LogIn,
  Mail,
  Sparkles,
  Trophy,
  User,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import { MascotLogo } from "./mascot-logo";

export function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("12345678");
  const [confirmPassword, setConfirmPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    console.log("Create account:", { name, email, password });

    toast.success(
      "Conta criada com sucesso! Verifique seu e-mail para confirmação.",
      {
        duration: 5000,
      }
    );

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#fbfbff] text-slate-950">
      <Header />

      <main className="relative px-4 py-14">
        <DecorativeBackground />

        <div className="relative z-10 mx-auto grid max-w-5xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(88,80,140,0.14)] lg:grid-cols-[0.9fr_1fr]">
          <section className="border-b border-slate-200 bg-white p-10 lg:border-b-0 lg:border-r">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-violet-100 px-5 py-2 text-sm font-bold text-violet-700">
              <Sparkles className="h-4 w-4" />
              Plataforma de Trilhas e Gamificação
            </div>

            <h1 className="max-w-md text-4xl font-bold leading-tight text-slate-950">
              Aprendizado que{" "}
              <span className="text-green-600">engaja</span> e{" "}
              <span className="text-violet-600">transforma</span>
            </h1>

            <p className="mt-7 max-w-md text-lg leading-relaxed text-slate-500">
              PongoEdu usa trilhas de estudo e gamificação para tornar o
              aprendizado mais motivador, organizado e eficaz.
            </p>

            <div className="mt-10 space-y-7">
              <BenefitItem
                icon={<Zap className="h-8 w-8 text-green-600" />}
                iconClassName="bg-green-100"
                title="Trilhas de estudo personalizadas"
                description="Conteúdos organizados por níveis que guiam o aluno passo a passo."
              />

              <BenefitItem
                icon={<FlaskConical className="h-8 w-8 text-violet-600" />}
                iconClassName="bg-violet-100"
                title="Gamificação que motiva"
                description="XP, rankings, badges e desafios que transformam esforço em conquista."
              />

              <BenefitItem
                icon={<Trophy className="h-8 w-8 text-green-600" />}
                iconClassName="bg-green-100"
                title="Badges e conquistas"
                description="Reconhecemos cada etapa alcançada e celebramos seu progresso."
              />

              <BenefitItem
                icon={<Users className="h-8 w-8 text-blue-600" />}
                iconClassName="bg-blue-100"
                title="Acompanhamento completo"
                description="Relatórios e dashboards que ajudam alunos e professores a evoluírem juntos."
              />
            </div>

            <div className="mt-10 flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-violet-50">
                <MascotLogo />
              </div>

              <p className="text-base leading-relaxed text-slate-600">
                Aprender fica mais divertido quando cada conquista te aproxima
                do seu objetivo! 🚀
              </p>
            </div>
          </section>

          <section className="bg-white p-10">
            <div className="mx-auto max-w-md">
              <div className="mb-8 flex flex-col items-center text-center">
                <div className="flex h-[70px] w-[60px] items-center justify-center">
                  <MascotLogo />
                </div>

                <h2 className="mt-4 text-3xl font-bold">
                  <span className="text-green-600">Pongo</span>
                  <span className="text-violet-600">Edu</span>
                </h2>

                <h3 className="mt-5 text-3xl font-bold text-slate-950">
                  Crie sua conta
                </h3>

                <p className="mt-4 max-w-sm text-lg leading-relaxed text-slate-500">
                  Preencha seus dados para começar sua jornada de aprendizado.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <FormField
                  id="name"
                  label="Nome completo"
                  type="text"
                  value={name}
                  onChange={setName}
                  placeholder="Seu nome completo"
                  icon={<User className="h-5 w-5 text-slate-400" />}
                />

                <FormField
                  id="email"
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="seu@email.com"
                  icon={<Mail className="h-5 w-5 text-slate-400" />}
                />

                <PasswordField
                  id="password"
                  label="Senha"
                  value={password}
                  onChange={setPassword}
                  visible={showPassword}
                  onToggleVisibility={() => setShowPassword((value) => !value)}
                />

                <PasswordField
                  id="confirmPassword"
                  label="Confirmar senha"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  visible={showConfirmPassword}
                  onToggleVisibility={() =>
                    setShowConfirmPassword((value) => !value)
                  }
                />

                <button
                  type="submit"
                  className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-700 px-6 py-4 text-base font-bold text-white shadow-[0_14px_26px_rgba(109,40,217,0.30)] transition hover:scale-[1.01]"
                >
                  <UserPlus className="h-5 w-5" />
                  Criar conta
                </button>
              </form>

              <p className="mt-5 text-center text-base text-slate-500">
                Já tem uma conta?{" "}
                <Link
                  to="/login"
                  className="font-bold text-violet-600 hover:underline"
                >
                  Entrar
                </Link>
              </p>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-sm font-medium text-slate-400">ou</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <Link
                to="/"
                className="flex items-center justify-center gap-2 text-base font-bold text-violet-600 transition hover:text-violet-700"
              >
                <ArrowLeft className="h-5 w-5" />
                Voltar para a página inicial
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/95 shadow-[0_4px_18px_rgba(15,23,42,0.05)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-[70px] w-[60px] items-center justify-center">
            <MascotLogo />
          </div>

          <div>
            <h1 className="text-2xl font-bold leading-none">
              <span className="text-green-600">Pongo</span>
              <span className="text-violet-600">Edu</span>
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Gestão educacional e laboratorial
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-5">
          <Link
            to="/"
            className="hidden items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-violet-600 md:flex"
          >
            <Home className="h-4 w-4" />
            Página inicial
          </Link>

          <Link to="/login">
            <button className="flex items-center gap-2 rounded-2xl border border-violet-300 bg-white px-8 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50">
              <LogIn className="h-5 w-5" />
              Entrar
            </button>
          </Link>

          <Link to="/criar-conta">
            <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-700 px-8 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(109,40,217,0.28)] transition hover:scale-[1.02]">
              <UserPlus className="h-5 w-5" />
              Criar conta
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function BenefitItem({
  icon,
  iconClassName,
  title,
  description,
}: {
  icon: ReactNode;
  iconClassName: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-5">
      <div
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${iconClassName}`}
      >
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-950">{title}</h3>
        <p className="mt-2 text-base leading-relaxed text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function FormField({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-slate-800"
      >
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2">
          {icon}
        </span>

        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
          className="h-14 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  visible,
  onToggleVisibility,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggleVisibility: () => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-slate-800"
      >
        {label}
      </label>

      <div className="relative">
        <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
          className="h-14 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-12 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          placeholder="••••••••"
        />

        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-violet-600"
          aria-label="Mostrar ou esconder senha"
        >
          <Eye className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function DecorativeBackground() {
  return (
    <>
      <div className="absolute -left-8 top-28 h-28 w-28 rounded-full border border-violet-200 bg-violet-100/40" />
      <div className="absolute left-10 bottom-36 h-24 w-24 rounded-full border border-violet-200 bg-violet-100/40" />
      <div className="absolute right-8 top-72 h-28 w-28 rounded-full border border-violet-200 bg-violet-100/40" />
      <div className="absolute right-24 top-12 h-16 w-16 rounded-full border border-violet-200 bg-violet-100/40" />

      <div className="absolute left-[11%] top-36 h-3 w-3 rounded-full bg-green-600" />
      <div className="absolute left-[12%] bottom-28 h-5 w-5 rounded-full bg-green-600" />
      <div className="absolute left-[13%] bottom-52 h-4 w-4 rounded-full bg-violet-600" />
      <div className="absolute right-[13%] top-56 h-4 w-4 rounded-full bg-violet-600" />
      <div className="absolute right-[8%] bottom-56 h-3 w-3 rounded-full bg-green-600" />
      <div className="absolute right-[12%] bottom-32 h-5 w-5 rounded-full bg-blue-500" />
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-8 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">
        <div>
          <h2 className="text-xl font-bold leading-none">
            <span className="text-green-600">Pongo</span>
            <span className="text-violet-600">Edu</span>
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Gestão educacional e laboratorial
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-9 text-sm font-medium text-slate-500">
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