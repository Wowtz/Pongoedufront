import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, FlaskConical, Wind, Cuboid } from "lucide-react";

interface EstadosMateriaGameProps {
  onComplete: () => void;
}

export function EstadosMateriaGame({ onComplete }: EstadosMateriaGameProps) {
  const [activeState, setActiveState] = useState<"solido" | "liquido" | "gasoso">("solido");
  const [completedStates, setCompletedStates] = useState<string[]>([]);

  const handleStateClick = (state: "solido" | "liquido" | "gasoso") => {
    setActiveState(state);
    if (!completedStates.includes(state)) {
      const newCompleted = [...completedStates, state];
      setCompletedStates(newCompleted);
      if (newCompleted.length === 3) {
        setTimeout(() => onComplete(), 1500);
      }
    }
  };

  const getParticles = () => {
    const containerSize = 256; // w-64 = 256px
    const particleSize = 12; // w-3 = 12px
    const padding = 20;
    const usableSpace = containerSize - (padding * 2) - particleSize;

    switch (activeState) {
      case "solido":
        // Grade 8x8 com partículas bem distribuídas
        return Array.from({ length: 64 }).map((_, i) => {
          const cols = 8;
          const spacing = usableSpace / (cols - 1);
          const baseX = (i % cols) * spacing + padding;
          const baseY = Math.floor(i / cols) * spacing + padding;

          return {
            x: baseX,
            y: baseY,
            animate: {
              x: [baseX - 1, baseX + 1, baseX - 1],
              y: [baseY - 1, baseY + 1, baseY - 1]
            },
            transition: {
              repeat: Infinity,
              duration: 1.5 + (i % 3) * 0.3,
              ease: "easeInOut"
            }
          };
        });

      case "liquido":
        // 50 partículas com movimento fluido
        return Array.from({ length: 50 }).map((_, i) => {
          const cols = 8;
          const row = Math.floor(i / cols);
          const col = i % cols;
          const spacing = usableSpace / (cols - 1);
          const baseX = col * spacing + padding;
          const baseY = row * spacing + padding + 60; // Aglomera na parte inferior

          return {
            x: baseX,
            y: baseY,
            animate: {
              x: [baseX - 8, baseX + 8, baseX - 8],
              y: [baseY - 3, baseY + 3, baseY - 3]
            },
            transition: {
              repeat: Infinity,
              duration: 1.8 + (i % 4) * 0.4,
              ease: "easeInOut",
              delay: (i % 5) * 0.1
            }
          };
        });

      case "gasoso":
        // 25 partículas com movimento livre e fluido
        return Array.from({ length: 25 }).map((_, i) => {
          const randomX = () => Math.random() * usableSpace + padding;
          const randomY = () => Math.random() * usableSpace + padding;

          return {
            x: randomX(),
            y: randomY(),
            animate: {
              x: [randomX(), randomX(), randomX(), randomX()],
              y: [randomY(), randomY(), randomY(), randomY()]
            },
            transition: {
              repeat: Infinity,
              duration: 4 + Math.random() * 3,
              ease: "linear",
              delay: Math.random() * 0.5
            }
          };
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6">
      <h2 className="text-2xl font-bold text-center">Estados da Matéria</h2>
      <p className="text-muted-foreground text-center">
        Selecione cada estado para observar o comportamento das partículas.
      </p>

      <div className="relative w-64 h-64 border-4 border-green-500/30 rounded-xl bg-gradient-to-br from-green-50 to-purple-50 overflow-hidden shadow-lg">
        {getParticles().map((particle, i) => (
          <motion.div
            key={`particle-${activeState}-${i}`}
            className="absolute w-3 h-3 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full shadow-md"
            initial={{ x: particle.x, y: particle.y }}
            animate={particle.animate as any}
            transition={particle.transition as any}
            style={{ left: "0%", top: "0%" }}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => handleStateClick("solido")}
          className={`px-4 py-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
            activeState === "solido" ? "bg-primary text-white" : "bg-card hover:bg-primary/10 border-2"
          }`}
        >
          <Cuboid className="w-6 h-6" />
          Sólido
        </button>
        <button
          onClick={() => handleStateClick("liquido")}
          className={`px-4 py-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
            activeState === "liquido" ? "bg-primary text-white" : "bg-card hover:bg-primary/10 border-2"
          }`}
        >
          <FlaskConical className="w-6 h-6" />
          Líquido
        </button>
        <button
          onClick={() => handleStateClick("gasoso")}
          className={`px-4 py-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
            activeState === "gasoso" ? "bg-primary text-white" : "bg-card hover:bg-primary/10 border-2"
          }`}
        >
          <Wind className="w-6 h-6" />
          Gasoso
        </button>
      </div>

      {completedStates.length === 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-500 flex items-center gap-2 font-bold"
        >
          <CheckCircle2 className="w-6 h-6" />
          Excelente! Você observou todos os estados.
        </motion.div>
      )}
    </div>
  );
}
