import Link from "next/link";
import "../styling/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Budgy</h2>
      <nav>
        <Link href="/home">Home</Link>
        <Link href="/map">Map</Link>
        <Link href="/advisor">Advisor</Link>
        <Link href="/tracker">Tracker</Link>       
      </nav>
    </div>
  );
}
