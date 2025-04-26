import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import DiagnosticLayout from "@/components/DiagnosticLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories, getCategoryFeedback, getCompanyStageFeedback } from "@/data/assessmentQuestions";
import {
  PieChart,
  TrendingUp,
  Settings,
  Users,
  DollarSign,
  Package,
  Laptop,
  ArrowRight,
  Instagram
} from "lucide-react";
import { useDiagnostic } from "@/context/DiagnosticContext";
import BusinessStageTimeline from "@/components/BusinessStageTimeline";
import CategoryDetails from "@/components/CategoryDetails";
import ReferralProgram from "@/components/ReferralProgram";

const ResultsPage = () => {
  const {
    categoryScores,
    overallScore,
    companyStage,
    profile,
    calculateCategoryScores,
    determineCompanyStage,
  } = useDiagnostic();

  useEffect(() => {
    if (overallScore === 0) {
      calculateCategoryScores();
      determineCompanyStage();
    }
  }, []);

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case "marketing":
        return <PieChart className="w-5 h-5" />;
      case "sales":
        return <TrendingUp className="w-5 h-5" />;
      case "processes":
        return <Settings className="w-5 h-5" />;
      case "people":
        return <Users className="w-5 h-5" />;
      case "financial":
        return <DollarSign className="w-5 h-5" />;
      case "product":
        return <Package className="w-5 h-5" />;
      case "technology":
        return <Laptop className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getCategoryDetails = (category: string) => {
    return {
      description: "Análise detalhada do desempenho e oportunidades nesta área.",
      opportunities: [
        "Otimização dos processos atuais",
        "Implementação de novas ferramentas",
        "Treinamento da equipe"
      ],
      nextSteps: [
        "Realizar análise detalhada dos indicadores",
        "Definir metas específicas",
        "Implementar melhorias prioritárias"
      ]
    };
  };

  const chartData = Object.keys(categoryScores).map((category) => ({
    category: categories[category as keyof typeof categories].name,
    score: categoryScores[category as keyof typeof categoryScores],
    fullScore: 5,
  }));

  return (
    <DiagnosticLayout
      title="Resultados do Diagnóstico"
      subtitle="Confira seu diagnóstico estratégico personalizado"
      showProgress={false}
    >
      <div className="space-y-8">
        <div className="glass rounded-lg p-6 bg-atlas-blue/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-medium mb-2">
                Diagnóstico da {profile.companyName || "Sua Empresa"}
              </h3>
              <p className="text-atlas-white/80 mb-6">
                Com base nas suas respostas, criamos um diagnóstico completo da
                sua empresa. Confira os resultados e descubra como otimizar sua
                estratégia.
              </p>
              <div className="mb-6">
                <Badge
                  variant="outline"
                  className="mb-2 text-sm px-3 py-1 border-atlas-blue/50 bg-atlas-blue/10 text-atlas-blue"
                >
                  {companyStage && getCompanyStageFeedback(companyStage).title}
                </Badge>
                <p className="text-sm text-atlas-white/80">
                  Pontuação média global: {overallScore.toFixed(1)}/5
                </p>
              </div>
            </div>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="#FFFFFF20" />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: "#FFFFFF80", fontSize: 12 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#60A5FA"
                    fill="#60A5FA"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="glass rounded-lg p-6 bg-atlas-blue/5">
          <h3 className="text-lg font-medium mb-6">Estágio do seu Negócio</h3>
          {companyStage && <BusinessStageTimeline currentStage={companyStage} />}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Detalhamento por Categoria</h3>
          {Object.keys(categoryScores).map((categoryKey) => {
            const category = categoryKey as keyof typeof categoryScores;
            const score = categoryScores[category];
            const { name } = categories[category];
            const feedback = getCategoryFeedback(score, category);
            const details = getCategoryDetails(category);

            return (
              <CategoryDetails
                key={category}
                category={name}
                score={score}
                icon={getCategoryIcon(category)}
                feedback={feedback}
                details={details}
              />
            );
          })}
        </div>

        <ReferralProgram />

        <footer className="text-center py-8 border-t border-atlas-white/10">
          <a
            href="https://instagram.com/marketingatlas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-atlas-white/80 hover:text-atlas-blue transition-colors"
          >
            <Instagram className="w-5 h-5" />
            🚀 Acompanhe conteúdos que vão acelerar o seu crescimento no Instagram!
          </a>
        </footer>
      </div>
    </DiagnosticLayout>
  );
};

export default ResultsPage;
