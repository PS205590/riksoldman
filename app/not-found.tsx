import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center">
      <Image width={200} height={200} src={"/img/404_troll.png"} alt="A troll holding a sign" />
      <h1>The route you entered does not exist.</h1>

      <Link className="p-4 bg-blue-400 rounded" href="/">
      Return to home.</Link>
    </div>
  );
}
