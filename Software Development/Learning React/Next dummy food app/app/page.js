import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Time to get started!
      </h1>
      <h1>The Home page</h1>
      <nav>
        <Link href="/meals">Meals</Link>
        <Link href="/community">Community</Link>
      </nav>
    </main>
  );
}
