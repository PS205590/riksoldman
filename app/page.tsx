import GetUser from "./components/GetUser";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/groups">Go to Groups</Link>
      <GetUser />
    </>
  );
}
