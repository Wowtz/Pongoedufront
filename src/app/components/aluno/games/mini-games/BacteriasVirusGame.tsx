import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, RotateCcw, Microscope } from "lucide-react";

interface BacteriasVirusGameProps {
  onComplete: () => void;
}

interface Caracteristica {
  id: string;
  texto: string;
  categoriaCorreta: "bacteria" | "virus" | "ambos";
  explicacao: string;
}

const caracteristicas: Caracteristica[] = [
  {
    id: "ser-vivo",
    texto: "É um ser vivo",
    categoriaCorreta: "bacteria",
    explicacao: "Bactérias são seres vivos unicelulares, já vírus são acelulares.",
  },
  {
    id: "possui-celula",
    texto: "Possui célula",
    categoriaCorreta: "bacteria",
    explicacao: "Bactérias possuem célula própria, vírus não.",
  },
  {
    id: "maior-tamanho",
    texto: "Maior tamanho",
    categoriaCorreta: "bacteria",
    explicacao: "Bactérias são maiores que vírus (0,5-5 μm vs 20-300 nm).",
  },
  {
    id: "antibiotico",
    texto: "Tratado com antibiótico",
    categoriaCorreta: "bacteria",
    explicacao: "Antibióticos combatem bactérias, não vírus.",
  },
  {
    id: "sem-celula",
    texto: "Não possui célula",
    categoriaCorreta: "virus",
    explicacao: "Vírus são acelulares, compostos apenas por material genético e proteínas.",
  },
  {
    id: "hospedeiro",
    texto: "Precisa de hospedeiro para reproduzir",
    categoriaCorreta: "virus",
    explicacao: "Vírus só se reproduzem dentro de células hospedeiras.",
  },
  {
    id: "menor-tamanho",
    texto: "Menor tamanho",
    categoriaCorreta: "virus",
    explicacao: "Vírus são menores que bactérias.",
  },
  {
    id: "antiviral",
    texto: "Tratado com antiviral",
    categoriaCorreta: "virus",
    explicacao: "Antivirais são usados para combater infecções virais.",
  },
  {
    id: "doencas",
    texto: "Pode causar doenças",
    categoriaCorreta: "ambos",
    explicacao: "Tanto bactérias quanto vírus podem causar doenças.",
  },
  {
    id: "microscopio",
    texto: "Visível em microscópio",
    categoriaCorreta: "ambos",
    explicacao: "Ambos são visíveis em microscópio (eletrônico para vírus).",
  },
];

export function BacteriasVirusGame({ onComplete }: BacteriasVirusGameProps) {
  const [caracteristicaSelecionada, setCaracteristicaSelecionada] = useState<
    string | null
  >(null);
  const [respostas, setRespostas] = useState<
    Record<string, "bacteria" | "virus" | "ambos">
  >({});
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});
  const [tentativaErrada, setTentativaErrada] = useState<string | null>(null);

  const acertos = Object.values(feedback).filter((f) => f === true).length;
  const progresso = (acertos / caracteristicas.length) * 100;

  const selecionarCaracteristica = (id: string) => {
    if (feedback[id]) return;
    setCaracteristicaSelecionada(id);
  };

  const selecionarCategoria = (categoria: "bacteria" | "virus" | "ambos") => {
    if (!caracteristicaSelecionada) return;

    const caracteristica = caracteristicas.find(
      (c) => c.id === caracteristicaSelecionada
    );
    if (!caracteristica) return;

    const correto = caracteristica.categoriaCorreta === categoria;

    if (correto) {
      setRespostas((prev) => ({
        ...prev,
        [caracteristicaSelecionada]: categoria,
      }));

      setFeedback((prev) => ({
        ...prev,
        [caracteristicaSelecionada]: true,
      }));

      setCaracteristicaSelecionada(null);

      const todasCorretas = caracteristicas.every((c) => {
        if (c.id === caracteristicaSelecionada) return true;
        return feedback[c.id] === true;
      });

      if (todasCorretas) {
        setTimeout(onComplete, 1500);
      }
    } else {
      setTentativaErrada(caracteristicaSelecionada);
      setTimeout(() => {
        setTentativaErrada(null);
        setCaracteristicaSelecionada(null);
      }, 800);
    }
  };

  const reiniciar = () => {
    setCaracteristicaSelecionada(null);
    setRespostas({});
    setFeedback({});
    setTentativaErrada(null);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <Microscope className="w-8 h-8 text-blue-600" />
          Bactérias vs Vírus
        </h2>
        <p className="text-gray-600 max-w-2xl">
          Clique em uma característica e depois clique na categoria correta.
        </p>
      </div>

      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Acertos: {acertos} de {caracteristicas.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(progresso)}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            animate={{ width: `${progresso}%` }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 text-center">
            Características
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {caracteristicas.map((caracteristica) => {
              const selecionada = caracteristicaSelecionada === caracteristica.id;
              const respondida = feedback[caracteristica.id];
              const errada = tentativaErrada === caracteristica.id;

              return (
                <motion.button
                  key={caracteristica.id}
                  onClick={() => selecionarCaracteristica(caracteristica.id)}
                  disabled={respondida}
                  animate={
                    errada
                      ? {
                          x: [-10, 10, -10, 10, 0],
                          rotate: [-2, 2, -2, 2, 0],
                        }
                      : {}
                  }
                  transition={{ duration: 0.4 }}
                  whileHover={!respondida ? { scale: 1.02 } : {}}
                  whileTap={!respondida ? { scale: 0.98 } : {}}
                  className={`relative p-4 rounded-2xl border-2 transition-all text-left ${
                    respondida
                      ? "border-green-500 bg-green-50 cursor-default"
                      : selecionada
                      ? "border-blue-600 bg-blue-50 shadow-lg"
                      : errada
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white hover:border-blue-400"
                  }`}
                >
                  {respondida && (
                    <div className="absolute -top-3 -right-3 bg-white rounded-full">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                  )}

                  {errada && (
                    <div className="absolute -top-3 -right-3 bg-white rounded-full">
                      <XCircle className="w-8 h-8 text-red-600" />
                    </div>
                  )}

                  <p className="font-semibold text-gray-900">
                    {caracteristica.texto}
                  </p>

                  {respondida && (
                    <p className="text-xs text-green-700 mt-2">
                      {caracteristica.explicacao}
                    </p>
                  )}

                  {selecionada && !respondida && (
                    <p className="text-xs text-blue-700 mt-2 font-bold">
                      Agora clique na categoria à direita →
                    </p>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 text-center">
            Categorias
          </h3>

          <motion.button
            onClick={() => selecionarCategoria("bacteria")}
            disabled={!caracteristicaSelecionada}
            whileHover={
              caracteristicaSelecionada ? { scale: 1.03 } : {}
            }
            whileTap={caracteristicaSelecionada ? { scale: 0.97 } : {}}
            className={`w-full p-6 rounded-3xl border-2 transition-all ${
              caracteristicaSelecionada
                ? "border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl cursor-pointer"
                : "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-purple-300 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400"
                  alt="Bactéria"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left flex-1">
                <h4 className="text-2xl font-bold text-purple-700">Bactéria</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Ser vivo unicelular com célula própria
                </p>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => selecionarCategoria("virus")}
            disabled={!caracteristicaSelecionada}
            whileHover={
              caracteristicaSelecionada ? { scale: 1.03 } : {}
            }
            whileTap={caracteristicaSelecionada ? { scale: 0.97 } : {}}
            className={`w-full p-6 rounded-3xl border-2 transition-all ${
              caracteristicaSelecionada
                ? "border-red-400 bg-gradient-to-br from-red-50 to-orange-50 hover:shadow-xl cursor-pointer"
                : "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-red-300 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1706201320648-34ceff15239a?w=400"
                  alt="Vírus"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left flex-1">
                <h4 className="text-2xl font-bold text-red-700">Vírus</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Acelular, precisa de hospedeiro
                </p>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => selecionarCategoria("ambos")}
            disabled={!caracteristicaSelecionada}
            whileHover={
              caracteristicaSelecionada ? { scale: 1.03 } : {}
            }
            whileTap={caracteristicaSelecionada ? { scale: 0.97 } : {}}
            className={`w-full p-6 rounded-3xl border-2 transition-all ${
              caracteristicaSelecionada
                ? "border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl cursor-pointer"
                : "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="grid grid-cols-2 gap-1 w-24 h-24">
                <div className="rounded-lg overflow-hidden border border-blue-300">
                  <img
                    src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=200"
                    alt="Bactéria"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden border border-blue-300">
                  <img
                    src="https://images.unsplash.com/photo-1706201320648-34ceff15239a?w=200"
                    alt="Vírus"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-left flex-1">
                <h4 className="text-2xl font-bold text-blue-700">Ambos</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Característica comum aos dois
                </p>
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      <button
        onClick={reiniciar}
        className="flex items-center gap-2 px-5 py-3 rounded-full bg-white border-2 border-gray-200 text-gray-700 font-bold shadow hover:bg-gray-50"
      >
        <RotateCcw className="w-5 h-5" />
        Recomeçar
      </button>

      <AnimatePresence>
        {acertos === caracteristicas.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8" />
              <div>
                <p className="font-bold text-lg">Parabéns!</p>
                <p className="text-sm">
                  Você identificou todas as diferenças entre bactérias e vírus.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
