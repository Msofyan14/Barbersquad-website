import React from "react";
import { HeadingSection } from "./heading-section";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { CardOurTeams } from "../card-our-teams";
import { getTeams } from "@/lib/actions/teams.actions";

export default async function OurTeams() {
  const { data: teams } = await getTeams({});

  return (
    <section id="our-teams" className="section-wrapper">
      <HeadingSection title="OUR TEAMS" />
      <CardOurTeams data={teams} />
    </section>
  );
}
