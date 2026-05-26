import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, ArrowRight, RotateCcw, XCircle } from "lucide-react";

interface CadeiaAlimentarGameProps {
  onComplete: () => void;
}

export function CadeiaAlimentarGame({ onComplete }: CadeiaAlimentarGameProps) {
  const [chain, setChain] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const entities = [
    {
      id: "planta",
      name: "Planta",
      emoji: "🌱",
      role: "Produtor",
      description: "Produz seu próprio alimento pela fotossíntese.",
    },
    {
      id: "gafanhoto",
      name: "Gafanhoto",
      emoji: "🦗",
      role: "Consumidor primário",
      description: "Alimenta-se da planta.",
    },
    {
      id: "sapo",
      name: "Sapo",
      emoji: "🐸",
      role: "Consumidor secundário",
      description: "Alimenta-se do gafanhoto.",
    },
    {
      id: "cobra",
      name: "Cobra",
      emoji: "🐍",
      role: "Consumidor terciário",
      description: "Alimenta-se do sapo.",
    },
    {
      id: "fungo",
      name: "Fungos",
      emoji: "🍄",
      role: "Decompositor",
      description: "Decompõe restos de seres vivos e devolve nutrientes ao solo.",
    },
  ];

  const handleSelect = (id: string) => {
    if (chain.includes(id)) return;

    const nextExpected = entities[chain.length];

    if (id === nextExpected.id) {
      const newChain = [...chain, id];
      setChain(newChain);
      setError("");

      if (newChain.length === entities.length) {
        setTimeout(onComplete, 1500);
      }
    } else {
      setError(`Ops! Agora você deve escolher: ${nextExpected.role}.`);
    }
  };

  const resetGame = () => {
    setChain([]);
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Cadeia Alimentar</h2>
        <p className="text-muted-foreground max-w-2xl">
          Clique nos seres vivos na ordem correta para mostrar como a energia passa de um organismo para outro.
        </p>
      </div>

      <div className="w-full max-w-4xl bg-card border rounded-xl p-4">
        <p className="text-sm font-medium mb-3">
          Progresso: {chain.length} de {entities.length}
        </p>

        <div className="w-full bg-muted rounded-full h-3">
          <div
            className="bg-primary h-3 rounded-full transition-all"
            style={{ width: `${(chain.length / entities.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {entities.map((entity) => {
          const isSelected = chain.includes(entity.id);

          return (
            <motion.button
              key={entity.id}
              whileHover={!isSelected ? { scale: 1.05 } : {}}
              whileTap={!isSelected ? { scale: 0.95 } : {}}
              onClick={() => handleSelect(entity.id)}
              disabled={isSelected}
              className={`w-40 min-h-40 p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                isSelected
                  ? "border-muted bg-muted opacity-50 cursor-not-allowed"
                  : "border-primary bg-card hover:bg-primary/10 cursor-pointer"
              }`}
            >
              <span className="text-4xl">{entity.emoji}</span>
              <span className="font-bold text-sm">{entity.name}</span>
              <span className="text-xs text-muted-foreground text-center">
                {entity.role}
              </span>
            </motion.button>
          );
        })}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-500 font-medium"
        >
          <XCircle className="w-5 h-5" />
          {error}
        </motion.div>
      )}

      <div className="flex items-center flex-wrap gap-3 justify-center min-h-[130px] p-6 bg-card border-2 border-dashed border-border rounded-xl w-full max-w-4xl">
        {chain.length === 0 && (
          <span className="text-muted-foreground">
            Comece escolhendo quem produz o próprio alimento.
          </span>
        )}

        {chain.map((id, index) => {
          const entity = entities.find((e) => e.id === id)!;

          return (
            <div key={id} className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center bg-primary/20 p-3 rounded-lg border border-primary/30 w-28"
              >
                <span className="text-3xl">{entity.emoji}</span>
                <span className="text-xs font-bold text-center">{entity.name}</span>
              </motion.div>

              {index < chain.length - 1 && (
                <ArrowRight className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
          );
        })}
      </div>

      {chain.length > 0 && (
        <div className="w-full max-w-4xl space-y-2">
          {chain.map((id) => {
            const entity = entities.find((e) => e.id === id)!;

            return (
              <div
                key={id}
                className="bg-muted/50 border rounded-lg p-3 text-sm"
              >
                <strong>
                  {entity.emoji} {entity.role}:
                </strong>{" "}
                {entity.description}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-card hover:bg-muted transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Reiniciar
        </button>
      </div>

      {chain.length === entities.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-500 flex items-center gap-2 font-bold"
        >
          <CheckCircle2 className="w-6 h-6" />
          Muito bem! A cadeia alimentar foi montada corretamente.
        </motion.div>
      )}
    </div>
  );
}