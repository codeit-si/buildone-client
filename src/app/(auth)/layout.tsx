import MainLogo from "@/assets/main_logo.svg";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-16 mt-65 flex flex-col items-center md:mt-81 lg:mt-137">
      <MainLogo />
      {children}
    </div>
  );
}
