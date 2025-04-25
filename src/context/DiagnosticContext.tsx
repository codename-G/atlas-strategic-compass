
import React, { createContext, useState, useContext, ReactNode } from "react";

export interface ProfileData {
  name: string;
  email: string;
  whatsapp: string;
  role: string;
  companyName: string;
  industry: string;
  companySize: string;
  annualRevenue: string;
  foundingYear: string;
  businessDescription: string;
  businessGoals: string;
  businessChallenges: string;
}

export type CategoryType = 'marketing' | 'sales' | 'processes' | 'people' | 'financial' | 'product' | 'technology';

export interface AssessmentAnswer {
  categoryId: CategoryType;
  questionId: number;
  score: number;
}

export type CompanyStage = 'validation' | 'structuring' | 'initialScaling' | 'advancedScaling' | 'marketReference';

export interface DiagnosticContextType {
  profile: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
  answers: AssessmentAnswer[];
  addAnswer: (answer: AssessmentAnswer) => void;
  categoryScores: Record<CategoryType, number>;
  calculateCategoryScores: () => void;
  overallScore: number;
  companyStage: CompanyStage | null;
  determineCompanyStage: () => void;
  currentCategory: CategoryType | null;
  setCurrentCategory: (category: CategoryType | null) => void;
  currentProgress: number;
  updateProgress: (progress: number) => void;
}

const defaultProfile: ProfileData = {
  name: "",
  email: "",
  whatsapp: "",
  role: "",
  companyName: "",
  industry: "",
  companySize: "",
  annualRevenue: "",
  foundingYear: "",
  businessDescription: "",
  businessGoals: "",
  businessChallenges: "",
};

export const DiagnosticContext = createContext<DiagnosticContextType | undefined>(undefined);

export const DiagnosticProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [categoryScores, setCategoryScores] = useState<Record<CategoryType, number>>({
    marketing: 0,
    sales: 0,
    processes: 0,
    people: 0,
    financial: 0,
    product: 0,
    technology: 0,
  });
  const [overallScore, setOverallScore] = useState<number>(0);
  const [companyStage, setCompanyStage] = useState<CompanyStage | null>(null);
  const [currentCategory, setCurrentCategory] = useState<CategoryType | null>(null);
  const [currentProgress, setCurrentProgress] = useState<number>(0);

  const updateProfile = (data: Partial<ProfileData>) => {
    setProfile((prev) => ({ ...prev, ...data }));
  };

  const addAnswer = (answer: AssessmentAnswer) => {
    setAnswers((prev) => {
      // Replace if answer for this question already exists
      const filteredAnswers = prev.filter(
        (a) => !(a.categoryId === answer.categoryId && a.questionId === answer.questionId)
      );
      return [...filteredAnswers, answer];
    });
  };

  const calculateCategoryScores = () => {
    const newScores = { ...categoryScores };
    const categories = Object.keys(newScores) as CategoryType[];
    
    categories.forEach((category) => {
      const categoryAnswers = answers.filter((a) => a.categoryId === category);
      
      if (categoryAnswers.length > 0) {
        const sum = categoryAnswers.reduce((acc, curr) => acc + curr.score, 0);
        newScores[category] = parseFloat((sum / categoryAnswers.length).toFixed(1));
      }
    });

    setCategoryScores(newScores);
    
    // Calculate overall score
    const validScores = categories.filter((cat) => newScores[cat] > 0);
    if (validScores.length > 0) {
      const sum = validScores.reduce((acc, cat) => acc + newScores[cat], 0);
      setOverallScore(parseFloat((sum / validScores.length).toFixed(1)));
    }
  };

  const determineCompanyStage = () => {
    // Revenue weight factor
    let revenueScore = 0;
    switch (profile.annualRevenue) {
      case "Até R$ 240 mil":
        revenueScore = 1;
        break;
      case "R$ 240 mil - R$ 4,8 milhões":
        revenueScore = 2;
        break;
      case "R$ 4,8 - R$ 30 milhões":
        revenueScore = 3;
        break;
      case "Acima de R$ 30 milhões":
        revenueScore = 4;
        break;
    }

    // Company size weight factor
    let sizeScore = 0;
    switch (profile.companySize) {
      case "1-3":
        sizeScore = 1;
        break;
      case "4-20":
        sizeScore = 2;
        break;
      case "21-99":
        sizeScore = 3;
        break;
      case "100+":
        sizeScore = 4;
        break;
    }

    // Calculate weighted score: 70% assessment score, 15% revenue factor, 15% size factor
    const weightedScore = (overallScore * 0.7) + (revenueScore * 0.15 * 1.25) + (sizeScore * 0.15 * 1.25);
    
    // Determine company stage
    let stage: CompanyStage;
    if (weightedScore < 1.75) {
      stage = 'validation';
    } else if (weightedScore < 2.75) {
      stage = 'structuring';
    } else if (weightedScore < 3.75) {
      stage = 'initialScaling';
    } else if (weightedScore < 4.5) {
      stage = 'advancedScaling';
    } else {
      stage = 'marketReference';
    }

    setCompanyStage(stage);
  };

  const updateProgress = (progress: number) => {
    setCurrentProgress(progress);
  };

  return (
    <DiagnosticContext.Provider
      value={{
        profile,
        updateProfile,
        answers,
        addAnswer,
        categoryScores,
        calculateCategoryScores,
        overallScore,
        companyStage,
        determineCompanyStage,
        currentCategory,
        setCurrentCategory,
        currentProgress,
        updateProgress,
      }}
    >
      {children}
    </DiagnosticContext.Provider>
  );
};

export const useDiagnostic = (): DiagnosticContextType => {
  const context = useContext(DiagnosticContext);
  
  if (!context) {
    throw new Error("useDiagnostic must be used within a DiagnosticProvider");
  }
  
  return context;
};
