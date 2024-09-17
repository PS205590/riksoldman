import GetUser from "./components/GetUser";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/groups">Go to Groups</Link>
      <GetUser />
    </div>
  );
}
