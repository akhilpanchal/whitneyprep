import CountdownTimer from "./Countdown";

export default async function LandingPage() {

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">

        <CountdownTimer />
        {/* <a href="/akhil" className="text-blue-500 hover:underline">
          Akhil's Stats
        </a>
        <a href="/rajas" className="text-blue-500 hover:underline">
          Rajas's Stats
        </a> */}
    </main>
  );
}
