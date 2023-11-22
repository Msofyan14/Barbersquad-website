import React from "react";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getCurrentUser } from "@/hooks/getCurrentUser";
import { signOut } from "next-auth/react";
import { NavbarDashboard } from "@/components/dashboard/navbarDashboard";
import { Button } from "@/components/ui/button";

async function Dashboard() {
  const currentUser = await getCurrentUser();

  if (currentUser?.role !== "admin") {
    return <p>You are an admin, welcome!</p>;
  }

  return (
    <div>
      Dashboard
      <p className="mt-40">{currentUser?.email}</p>
      {currentUser?.role === "admin" && (
        <Button className="">Add Products</Button>
      )}
    </div>
  );
}

export default Dashboard;
