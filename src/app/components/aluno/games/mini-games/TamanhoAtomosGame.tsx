import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface TamanhoAtomosGameProps {
  onComplete: () => void;
}

export function TamanhoAtomosGame({ onComplete }: TamanhoAtomosGameProps) {
  const [sorted, setSorted] = useState<string[]>([]);
  
  const atoms = [
    { id: "He", name: "Hélio", size: 31, color: "bg-red-400" },
    { id: "O", name: "Oxigênio", size: 48, color: "bg-blue-400" },
    { id: "C", name: "Carbono", size: 67, color: "bg-zinc-600" },
    { id: "Na", name: "Sódio", size: 190, color: "bg-yellow-400" },
    { id: "K", name: "Potássio", size: 243, color: "bg-purple-400" },
  ];

  const handleSelect = (id: string) => {
    if (sorted.includes(id)) return;
    
    // They must click from smallest to largest
    const sortedSoFarCount = sorted.length;
    const expectedNext = [...atoms].sort((a, b) => a.size - b.size)[sortedSoFarCount];
    
    if (id === expectedNext.id) {
      const newSorted = [...sorted, id];
      setSorted(newSorted);
      if (newSorted.length === atoms.length) {
        setTimeout(onComplete, 1500);
      }
    } else {
      // Wrong click effect could be added here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6">
      <h2 className="text-2xl font-bold text-center">Tamanho dos Átomos</h2>
      <p className="text-muted-foreground text-center">
        Clique nos átomos em ordem crescente de tamanho (do menor para o maior).
      </p>

      <div className="flex flex-wrap items-end justify-center gap-6 min-h-[200px] border-2 border-dashed border-border rounded-xl p-8 w-full max-w-2xl bg-card">
        {atoms.map((atom) => {
          const isSorted = sorted.includes(atom.id);
          return (
            <motion.div
              key={atom.id}
              whileHover={!isSorted ? { scale: 1.1 } : {}}
              whileTap={!isSorted ? { scale: 0.95 } : {}}
              onClick={() => handleSelect(atom.id)}
              className={`flex flex-col items-center gap-2 cursor-pointer transition-opacity ${
                isSorted ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <div
                className={`rounded-full flex items-center justify-center text-white font-bold shadow-md ${atom.color}`}
                style={{
                  width: `${Math.max(40, atom.size * 0.4)}px`,
                  height: `${Math.max(40, atom.size * 0.4)}px`,
                }}
              >
                {atom.id}
              </div>
              <span className="text-sm font-medium">{atom.name}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="flex gap-2">
        {sorted.map((id, index) => (
          <div key={id} className="flex items-center gap-2">
            <span className="px-3 py-1 bg-primary/20 text-primary font-bold rounded-lg">
              {id}
            </span>
            {index < sorted.length - 1 && <span className="text-muted-foreground">&lt;</span>}
          </div>
        ))}
      </div>

      {sorted.length === atoms.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-500 flex items-center gap-2 font-bold"
        >
          <CheckCircle2 className="w-6 h-6" />
          Perfeito! Você ordenou corretamente.
        </motion.div>
      )}
    </div>
  );
}
