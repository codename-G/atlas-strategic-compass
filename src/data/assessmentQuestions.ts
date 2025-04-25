
import { CategoryType } from "@/context/DiagnosticContext";

export interface Question {
  id: number;
  category: CategoryType;
  text: string;
  scoreDescriptions: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
  };
}

export const questions: Question[] = [
  // Marketing Questions
  {
    id: 1,
    category: "marketing",
    text: "Como você classifica sua estratégia de marketing?",
    scoreDescriptions: {
      1: "Inexistente, fazemos ações aleatórias",
      2: "Básica, temos algumas ações pontuais",
      3: "Intermediária, temos um plano mas não é muito estruturado",
      4: "Avançada, temos plano e métricas definidas",
      5: "Excelente, estratégia completa com automações e otimizações constantes"
    }
  },
  {
    id: 2,
    category: "marketing",
    text: "Como é o posicionamento da sua marca no mercado?",
    scoreDescriptions: {
      1: "Não temos posicionamento definido",
      2: "Posicionamento básico mas sem diferenciação clara",
      3: "Posicionamento definido mas pouco comunicado",
      4: "Bom posicionamento e bem comunicado",
      5: "Posicionamento forte, único e reconhecido pelo mercado"
    }
  },
  {
    id: 3,
    category: "marketing",
    text: "Como você avalia a geração de leads/oportunidades?",
    scoreDescriptions: {
      1: "Não temos processo de geração de leads",
      2: "Geramos leads de forma irregular e sem processo",
      3: "Temos alguns canais que geram leads consistentemente",
      4: "Boa geração de leads por múltiplos canais",
      5: "Sistema otimizado de geração de leads com funil completo"
    }
  },
  {
    id: 4,
    category: "marketing",
    text: "Como você mede os resultados das suas ações de marketing?",
    scoreDescriptions: {
      1: "Não medimos resultados",
      2: "Medimos básicos como visualizações/cliques",
      3: "Acompanhamos algumas métricas importantes",
      4: "Temos dashboard de métricas e KPIs",
      5: "Sistema completo de métricas com atribuição e ROI detalhado"
    }
  },
  {
    id: 5,
    category: "marketing",
    text: "Como sua empresa utiliza mídias sociais?",
    scoreDescriptions: {
      1: "Não utilizamos ou raramente atualizamos",
      2: "Postagens ocasionais sem estratégia",
      3: "Presença regular mas sem planejamento detalhado",
      4: "Estratégia definida com calendário editorial",
      5: "Estratégia completa, engajamento ativo e resultados mensuráveis"
    }
  },
  
  // Sales Questions
  {
    id: 6,
    category: "sales",
    text: "Como é o processo de vendas na sua empresa?",
    scoreDescriptions: {
      1: "Não temos processo estruturado",
      2: "Processo básico, mas não documentado",
      3: "Processo definido mas nem sempre seguido",
      4: "Processo bem estruturado e geralmente seguido",
      5: "Processo completo, documentado e otimizado constantemente"
    }
  },
  {
    id: 7,
    category: "sales",
    text: "Como você classifica o treinamento da sua equipe de vendas?",
    scoreDescriptions: {
      1: "Não fazemos treinamentos",
      2: "Treinamentos básicos e pouco frequentes",
      3: "Treinamentos regulares mas sem plano estruturado",
      4: "Bom programa de treinamento com acompanhamento",
      5: "Programa completo com certificações e desenvolvimento contínuo"
    }
  },
  {
    id: 8,
    category: "sales",
    text: "Como você acompanha a performance de vendas?",
    scoreDescriptions: {
      1: "Não acompanhamos métricas de vendas",
      2: "Acompanhamento básico de receita total",
      3: "Algumas métricas importantes são acompanhadas",
      4: "Bom sistema de métricas e indicadores",
      5: "Sistema completo com previsões, tendências e análise detalhada"
    }
  },
  {
    id: 9,
    category: "sales",
    text: "Como é feito o follow-up de leads/oportunidades?",
    scoreDescriptions: {
      1: "Não temos processo de follow-up",
      2: "Follow-up irregular e sem padrão",
      3: "Processo básico mas nem sempre cumprido",
      4: "Bom processo com etapas e prazos definidos",
      5: "Processo completo automatizado com nurturing e scoring"
    }
  },
  {
    id: 10,
    category: "sales",
    text: "Como é a relação entre marketing e vendas?",
    scoreDescriptions: {
      1: "Não há comunicação ou alinhamento",
      2: "Comunicação mínima e pouco alinhamento",
      3: "Comunicação regular mas objetivos separados",
      4: "Bom alinhamento com reuniões regulares",
      5: "Total integração com metas compartilhadas e processos unificados"
    }
  },
  
  // Processes Questions
  {
    id: 11,
    category: "processes",
    text: "Como você classifica a documentação de processos na empresa?",
    scoreDescriptions: {
      1: "Não temos processos documentados",
      2: "Poucos processos básicos documentados",
      3: "Principais processos documentados mas desatualizados",
      4: "Boa documentação da maioria dos processos",
      5: "Documentação completa, atualizada e acessível"
    }
  },
  {
    id: 12,
    category: "processes",
    text: "Como é feita a gestão de qualidade nos seus processos?",
    scoreDescriptions: {
      1: "Não temos controle de qualidade",
      2: "Verificações básicas e inconsistentes",
      3: "Algumas verificações de qualidade estabelecidas",
      4: "Bom sistema de qualidade com métricas",
      5: "Sistema completo com certificações e melhoria contínua"
    }
  },
  {
    id: 13,
    category: "processes",
    text: "Como sua empresa trabalha a otimização de processos?",
    scoreDescriptions: {
      1: "Não fazemos otimização de processos",
      2: "Melhorias ocasionais quando há problemas",
      3: "Revisões periódicas dos principais processos",
      4: "Programa regular de otimização e melhorias",
      5: "Cultura de melhoria contínua com metodologias implementadas"
    }
  },
  {
    id: 14,
    category: "processes",
    text: "Como é a integração entre diferentes áreas e processos da empresa?",
    scoreDescriptions: {
      1: "Áreas trabalham isoladamente",
      2: "Pouca integração e muitos silos",
      3: "Integração básica entre algumas áreas",
      4: "Boa integração com fluxos de trabalho definidos",
      5: "Total integração e visão holística em toda empresa"
    }
  },
  {
    id: 15,
    category: "processes",
    text: "Como sua empresa utiliza ferramentas/tecnologias para gestão de processos?",
    scoreDescriptions: {
      1: "Não utilizamos ferramentas específicas",
      2: "Uso básico de planilhas ou ferramentas simples",
      3: "Algumas ferramentas específicas mas não integradas",
      4: "Boas ferramentas que cobrem maioria dos processos",
      5: "Ecossistema completo de ferramentas integradas"
    }
  },
  
  // People Questions
  {
    id: 16,
    category: "people",
    text: "Como é o processo de recrutamento e seleção na sua empresa?",
    scoreDescriptions: {
      1: "Não temos processo estruturado",
      2: "Processo básico e reativo",
      3: "Processo definido mas pouco padronizado",
      4: "Bom processo com etapas claras e critérios",
      5: "Processo completo com employer branding e análises"
    }
  },
  {
    id: 17,
    category: "people",
    text: "Como você classifica o desenvolvimento e treinamento da equipe?",
    scoreDescriptions: {
      1: "Não oferecemos treinamentos ou desenvolvimento",
      2: "Treinamentos básicos apenas quando necessário",
      3: "Alguns programas de desenvolvimento disponíveis",
      4: "Bom plano de desenvolvimento para a maioria",
      5: "Programa completo de desenvolvimento contínuo para todos"
    }
  },
  {
    id: 18,
    category: "people",
    text: "Como é o clima organizacional e engajamento da equipe?",
    scoreDescriptions: {
      1: "Clima ruim com alta rotatividade",
      2: "Clima neutro com pouco engajamento",
      3: "Clima razoável com engajamento variável",
      4: "Bom clima e equipes geralmente engajadas",
      5: "Excelente clima com alto engajamento e baixo turnover"
    }
  },
  {
    id: 19,
    category: "people",
    text: "Como você avalia o sistema de feedback e avaliação de desempenho?",
    scoreDescriptions: {
      1: "Não temos sistema de feedback ou avaliação",
      2: "Feedbacks informais e inconsistentes",
      3: "Sistema básico de avaliação periódica",
      4: "Bom sistema com feedbacks regulares",
      5: "Sistema completo com avaliação 360° e plano de desenvolvimento"
    }
  },
  {
    id: 20,
    category: "people",
    text: "Como é a gestão de tempo e produtividade na equipe?",
    scoreDescriptions: {
      1: "Não temos controle ou gestão",
      2: "Controle básico de presença apenas",
      3: "Algumas métricas de produtividade",
      4: "Bom sistema de gestão de tempo e metas",
      5: "Sistema avançado com produtividade e resultados integrados"
    }
  },
  
  // Financial Questions
  {
    id: 21,
    category: "financial",
    text: "Como você classifica o controle financeiro da empresa?",
    scoreDescriptions: {
      1: "Não temos controle financeiro",
      2: "Controle básico de entradas e saídas",
      3: "Controle regular com algumas análises",
      4: "Bom sistema com relatórios detalhados",
      5: "Sistema completo com previsões e análises avançadas"
    }
  },
  {
    id: 22,
    category: "financial",
    text: "Como é o planejamento financeiro e orçamentário?",
    scoreDescriptions: {
      1: "Não fazemos planejamento financeiro",
      2: "Planejamento básico de curto prazo",
      3: "Planejamento regular mas sem detalhamento",
      4: "Bom planejamento com revisões periódicas",
      5: "Planejamento completo de curto, médio e longo prazo"
    }
  },
  {
    id: 23,
    category: "financial",
    text: "Como é a gestão de custos na empresa?",
    scoreDescriptions: {
      1: "Não temos gestão de custos estruturada",
      2: "Controle básico sem análises detalhadas",
      3: "Controle regular com algumas análises",
      4: "Boa gestão com categorização detalhada",
      5: "Gestão avançada com otimização contínua"
    }
  },
  {
    id: 24,
    category: "financial",
    text: "Como você avalia a precificação dos seus produtos/serviços?",
    scoreDescriptions: {
      1: "Precificação sem método ou análise",
      2: "Precificação básica baseada em custos",
      3: "Método de precificação com algumas análises",
      4: "Boa estratégia baseada em valor e mercado",
      5: "Estratégia avançada com segmentação e otimização"
    }
  },
  {
    id: 25,
    category: "financial",
    text: "Como é a gestão de investimentos e captação de recursos?",
    scoreDescriptions: {
      1: "Não temos planejamento de investimentos",
      2: "Investimentos pontuais sem estratégia",
      3: "Algum planejamento de investimentos",
      4: "Bom plano de investimentos e retorno",
      5: "Estratégia completa com diversificação e análises"
    }
  },
  
  // Product/Service Questions
  {
    id: 26,
    category: "product",
    text: "Como você avalia o desenvolvimento de novos produtos/serviços?",
    scoreDescriptions: {
      1: "Não temos processo de desenvolvimento",
      2: "Desenvolvimento ocasional sem metodologia",
      3: "Processo básico mas pouco estruturado",
      4: "Bom processo com etapas definidas",
      5: "Processo completo com validações e metodologias ágeis"
    }
  },
  {
    id: 27,
    category: "product",
    text: "Como é feita a gestão de qualidade dos seus produtos/serviços?",
    scoreDescriptions: {
      1: "Não temos controle de qualidade",
      2: "Controles básicos e inconsistentes",
      3: "Algumas verificações de qualidade estabelecidas",
      4: "Bom sistema com padrões definidos",
      5: "Sistema completo com certificações e melhoria contínua"
    }
  },
  {
    id: 28,
    category: "product",
    text: "Como sua empresa utiliza feedback dos clientes para melhorias?",
    scoreDescriptions: {
      1: "Não coletamos feedback dos clientes",
      2: "Feedback ocasional sem processo",
      3: "Coleta de alguns feedbacks importantes",
      4: "Bom sistema de coleta e análise",
      5: "Sistema completo com implementação e ciclos de melhoria"
    }
  },
  {
    id: 29,
    category: "product",
    text: "Como você classifica o diferencial competitivo dos seus produtos/serviços?",
    scoreDescriptions: {
      1: "Sem diferencial claro no mercado",
      2: "Diferencial básico mas facilmente copiável",
      3: "Alguns diferenciais importantes",
      4: "Bons diferenciais reconhecidos pelo mercado",
      5: "Diferenciais únicos e difíceis de copiar"
    }
  },
  {
    id: 30,
    category: "product",
    text: "Como é a gestão do ciclo de vida dos seus produtos/serviços?",
    scoreDescriptions: {
      1: "Não gerenciamos o ciclo de vida",
      2: "Gestão básica sem planejamento",
      3: "Algum acompanhamento do ciclo de vida",
      4: "Boa gestão com análise de performance",
      5: "Gestão completa com renovação e descontinuação planejadas"
    }
  },
  
  // Technology Questions
  {
    id: 31,
    category: "technology",
    text: "Como você avalia a infraestrutura tecnológica da empresa?",
    scoreDescriptions: {
      1: "Infraestrutura precária ou desatualizada",
      2: "Infraestrutura básica com limitações",
      3: "Infraestrutura razoável atendendo necessidades básicas",
      4: "Boa infraestrutura com tecnologias atuais",
      5: "Infraestrutura avançada com sistemas integrados"
    }
  },
  {
    id: 32,
    category: "technology",
    text: "Como sua empresa utiliza dados para decisões?",
    scoreDescriptions: {
      1: "Não utilizamos dados para decisões",
      2: "Uso básico e ocasional de dados",
      3: "Algumas decisões baseadas em dados",
      4: "Cultura orientada a dados na maioria das decisões",
      5: "Cultura data-driven completa com analytics avançado"
    }
  },
  {
    id: 33,
    category: "technology",
    text: "Como é a segurança da informação na sua empresa?",
    scoreDescriptions: {
      1: "Não temos política de segurança",
      2: "Medidas básicas de segurança",
      3: "Algumas políticas implementadas",
      4: "Bom sistema com protocolos definidos",
      5: "Sistema completo com testes e atualizações constantes"
    }
  },
  {
    id: 34,
    category: "technology",
    text: "Como é a gestão de projetos tecnológicos?",
    scoreDescriptions: {
      1: "Não temos gestão de projetos",
      2: "Gestão básica sem metodologia",
      3: "Alguma metodologia aplicada inconsistentemente",
      4: "Boa metodologia seguida pela equipe",
      5: "Metodologia avançada com métricas e otimizações"
    }
  },
  {
    id: 35,
    category: "technology",
    text: "Como sua empresa se adapta a novas tecnologias?",
    scoreDescriptions: {
      1: "Resistência a mudanças tecnológicas",
      2: "Adoção lenta e apenas quando necessário",
      3: "Adoção moderada de algumas tecnologias",
      4: "Boa adaptação e busca por inovações",
      5: "Cultura de inovação com monitoramento constante"
    }
  }
];

export const categories: Record<CategoryType, { name: string; icon: string; description: string }> = {
  marketing: {
    name: "Marketing",
    icon: "pie-chart",
    description: "Estratégia de marca, geração de leads e comunicação"
  },
  sales: {
    name: "Vendas",
    icon: "trending-up",
    description: "Processo comercial, conversão e relacionamento com clientes"
  },
  processes: {
    name: "Processos",
    icon: "settings",
    description: "Fluxos de trabalho, documentação e otimização"
  },
  people: {
    name: "Pessoas e Time",
    icon: "users",
    description: "Recrutamento, desenvolvimento e cultura organizacional"
  },
  financial: {
    name: "Financeiro",
    icon: "dollar-sign",
    description: "Controle, planejamento e gestão de recursos"
  },
  product: {
    name: "Produto/Serviço",
    icon: "package",
    description: "Desenvolvimento, qualidade e ciclo de vida"
  },
  technology: {
    name: "Tecnologia",
    icon: "laptop",
    description: "Infraestrutura, sistemas e inovação digital"
  }
};

export const getQuestionsByCategory = (category: CategoryType): Question[] => {
  return questions.filter(q => q.category === category);
};

export const getCategoryFeedback = (score: number, category: CategoryType): string => {
  if (score < 2) {
    return `Fase inicial de desenvolvimento. Recomendamos priorizar a estruturação da área de ${categories[category].name.toLowerCase()}.`;
  } else if (score < 3) {
    return `Bases estabelecidas, mas necessita desenvolvimento. Foque em processos e estratégias de ${categories[category].name.toLowerCase()} mais consistentes.`;
  } else if (score < 4) {
    return `Nível intermediário. Sua empresa tem boas práticas de ${categories[category].name.toLowerCase()}, mas há espaço para otimização.`;
  } else if (score < 4.5) {
    return `Nível avançado. Sua empresa demonstra excelência em ${categories[category].name.toLowerCase()}, com oportunidades pontuais de melhoria.`;
  } else {
    return `Referência no mercado! Sua empresa possui práticas de ${categories[category].name.toLowerCase()} de alta performance.`;
  }
};

export const getCompanyStageFeedback = (stage: string): { title: string, description: string, suggestion: string } => {
  switch(stage) {
    case 'validation':
      return {
        title: "Fase de Validação",
        description: "Sua empresa está nos estágios iniciais, validando proposta de valor e modelo de negócios.",
        suggestion: "Foque em validar seu produto/serviço no mercado e estabelecer suas primeiras vendas consistentes."
      };
    case 'structuring':
      return {
        title: "Fase de Estruturação",
        description: "Sua empresa já validou seu modelo, mas precisa estruturar processos e operações.",
        suggestion: "Priorize a documentação de processos e implemente sistemas básicos de gestão para escalar."
      };
    case 'initialScaling':
      return {
        title: "Fase de Escala Inicial",
        description: "Sua empresa possui processos estabelecidos e está iniciando uma trajetória de crescimento.",
        suggestion: "Invista em marketing e vendas para acelerar a aquisição de clientes e fortaleça sua estrutura operacional."
      };
    case 'advancedScaling':
      return {
        title: "Fase de Escala Avançada",
        description: "Sua empresa está em crescimento acelerado com operações bem estabelecidas.",
        suggestion: "Foque em otimizar seus processos, desenvolver lideranças e preparar a empresa para expansão sustentável."
      };
    case 'marketReference':
      return {
        title: "Referência no Mercado",
        description: "Sua empresa é líder em seu segmento com excelência operacional.",
        suggestion: "Continue inovando e busque novas oportunidades de mercado, mantendo a cultura de alta performance."
      };
    default:
      return {
        title: "Em Análise",
        description: "Precisamos de mais informações para determinar o estágio da sua empresa.",
        suggestion: "Complete a avaliação para receber um diagnóstico personalizado."
      };
  }
};
