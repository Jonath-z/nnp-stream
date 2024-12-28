import { ReactElement } from "react";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";

const LayoutWithNavigation = dynamic(() => import("@/components/layouts/LayoutWithNavigation"), {
  ssr: false,
});

export default function Home() {
  const { t } = useTranslation();

  return (
    <div
      suppressHydrationWarning
      className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      NNP Stream, translation:{t("nav.search")}
    </div>
  );
}

Home.getLayout = function (page: ReactElement) {
  return <LayoutWithNavigation>{page}</LayoutWithNavigation>;
};
