import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductPurchase from "../../components/product-purchase";
import { formatPrice } from "../../utils/format";
import { products } from "../../../data/products";

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

const getProductEntries = () =>
  Object.entries(products).flatMap(([categoria, itens]) =>
    itens.map((item) => ({ categoria, item }))
  );

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const entries = getProductEntries();
  const result = entries.find(
    ({ categoria, item }) => slugify(`${categoria}-${item.nome}`) === params.slug
  );

  if (!result) {
    return {
      title: "Produto | Cardápio Digital",
      description: "Detalhes do produto selecionado.",
    };
  }

  const { item } = result;
  return {
    title: `${item.nome} | Cardápio Digital`,
    description:
      item.descricao ??
      "Veja detalhes do produto e escolha a melhor opção para o seu pedido.",
  };
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const entries = getProductEntries();
  const result = entries.find(
    ({ categoria, item }) => slugify(`${categoria}-${item.nome}`) === params.slug
  );

  if (!result) {
    notFound();
  }

  const { categoria, item } = result;
  const productId = slugify(`${categoria}-${item.nome}`);
  const basePrice = getProductBasePrice(item);
  const readyDelivery =
    "pronta_entrega" in item ? item.pronta_entrega : false;
  const leadTimeHours =
    "antecedencia_horas" in item ? item.antecedencia_horas : undefined;
  const leadTimeDays =
    "antecedencia_dias" in item ? item.antecedencia_dias : undefined;

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="relative h-56 w-full bg-slate-100">
          <Image
            src="/images/placeholder.svg"
            alt={`Foto do produto ${item.nome}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="space-y-6 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
              {categoria.replaceAll("_", " ")}
            </span>
            {item.restricoes?.map((restricao) => (
              <span
                key={restricao}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {restricao}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <h1 className="text-2xl font-semibold text-slate-900">
                {item.nome}
              </h1>
              {item.descricao && (
                <p className="text-sm text-slate-600">{item.descricao}</p>
              )}
            </div>
            <div className="text-lg font-semibold text-slate-900">
              {getProductPrice(item)}
            </div>
          </div>
          {item.sabores && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-700">Sabores</p>
              <div className="flex flex-wrap gap-2">
                {item.sabores.map((sabor) => (
                  <span
                    key={sabor}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {sabor}
                  </span>
                ))}
              </div>
            </div>
          )}
          {item.observacoes && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-700">
                Observações
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
                {item.observacoes.map((obs) => (
                  <li key={obs}>{obs}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-700">
              Disponibilidade
            </p>
            <div className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
              {readyDelivery ? (
                <span>Pronta-entrega.</span>
              ) : leadTimeHours ? (
                <span>
                  Antecedência mínima: {leadTimeHours}{" "}
                  {leadTimeHours === 1 ? "hora" : "horas"}.
                </span>
              ) : leadTimeDays ? (
                <span>
                  Antecedência mínima: {leadTimeDays}{" "}
                  {leadTimeDays === 1 ? "dia" : "dias"}.
                </span>
              ) : (
                <span>Sob consulta.</span>
              )}
            </div>
          </div>
          <ProductPurchase
            productId={productId}
            name={item.nome}
            imageUrl="/images/placeholder.svg"
            basePrice={basePrice}
            options={item.opcoes}
          />
        </div>
      </section>
    </div>
  );
}
