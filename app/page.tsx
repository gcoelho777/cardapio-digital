import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./components/add-to-cart-button";
import { products } from "../data/products";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const getProductPrice = (item: {
  preco?: number;
  opcoes?: { preco: number }[];
}) => {
  if (item.opcoes && item.opcoes.length > 0) {
    const minPrice = Math.min(...item.opcoes.map((opcao) => opcao.preco));
    return `A partir de ${formatPrice(minPrice)}`;
  }
  const base = getProductBasePrice(item);
  return base === null ? "Sob consulta" : formatPrice(base);
};

const getProductBasePrice = (item: {
  preco?: number;
  opcoes?: { preco: number }[];
}) => {
  if (typeof item.preco === "number") {
    return item.preco;
  }
  if (item.opcoes && item.opcoes.length > 0) {
    return item.opcoes[0].preco;
  }
  return null;
};

export default function Home() {
  const categories = Object.entries(products);
  const hasProducts = categories.some(([, items]) => items.length > 0);

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

      {!hasProducts ? (
        <section className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold text-slate-500">
            Nenhum produto disponível
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Assim que o catálogo for atualizado, os produtos aparecerão aqui.
          </p>
        </section>
      ) : (
        categories.map(([category, items]) => (
          <section key={category} className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              {category.replaceAll("_", " ")}
            </h2>
            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-500">
                Nenhum item disponível nesta categoria.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {items.map((item) => {
                  const productId = slugify(`${category}-${item.nome}`);
                  const basePrice = getProductBasePrice(item);
                  return (
                    <article
                      key={item.nome}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                      <div className="relative h-36 w-full bg-slate-100">
                        <Image
                          src="/images/placeholder.svg"
                          alt={`Foto do produto ${item.nome}`}
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 50vw, 100vw"
                        />
                      </div>
                      <div className="space-y-4 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <Link
                                href={`/produto/${productId}`}
                                className="text-base font-semibold text-slate-900 underline-offset-4 hover:underline"
                              >
                                {item.nome}
                              </Link>
                              {item.opcoes && item.opcoes.length > 1 ? (
                                <span className="rounded-full border border-slate-200 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                                  {item.opcoes.length} tamanhos
                                </span>
                              ) : null}
                            </div>
                            {item.descricao && (
                              <p className="mt-1 text-sm text-slate-600">
                                {item.descricao}
                              </p>
                            )}
                          </div>
                          <span className="text-sm font-semibold text-slate-900">
                            {getProductPrice(item)}
                          </span>
                        </div>
                        {item.opcoes && item.opcoes.length > 0 ? (
                          <Link
                            href={`/produto/${productId}`}
                            className="flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                          >
                            Mostrar opções
                          </Link>
                        ) : basePrice === null ? (
                          <button
                            type="button"
                            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-400"
                            disabled
                          >
                            Sob consulta
                          </button>
                        ) : (
                          <AddToCartButton
                            productId={productId}
                            name={item.nome}
                            price={basePrice}
                            imageUrl="/images/placeholder.svg"
                          />
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        ))
      )}
    </div>
  );
}
