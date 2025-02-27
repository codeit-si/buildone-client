import Link from "next/link";

export default async function LandingPage() {
  return (
    <h1>
      LandingPage<Link href="/dashboard">대시보드</Link>
    </h1>
  );
}
