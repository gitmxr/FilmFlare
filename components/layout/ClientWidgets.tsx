"use client";

import dynamic from "next/dynamic";

const ScrollToTopButton = dynamic(
  () => import("@/components/ui/ScrollToTopButton"),
  { ssr: false }
);

const ToastContainer = dynamic(
  () => import("@/components/ui/ToastContainer"),
  { ssr: false }
);

export default function ClientWidgets() {
  return (
    <>
      <ScrollToTopButton />
      <ToastContainer />
    </>
  );
}
