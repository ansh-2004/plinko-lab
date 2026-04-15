const BASE_URL = "http://localhost:3000/api";

export async function createRound() {
  const res = await fetch(`${BASE_URL}/rounds/commit`, {
    method: "POST",
  });
  return res.json();
}

export async function startRound(id, data) {
  const res = await fetch(`${BASE_URL}/rounds/${id}/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function revealRound(id) {
  const res = await fetch(`${BASE_URL}/rounds/${id}/reveal`, {
    method: "POST",
  });
  return res.json();
}

export async function verifyRound(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/verify?${query}`);
  return res.json();
}

export async function getRound(id) {
  const res = await fetch(`${BASE_URL}/rounds/${id}`);
  return res.json();
}

export async function getRecentRounds() {
  const res = await fetch(`${BASE_URL}/rounds?limit=10`);
  return res.json();
}