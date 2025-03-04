import LandingFooter from "@/components/landing-page/landing-footer";
import LandingHeader from "@/components/landing-page/landing-header";
import LandingSection1 from "@/components/landing-page/landing-section-1";
import LandingSection2 from "@/components/landing-page/landing-section-2";
import LandingSection3 from "@/components/landing-page/landing-section-3";
import LandingSection4 from "@/components/landing-page/landing-section-4";
import LandingSection5 from "@/components/landing-page/landing-section-5";
import LandingSection6 from "@/components/landing-page/landing-section-6";
import LandingSection7 from "@/components/landing-page/landing-section-7";
import Link from "next/link";

export default async function LandingPage() {
  return (
    <>
      <LandingHeader/>
      <LandingSection1/>
      <LandingSection2/>
      <LandingSection3/>
      <LandingSection4/>
      <LandingSection5/>
      <LandingSection6/>
      <LandingSection7/>
      <LandingFooter/>
    </>
  );
}
