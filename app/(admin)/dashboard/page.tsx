import React from "react";
import { DashboardCardOverview } from "@/components/landing-page-section/dashboard-card-overview";
import { getProducts } from "@/lib/actions/products.actions";
import { getTeams } from "@/lib/actions/teams.actions";
import { getGallery } from "@/lib/actions/gallery.actions";

async function Dashboard() {
  const { totalProductCount } = await getProducts({});
  const { totalTeamCount } = await getTeams({});
  const { totalGalleryCount } = await getGallery({});

  return (
    <div className="p-5">
      <div className="mt-16  md:mt-20 max-md:pb-20">
        <h1 className="my-3 max-sm:text-center text-xl">Dashboard Overview</h1>
        <div className="flex items-center flex-wrap max-sm:justify-center gap-5 ">
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
    </div>
  );
}

export default Dashboard;
