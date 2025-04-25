
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-atlas-dark text-atlas-white flex items-center justify-center">
      <div className="glass rounded-xl p-8 text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-atlas-blue">404</h1>
        <p className="text-xl text-atlas-white mb-6">Página não encontrada</p>
        <p className="text-atlas-white/70 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild className="bg-atlas-blue hover:bg-atlas-blue/90">
          <a href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Voltar para o Diagnóstico
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
