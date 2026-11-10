// Guarda o estado da família (calendário, missões e estrelinhas) no Upstash Redis
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (!URL_ || !TOKEN) return res.status(503).json({ error: "sync-off" });
  const f = String((req.query && req.query.f) || "");
  if (!/^[a-z0-9]{12,40}$/.test(f)) return res.status(400).json({ error: "bad-id" });
  const key = "hdd:" + f;
  const call = cmd => fetch(URL_, {
    method: "POST",
    headers: { Authorization: "Bearer " + TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify(cmd)
  }).then(r => r.json());
  try {
    if (req.method === "GET") {
      const r = await call(["GET", key]);
      return res.status(200).json({ state: r && r.result ? JSON.parse(r.result) : null });
    }
    if (req.method === "POST") {
      const body = typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});
      if (body.length > 300000) return res.status(413).json({ error: "too-big" });
      JSON.parse(body);
      await call(["SET", key, body]);
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: "method" });
  } catch (e) {
    return res.status(500).json({ error: "fail" });
  }
};
