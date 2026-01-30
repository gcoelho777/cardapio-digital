const menuItems = [
  {
    id: 1,
    name: "Hambúrguer artesanal",
    description: "Pão brioche, blend da casa, queijo e molho especial.",
    price: "R$ 32,00",
  },
  {
    id: 2,
    name: "Salada verde",
    description: "Folhas frescas, tomate cereja e vinagrete cítrico.",
    price: "R$ 24,00",
  },
  {
    id: 3,
    name: "Limonada da casa",
    description: "Limão tahiti, hortelã e toque de gengibre.",
    price: "R$ 12,00",
  },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Hello catalog</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">
          Catálogo simples para o MVP
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Lista mockada para validar layout, conteúdo e navegação.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Itens em destaque</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {menuItems.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {item.description}
                  </p>
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  {item.price}
                </span>
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Adicionar ao carrinho
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
