import HomeIcon from "@/components/icons/HomeIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import BellIcon from "@/components/icons/BellIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import NnpLogo from "@/components/icons/NnpLogo";
import ArrowIcon from "@/components/icons/Arrow";
import NnpMinifiedLogo from "@/components/icons/NnpMinifiedLogo";
import { useTranslation } from "next-i18next";

export default function LayoutWithNavigation({ children }: { children: ReactNode }) {
  const { asPath } = useRouter();
  const [sidebarOpened, setSidebarOpened] = useState(() => {
    const sidebarStatus = localStorage.getItem("nnp-sd-status");
    if (!sidebarStatus || sidebarStatus === "false") {
      return false;
    }
    return true;
  });
  const { t } = useTranslation();

  const saveSidebarStateInLocalStorage = (state: boolean) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nnp-sd-status", String(state));
    }
  };

  const toggleSidebar = () => {
    setSidebarOpened((prev) => {
      saveSidebarStateInLocalStorage(!prev);
      return !prev;
    });
  };

  return (
    <div>
      <div
        data-sidebaropened={sidebarOpened}
        className={`fixed group/sidebar h-screen py-8 flex flex-col justify-between items-center bg-nnp-primary/70 backdrop-blur-[80px] transition-width duration-300 ease-[cubic-bezier(0.25, 0.8, 0.25, 1)] ${sidebarOpened ? "w-56" : "w-22"}`}
      >
        {sidebarOpened ? <NnpLogo /> : <NnpMinifiedLogo />}
        <button
          onClick={toggleSidebar}
          className="absolute bg-nnp-primary/70 right-0 top-1/2 -mr-7 w-7 h-16 flex items-center justify-center rounded-r-md "
        >
          <ArrowIcon className={`text-nnp-muted size-5  ${sidebarOpened ? "rotate-0" : "rotate-180"}`} />
        </button>
        <nav>
          <div className="flex flex-col gap-9">
            <Link href="/" data-active={asPath.toLowerCase() === "/"} className="group flex items-center gap-2">
              <HomeIcon className="stroke-nnp-muted group-data-[active=true]:stroke-nnp-highlight transition-all" />
              <span className="text-nnp-muted group-data-[sidebaropened=false]/sidebar:hidden group-data-[active=true]:text-nnp-highlight group-data-[active=true]:font-bold transition-all">
                {t("nav.home")}
              </span>
            </Link>
            <Link href="/#" data-active={asPath.toLowerCase() === "search"} className="group flex items-center gap-2">
              <SearchIcon className="stroke-nnp-muted group-data-[active=true]:stroke-nnp-highlight transition-all" />
              <span className="text-nnp-muted group-data-[sidebaropened=false]/sidebar:hidden group-data-[active=true]:stroke-nnp-highlight transition-all">
                {t("nav.search")}
              </span>
            </Link>
            <Link
              href="#"
              data-active={asPath.toLowerCase() === "notifications"}
              className="group flex items-center gap-2"
            >
              <BellIcon className="stroke-nnp-muted group-data-[active=true]:stroke-nnp-highlight transition-all" />
              <span className="text-nnp-muted group-data-[sidebaropened=false]/sidebar:hidden group-data-[active=true]:stroke-nnp-highlight transition-all">
                {t("nav.notification")}
              </span>
            </Link>
            <Link
              href="/#"
              data-active={asPath.toLowerCase() === "favorites"}
              className="group flex items-center gap-2"
            >
              <HeartIcon className="stroke-nnp-muted group-data-[active=true]:stroke-nnp-highlight transition-all" />
              <span className="text-nnp-muted group-data-[sidebaropened=false]/sidebar:hidden group-data-[active=true]:stroke-nnp-highlight transition-all">
                {t("nav.favorite")}
              </span>
            </Link>
          </div>
        </nav>
        <div className="w-full px-10">
          {/*<div className="size-12 bg-gradient-to-tr rounded-full from-nnp-highlight to-nnp-highlight/70" />*/}
        </div>
      </div>
      <div className="overflow-y-auto">{children}</div>
      <div className="fixed bg-gradient-to-br from-nnp-gradient blur-[100px] to-transparent rounded-br-full rounded-tr-full w-1/2 h-1/2 top-0 left-0 -z-10" />
      <div className="fixed bg-gradient-to-br from-nnp-gradient blur-[100px] to-transparent rounded-br-full rounded-tr-full w-1/2 h-28 bottom-0 left-0 -mb-20 -z-10" />
    </div>
  );
}
