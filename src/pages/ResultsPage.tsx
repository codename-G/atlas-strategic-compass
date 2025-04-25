
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDiagnostic } from "@/context/DiagnosticContext";
import {
  categories,
  getCategoryFeedback,
  getCompanyStageFeedback,
} from "@/data/assessmentQuestions";
import {
  PieChart,
  TrendingUp,
  Settings,
  Users,
  DollarSign,
  Package,
  Laptop,
  Info,
  ArrowRight,
} from "lucide-react";

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
    // Recalculate scores if not already done
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

  const getScoreClass = (score: number) => {
    if (score < 2) return "bg-red-500 text-white";
    if (score < 3) return "bg-yellow-500 text-white";
    if (score < 4) return "bg-green-500 text-white";
    return "bg-blue-500 text-white";
  };

  const getLevelText = (score: number) => {
    if (score < 2) return "Inicial";
    if (score < 3) return "Básico";
    if (score < 4) return "Intermediário";
    if (score < 4.5) return "Avançado";
    return "Excelente";
  };

  const getStageBadgeClass = () => {
    switch (companyStage) {
      case "validation":
        return "bg-red-500/20 text-red-300 border-red-500/50";
      case "structuring":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/50";
      case "initialScaling":
        return "bg-green-500/20 text-green-300 border-green-500/50";
      case "advancedScaling":
        return "bg-blue-500/20 text-blue-300 border-blue-500/50";
      case "marketReference":
        return "bg-purple-500/20 text-purple-300 border-purple-500/50";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/50";
    }
  };

  const chartData = Object.keys(categoryScores).map((category) => ({
    category: categories[category as keyof typeof categories].name,
    score: categoryScores[category as keyof typeof categoryScores],
    fullScore: 5,
  }));

  const stageFeedback = companyStage
    ? getCompanyStageFeedback(companyStage)
    : { title: "", description: "", suggestion: "" };

  return (
    <DiagnosticLayout
      title="Resultados do Diagnóstico"
      subtitle="Confira seu diagnóstico estratégico personalizado"
      showProgress={false}
    >
      <div className="space-y-8">
        <div className="bg-atlas-dark/50 rounded-lg p-6 glass">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-medium mb-2">
                Diagnóstico da {profile.companyName || "Sua Empresa"}
              </h3>
              <p className="text-atlas-white/80 mb-6">
                Baseado nas suas respostas, criamos um diagnóstico completo da
                sua empresa. Confira os resultados e descubra como otimizar sua
                estratégia.
              </p>

              <div className="mb-6">
                <Badge
                  variant="outline"
                  className={`mb-2 text-sm px-3 py-1 ${getStageBadgeClass()}`}
                >
                  {stageFeedback.title}
                </Badge>
                <p className="text-atlas-white/80 mb-2">
                  {stageFeedback.description}
                </p>
                <p className="text-sm text-atlas-blue">
                  {stageFeedback.suggestion}
                </p>
              </div>

              <p className="text-sm text-atlas-white/50">
                Pontuação média global: {overallScore.toFixed(1)}/5
              </p>
            </div>

            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={chartData}
                >
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

        <h3 className="text-lg font-medium border-b border-atlas-white/10 pb-2 mb-4">
          Detalhamento por Categoria
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Object.keys(categoryScores).map((categoryKey) => {
            const category = categoryKey as keyof typeof categoryScores;
            const score = categoryScores[category];
            const { name } = categories[category];
            const feedback = getCategoryFeedback(score, category);

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-atlas-dark/50 mr-3">
                      {getCategoryIcon(category)}
                    </div>
                    <div>
                      <h4 className="font-medium">{name}</h4>
                      <div className="flex items-center mt-1">
                        <div
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getScoreClass(
                            score
                          )}`}
                        >
                          {score.toFixed(1)}
                        </div>
                        <span className="ml-2 text-sm text-atlas-white/70">
                          {getLevelText(score)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full"
                      >
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Baseado na média das respostas para as perguntas da
                        categoria {name.toLowerCase()}.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <p className="text-sm text-atlas-white/80 mt-3">{feedback}</p>
              </motion.div>
            );
          })}
        </div>

        <Card className="mt-8 bg-atlas-blue/10 border-atlas-blue/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Info className="w-5 h-5 mr-2" /> Próximos Passos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-atlas-white/80 mb-6">
              Com base em seu diagnóstico, a Atlas Marketing Intelligence pode
              ajudar a melhorar os pontos críticos e potencializar as forças da
              sua estratégia.
            </p>
            <Button className="bg-atlas-blue hover:bg-atlas-blue/90 flex items-center gap-2">
              Descubra como a IA da Marketing Atlas pode te ajudar
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </DiagnosticLayout>
  );
};

export default ResultsPage;
