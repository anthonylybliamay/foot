

export async function getLeagues() {
  const res = await fetch(
    "https://v3.football.api-sports.io/leagues",
    {
      headers: {
        "x-apisports-key": process.env.API_FOOTBALL_KEY!,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Erreur API Football");
  }

  return res.json();
}

export async function getLeagueTeams(leagueId: string | number, season = 2024) {
  const res = await fetch(
    `https://v3.football.api-sports.io/teams?league=${leagueId}&season=${season}`,
    {
      headers: {
        "x-apisports-key": process.env.API_FOOTBALL_KEY!,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Erreur API Football");
  }

  return res.json();
}

export async function getTeamPlayers(teamId: string | number, season = 2024) {
  const res = await fetch(
    `https://v3.football.api-sports.io/players?team=${teamId}&season=${season}`,
    {
      headers: {
        "x-apisports-key": process.env.API_FOOTBALL_KEY!,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Erreur API Football");
  }

  return res.json();
}

