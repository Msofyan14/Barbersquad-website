import { getTeams } from "@/lib/actions/teams.actions";
import { ColumnTeams } from "./_components/column-teams";

export default async function Teams({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const page = searchParams?.page ? +searchParams.page : 1;
  const limit = searchParams?.per_page ? +searchParams.per_page : 5;

  const teams = await getTeams({
    searchString: searchParams.search,
    pageNumber: page,
    pageSize: limit,
  });

  return (
    <div className="p-5">
      <div className="mt-10 md:mt-20 overflow-y-auto max-md:pb-20">
        <ColumnTeams
          data={teams.data}
          page={page}
          limit={limit}
          pageCount={teams.pageCount}
        />
      </div>
    </div>
  );
}
