import { getTeams } from "@/lib/actions/teams.action";
import { ColumnTeams } from "./_components/column-teams";

export default async function Teams({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const page = searchParams?.page ? +searchParams.page : 1;
  const limit = searchParams?.per_page ? +searchParams.per_page : 10;

  const teams = await getTeams({
    searchString: searchParams.search,
    pageNumber: page,
    pageSize: limit,
  });

  const teamsWithStringIds = teams.data.map((team) => ({
    ...team._doc,
    _id: team._id.toString(),
  }));

  return (
    <div className="p-5 ">
      <div className="">
        <ColumnTeams
          data={teamsWithStringIds}
          page={page}
          limit={limit}
          pageCount={teams.pageCount}
        />
      </div>
    </div>
  );
}
