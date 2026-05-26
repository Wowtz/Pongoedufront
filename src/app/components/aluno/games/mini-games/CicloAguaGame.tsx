import { useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  Cloud,
  CloudRain,
  Droplets,
  Sun,
  Trees,
  RotateCcw,
} from "lucide-react";

interface CicloAguaGameProps {
  onComplete: () => void;
}

type Etapa = {
  id: string;
  nome: string;
  dica: string;
  icon: React.ElementType;
  emoji: string;
  x: number;
  y: number;
  color: string;
};

export function CicloAguaGame({ onComplete }: CicloAguaGameProps) {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [concluidas, setConcluidas] = useState<string[]>([]);
  const [posicaoGota, setPosicaoGota] = useState({ x: 420, y: 250 });
  const [erro, setErro] = useState(false);

  const etapas: Etapa[] = [
    {
      id: "evaporacao",
      nome: "Evaporação",
      dica: "O Sol esquenta a água e ela sobe em forma de vapor.",
      icon: Sun,
      emoji: "☀️",
      x: 520,
      y: 155,
      color: "bg-yellow-200 border-yellow-400 text-yellow-700",
    },
    {
      id: "condensacao",
      nome: "Condensação",
      dica: "O vapor esfria e forma as nuvens.",
      icon: Cloud,
      emoji: "☁️",
      x: 310,
      y: 45,
      color: "bg-slate-100 border-slate-300 text-slate-600",
    },
    {
      id: "precipitacao",
      nome: "Precipitação",
      dica: "A água cai das nuvens em forma de chuva.",
      icon: CloudRain,
      emoji: "🌧️",
      x: 130,
      y: 155,
      color: "bg-blue-100 border-blue-300 text-blue-600",
    },
    {
      id: "infiltracao",
      nome: "Infiltração",
      dica: "Parte da água entra no solo.",
      icon: Droplets,
      emoji: "💧",
      x: 210,
      y: 390,
      color: "bg-cyan-100 border-cyan-300 text-cyan-700",
    },
    {
      id: "transpiracao",
      nome: "Transpiração",
      dica: "As plantas liberam vapor de água para o ar.",
      icon: Trees,
      emoji: "🌳",
      x: 350,
      y: 315,
      color: "bg-green-100 border-green-300 text-green-700",
    },
  ];

  const verificarDestino = (info: any) => {
    const etapaEsperada = etapas[etapaAtual];
    if (!etapaEsperada) return;

    const gotaX = posicaoGota.x + info.offset.x;
    const gotaY = posicaoGota.y + info.offset.y;

    const distancia = Math.sqrt(
      Math.pow(gotaX - etapaEsperada.x, 2) +
        Math.pow(gotaY - etapaEsperada.y, 2)
    );

    if (distancia < 90) {
      const novasConcluidas = [...concluidas, etapaEsperada.id];

      setConcluidas(novasConcluidas);
      setPosicaoGota({ x: etapaEsperada.x, y: etapaEsperada.y });
      setErro(false);

      if (novasConcluidas.length === etapas.length) {
        setTimeout(onComplete, 1500);
      } else {
        setEtapaAtual(etapaAtual + 1);
      }
    } else {
      setErro(true);
      setPosicaoGota({ x: 420, y: 250 });
    }
  };

  const reiniciar = () => {
    setEtapaAtual(0);
    setConcluidas([]);
    setPosicaoGota({ x: 420, y: 250 });
    setErro(false);
  };

  return (
    <div className="flex flex-col items-center gap-5 p-6">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-blue-900">
          A Jornada da Gotinha
        </h2>
        <p className="text-gray-600">
          Arraste a gotinha pelas etapas do ciclo da água.
        </p>
      </div>

      <div className="w-[650px] text-center bg-white border-2 border-blue-200 rounded-3xl px-6 py-4 shadow-sm">
        <p className="text-sm font-bold text-blue-500 uppercase tracking-wide">
          Etapa atual
        </p>

        <h3 className="text-2xl font-extrabold text-blue-900 mt-1">
          {etapas[etapaAtual]?.emoji}{" "}
          {etapas[etapaAtual]?.nome ?? "Finalizado"}
        </h3>

        <p className="text-gray-600 mt-2">
          {etapas[etapaAtual]?.dica ??
            "Você já completou todo o ciclo da água!"}
        </p>

        {erro && (
          <p className="mt-3 text-sm font-bold text-red-500">
            Ops! Arraste a gotinha para a etapa correta.
          </p>
        )}
      </div>

      <div className="relative w-[650px] h-[520px] rounded-3xl overflow-hidden bg-gradient-to-b from-sky-100 to-green-100 border-4 border-blue-200 shadow-xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[420px] h-[420px] rounded-full border-[55px] border-cyan-200" />
        </div>

        <div className="absolute top-[45px] right-[125px] z-10">
          <div className="relative w-[140px] h-[70px]">
            <div className="absolute bottom-0 left-[15px] w-[55px] h-[55px] bg-white rounded-full shadow-md" />
            <div className="absolute bottom-[12px] left-[45px] w-[60px] h-[60px] bg-white rounded-full shadow-md" />
            <div className="absolute bottom-0 left-[80px] w-[50px] h-[50px] bg-white rounded-full shadow-md" />
            <div className="absolute bottom-0 left-[30px] w-[80px] h-[35px] bg-white rounded-full shadow-md" />
          </div>
        </div>

        <div className="absolute top-[40px] right-[410px] z-10">
          <div className="relative w-[150px] h-[120px]">
            <div className="absolute top-[28px] left-[18px] w-[58px] h-[58px] bg-slate-400 rounded-full shadow-md" />
            <div className="absolute top-[6px] left-[50px] w-[72px] h-[72px] bg-slate-400 rounded-full shadow-md" />
            <div className="absolute top-[28px] left-[95px] w-[56px] h-[56px] bg-slate-400 rounded-full shadow-md" />
            <div className="absolute top-[40px] left-[34px] w-[95px] h-[40px] bg-slate-400 rounded-full shadow-md" />

            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.9, 0.5, 0.9] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="absolute top-[82px] left-[42px] text-blue-400 text-xl"
            >
              💧
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0], opacity: [0.8, 0.4, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }}
              className="absolute top-[88px] left-[72px] text-sky-400 text-lg"
            >
              💧
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.9, 0.5, 0.9] }}
              transition={{ repeat: Infinity, duration: 1.1, delay: 0.4 }}
              className="absolute top-[84px] left-[98px] text-blue-500 text-xl"
            >
              💧
            </motion.div>
          </div>
        </div>

        <div className="absolute right-10 bottom-20 w-56 h-24 bg-blue-400 rounded-t-full opacity-80" />
        <div className="absolute right-0 bottom-12 w-80 h-28 bg-blue-300 rounded-t-full opacity-70" />

        <div className="absolute left-[40px] bottom-[55px] w-[180px] h-[90px] bg-green-400 rounded-t-full opacity-90" />

        <div className="absolute left-[35px] bottom-[80px] text-4xl">🌳</div>
        <div className="absolute left-[65px] bottom-[100px] text-4xl">🌳</div>
        <div className="absolute left-[95px] bottom-[80px] text-4xl">🌳</div>

        {etapas.map((etapa, index) => {
          const Icon = etapa.icon;
          const concluida = concluidas.includes(etapa.id);
          const atual = etapas[etapaAtual]?.id === etapa.id;

          return (
            <div
              key={etapa.id}
              className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ left: etapa.x, top: etapa.y }}
            >
              <motion.div
                animate={atual ? { scale: [1, 1.12, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className={`w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-md ${
                  etapa.color
                } ${concluida ? "ring-4 ring-green-300" : ""}`}
              >
                {concluida ? (
                  <CheckCircle2 className="w-9 h-9 text-green-600" />
                ) : (
                  <Icon className="w-9 h-9" />
                )}
              </motion.div>

              <div
                className={`px-3 py-1 rounded-md text-xs font-extrabold shadow border bg-yellow-100 border-yellow-300 text-yellow-900 rotate-[-6deg] ${
                  atual ? "scale-110" : ""
                }`}
              >
                {index + 1}. {etapa.nome}
              </div>
            </div>
          );
        })}

        <motion.div
          drag
          dragMomentum={false}
          onDragEnd={(_, info) => verificarDestino(info)}
          animate={{ x: posicaoGota.x, y: posicaoGota.y }}
          whileDrag={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="absolute left-0 top-0 z-30 cursor-grab active:cursor-grabbing"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-blue-400 border-4 border-white shadow-xl flex items-center justify-center">
              <span className="text-4xl">💧</span>
            </div>
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-full text-xs font-bold text-blue-700 shadow">
              arraste
            </div>
          </div>
        </motion.div>
      </div>

      <button
        onClick={reiniciar}
        className="flex items-center gap-2 px-5 py-3 rounded-full bg-white border-2 border-blue-200 text-blue-800 font-bold shadow hover:bg-blue-50"
      >
        <RotateCcw className="w-5 h-5" />
        Recomeçar
      </button>
    </div>
  );
}