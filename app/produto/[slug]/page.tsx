import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "../../../data/products";

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
  if (typeof item.preco === "number") {
    return formatPrice(item.preco);
  }
  if (item.opcoes && item.opcoes.length > 0) {
    return formatPrice(item.opcoes[0].preco);
  }
  return "Sob consulta";
};

const getSizeLabel = (option: { peso_kg?: number; volume_l?: number }) => {
  if (typeof option.peso_kg === "number") {
    return `${option.peso_kg} kg`;
  }
  if (typeof option.volume_l === "number") {
    return `${option.volume_l} L`;
  }
  return "Tamanho único";
};

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const entries = Object.entries(products).flatMap(([categoria, itens]) =>
    itens.map((item) => ({ categoria, item }))
  );

  const result = entries.find(
    ({ categoria, item }) => slugify(`${categoria}-${item.nome}`) === params.slug
  );

  if (!result) {
    notFound();
  }

  const { categoria, item } = result;

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
          {item.opcoes && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-700">
                Opções disponíveis
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {item.opcoes.map((opcao) => (
                  <div
                    key={`${opcao.preco}-${opcao.peso_kg ?? opcao.volume_l}`}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700"
                  >
                    <span>{getSizeLabel(opcao)}</span>
                    <span className="font-semibold text-slate-900">
                      {formatPrice(opcao.preco)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
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
          <button
            type="button"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Adicionar
          </button>
        </div>
      </section>
    </div>
  );
}
