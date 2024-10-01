import GetEhpForRegularAccounts from "../components/GetEhpForRegularAccounts";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/ehp/ironman">Go to EHP for ironman</Link>
      <GetEhpForRegularAccounts />
    </div>
  );
}
