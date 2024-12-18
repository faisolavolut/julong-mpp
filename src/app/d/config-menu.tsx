import { HiCubeTransparent } from "react-icons/hi";
import { RiCalendarScheduleLine, RiTeamFill } from "react-icons/ri";

export const configMenu = [
  {
    title: "Master Data",
    icon: <HiCubeTransparent />,
    children: [
      { title: "Master Organization", href: "/d/master-data/organization" },
      {
        title: "Master Data Organization Structure",
        href: "/d/master-data/organization-structure",
      },
      { title: "Master Data Jobs", href: "/d/master-data/jobs" },
      { title: "Master Data Plafon", href: "/d/master-data/plafon" },
    ],
  },
  {
    title: "Manpower Planning Period",
    icon: <RiCalendarScheduleLine />,
    children: [
      { title: "Period", href: "/d/mpp/period" },
      { title: "Manpower Planning Overview", href: "/d/location" },
      { title: "Batch", href: "/d/batch" },
      { title: "Batch", href: "/d/batch-ceo" },
    ],
  },
  {
    title: "Manpower Request",
    icon: <RiTeamFill />    ,
    children: [
      { title: "Manpower Request - HRD", href: "/d/mpr-hrd" },
      { title: "Manpower Request - Rekruitment", href: "/d/mpr-rekruitment" },
    ],
  },
];
