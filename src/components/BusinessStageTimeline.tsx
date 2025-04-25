
import { motion } from "framer-motion";
import { Flag, FlagOff } from "lucide-react";
import { CompanyStage } from "@/context/DiagnosticContext";

interface BusinessStageTimelineProps {
  currentStage: CompanyStage;
}

const stages: { id: CompanyStage; title: string; description: string }[] = [
  {
    id: "validation",
    title: "Fase de Validação",
    description: "Momento de validar o modelo de negócio e o produto/serviço no mercado."
  },
  {
    id: "structuring",
    title: "Fase de Estruturação",
    description: "Estabelecimento de processos e estruturas básicas para crescimento."
  },
  {
    id: "initialScaling",
    title: "Fase de Escala Inicial",
    description: "Início do crescimento acelerado com processos estabelecidos."
  },
  {
    id: "advancedScaling",
    title: "Fase de Escala Avançada",
    description: "Crescimento sustentável com estrutura robusta."
  },
  {
    id: "marketReference",
    title: "Referência no Mercado",
    description: "Empresa consolidada e referência em seu segmento."
  }
];

const BusinessStageTimeline = ({ currentStage }: BusinessStageTimelineProps) => {
  const currentIndex = stages.findIndex(stage => stage.id === currentStage);
  
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-atlas-white/10" />
        <div className="relative flex justify-between">
          {stages.map((stage, index) => {
            const isCurrent = stage.id === currentStage;
            const isPast = index < currentIndex;
            
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative flex flex-col items-center"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors ${
                    isCurrent
                      ? "bg-atlas-blue text-white"
                      : isPast
                      ? "bg-atlas-white/20 text-atlas-white/60"
                      : "bg-atlas-dark text-atlas-white/40"
                  }`}
                >
                  {isCurrent ? (
                    <Flag className="w-5 h-5" />
                  ) : (
                    <FlagOff className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`mt-2 text-xs text-center max-w-[100px] transition-colors ${
                    isCurrent ? "text-atlas-blue font-medium" : "text-atlas-white/60"
                  }`}
                >
                  {stage.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
      {stages.map((stage) => (
        stage.id === currentStage && (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center max-w-xl mx-auto"
          >
            <p className="text-atlas-white/80 text-sm">{stage.description}</p>
          </motion.div>
        )
      ))}
    </div>
  );
};

export default BusinessStageTimeline;
