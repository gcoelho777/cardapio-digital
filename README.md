# 🍞 Cardápio Digital – MVP

Sistema de **cardápio digital online** para padaria, focado em **velocidade de entrega**, **simplicidade** e **uso real em produção**.

O objetivo do projeto é permitir que clientes:
- visualizem produtos,
- adicionem ao carrinho,
- e enviem o pedido diretamente via **WhatsApp**, sem necessidade de cadastro ou pagamento online no MVP.

---

## 🎯 Objetivo do Projeto

Entregar um **MVP funcional o mais rápido possível**, evitando overengineering e mantendo um caminho claro para evoluções futuras, como:
- cardápios sazonais (Natal, Páscoa, etc.)
- pagamento diretamente pelo site
- painel administrativo

Essas evoluções **não fazem parte do MVP** e estão explicitamente fora do escopo inicial.

---

## 🚀 Funcionalidades (MVP)

### ✅ Implementadas
- Catálogo de produtos com:
  - nome
  - descrição
  - preço
  - fotos
- Carrinho de compras:
  - adicionar/remover produtos
  - alterar quantidade
  - cálculo automático do total
- Checkout simples:
  - nome do cliente
  - forma de retirada/entrega
  - observações opcionais
- Envio do pedido para **WhatsApp** com mensagem formatada

### ❌ Fora do escopo do MVP (Fase 2)
- Autenticação
- Pagamento online
- Painel administrativo
- Banco de dados
- Cardápios por data/sazonalidade

---

## 🧱 Stack Tecnológica

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **CSS/Tailwind (opcional)**
- **localStorage** (persistência do carrinho)
- **Vercel** (deploy)
- **GitHub Codespaces** (ambiente de desenvolvimento)

---

## 🗂️ Estrutura do Projeto

```txt
src/
  app/
    layout.tsx
    page.tsx
    produto/
      [slug]/
        page.tsx
    carrinho/
      page.tsx
    checkout/
      page.tsx
  components/
    ProductCard.tsx
    CartItemRow.tsx
    QuantityControl.tsx
    Price.tsx
  data/
    products.ts
  lib/
    currency.ts
    whatsapp.ts
  store/
    cart-context.tsx
    cart-reducer.ts
  types/
    index.ts
```

## 🧩 Modelo de Dados (simplificado)

```
Product
- id
- slug
- name
- description
- priceCents
- images[]

CartItem
- productId
- quantity

OrderDraft
- customerName
- fulfillment (Retirada | Entrega)
- notes?
- items[]
- totalCents
```

🧠 Decisões de Arquitetura

Dados estáticos em arquivo TS

mais rápido para subir em produção

fácil de versionar

Carrinho com React Context + useReducer

simples

previsível

sem dependências extras

Sem backend no MVP

Sem autenticação

Sem abstrações desnecessárias

A prioridade é código fácil de entender, manter e evoluir.

🧪 Testes

Abordagem adotada: TDD enxuto

Testamos apenas o que é crítico:

lógica do carrinho

cálculo de totais

formatação da mensagem do WhatsApp

Não há testes excessivos de UI no MVP para não atrasar a entrega.

Rodar testes
npx vitest

▶️ Como Rodar o Projeto
Pré-requisitos

Node.js 18+

npm ou pnpm

Instalação
npm install

Desenvolvimento
npm run dev


Acesse:
👉 http://localhost:3000

📦 Deploy

Deploy recomendado via Vercel.

Zero configuração extra

Build automático a cada push

Ideal para MVP

📲 Integração com WhatsApp

O pedido é enviado via link no formato:

https://wa.me/<NUMERO>?text=<MENSAGEM_ENCODED>


A mensagem inclui:

nome do cliente

forma de retirada/entrega

itens do pedido

quantidades

total

🔮 Próximos Passos (Fase 2)

Banco de dados (SQLite + Prisma ou Supabase)

Painel admin para produtos

Cardápios sazonais

Pagamento online

Histórico de pedidos

🧭 Filosofia do Projeto

MVP primeiro

Simplicidade > elegância

Código fácil de apagar

Entrega em produção vale mais que arquitetura perfeita

Se a solução não pode ser explicada em poucos minutos, ela é complexa demais para este momento.