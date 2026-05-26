import { useState, useRef, useCallback } from "react";
import {
  Gamepad2,
  Edit2,
  Eye,
  ShieldCheck,
  GripVertical,
  X,
  Save,
  AlertCircle,
} from "lucide-react";
import { quimicaTrack, biologiaTrack } from "../../aluno/games/data/gameData";
import type { GameTrack, GameLevel } from "../../aluno/games/types/game.types";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { EstadosMateriaGame } from "../../aluno/games/mini-games/EstadosMateriaGame";
import { TamanhoAtomosGame } from "../../aluno/games/mini-games/TamanhoAtomosGame";
import { TabelaPeriodicaGame } from "../../aluno/games/mini-games/TabelaPeriodicaGame";
import { SeparacaoMisturasGame } from "../../aluno/games/mini-games/SeparacaoMisturasGame";
import { CadeiaAlimentarGame } from "../../aluno/games/mini-games/CadeiaAlimentarGame";
import { DescarteLixoGame } from "../../aluno/games/mini-games/DescarteLixoGame";
import { CicloAguaGame } from "../../aluno/games/mini-games/CicloAguaGame";
import { BacteriasVirusGame } from "../../aluno/games/mini-games/BacteriasVirusGame";

const GAMES_MAP: Record<string, React.FC<{ onComplete: () => void }>> = {
  "quimica-estados-materia": EstadosMateriaGame,
  "quimica-tamanho-atomos": TamanhoAtomosGame,
  "quimica-tabela-periodica": TabelaPeriodicaGame,
  "quimica-separacao-misturas": SeparacaoMisturasGame,
  "biologia-cadeia-alimentar": CadeiaAlimentarGame,
  "biologia-descarte-lixo": DescarteLixoGame,
  "biologia-ciclo-agua": CicloAguaGame,
  "biologia-bacterias-virus": BacteriasVirusGame,
};

interface DraggableRowProps {
  level: GameLevel;
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  onEdit: (level: GameLevel) => void;
  onPlay: (level: GameLevel) => void;
}

const DraggableRow = ({
  level,
  index,
  moveRow,
  onEdit,
  onPlay,
}: DraggableRowProps) => {
  const ref = useRef<HTMLTableRowElement>(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: "GAME_ROW",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "GAME_ROW",
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  preview(drop(ref));

  return (
    <tr
      ref={ref}
      className={`hover:bg-muted/30 transition-colors ${
        isDragging ? "opacity-30" : ""
      }`}
    >
      <td className="px-4 py-4">
        <div ref={drag} className="cursor-move">
          <GripVertical className="w-5 h-5 text-muted-foreground" />
        </div>
      </td>
      <td className="px-4 py-4 font-medium">{level.title}</td>
      <td className="px-4 py-4 text-muted-foreground max-w-xs truncate" title={level.description}>
        {level.description}
      </td>
      <td className="px-4 py-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          +{level.xp} XP
        </span>
      </td>
      <td className="px-4 py-4 text-center">
        <span className="inline-flex items-center gap-1 text-green-600">
          <ShieldCheck className="w-4 h-4" />
          Ativo
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onPlay(level)}
            className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
            title="Jogar"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(level)}
            className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
            title="Editar XP"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export function ProfessorGamesPage() {
  const [activeTab, setActiveTab] = useState<"quimica" | "biologia">("quimica");
  const [quimicaLevels, setQuimicaLevels] = useState(quimicaTrack.levels);
  const [biologiaLevels, setBiologiaLevels] = useState(biologiaTrack.levels);
  const [editingLevel, setEditingLevel] = useState<GameLevel | null>(null);
  const [editXp, setEditXp] = useState("");
  const [playingGame, setPlayingGame] = useState<GameLevel | null>(null);

  const currentLevels = activeTab === "quimica" ? quimicaLevels : biologiaLevels;
  const setCurrentLevels = activeTab === "quimica" ? setQuimicaLevels : setBiologiaLevels;

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newLevels = [...currentLevels];
      const [removed] = newLevels.splice(dragIndex, 1);
      newLevels.splice(hoverIndex, 0, removed);
      setCurrentLevels(newLevels);
    },
    [currentLevels, setCurrentLevels]
  );

  const handleEdit = (level: GameLevel) => {
    setEditingLevel(level);
    setEditXp(level.xp.toString());
  };

  const handleSaveXp = () => {
    if (!editingLevel) return;

    const newXp = parseInt(editXp);
    if (isNaN(newXp) || newXp <= 0) {
      alert("Por favor, insira um valor válido de XP (maior que 0)");
      return;
    }

    const newLevels = currentLevels.map((l) =>
      l.id === editingLevel.id ? { ...l, xp: newXp } : l
    );
    setCurrentLevels(newLevels);
    setEditingLevel(null);
    setEditXp("");
  };

  const handlePlay = (level: GameLevel) => {
    setPlayingGame(level);
  };

  const handleGameComplete = () => {
    // Professor pode jogar quantas vezes quiser, apenas fecha o modal
  };

  const GameComponent = playingGame ? GAMES_MAP[playingGame.id] : null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Gamepad2 className="w-8 h-8 text-primary" />
              Gerenciamento de Games
            </h1>
            <p className="text-muted-foreground mt-1">
              Configure a ordem, XP e teste os jogos interativos.
            </p>
          </div>
        </div>

        <div className="flex gap-4 border-b border-border pb-px">
          <button
            onClick={() => setActiveTab("quimica")}
            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "quimica"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Química ({quimicaLevels.length} jogos)
          </button>
          <button
            onClick={() => setActiveTab("biologia")}
            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "biologia"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Biologia ({biologiaLevels.length} jogos)
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Dica: Arraste para reordenar</p>
            <p className="text-blue-700">
              Arraste as linhas pela alça (⋮⋮) para mudar a ordem dos jogos.
              Os alunos verão os jogos na ordem definida aqui.
            </p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-4 font-medium w-12"></th>
                <th className="px-4 py-4 font-medium">Nome do Jogo</th>
                <th className="px-4 py-4 font-medium">Descrição</th>
                <th className="px-4 py-4 font-medium">Recompensa (XP)</th>
                <th className="px-4 py-4 font-medium text-center">Status</th>
                <th className="px-4 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentLevels.map((level, index) => (
                <DraggableRow
                  key={level.id}
                  level={level}
                  index={index}
                  moveRow={moveRow}
                  onEdit={handleEdit}
                  onPlay={handlePlay}
                />
              ))}
            </tbody>
          </table>
          {currentLevels.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              Nenhum jogo cadastrado nesta disciplina.
            </div>
          )}
        </div>

        <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
          <h3 className="font-semibold mb-2">Modo Professor</h3>
          <p className="text-sm text-muted-foreground">
            Você pode jogar todos os jogos quantas vezes quiser para análise.
            As alterações de XP e ordem são salvas localmente.
          </p>
        </div>

        {/* Modal de Edição de XP */}
        {editingLevel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Editar XP do Jogo</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {editingLevel.title}
              </p>

              <label className="block text-sm font-medium mb-2">
                Recompensa em XP
              </label>
              <input
                type="number"
                value={editXp}
                onChange={(e) => setEditXp(e.target.value)}
                min="1"
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary mb-6"
                placeholder="Ex: 50"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditingLevel(null);
                    setEditXp("");
                  }}
                  className="flex-1 px-4 py-2 rounded-xl border border-border hover:bg-muted transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveXp}
                  className="flex-1 px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Jogar */}
        {playingGame && GameComponent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-3xl shadow-2xl border-2 border-primary/20">
              <button
                onClick={() => setPlayingGame(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <GameComponent onComplete={handleGameComplete} />
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}
