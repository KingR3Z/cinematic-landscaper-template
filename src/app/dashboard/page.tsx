import { client } from "@/config/client";
import DashboardClient from "@/components/DashboardClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dashboard | ${client.name}`,
  description: `Client dashboard for ${client.name}.`,
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
