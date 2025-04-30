import CountdownTimer from "./components/Countdown";

export default async function LandingPage() {

  return (
    <main className="p-6 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">🏔️ Mount Whitney Countdown</h1>
      <div className="flex flex-col space-y-4 mb-6">

        <CountdownTimer />
        {/* <a href="/akhil" className="text-blue-500 hover:underline">
          Akhil's Stats
        </a>
        <a href="/rajas" className="text-blue-500 hover:underline">
          Rajas's Stats
        </a> */}
      </div>
    </main>
  );
}
