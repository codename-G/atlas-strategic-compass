
import React, { ReactNode } from "react";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface DiagnosticLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showProgress?: boolean;
}

const DiagnosticLayout = ({
  children,
  title,
  subtitle,
  showProgress = true,
}: DiagnosticLayoutProps) => {
  const { currentProgress } = useDiagnostic();

  return (
    <main className="min-h-screen bg-atlas-dark text-atlas-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 mr-3 bg-atlas-blue rounded-full flex items-center justify-center">
              <span className="font-bold">MA</span>
            </div>
            <h1 className="text-2xl font-bold">Marketing Atlas</h1>
          </div>
          
          {showProgress && (
            <div className="mt-6 mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Diagnóstico Estratégico</span>
                <span>{currentProgress}%</span>
              </div>
              <Progress value={currentProgress} className="h-1.5" />
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 sm:p-8 max-w-5xl mx-auto"
        >
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">{title}</h2>
            {subtitle && <p className="text-atlas-white/80">{subtitle}</p>}
          </div>

          {children}
        </motion.div>
      </div>
    </main>
  );
};

export default DiagnosticLayout;
