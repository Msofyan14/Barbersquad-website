import { getGallery } from "@/lib/actions/gallery,actions";
import { ColumnGalery } from "./_components/column-gallery";

export default async function Gallery({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const page = searchParams?.page ? +searchParams.page : 1;
  const limit = searchParams?.per_page ? +searchParams.per_page : 10;

  const gallery = await getGallery({
    searchString: searchParams.search,
    pageNumber: page,
    pageSize: limit,
  });

  return (
    <div className="p-5">
      <div className="mt-10 md:mt-20 overflow-y-auto pb-20">
        <ColumnGalery
          data={gallery.data}
          page={page}
          limit={limit}
          pageCount={gallery.pageCount}
        />
      </div>
    </div>
  );
}
