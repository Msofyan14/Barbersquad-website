import { HeadingSection } from "./heading-section";
import { getProducts } from "@/lib/actions/products.actions";
import { CardProducts } from "../card-products";

export default async function Products({
  limitProducts,
}: {
  limitProducts: number;
}) {
  const { data: products, totalProductCount } = await getProducts({
    pageSize: limitProducts,
  });

  return (
    <section id="products" className="section-wrapper ">
      <HeadingSection title="PRODUCTS" />
      <CardProducts data={products} totalProducts={totalProductCount} />
    </section>
  );
}
