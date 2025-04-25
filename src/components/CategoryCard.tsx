
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/context/DiagnosticContext";
import { categories } from "@/data/assessmentQuestions";
import { Badge } from "@/components/ui/badge";
import { PieChart, BarChart, TrendingUp, Settings, Users, DollarSign, Package, Laptop } from "lucide-react";

interface CategoryCardProps {
  category: CategoryType;
  completed: boolean;
  current: boolean;
  onClick: () => void;
  progress: number;
}

const getCategoryIcon = (category: CategoryType) => {
  switch (category) {
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
  }
};

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  completed, 
  current,
  onClick, 
  progress 
}) => {
  const { name, description } = categories[category];
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "rounded-lg p-4 cursor-pointer border transition-all",
        current ? "bg-atlas-blue/20 border-atlas-blue" : 
        completed ? "bg-secondary border-secondary" : 
        "bg-secondary/30 border-secondary/50"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={cn(
            "p-1.5 rounded-full",
            current ? "bg-atlas-blue text-white" : "bg-secondary text-foreground"
          )}>
            {getCategoryIcon(category)}
          </div>
          <h3 className="font-medium">{name}</h3>
        </div>
        
        {completed && (
          <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/50">
            Concluído
          </Badge>
        )}
        
        {current && !completed && (
          <Badge variant="outline" className="bg-atlas-blue/20 text-atlas-blue border-atlas-blue/50">
            Em progresso
          </Badge>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      
      <div className="progress-bar-track">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
};

export default CategoryCard;
