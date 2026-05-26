import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface TabelaPeriodicaGameProps {
  onComplete: () => void;
}

const elements = [
  { symbol: "H", name: "Hidrogênio", group: "nonmetal" },
  { symbol: "He", name: "Hélio", group: "noble" },
  { symbol: "Li", name: "Lítio", group: "alkali" },
  { symbol: "Be", name: "Berílio", group: "alkaline" },
  { symbol: "B", name: "Boro", group: "metalloid" },
  { symbol: "C", name: "Carbono", group: "nonmetal" },
  { symbol: "N", name: "Nitrogênio", group: "nonmetal" },
  { symbol: "O", name: "Oxigênio", group: "nonmetal" },
  { symbol: "F", name: "Flúor", group: "halogen" },
  { symbol: "Ne", name: "Neônio", group: "noble" },
];

export function TabelaPeriodicaGame({ onComplete }: TabelaPeriodicaGameProps) {
  const [targetIndex, setTargetIndex] = useState(0);
  const targets = ["H", "O", "C", "Ne"]; // Sequence to find
  const currentTarget = targets[targetIndex];

  const handleSelect = (symbol: string) => {
    if (symbol === currentTarget) {
      if (targetIndex + 1 === targets.length) {
        setTargetIndex(targetIndex + 1);
        setTimeout(onComplete, 1500);
      } else {
        setTargetIndex(targetIndex + 1);
      }
    }
  };

  const getColor = (group: string) => {
    switch (group) {
      case "nonmetal": return "bg-blue-100 border-blue-300 text-blue-900";
      case "noble": return "bg-purple-100 border-purple-300 text-purple-900";
      case "alkali": return "bg-red-100 border-red-300 text-red-900";
      case "alkaline": return "bg-orange-100 border-orange-300 text-orange-900";
      case "metalloid": return "bg-green-100 border-green-300 text-green-900";
      case "halogen": return "bg-yellow-100 border-yellow-300 text-yellow-900";
      default: return "bg-gray-100 border-gray-300";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6">
      <h2 className="text-2xl font-bold text-center">Tabela Periódica</h2>
      
      {targetIndex < targets.length ? (
        <div className="text-center p-4 bg-primary/10 rounded-xl border border-primary/20">
          <p className="text-muted-foreground mb-1">Encontre o elemento:</p>
          <p className="text-2xl font-bold text-primary">
            {elements.find(e => e.symbol === currentTarget)?.name}
          </p>
        </div>
      ) : (
         <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-500 flex items-center gap-2 font-bold text-xl"
        >
          <CheckCircle2 className="w-8 h-8" />
          Desafio concluído!
        </motion.div>
      )}

      <div className="grid grid-cols-5 gap-3 max-w-3xl">
        {elements.map((el) => (
          <motion.button
            key={el.symbol}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(el.symbol)}
            className={`w-16 h-16 md:w-20 md:h-20 border-2 rounded-lg flex flex-col items-center justify-center transition-colors ${getColor(el.group)} hover:brightness-95`}
          >
            <span className="text-xl md:text-2xl font-bold">{el.symbol}</span>
            <span className="text-[10px] md:text-xs truncate w-full px-1">{el.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
