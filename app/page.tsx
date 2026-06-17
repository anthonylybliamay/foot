import Link from "next/link";
import { getLeagues } from "../app/lib/api-football";

export default async function LeaguesPage() {
  const data = await getLeagues();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-8 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.8)] backdrop-blur-sm">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/90">
            Football API
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Championnats
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Liste des ligues récupérées depuis l&apos;API. Explore les championnats et découvre les compétitions principales.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {data.response.map((league: any) => (
            <Link
              key={league.league.id}
              href={`/league/${league.league.id}`}
              className="group block overflow-hidden rounded-[1.75rem] border border-slate-800/90 bg-slate-900/80 p-6 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.8)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-slate-800/95"
            >
              <h2 className="text-xl font-semibold text-white transition group-hover:text-cyan-300">
                {league.league.name}
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                {league.country?.name ?? league.league.country ?? "Pays inconnu"}
              </p>
              <p className="mt-4 text-sm text-slate-500 transition group-hover:text-slate-300">
                Voir les équipes de la ligue
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}


// API_FOOTBALL_KEY="eb76dad84db90715b72307ec2830a2f1"