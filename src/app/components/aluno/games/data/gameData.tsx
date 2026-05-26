import type { GameTrack } from "../types/game.types";

export const quimicaTrack: GameTrack = {
  slug: "quimica",
  title: "Trilha de Química",
  accent: "from-sky-500/20 to-cyan-500/10",
  levels: [
    {
      id: "quimica-estados-materia",
      title: "Estados da Matéria",
      description: "Descubra como as partículas se comportam em diferentes estados.",
      xp: 20,
    },
    {
      id: "quimica-tamanho-atomos",
      title: "Tamanho dos Átomos",
      description: "Compare o tamanho de diferentes átomos.",
      xp: 25,
    },
    {
      id: "quimica-tabela-periodica",
      title: "Tabela Periódica",
      description: "Encontre e identifique os elementos químicos.",
      xp: 30,
    },
    {
      id: "quimica-separacao-misturas",
      title: "Separação de Misturas",
      description: "Aprenda os métodos para separar diferentes tipos de misturas.",
      xp: 35,
    },
  ],
};

export const biologiaTrack: GameTrack = {
  slug: "biologia",
  title: "Trilha de Biologia",
  accent: "from-emerald-500/20 to-lime-500/10",
  levels: [
    {
      id: "biologia-cadeia-alimentar",
      title: "Cadeia Alimentar",
      description: "Construa cadeias e teias alimentares.",
      xp: 20,
    },
    {
      id: "biologia-descarte-lixo",
      title: "Descarte de Lixo",
      description: "Aprenda a descartar os diferentes tipos de resíduos.",
      xp: 25,
    },
    {
      id: "biologia-ciclo-agua",
      title: "Ciclo da Água",
      description: "Descubra as etapas do ciclo da água na natureza.",
      xp: 30,
    },
    {
      id: "biologia-bacterias-virus",
      title: "Bactérias vs Vírus",
      description: "Identifique as diferenças entre bactérias e vírus.",
      xp: 35,
    },
  ],
};