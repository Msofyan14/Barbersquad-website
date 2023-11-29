import React from "react";
import { DashboardCardOverview } from "@/components/dashboard-card-overview";
import { getProducts } from "@/lib/actions/products.actions";
import { getTeams } from "@/lib/actions/teams.actions";
import { getGallery } from "@/lib/actions/gallery.actions";

async function Dashboard() {
  const { totalProductCount } = await getProducts({});
  const { totalTeamCount } = await getTeams({});
  const { totalGalleryCount } = await getGallery({});

  return (
    <div className="p-5">
      <div className="flex items-center flex-wrap gap-5 mt-16 max-sm:justify-center md:mt-20 max-md:pb-20">
        <DashboardCardOverview
          link="/dashboard/teams"
          icon="/users-2.svg"
          title="Teams"
          totalItem={totalTeamCount}
        />
        <DashboardCardOverview
          link="/dashboard/gallery"
          icon="/image.svg"
          title="Gallery"
          totalItem={totalGalleryCount}
        />
        <DashboardCardOverview
          link="/dashboard/products"
          icon="/layout-list.svg"
          title="Products"
          totalItem={totalProductCount}
        />
      </div>
    </div>
  );
}

export default Dashboard;
