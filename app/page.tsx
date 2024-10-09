import Navbar from "./components/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative flex w-full items-center justify-center bg-[#10141f] py-10 md:py-0">
      <div className="absolute inset-0 mx-auto max-w-[100vw] bg-hero-gradient lg:max-w-7xl" />
      <div className="flex items-center">
        <div className="flex w-auto flex-col items-start">
          <div className="z-10 flex flex-col px-5 pb-12 pt-14 md:px-14">
            <span className="text-xs">Hi, meet the</span>
            <h1 className="my-0.5 bg-gradient-to-t from-blue-700 to-blue-500 bg-clip-text text-4xl font-bold uppercase text-transparent md:my-1 lg:text-3xl xl:text-5xl">
              Riksoldman
            </h1>
            <p className="relative mt-2 text-body text-gray-100">
              The <span className="text-blue-400">open source</span> Old School
              Runescape
              <br />
              player progress tracker.
            </p>
          </div>
        </div>
        <div className="hidden overflow-hidden pt-20 md:block">
          <Image
            src="/img/homepage_wom.png"
            width={359}
            height={441}
            alt=""
            className="translate-y-[2rem]"
          />
        </div>
      </div>
      <div className="absolute -bottom-16">
        <StatsDisplay />
      </div>
    </section>
  );
}

async function StatsDisplay() {
  const response = await fetch("https://api.wiseoldman.net/v2/stats");
  
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  type Stats = {
    players: number;
    snapshots: number;
    groups: number;
    competitions: number;
  };

  const stats = (await response.json()) as Stats;
  


  const playerCount = `${(stats.players / 1_000_000).toFixed(2)}m`;
  const snapshotsCount = `${(stats.snapshots / 1_000_000).toFixed(2)}m`;
  const groupsCount = `${(stats.groups / 1_000).toFixed(1)}k`.replace(".0k", "k");
  const competitionsCount = `${(stats.competitions / 1_000).toFixed(1)}k`.replace(".0k", "k");

  return (
    <div className="relative z-20 -mt-5 flex w-full items-center">
      <div className="mx-auto rounded-xl bg-gray-900 bg-gradient-to-b from-gray-500 to-gray-900 p-px">
        <div className="mx-auto flex items-center rounded-xl bg-gray-900 py-5">
          <div className="flex flex-col items-center px-6 sm:px-8" role="group">
            <span className="text-base font-bold md:text-xl">{playerCount}</span>
            <span className="mt-1 text-xs text-gray-200">Players</span>
          </div>
          <div className="h-6 w-px bg-gray-500" aria-hidden="true" />
          <div className="flex flex-col items-center px-6 sm:px-8" role="group">
            <span className="text-base font-bold md:text-xl">{snapshotsCount}</span>
            <span className="mt-1 text-xs text-gray-200">Snapshots</span>
          </div>
          <div className="h-6 w-px bg-gray-500" aria-hidden="true" />
          <div className="flex flex-col items-center px-6 sm:px-8" role="group">
            <span className="text-base font-bold md:text-xl">{groupsCount}</span>
            <span className="mt-1 text-xs text-gray-200">Groups</span>
          </div>
          <div className="hidden h-6 w-px bg-gray-500 xs:block" aria-hidden="true" />
          <div className="hidden flex-col items-center px-6 xs:flex sm:px-8" role="group">
            <span className="text-base font-bold md:text-xl">{competitionsCount}</span>
            <span className="mt-1 text-xs text-gray-200">Competitions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
