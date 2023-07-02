import Link from "next/link";

const Navigation = () => {
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <Link href="/">Home</Link>
      <Link href="/posts">Posts</Link>
      <Link href="/random/page">Random Page</Link>
    </div>
  );
};

export default Navigation;
