import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  XCircle,
  Beaker,
  Coffee,
  Shirt,
  Cookie,
  Droplets,
  Hand,
  RotateCcw,
} from "lucide-react";

interface SeparacaoMisturasGameProps {
  onComplete: () => void;
}

interface Mistura {
  id: string;
  nome: string;
  exemplo: string;
  metodoCorreto: string;
  icon: React.ElementType;
  cor: string;
}

interface Metodo {
  id: string;
  nome: string;
  definicao: string;
  cor: string;
  corFundo: string;
}

export function SeparacaoMisturasGame({
  onComplete,
}: SeparacaoMisturasGameProps) {
  const [misturaAtiva, setMisturaAtiva] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, boolean | null>>({});
  const [metodosCorretos, setMetodosCorretos] = useState<Record<string, string>>({});

  const metodos: Metodo[] = [
    {
      id: "catacao",
      nome: "Catação",
      definicao: "Separação manual de sólidos de tamanhos diferentes",
      cor: "text-amber-700",
      corFundo: "from-amber-400 to-orange-500",
    },
    {
      id: "filtracao",
      nome: "Filtração",
      definicao: "Separação de sólidos insolúveis de líquidos",
      cor: "text-orange-700",
      corFundo: "from-orange-300 to-orange-600",
    },
    {
      id: "centrifugacao",
      nome: "Centrifugação",
      definicao: "Separação por força centrífuga",
      cor: "text-blue-700",
      corFundo: "from-blue-400 to-cyan-600",
    },
    {
      id: "peneiracao",
      nome: "Peneiração",
      definicao: "Separação por peneira, usando tamanhos diferentes",
      cor: "text-yellow-700",
      corFundo: "from-yellow-400 to-amber-500",
    },
    {
      id: "decantacao",
      nome: "Decantação",
      definicao: "Separação por densidade com ação da gravidade",
      cor: "text-indigo-700",
      corFundo: "from-indigo-400 to-purple-600",
    },
  ];

  const misturas: Mistura[] = [
    {
      id: "feijao",
      nome: "Feijão e Pedras",
      exemplo: "Escolher feijão para cozinhar",
      metodoCorreto: "catacao",
      icon: Hand,
      cor: "border-amber-400",
    },
    {
      id: "cafe",
      nome: "Café no Coador",
      exemplo: "Separar o pó do café do líquido",
      metodoCorreto: "filtracao",
      icon: Coffee,
      cor: "border-orange-400",
    },
    {
      id: "roupa",
      nome: "Lavagem de Roupas",
      exemplo: "Separar água das roupas na máquina",
      metodoCorreto: "centrifugacao",
      icon: Shirt,
      cor: "border-blue-400",
    },
    {
      id: "acucar",
      nome: "Açúcar Grosso",
      exemplo: "Peneirar açúcar para bolo",
      metodoCorreto: "peneiracao",
      icon: Cookie,
      cor: "border-yellow-400",
    },
    {
      id: "oleo",
      nome: "Óleo e Água",
      exemplo: "Separar água do óleo",
      metodoCorreto: "decantacao",
      icon: Droplets,
      cor: "border-indigo-400",
    },
  ];

  const metodosEmbaralhados = useMemo(() => {
    return [...metodos].sort(() => Math.random() - 0.5);
  }, []);

  const acertos = Object.values(feedback).filter((item) => item === true).length;
  const progresso = (acertos / misturas.length) * 100;

  const selecionarMistura = (misturaId: string) => {
    if (feedback[misturaId] === true) return;
    setMisturaAtiva(misturaId);
  };

  const selecionarMetodo = (metodoId: string) => {
    if (!misturaAtiva) return;

    const mistura = misturas.find((item) => item.id === misturaAtiva);
    if (!mistura) return;

    const correto = mistura.metodoCorreto === metodoId;

    const novoFeedback = {
      ...feedback,
      [misturaAtiva]: correto,
    };

    setRespostas((prev) => ({
      ...prev,
      [misturaAtiva]: metodoId,
    }));

    setFeedback(novoFeedback);

    if (correto) {
      setMetodosCorretos((prev) => ({
        ...prev,
        [metodoId]: misturaAtiva,
      }));
    }

    setMisturaAtiva(null);

    const todasCorretas = misturas.every((item) => {
      if (item.id === misturaAtiva) return correto;
      return novoFeedback[item.id] === true;
    });

    if (todasCorretas) {
      setTimeout(onComplete, 1500);
    }
  };

  const reiniciar = () => {
    setMisturaAtiva(null);
    setRespostas({});
    setFeedback({});
    setMetodosCorretos({});
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <Beaker className="w-8 h-8 text-green-600" />
          Separação de Misturas
        </h2>

        <p className="text-gray-600">
          Clique em uma mistura e depois clique no método correto.
        </p>
      </div>

      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Acertos: {acertos} de {misturas.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(progresso)}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            animate={{ width: `${progresso}%` }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full"
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 text-center">
            Misturas
          </h3>

          {misturas.map((mistura) => {
            const Icon = mistura.icon;
            const ativa = misturaAtiva === mistura.id;
            const resultado = feedback[mistura.id];
            const metodoEscolhido = metodos.find(
              (metodo) => metodo.id === respostas[mistura.id]
            );

            return (
              <motion.button
                key={mistura.id}
                whileHover={resultado === true ? {} : { scale: 1.02 }}
                whileTap={resultado === true ? {} : { scale: 0.98 }}
                onClick={() => selecionarMistura(mistura.id)}
                disabled={resultado === true}
                className={`relative w-full text-left p-4 rounded-2xl border-2 bg-white transition-all ${
                  ativa
                    ? "border-blue-600 bg-blue-50 shadow-lg"
                    : resultado === true
                    ? "border-green-500 bg-green-50"
                    : resultado === false
                    ? "border-red-500 bg-red-50"
                    : mistura.cor
                }`}
              >
                <div className="absolute -top-3 -right-3 bg-white rounded-full">
                  {resultado === true && (
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  )}

                  {resultado === false && (
                    <XCircle className="w-8 h-8 text-red-600" />
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gray-700" />
                  </div>

                  <div>
                    <h4 className="font-bold text-lg text-gray-900">
                      {mistura.nome}
                    </h4>

                    <p className="text-sm text-gray-600">{mistura.exemplo}</p>

                    {metodoEscolhido && (
                      <p
                        className={`text-xs mt-2 font-semibold ${
                          resultado === true
                            ? "text-green-700"
                            : "text-red-600"
                        }`}
                      >
                        Método escolhido: {metodoEscolhido.nome}
                      </p>
                    )}

                    {ativa && (
                      <p className="text-xs mt-2 font-bold text-blue-700">
                        Agora clique no método correspondente à direita.
                      </p>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 text-center">
            Métodos
          </h3>

          {metodosEmbaralhados.map((metodo) => {
            const misturaRelacionadaId = metodosCorretos[metodo.id];
            const estaRelacionado = Boolean(misturaRelacionadaId);
            const misturaRelacionada = misturas.find(
              (mistura) => mistura.id === misturaRelacionadaId
            );

            return (
              <motion.button
                key={metodo.id}
                whileHover={{
                  scale: misturaAtiva && !estaRelacionado ? 1.02 : 1,
                }}
                whileTap={{
                  scale: misturaAtiva && !estaRelacionado ? 0.98 : 1,
                }}
                onClick={() => selecionarMetodo(metodo.id)}
                disabled={!misturaAtiva || estaRelacionado}
                className={`relative w-full text-left p-4 rounded-2xl border-2 bg-white transition-all ${
                  estaRelacionado
                    ? "border-green-500 bg-green-50"
                    : misturaAtiva
                    ? "border-blue-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer"
                    : "border-gray-200 opacity-70 cursor-not-allowed"
                }`}
              >
                {estaRelacionado && (
                  <div className="absolute -top-3 -right-3 bg-white rounded-full">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${metodo.corFundo} rounded-full flex items-center justify-center`}
                  >
                    <Beaker className="w-6 h-6 text-white" />
                  </div>

                  <div>
                    <h4 className={`font-bold text-lg ${metodo.cor}`}>
                      {metodo.nome}
                    </h4>

                    <p className="text-sm text-gray-600">{metodo.definicao}</p>

                    {estaRelacionado && misturaRelacionada && (
                      <p className="text-xs mt-2 font-bold text-green-700">
                        Relacionado com: {misturaRelacionada.nome}
                      </p>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <button
        onClick={reiniciar}
        className="flex items-center gap-2 px-5 py-3 rounded-full bg-white border-2 border-gray-200 text-gray-700 font-bold shadow hover:bg-gray-50"
      >
        <RotateCcw className="w-5 h-5" />
        Recomeçar
      </button>

      {acertos === misturas.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8" />
            <div>
              <p className="font-bold text-lg">Excelente trabalho!</p>
              <p className="text-sm">
                Você associou todas as misturas aos métodos corretos.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}