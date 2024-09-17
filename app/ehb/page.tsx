import GetEhbForRegularAccounts from "../components/GetEhbForRegularAccounts";
import Link from "next/link";

export default function GetEhbForMains() {
  return (
    <div>
      <Link href="/ehb/ironman">Go to EHB for ironman</Link>
      <GetEhbForRegularAccounts />
    </div>
  );
}
