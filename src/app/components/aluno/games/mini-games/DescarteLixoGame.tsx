import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Trash2 } from "lucide-react";

interface DescarteLixoGameProps {
  onComplete: () => void;
}

export function DescarteLixoGame({ onComplete }: DescarteLixoGameProps) {
  const [items, setItems] = useState([
    { id: "papel1", name: "Jornal", type: "papel", emoji: "📰" },
    { id: "plastico1", name: "Garrafa PET", type: "plastico", emoji: "🍾" },
    { id: "vidro1", name: "Pote de conserva", type: "vidro", emoji: "🫙" },
    { id: "metal1", name: "Lata de refri", type: "metal", emoji: "🥫" },
    { id: "organico1", name: "Casca de banana", type: "organico", emoji: "🍌" },
  ]);

  const bins = [
    { type: "papel", color: "bg-blue-500", name: "Papel" },
    { type: "plastico", color: "bg-red-500", name: "Plástico" },
    { type: "vidro", color: "bg-green-500", name: "Vidro" },
    { type: "metal", color: "bg-yellow-500", name: "Metal" },
    { type: "organico", color: "bg-stone-500", name: "Orgânico" },
  ];

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleBinClick = (binType: string) => {
    if (!selectedItem) return;
    
    const itemIndex = items.findIndex(i => i.id === selectedItem);
    if (itemIndex >= 0 && items[itemIndex].type === binType) {
      const newItems = [...items];
      newItems.splice(itemIndex, 1);
      setItems(newItems);
      setSelectedItem(null);
      
      if (newItems.length === 0) {
        setTimeout(onComplete, 1500);
      }
    } else {
      // Wrong bin
      setSelectedItem(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6">
      <h2 className="text-2xl font-bold text-center">Descarte Correto</h2>
      <p className="text-muted-foreground text-center">
        Selecione o lixo e clique na lixeira com a cor correta.
      </p>

      <div className="flex justify-center gap-4 min-h-[100px]">
        {items.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedItem(item.id)}
            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 bg-card transition-all ${
              selectedItem === item.id ? "border-primary ring-2 ring-primary" : "border-border hover:border-primary/50"
            }`}
          >
            <span className="text-4xl">{item.emoji}</span>
            <span className="text-xs font-medium">{item.name}</span>
          </motion.button>
        ))}
        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-green-500 flex items-center gap-2 font-bold my-auto"
          >
            <CheckCircle2 className="w-8 h-8" />
            Parabéns! Você reciclou tudo.
          </motion.div>
        )}
      </div>

      <div className="flex justify-center flex-wrap gap-4 pt-8">
        {bins.map((bin) => (
          <motion.button
            key={bin.type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBinClick(bin.type)}
            className={`w-24 h-32 rounded-lg flex flex-col items-center justify-center gap-3 text-white font-bold shadow-lg ${bin.color} ${selectedItem ? 'ring-4 ring-primary/50 cursor-pointer' : 'cursor-default'}`}
          >
            <Trash2 className="w-10 h-10" />
            {bin.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
