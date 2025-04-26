
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";

interface CategoryDetailsProps {
  category: string;
  score: number;
  icon: React.ReactNode;
  feedback: string;
  details: {
    description: string;
    opportunities: string[];
    nextSteps: string[];
  };
}

const CategoryDetails = ({ category, score, icon, feedback, details }: CategoryDetailsProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const getLevelText = (score: number) => {
    if (score < 2) return "Inicial";
    if (score < 3) return "Básico";
    if (score < 4) return "Intermediário";
    if (score < 4.5) return "Avançado";
    return "Excelente";
  };

  const getScoreClass = (score: number) => {
    if (score < 2) return "bg-red-500 text-white";
    if (score < 3) return "bg-yellow-500 text-white";
    if (score < 4) return "bg-green-500 text-white";
    return "bg-blue-500 text-white";
  };


  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="glass p-4 rounded-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="bg-white text-black dark:bg-black dark:text-white"">
              {icon}
            </div>
            <div>
              <h4 className="font-medium">{category}</h4>
              <div className="flex items-center mt-1">
                <div className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getScoreClass(score)}`}>
                  {score.toFixed(1)}
                </div>
                <span className="ml-2 text-sm text-atlas-white/70">
                  {getLevelText(score)}
                </span>
              </div>
            </div>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8">
              {isOpen ? "Ver menos" : "Ver mais"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 space-y-4"
          >
            <p className="text-sm text-atlas-white/80">{details.description}</p>
            <div>
              <h5 className="text-sm font-medium mb-2">Principais Oportunidades</h5>
              <ul className="text-sm text-atlas-white/80 space-y-2">
                {details.opportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    {opportunity}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium mb-2">Próximos Passos</h5>
              <ul className="text-sm text-atlas-white/80 space-y-2">
                {details.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default CategoryDetails;
