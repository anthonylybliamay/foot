import { getLeagueTeams } from "../../lib/api-football";
import Link from "next/link";

interface LeaguePageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function LeaguePage({ params }: LeaguePageProps) {
  const { id } = await params;
  const data = await getLeagueTeams(id);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-8 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.8)] backdrop-blur-sm">
          <Link href="/" className="text-sm text-cyan-300 transition hover:text-cyan-100">
            ← Retour aux championnats
          </Link>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Équipes de la ligue
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Voici toutes les équipes enregistrées dans cette ligue pour la saison {data.parameters?.season ?? "2024"}.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {data.response.map((team: any) => (
            <Link
              key={team.team.id}
              href={`/club/${team.team.id}`}
              className="group block overflow-hidden rounded-[1.75rem] border border-slate-800/90 bg-slate-900/80 p-6 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.8)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-slate-800/95"
            >
              <div className="flex items-center gap-4">
                {team.team.logo ? (
                  <img src={team.team.logo} alt={team.team.name} className="h-12 w-12 rounded-full bg-slate-800 object-contain" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-sm text-slate-300">
                    ?
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold text-white transition group-hover:text-cyan-300">
                    {team.team.name}
                  </h2>
                  <p className="text-sm text-slate-400">Pays : {team.team.country ?? "N/A"}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500 transition group-hover:text-slate-300">
                Voir les joueurs du club
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
