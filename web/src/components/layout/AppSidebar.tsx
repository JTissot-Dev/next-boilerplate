"use client";

import { authClient } from "@/lib/auth-client";
import { CircleGauge } from "lucide-react";
import { NavMain } from "@/components/layout/NavMain";
import { NavUser } from "./NavUser";
import { Brand } from "@/components/layout/Brand";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: CircleGauge,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data: session } = authClient.useSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Brand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {session && <NavUser user={session?.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
