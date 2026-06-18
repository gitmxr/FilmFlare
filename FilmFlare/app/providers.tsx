"use client";

import { SWRConfig } from "swr";
import { MotionConfig } from "framer-motion";
import WebVitals from "@/components/analytics/WebVitals";
import VercelAnalytics from "@/components/analytics/VercelAnalytics";
import PageTransition from "@/components/animations/PageTransition";
import { swrConfig } from "@/lib/swr-config";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SWRConfig value={swrConfig}>
        <PageTransition>{children}</PageTransition>
        <WebVitals />
        <VercelAnalytics />
      </SWRConfig>
    </MotionConfig>
  );
}
