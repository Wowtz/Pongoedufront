import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  FlaskConical,
  Gamepad2,
  Home,
  Lock,
  LogIn,
  Mail,
  Trophy,
  TrendingUp,
  Zap,
} from "lucide-react";
import { MascotLogo } from "./mascot-logo";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log("Login attempt:", { email, password });

    navigate("/professor");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#fbfbff] text-slate-950">
      <Header />

      <main className="relative px-4 py-16">
        <DecorativeBackground />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1px_1.1fr]">
          <section className="mx-auto w-full max-w-md">
            <h1 className="text-4xl font-bold leading-tight text-slate-950">
              Acesse sua conta e
              <br />
              continue{" "}
              <span className="text-green-600">evoluindo</span>
            </h1>

            <p className="mt-8 text-lg leading-relaxed text-slate-500">
              Faça login para continuar aprendendo com trilhas personalizadas,
              ganhar badges e acompanhar seu progresso.
            </p>

            <div className="mt-10 divide-y divide-slate-200">
              <FeatureItem
                icon={<Zap className="h-8 w-8 text-green-600" />}
                iconClassName="border-green-200 bg-green-50"
                title="Trilhas de estudo"
                description="Conteúdos organizados por níveis que se adaptam ao seu ritmo."
              />

              <FeatureItem
                icon={<Gamepad2 className="h-8 w-8 text-violet-600" />}
                iconClassName="border-violet-200 bg-violet-50"
                title="Gamificação"
                description="Ganhe XP, conclua atividades e suba de nível com mais motivação."
              />

              <FeatureItem
                icon={<Trophy className="h-8 w-8 text-green-600" />}
                iconClassName="border-green-200 bg-green-50"
                title="Badges e conquistas"
                description="Conquiste badges e mostre suas habilidades ao avançar."
              />

              <FeatureItem
                icon={<TrendingUp className="h-8 w-8 text-blue-600" />}
                iconClassName="border-blue-200 bg-blue-50"
                title="Acompanhamento"
                description="Acompanhe seu desempenho e descubra seus próximos desafios."
              />
            </div>
          </section>

          <div className="hidden h-full min-h-[620px] w-px bg-slate-200 lg:block" />

          <section className="mx-auto w-full max-w-xl rounded-[28px] border border-slate-200 bg-white p-12 shadow-[0_22px_70px_rgba(88,80,140,0.14)]">
            <div className="mb-9 flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-white">
                <MascotLogo />
              </div>

              <h2 className="mt-4 text-3xl font-bold">
                <span className="text-green-600">Pongo</span>
                <span className="text-violet-600">Edu</span>
              </h2>

              <h3 className="mt-7 text-2xl font-bold text-slate-950">
                Entrar na sua conta
              </h3>

              <p className="mt-4 text-base leading-relaxed text-slate-500">
                Digite seu e-mail e senha para acessar sua conta.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="text-right">
                <a
                  href="#"
                  className="text-sm font-semibold text-green-600 transition hover:text-green-700 hover:underline"
                >
                  Esqueci minha senha
                </a>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 px-6 py-4 text-base font-bold text-white shadow-[0_14px_26px_rgba(22,163,74,0.26)] transition hover:scale-[1.01] hover:bg-green-700"
              >
                Entrar
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-sm font-medium text-slate-400">ou</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-base text-slate-500">
              Não tem uma conta?{" "}
              <Link
                to="/criar-conta"
                className="font-bold text-violet-600 transition hover:text-violet-700 hover:underline"
              >
                Criar conta
              </Link>
            </p>

            <Link
              to="/"
              className="mt-9 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 px-6 py-4 text-base font-semibold text-slate-600 transition hover:bg-slate-200"
            >
              <ArrowLeft className="h-5 w-5" />
              Voltar para a página inicial
            </Link>
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

          <Link to="/criar-conta">
            <button className="rounded-2xl border border-violet-300 bg-white px-8 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50">
              Criar conta
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function FeatureItem({
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
    <div className="flex gap-6 py-6 first:pt-0 last:pb-0">
      <div
        className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border ${iconClassName}`}
      >
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-950">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
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
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2">
          {icon}
        </span>

        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
          className="h-16 w-full rounded-xl border border-slate-300 bg-white pl-14 pr-5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
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
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <Lock className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
          className="h-16 w-full rounded-xl border border-slate-300 bg-white pl-14 pr-14 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
          placeholder="••••••••"
        />

        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-green-600"
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
      <div className="absolute -left-8 top-28 h-36 w-36 rounded-full border border-violet-200 bg-violet-100/40" />
      <div className="absolute right-10 top-20 h-16 w-16 rounded-full border border-violet-200 bg-violet-100/40" />
      <div className="absolute right-0 top-[46%] h-32 w-32 rounded-full border border-violet-200 bg-violet-100/40" />
      <div className="absolute -right-8 bottom-0 h-36 w-36 rounded-full border border-violet-200 bg-violet-100/40" />

      <div className="absolute left-[6%] top-24 h-5 w-5 rounded-full bg-green-600" />
      <div className="absolute left-[5%] top-[60%] h-5 w-5 rounded-full bg-blue-500" />
      <div className="absolute left-[8%] bottom-28 h-5 w-5 rounded-full bg-violet-600" />

      <div className="absolute right-[8%] top-[40%] h-4 w-4 rounded-full bg-green-600" />
      <div className="absolute right-[9%] top-[62%] h-4 w-4 rounded-full bg-violet-600" />
      <div className="absolute right-[10%] bottom-32 h-5 w-5 rounded-full bg-blue-500" />
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-8 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">
        <p className="text-sm text-slate-500">
          © 2026 PongoEdu. Todos os direitos reservados.
        </p>

        <nav className="flex flex-wrap justify-center gap-9 text-sm font-medium text-slate-500">
          <a href="#">Recursos</a>
          <a href="#">Planos</a>
          <a href="#">Demonstração</a>
          <a href="#">Blog</a>
          <a href="#">Suporte</a>
        </nav>
      </div>
    </footer>
  );
}