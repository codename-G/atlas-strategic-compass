import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DiagnosticLayout from "@/components/DiagnosticLayout";
import CategoryCard from "@/components/CategoryCard";
import QuestionCard from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { getQuestionsByCategory, categories } from "@/data/assessmentQuestions";
import type { CategoryType } from "@/context/DiagnosticContext";

const AssessmentPage = () => {
  const navigate = useNavigate();
  const { 
    answers, 
    currentCategory, 
    setCurrentCategory, 
    updateProgress,
    calculateCategoryScores,
    determineCompanyStage
  } = useDiagnostic();
  
  // State for managing which question is being displayed
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedCategories, setCompletedCategories] = useState<CategoryType[]>([]);
  const [categoryProgress, setCategoryProgress] = useState<Record<CategoryType, number>>({
    marketing: 0,
    sales: 0,
    processes: 0,
    people: 0,
    financial: 0,
    product: 0,
    technology: 0
  });
  
  const categoryTypes = Object.keys(categories) as CategoryType[];
  
  useEffect(() => {
    // If no category is selected, set the default to the first category
    if (!currentCategory) {
      setCurrentCategory("marketing");
    }
    
    // Update the overall progress
    const totalQuestions = categoryTypes.reduce(
      (total, cat) => total + getQuestionsByCategory(cat).length, 
      0
    );
    const answeredQuestions = answers.length;
    
    updateProgress(Math.round(((answeredQuestions / totalQuestions) * 67) + 33)); // 33% from Profile + up to 67% for Assessment
    
    // Update progress for each category
    const newCategoryProgress = { ...categoryProgress };
    
    categoryTypes.forEach(cat => {
      const catQuestions = getQuestionsByCategory(cat);
      const catAnswers = answers.filter(a => a.categoryId === cat);
      const progress = catQuestions.length > 0 ? (catAnswers.length / catQuestions.length) * 100 : 0;
      newCategoryProgress[cat] = progress;
      
      if (progress === 100 && !completedCategories.includes(cat)) {
        setCompletedCategories(prev => [...prev, cat]);
      }
    });
    
    setCategoryProgress(newCategoryProgress);
  }, [currentCategory, answers, completedCategories]);
  
  const currentQuestions = currentCategory ? getQuestionsByCategory(currentCategory) : [];
  const currentQuestion = currentQuestions[currentQuestionIndex];
  
  const handleCategorySelect = (category: CategoryType) => {
    setCurrentCategory(category);
    setCurrentQuestionIndex(0); // Reset to the first question of the new category
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // If this was the last question in the category
      const newCompletedCategories = [...completedCategories];
      
      if (currentCategory && !completedCategories.includes(currentCategory)) {
        newCompletedCategories.push(currentCategory);
        setCompletedCategories(newCompletedCategories);
      }
      
      // Find the next incomplete category
      const nextCategory = categoryTypes.find(
        cat => !newCompletedCategories.includes(cat)
      );
      
      if (nextCategory) {
        setCurrentCategory(nextCategory);
        setCurrentQuestionIndex(0);
      } else {
        // All categories are complete, calculate scores and navigate to results
        calculateCategoryScores();
        determineCompanyStage();
        navigate("/results");
      }
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const allCategoriesCompleted = completedCategories.length === categoryTypes.length;
  
  return (
    <DiagnosticLayout 
      title="Avaliação Estratégica" 
      subtitle="Responda às perguntas para receber seu diagnóstico personalizado"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {categoryTypes.map(category => (
            <CategoryCard
              key={category}
              category={category}
              completed={completedCategories.includes(category)}
              current={currentCategory === category}
              onClick={() => handleCategorySelect(category)}
              progress={categoryProgress[category]}
            />
          ))}
        </div>
        
        <div className="pt-4">
          {currentCategory && currentQuestion && (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  {getCategoryIcon(currentCategory)}
                  <h3 className="font-medium ml-2">{categories[currentCategory].name}</h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  Pergunta {currentQuestionIndex + 1} de {currentQuestions.length}
                </div>
              </div>
              
              <QuestionCard 
                question={currentQuestion} 
                onNext={handleNextQuestion} 
              />
            </>
          )}
        </div>
      </div>
    </DiagnosticLayout>
  );
};

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

// Import the necessary icons
import { PieChart, TrendingUp, Settings, Users, DollarSign, Package, Laptop } from "lucide-react";

export default AssessmentPage;
