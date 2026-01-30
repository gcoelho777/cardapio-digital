export const products = {
  sobremesas_zero_gluten: [
    {
      nome: "Torta Búlgara",
      restricoes: ["zero lactose"],
      descricao:
        "Para os amantes de chocolate, nossa torta recordista em vendas para deixar seu Natal ainda mais feliz.",
      antecedencia_dias: 2,
      opcoes: [
        { preco: 220, peso_kg: 1.3 },
        { preco: 260, peso_kg: 1.4 },
      ],
    },
    {
      nome: "Banoffe",
      descricao:
        "Biscoitos artesanais com doce de leite caseiro, bananas e chantilly.",
      pronta_entrega: true,
      opcoes: [
        { preco: 220, peso_kg: 1.3 },
        { preco: 260, peso_kg: 1.4 },
      ],
    },
  ],
  tacas_natalinas: [
    {
      nome: "Taça da Felicidade de Frutas Amarelas",
      restricoes: ["zero leite"],
      descricao:
        "Massa pão de ló com geleia de frutas amarelas (pêssego, maracujá e manga) e creme leve e fresco.",
      antecedencia_horas: 12,
      opcoes: [
        { preco: 250, volume_l: 1.4 },
        { preco: 350, volume_l: 2.4 },
      ],
    },
    {
      nome: "Taça Chocolatuda",
      restricoes: ["zero leite"],
      descricao:
        "Bolo de chocolate, geleia de frutas vermelhas e mousse de chocolate.",
      antecedencia_horas: 12,
      opcoes: [
        { preco: 280, volume_l: 1.4 },
        { preco: 380, volume_l: 2.4 },
      ],
    },
    {
      nome: "Taça Paraense",
      restricoes: ["zero lactose"],
      descricao:
        "Mousse de cupuaçu, pão de ló, brigadeiro de cupuaçu e farofinha de castanhas.",
      antecedencia_dias: 1,
      opcoes: [
        { preco: 250, volume_l: 1.4 },
        { preco: 350, volume_l: 2.4 },
      ],
    },
    {
      nome: "Taça Tropical",
      restricoes: ["zero leite"],
      descricao:
        "Pão de ló com doce de abacaxi com coco e creme baba de moça.",
      pronta_entrega: true,
      opcoes: [
        { preco: 220, volume_l: 1.4 },
        { preco: 280, volume_l: 2.4 },
      ],
    },
    {
      nome: "Taça Ninho Cremoso",
      descricao:
        "Pão de ló com creme de ninho, geleia de frutas vermelhas e brigadeiro branco.",
      antecedencia_dias: 2,
      opcoes: [
        { preco: 220, volume_l: 1.4 },
        { preco: 280, volume_l: 2.4 },
      ],
    },
    {
      nome: "Taça de Maracujá",
      restricoes: ["zero lactose"],
      descricao:
        "Mousse de maracujá, pão de ló, frutas (manga, kiwi e uvas) e geleia de maracujá.",
      antecedencia_horas: 6,
      opcoes: [{ preco: 200, volume_l: 1.4 }],
    },
  ],
  salgados: [
    {
      nome: "Quiche de Frango Cremoso",
      restricoes: ["zero lactose"],
      preco: 200,
      aro: 24,
      pronta_entrega: true,
    },
    {
      nome: "Quiche de Camarão",
      restricoes: ["zero lactose"],
      preco: 250,
      aro: 24,
      antecedencia_dias: 1,
    },
    {
      nome: "Muffin de Frango Cremoso",
      restricoes: ["zero leite"],
      preco: 200,
      aro: 20,
      antecedencia_horas: 8,
    },
  ],
  bolos_presenteaveis: [
    {
      nome: "Bolo Tipo Inglês",
      restricoes: ["zero lactose"],
      preco: 35,
      sabores: ["chocolate", "cenoura"],
      pronta_entrega: true,
    },
    {
      nome: "Mini Vulcão",
      restricoes: ["zero leite"],
      preco: 45,
      sabores: ["chocolate", "cenoura"],
      observacoes: ["Leva cobertura de brigadeiro"],
      antecedencia_horas: 10,
    },
    {
      nome: "Mini Vulcão",
      restricoes: ["zero lactose"],
      preco: 40,
      sabores: ["chocolate", "cenoura"],
      observacoes: [
        "Leva cobertura",
        "Informar no ato do pedido se é zero leite ou zero lactose",
      ],
      antecedencia_dias: 2,
    },
  ],
  bolos_natalinos: [
    {
      nome: "Bolo Red",
      restricoes: ["zero lactose"],
      preco: 90,
      peso_g: 750,
      descricao: "Massa red velvet com cobertura de brigadeiro de ninho.",
      antecedencia_dias: 3,
    },
    {
      nome: "Bolo Chocolatudo",
      preco: 85,
      peso_g: 750,
      descricao: "Bolo de chocolate com muito brigadeiro e nibs de cacau.",
      antecedencia_dias: 2,
    },
    {
      nome: "Bolo de Cenoura Vulcão",
      preco: 90,
      peso_g: 750,
      descricao: "Massa de cenoura com muito brigadeiro.",
      antecedencia_dias: 2,
    },
    {
      nome: "Bolo Laranja Natalino",
      preco: 55,
      descricao: "Massa de laranja decorada com frutas cristalizadas e frutas secas.",
      pronta_entrega: true,
    },
    {
      nome: "Bolo de Ameixa Natalino",
      preco: 80,
      peso_g: 750,
      descricao: "Bolo de ameixa com cobertura de brigadeiro de coco.",
      observacoes: ["Zero glúten", "Cobertura tradicional"],
      antecedencia_dias: 2,
    },
    {
      nome: "Bolo Red Velvet",
      preco: 50,
      peso_g: 600,
      descricao: "Massa vermelha estilo red velvet, sem cobertura.",
      antecedencia_horas: 12,
    },
    {
      nome: "Bolo de Laranja Tradicional",
      preco: 45,
      descricao: "Bolo mais vendido, ideal para o café.",
      pronta_entrega: true,
    },
  ],
};
