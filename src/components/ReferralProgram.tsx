
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Facebook, Instagram, Share, Twitter } from "lucide-react";
import { useDiagnostic } from "@/context/DiagnosticContext";

const ReferralProgram = () => {
  const { profile } = useDiagnostic();
  const referralLink = `https://marketingatlas.com/assessment?ref=${btoa(profile.email || "")}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Link copiado com sucesso!");
  };

  const shareOnSocial = (network: string) => {
    const text = "Faça agora sua avaliação estratégica gratuita com a Marketing Atlas! 🚀";
    const url = referralLink;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      instagram: `https://instagram.com/marketingatlas`, // Instagram doesn't support direct sharing, so we'll link to the profile
    };

    window.open(shareUrls[network as keyof typeof shareUrls], "_blank");
  };

  return (
    <Card className="mt-8 bg-atlas-blue/10 border-atlas-blue/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Ganhe um material exclusivo!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-atlas-white/80 mb-6">
          Indique 3 pessoas para realizar a avaliação estratégica e receba um material personalizado 
          sobre como escalar o seu negócio com base no seu diagnóstico.
        </p>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input 
              value={referralLink}
              readOnly
              className="bg-atlas-blue/5 border-atlas-blue/20"
            />
            <Button 
              onClick={handleCopyLink}
              className="bg-atlas-blue hover:bg-atlas-blue/90 whitespace-nowrap"
            >
              <Share className="w-4 h-4 mr-2" />
              Copiar Link
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="flex-1 sm:flex-none border-atlas-blue/30 hover:bg-atlas-blue/20"
              onClick={() => shareOnSocial("twitter")}
            >
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            <Button
              variant="outline"
              className="flex-1 sm:flex-none border-atlas-blue/30 hover:bg-atlas-blue/20"
              onClick={() => shareOnSocial("facebook")}
            >
              <Facebook className="w-4 h-4 mr-2" />
              Facebook
            </Button>
            <Button
              variant="outline"
              className="flex-1 sm:flex-none border-atlas-blue/30 hover:bg-atlas-blue/20"
              onClick={() => shareOnSocial("instagram")}
            >
              <Instagram className="w-4 h-4 mr-2" />
              Instagram
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralProgram;
