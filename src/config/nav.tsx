import { SidebarLink } from "@/components/SidebarItems";
import { BookIcon, Calendar, Cog, Globe, HelpCircleIcon, HomeIcon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/", title: "Home", icon: HomeIcon },
  {
    href: "/projects",
    title: "Projects",
    icon: HelpCircleIcon,
  },
  {
    href: "/events",
    title: "Events",
    icon: Calendar
  },
  {
    href: "/action-guides",
    title: "Action Guides",
    icon: BookIcon
  }, 
  {
    href: `/dashboard/1/home`,
    title: "Test",
    icon: BookIcon

  }

];

export const additionalLinks: AdditionalLinks[] = [];
