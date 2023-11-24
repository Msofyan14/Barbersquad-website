import { getProducts } from "@/lib/actions/products.action";
import { ColumnProducts } from "./_components/column-products";

export default async function Products({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const page = searchParams?.page ? +searchParams.page : 1;
  const limit = searchParams?.per_page ? +searchParams.per_page : 10;

  const products = await getProducts({
    searchString: searchParams.search,
    pageNumber: page,
    pageSize: limit,
  });

  return (
    <div className="p-5">
      <div className="mt-10 md:mt-20 overflow-y-auto pb-20">
        <ColumnProducts
          data={products.data}
          page={page}
          limit={limit}
          pageCount={products.pageCount}
        />
      </div>
    </div>
  );
}
