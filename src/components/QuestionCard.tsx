
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Question } from "@/data/assessmentQuestions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface QuestionCardProps {
  question: Question;
  onNext: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onNext }) => {
  const { answers, addAnswer } = useDiagnostic();
  const form = useForm({
    defaultValues: {
      score: answers.find(
        (a) => a.categoryId === question.category && a.questionId === question.id
      )?.score?.toString() || "",
    },
  });

  const handleScoreSelect = (score: number) => {
    addAnswer({
      categoryId: question.category,
      questionId: question.id,
      score,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col max-w-2xl mx-auto"
    >
      <h3 className="text-lg font-medium mb-4">{question.text}</h3>

      <Form {...form}>
        <FormField
          control={form.control}
          name="score"
          render={({ field }) => (
            <FormItem className="space-y-3 mb-6">
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  handleScoreSelect(parseInt(value));
                }}
                defaultValue={field.value}
                className="flex flex-col space-y-2"
              >
                {Object.entries(question.scoreDescriptions).map(([score, description]) => (
                  <div key={score} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5">
                    <RadioGroupItem value={score} id={`score-${score}`} />
                    <Label
                      htmlFor={`score-${score}`}
                      className="flex-grow cursor-pointer text-sm"
                    >
                      {description}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </FormItem>
          )}
        />
      </Form>

      <div className="flex justify-end">
        <Button
          disabled={!form.watch("score")}
          onClick={onNext}
          className="bg-atlas-blue hover:bg-atlas-blue/90"
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
