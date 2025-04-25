
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Question } from "@/data/assessmentQuestions";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  onNext: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onNext }) => {
  const { answers, addAnswer } = useDiagnostic();
  const [selectedScore, setSelectedScore] = React.useState<number | null>(() => {
    const existingAnswer = answers.find(
      (a) => a.categoryId === question.category && a.questionId === question.id
    );
    return existingAnswer ? existingAnswer.score : null;
  });

  const handleScoreSelect = (score: number) => {
    setSelectedScore(score);

    addAnswer({
      categoryId: question.category,
      questionId: question.id,
      score,
    });
  };

  const handleNext = () => {
    if (selectedScore !== null) {
      onNext();
    }
  };

  const scoreOptions = [1, 2, 3, 4, 5];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      <h3 className="text-lg font-medium mb-6">{question.text}</h3>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
        {scoreOptions.map((score) => (
          <button
            key={score}
            onClick={() => handleScoreSelect(score)}
            className={cn(
              "flex flex-col p-4 rounded-lg border transition-all",
              selectedScore === score
                ? "bg-atlas-blue text-white border-atlas-blue"
                : "bg-secondary/50 hover:bg-secondary border-secondary/50 hover:border-secondary"
            )}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Nível {score}</span>
              <span className="h-6 w-6 rounded-full flex items-center justify-center border-2 border-current">
                {score}
              </span>
            </div>
            <p className="text-sm">{question.scoreDescriptions[score as keyof typeof question.scoreDescriptions]}</p>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          disabled={selectedScore === null}
          onClick={handleNext}
          className="bg-atlas-blue hover:bg-atlas-blue/90"
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
