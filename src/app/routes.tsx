import { createBrowserRouter } from "react-router";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { CreateAccount } from "./components/CreateAccount";

import { ProfessorLayout } from "./components/professor/ProfessorLayout";
import { Dashboard } from "./components/professor/Dashboard";
import { Reagentes } from "./components/professor/Reagentes";
import { ModulePlaceholder } from "./components/professor/ModulePlaceholder";
import { ProfessorGamesPage } from "./components/professor/games/ProfessorGamesPage";
import { AgendamentosPage } from "./components/professor/AgendamentosPage";
import { TurmasPage } from "./components/professor/TurmasPage";

import { AuxiliarLayout } from "./components/auxiliar/AuxiliarLayout";
import { AuxiliarDashboard } from "./components/auxiliar/AuxiliarDashboard";
import { ReagentesManagement } from "./components/auxiliar/ReagentesManagement";
import { AgendamentosManagement } from "./components/auxiliar/AgendamentosManagement";

import { AlunoLayout } from "./components/aluno/AlunoLayout";
import { AlunoDashboard } from "./components/aluno/AlunoDashboard";
import { QuimicaGamePage } from "./components/aluno/games/pages/QuimicaGamePage";
import { BiologiaGamePage } from "./components/aluno/games/pages/BiologiaGamePage";

import {
  Beaker,
  Bug,
  Heart,
  BookOpen,
  ClipboardList,
  FlaskConical,
  Users,
  GraduationCap,
  Gamepad2,
  TestTube,
  Package,
  ShoppingCart,
  CalendarCheck,
  FileText,
  Truck,
} from "lucide-react";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/criar-conta",
    element: <CreateAccount />,
  },

  // PROFESSOR
  {
    path: "/professor",
    element: <ProfessorLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "turmas",
        element: <TurmasPage />,
      },
      {
        path: "reagentes",
        element: <Reagentes />,
      },
      {
        path: "vidrarias",
        element: (
          <ModulePlaceholder
            icon={Beaker}
            title="Vidrarias"
            description="Rastreie cada item com estado de conservação e localização"
          />
        ),
      },
      {
        path: "colecao-zoologica",
        element: (
          <ModulePlaceholder
            icon={Bug}
            title="Coleção Zoológica"
            description="Catalogação taxonômica completa com registro fotográfico"
          />
        ),
      },
      {
        path: "modelos-anatomicos",
        element: (
          <ModulePlaceholder
            icon={Heart}
            title="Modelos Anatômicos"
            description="Gestão de peças didáticas com controle de empréstimo"
          />
        ),
      },
      {
        path: "roteiros",
        element: (
          <ModulePlaceholder
            icon={BookOpen}
            title="Roteiros de Aulas"
            description="Crie e gerencie roteiros pedagógicos vinculados ao inventário"
          />
        ),
      },
      {
        path: "atividades",
        element: (
          <ModulePlaceholder
            icon={ClipboardList}
            title="Atividades"
            description="Gerencie atividades e avaliações para suas turmas"
          />
        ),
      },
      {
        path: "praticas",
        element: (
          <ModulePlaceholder
            icon={FlaskConical}
            title="Práticas"
            description="Organize práticas de laboratório com controle de materiais"
          />
        ),
      },
      {
        path: "agendamentos/reservas",
        element: <AgendamentosPage />,
      },
      {
        path: "agendamentos/solicitacoes",
        element: (
          <ModulePlaceholder
            icon={ClipboardList}
            title="Minhas Solicitações"
            description="Acompanhe solicitações relacionadas ao laboratório"
          />
        ),
      },
      {
        path: "games/quimica-n1",
        element: <ProfessorGamesPage />,
      },
      {
        path: "games/biologia",
        element: <ProfessorGamesPage />,
      },
    ],
  },

  // AUXILIAR
  {
    path: "/auxiliar",
    element: <AuxiliarLayout />,
    children: [
      {
        index: true,
        element: <AuxiliarDashboard />,
      },
      {
        path: "reagentes",
        element: <ReagentesManagement />,
      },
      {
        path: "vidrarias",
        element: (
          <ModulePlaceholder
            icon={Beaker}
            title="Vidrarias"
            description="Gerencie vidrarias com estado de conservação e localização"
          />
        ),
      },
      {
        path: "colecao-zoologica",
        element: (
          <ModulePlaceholder
            icon={Bug}
            title="Coleção Zoológica"
            description="Catalogação taxonômica completa com registro fotográfico"
          />
        ),
      },
      {
        path: "modelos-anatomicos",
        element: (
          <ModulePlaceholder
            icon={Heart}
            title="Modelos Anatômicos"
            description="Gestão de peças didáticas com controle de empréstimo"
          />
        ),
      },
      {
        path: "inventario",
        element: (
          <ModulePlaceholder
            icon={Package}
            title="Inventário"
            description="Visualize e organize o inventário completo do laboratório"
          />
        ),
      },
      {
        path: "solicitacoes/compras",
        element: (
          <ModulePlaceholder
            icon={ShoppingCart}
            title="Compras"
            description="Gerencie solicitações de compra de materiais"
          />
        ),
      },
      {
        path: "roteiros",
        element: (
          <ModulePlaceholder
            icon={FileText}
            title="Roteiros de Aula"
            description="Visualize roteiros recebidos para preparação das aulas"
          />
        ),
      },
      {
        path: "solicitacoes/reservas",
        element: <AgendamentosManagement />,
      },
      {
        path: "recebimento/entradas",
        element: (
          <ModulePlaceholder
            icon={Truck}
            title="Entradas"
            description="Registre e acompanhe o recebimento de materiais"
          />
        ),
      },
    ],
  },

  // ALUNO
  {
    path: "/aluno",
    element: <AlunoLayout />,
    children: [
      {
        index: true,
        element: <AlunoDashboard />
      },
      {
        path: "turmas",
        element: (
          <ModulePlaceholder
            icon={Users}
            title="Minhas Turmas"
            description="Visualize suas turmas e informações relacionadas"
          />
        ),
      },
      {
        path: "colegas",
        element: (
          <ModulePlaceholder
            icon={GraduationCap}
            title="Colegas"
            description="Consulte os colegas das suas turmas"
          />
        ),
      },
      {
        path: "roteiros",
        element: (
          <ModulePlaceholder
            icon={FileText}
            title="Roteiros de Aula"
            description="Acesse os roteiros disponibilizados pelos professores"
          />
        ),
      },
      {
        path: "atividades",
        element: (
          <ModulePlaceholder
            icon={ClipboardList}
            title="Atividades"
            description="Visualize e acompanhe suas atividades"
          />
        ),
      },
      {
        path: "praticas",
        element: (
          <ModulePlaceholder
            icon={FlaskConical}
            title="Práticas"
            description="Acompanhe as práticas de laboratório"
          />
        ),
      },
      {
        path: "eventos",
        element: (
          <ModulePlaceholder
            icon={CalendarCheck}
            title="Meus Eventos"
            description="Consulte eventos e atividades agendadas"
          />
        ),
      },
      {
        path: "equipes",
        element: (
          <ModulePlaceholder
            icon={Users}
            title="Equipes"
            description="Participe e colabore com suas equipes"
          />
        ),
      },
      {
        path: "games/quimica",
        element: <QuimicaGamePage />,
      },
      {
        path: "games/biologia",
        element: <BiologiaGamePage />,
      },
    ],
  },
]);