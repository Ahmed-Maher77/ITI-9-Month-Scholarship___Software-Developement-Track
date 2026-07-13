const clients = new Map();

export function addClient(simulationId, res) {
  if (!clients.has(simulationId)) {
    clients.set(simulationId, new Set());
  }
  clients.get(simulationId).add(res);

  res.on("close", () => {
    const set = clients.get(simulationId);
    if (!set) return;
    set.delete(res);
    if (set.size === 0) {
      clients.delete(simulationId);
    }
  });
}

export function broadcast(simulationId, data) {
  const set = clients.get(simulationId);
  if (!set) return;
  const message = `data: ${JSON.stringify(data)}\n\n`;
  for (const res of set) {
    res.write(message);
  }
}

export function getClientCount(simulationId) {
  return clients.get(simulationId)?.size ?? 0;
}
