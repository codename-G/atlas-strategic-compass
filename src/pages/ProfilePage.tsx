
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import DiagnosticLayout from "@/components/DiagnosticLayout";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDiagnostic } from "@/context/DiagnosticContext";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  whatsapp: z.string().min(10, { message: "WhatsApp inválido" }),
  role: z.string().min(1, { message: "Selecione seu cargo" }),
  companyName: z.string().min(2, { message: "Nome da empresa é obrigatório" }),
  industry: z.string().min(1, { message: "Selecione o setor" }),
  companySize: z.string().min(1, { message: "Selecione o tamanho da empresa" }),
  annualRevenue: z.string().min(1, { message: "Selecione a receita anual" }),
  foundingYear: z.string().min(4, { message: "Ano de fundação inválido" }),
  businessDescription: z.string().min(10, { message: "Descrição muito curta" }),
  businessGoals: z.string().min(10, { message: "Objetivos muito curtos" }),
  businessChallenges: z.string().min(10, { message: "Desafios muito curtos" }),
});

const ProfilePage = () => {
  const navigate = useNavigate();
  const { profile, updateProfile, updateProgress } = useDiagnostic();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: profile,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (currentStep < totalSteps) {
      updateProgress(Math.round((currentStep / totalSteps) * 33));
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      updateProfile(values);
      updateProgress(33);
      navigate("/assessment");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      updateProgress(Math.round(((currentStep - 2) / totalSteps) * 33));
      window.scrollTo(0, 0);
    }
  };

  const saveAndContinue = () => {
    const currentValues = form.getValues();
    updateProfile(currentValues);
    
    if (currentStep < totalSteps) {
      form.trigger().then((isValid) => {
        const fieldsToValidate = getFieldsForCurrentStep();
        
        // Check if required fields for this step are valid
        const stepValid = fieldsToValidate.every(field => 
          !form.formState.errors[field as keyof typeof form.formState.errors]
        );

        if (stepValid) {
          updateProgress(Math.round((currentStep / totalSteps) * 33));
          setCurrentStep(currentStep + 1);
          window.scrollTo(0, 0);
        }
      });
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const getFieldsForCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return ['name', 'email', 'whatsapp', 'role'];
      case 2:
        return ['companyName', 'industry', 'companySize', 'annualRevenue', 'foundingYear'];
      case 3:
        return ['businessDescription', 'businessGoals', 'businessChallenges'];
      default:
        return [];
    }
  };

  return (
    <DiagnosticLayout 
      title="Perfil" 
      subtitle="Vamos conhecer você e sua empresa para um diagnóstico personalizado"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium border-b border-atlas-white/10 pb-2 mb-4">
                Dados Pessoais
              </h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione seu cargo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Dono">Dono</SelectItem>
                        <SelectItem value="Sócio">Sócio</SelectItem>
                        <SelectItem value="Diretor">Diretor</SelectItem>
                        <SelectItem value="Gerente">Gerente</SelectItem>
                        <SelectItem value="Analista">Analista</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}
          
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium border-b border-atlas-white/10 pb-2 mb-4">
                Dados da Empresa
              </h3>
              
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da sua empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Setor da Empresa</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o setor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Indústria">Indústria</SelectItem>
                        <SelectItem value="Comércio">Comércio</SelectItem>
                        <SelectItem value="Serviços">Serviços</SelectItem>
                        <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="Saúde">Saúde</SelectItem>
                        <SelectItem value="Educação">Educação</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tamanho da Empresa (número de funcionários)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tamanho" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-3">1-3</SelectItem>
                        <SelectItem value="4-20">4-20</SelectItem>
                        <SelectItem value="21-99">21-99</SelectItem>
                        <SelectItem value="100+">100+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="annualRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receita Anual</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a receita" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Até R$ 240 mil">Até R$ 240 mil</SelectItem>
                        <SelectItem value="R$ 240 mil - R$ 4,8 milhões">R$ 240 mil - R$ 4,8 milhões</SelectItem>
                        <SelectItem value="R$ 4,8 - R$ 30 milhões">R$ 4,8 - R$ 30 milhões</SelectItem>
                        <SelectItem value="Acima de R$ 30 milhões">Acima de R$ 30 milhões</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="foundingYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ano de fundação</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 2010" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}
          
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium border-b border-atlas-white/10 pb-2 mb-4">
                Sobre seu Negócio
              </h3>
              
              <FormField
                control={form.control}
                name="businessDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descreva o que sua empresa vende e seu público-alvo</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva seus produtos/serviços e para quem você os vende..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="businessGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quais os objetivos do seu negócio para os próximos 12 meses?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva suas metas e objetivos para o próximo ano..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="businessChallenges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quais os principais desafios que te impedem de atingir esses objetivos atualmente?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva os maiores obstáculos que sua empresa enfrenta..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Voltar
            </Button>
            
            <Button 
              type="button"
              onClick={saveAndContinue}
              className="bg-atlas-blue hover:bg-atlas-blue/90 flex items-center gap-2"
            >
              {currentStep < totalSteps ? "Continuar" : "Iniciar Assessment"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </DiagnosticLayout>
  );
};

export default ProfilePage;
