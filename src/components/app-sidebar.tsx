"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Dumbbell,
  Mountain,
  MountainSnow,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const BASE_PATH = "/dashboard";
// This is sample data.
const data = {
  teams: [
    {
      name: "Mt. Whitney",
      logo: MountainSnow,
      plan: "Backpacking",
    },
    {
      name: "Mt. Whitney",
      logo: AudioWaveform,
      plan: "Day Hike",
    }
  ],
  navMain: [
    {
      title: "Basics",
      url: `${BASE_PATH}/basics`,
      icon: SquareTerminal,
      isActive: true,

    },
    {
      title: "The Mountain",
      url: `${BASE_PATH}/mountain`,
      icon: Mountain,
    },
    {
      title: "Resources",
      url: `${BASE_PATH}/resources`,
      icon: BookOpen,
    },
    {
      title: "Training",
      url: `${BASE_PATH}/prep`,
      icon: Dumbbell,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
