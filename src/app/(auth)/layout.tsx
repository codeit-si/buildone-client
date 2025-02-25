import MainLogo from "@/assets/logo/main_logo.svg";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-16 mt-65 flex flex-col items-center md:mt-81 lg:mt-137">
      <MainLogo aria-label="BuilDone 로고" />
      {children}
    </div>
  );
}
