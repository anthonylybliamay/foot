import { getTeamPlayers } from "../../../app/lib/api-football";
import Link from "next/link";

interface ClubPageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function ClubPage({ params }: ClubPageProps) {
  const { id } = await params;
  const data = await getTeamPlayers(id);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-8 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.8)] backdrop-blur-sm">
          <Link href="/" className="text-sm text-cyan-300 transition hover:text-cyan-100">
            ← Retour aux championnats
          </Link>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Joueurs du club
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Liste des joueurs pour la saison {data.parameters?.season ?? "2024"}.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {data.response.map((player: any) => (
            <article
              key={`${player.player.id}-${player.statistics?.[0]?.team?.id ?? "unknown"}`}
              className="overflow-hidden rounded-[1.75rem] border border-slate-800/90 bg-slate-900/80 p-6 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.8)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-slate-800/95"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-sm text-slate-300">
                    {player.player.number ?? "#"}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {player.player.name}
                    </h2>
                    <p className="text-sm text-slate-400">
                      {player.player.age ? `${player.player.age} ans` : "Âge inconnu"}
                    </p>
                  </div>
                </div>

                <div className="grid gap-2 rounded-2xl bg-slate-950/70 p-4 text-sm text-slate-300">
                  <p>Position : {player.statistics?.[0]?.games?.position ?? "N/A"}</p>
                  <p>Apparitions : {player.statistics?.[0]?.games?.appearences ?? "N/A"}</p>
                  <p>But(s) : {player.statistics?.[0]?.goals?.total ?? 0}</p>
                  <p>Passes décisives : {player.statistics?.[0]?.goals?.assists ?? 0}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
