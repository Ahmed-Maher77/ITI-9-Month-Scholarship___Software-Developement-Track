# Simulation Engine Feature

The Simulation Engine brings a **virtual smart home** sandbox to Kashf. Users create simulation sessions, define circuits (rooms/zones), populate them with devices, toggle devices ON/OFF, and watch real-time energy consumption evolve. The system demonstrates how a smart grid behaves — second-by-second watt accumulation, kWh billing, and Sheriha tier escalation — without requiring real hardware.

---

## 1. Model Schema

### `Simulation` (`database/models/simulation.model.js`)

Store-only static configuration. Runtime state is never persisted.

| Field | Type | Description |
| :--- | :--- | :--- |
| `user` | `ObjectId` (ref `User`) | Simulation owner. Required, indexed. |
| `name` | `String` | Display name. Default `"New Simulation"`. |
| `circuits` | `[Circuit]` | Embedded sub-documents (see below). |

### Embedded `Circuit` Sub-schema

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | `ObjectId` | Auto-generated. |
| `name` | `String` | Circuit name (e.g. "Kitchen"). Required. |
| `devices` | `[Device]` | Embedded sub-documents. |

### Embedded `Device` Sub-schema

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | `ObjectId` | Auto-generated. |
| `name` | `String` | Device name (e.g. "Refrigerator"). Required. |
| `wattage` | `number` | Power consumption in watts. Min 1. |
| `isOn` | `boolean` | Power state. Default `false`. |

---

## 2. API Endpoints

All simulation endpoints require authentication. Mounted at `/api/simulations`.

### Simulations CRUD

| Method | Endpoint | Description | Validation |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/simulations` | List user's simulations (with runtime) | — |
| `POST` | `/api/simulations` | Create simulation (manual or auto-generate) | `createSimulationSchema` |
| `GET` | `/api/simulations/:id` | Get simulation config + runtime state | — |
| `DELETE` | `/api/simulations/:id` | Delete simulation (stops engine if running) | — |

### Circuits

| Method | Endpoint | Description | Validation |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/simulations/:id/circuits` | Add circuit (manual or auto-generate) | `addCircuitSchema` |
| `PATCH` | `/api/simulations/:id/circuits/:cid` | Rename circuit | `updateCircuitSchema` |
| `DELETE` | `/api/simulations/:id/circuits/:cid` | Remove circuit and its devices | — |

### Devices

| Method | Endpoint | Description | Validation |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/simulations/:id/devices` | Add device to circuit | `addDeviceSchema` |
| `PATCH` | `/api/simulations/:id/devices/:did` | Toggle ON/OFF, edit wattage, rename | `updateDeviceSchema` |
| `DELETE` | `/api/simulations/:id/devices/:did` | Remove device | — |

### Engine Control

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/simulations/:id/start` | Start the engine (1s tick loop) |
| `POST` | `/api/simulations/:id/pause` | Pause the engine |
| `POST` | `/api/simulations/:id/reset` | Zero runtime counters, keep config |

### Streaming

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/simulations/:id/stream` | SSE endpoint — live state on every tick |

---

## 3. Engine Service

**File:** `src/services/simulation.engine.js`

The engine maintains an **in-memory `Map<simulationId, Runtime>`** where each runtime holds:

- `config` — snapshot of the MongoDB document (circuits, devices, wattage, `isOn`)
- `totalKWh` — accumulated kilowatt-hours
- `currentTier` — current Sheriha billing tier (1–7)
- `currentLoadW` — total wattage currently drawn
- `estimatedBill` — computed bill in EGP
- `tickCount` — number of engine ticks executed
- `running` — boolean flag
- `intervalRef` — Node.js interval handle
- `startedAt` — ISO timestamp

### Tick loop (every 1 second)

1. Sum wattage of all devices where `isOn === true` across all circuits → `totalWatts`
2. `kWhThisTick = totalWatts / 3600`
3. `totalKWh += kWhThisTick`
4. Compute tier and bill via `computeTier()` and `computeBill()`
5. Broadcast state snapshot to all SSE clients

### Sync behaviour

When a user modifies circuits/devices (add, toggle, delete) while the engine is running, the controller calls `syncConfig()` to update the in-memory config mirror. The next tick uses the updated configuration.

---

## 4. Tier & Bill Calculation

**File:** `src/config/tier.constants.js`

Egyptian Sheriha tier thresholds and rates (2026):

| Tier | Range (kWh) | Rate (EGP/kWh) |
| :--- | :--- | :--- |
| 1 | 0–50 | 0.58 |
| 2 | 51–100 | 0.78 |
| 3 | 101–200 | 1.08 |
| 4 | 201–350 | 1.28 |
| 5 | 351–650 | 1.58 |
| 6 | 651–1000 | 1.78 |
| 7 | 1000+ | 2.08 |

### `computeTier(kWh)`

Returns a tier number (1–7) by comparing `kWh` against thresholds in order.

### `computeBill(kWh)`

Applies **progressive bracket pricing** — each bracket is billed at its own rate. Example at 150 kWh:

> Tier 1: 50 × 0.58 = 29 EGP  
> Tier 2: 50 × 0.78 = 39 EGP  
> Tier 3: 50 × 1.08 = 54 EGP  
> **Total: 122 EGP**

---

## 5. SSE Streaming

**File:** `src/services/simulation.broadcaster.js`

Uses **Server-Sent Events** — a unidirectional push channel from server to client.

### Architecture

```
[Engine Tick] → compute state → broadcast(simulationId, state)
                                       ↓
                                Map<simId, Set<Response>>
                                       ↓
                              for each response → res.write(`data: {...}\n\n`)
```

### Connection lifecycle

1. Client opens `GET /api/simulations/:id/stream` with auth header
2. Server validates ownership, sends initial state (if any)
3. Response is added to `clients` map via `addClient()`
4. On `req.on("close")`, the response is removed from the map
5. If the set becomes empty, the map entry is deleted

### Event payload (per tick)

```json
{
  "totalKWh": 0.0417,
  "currentTier": 1,
  "currentLoadW": 1500,
  "estimatedBill": 0.02,
  "tickCount": 100,
  "running": true,
  "startedAt": "2026-06-09T10:00:00.000Z",
  "circuits": [
    {
      "_id": "...",
      "name": "Kitchen",
      "loadW": 200,
      "deviceCount": 3,
      "devicesOn": 1
    }
  ],
  "timestamp": "2026-06-09T10:00:01.000Z"
}
```

---

## 6. Data Flow

```
USER ACTION                CONTROLLER                  ENGINE                      CLIENT
───────────                ──────────                  ──────                      ──────
Create Sim    ──POST──►    Simulation.create()          —                           receives config
Add Circuit   ──POST──►    circuit push → save          syncConfig()               receives config
Add Device    ──POST──►    device push → save           syncConfig()               receives config
Toggle Device ──PATCH──►   update isOn → save           syncConfig()               receives config
Start Engine  ──POST──►    —                           startSimulation()
                                                         │
                                                         ├─ load config from DB
                                                         ├─ setInterval(1s)
                                                         │
                                                         ▼  each tick:
                                                       compute load → kWh → tier
                                                         │
                                                         └─► broadcast() ──SSE──► onmessage → update UI
```

---

## 7. Bruno API Collection

A ready-to-use Bruno collection is available at `server/bruno/Simulation API/`.

### Structure

```
Simulation API/
├── opencollection.yml
├── environments/
│   └── Local.yml
├── Auth/
│   └── Login.yml
├── Simulations/
│   ├── Create Simulation.yml
│   ├── List Simulations.yml
│   ├── Get Simulation.yml
│   └── Delete Simulation.yml
├── Circuits/
│   ├── Add Circuit.yml
│   ├── Update Circuit.yml
│   └── Delete Circuit.yml
├── Devices/
│   ├── Add Device.yml
│   ├── Update Device.yml
│   └── Delete Device.yml
├── Engine/
│   ├── Start Simulation.yml
│   ├── Pause Simulation.yml
│   └── Reset Simulation.yml
└── Stream/
    └── Stream Simulation State.yml
```

### Usage

1. Open Bruno, click **Open Collection** → select `server/bruno/Simulation API/`
2. Set `email` and `password` in the `Local` environment
3. Run **Login** to get an auth token (auto-stored in environment)
4. Run **Create Simulation** (with `autoGenerate: true`) to seed a full smart home
5. The simulation ID is auto-stored — subsequent requests use it via `{{simulationId}}`
6. **Start Simulation** to begin the engine
7. **Stream Simulation State** to watch live SSE updates

Each request includes:
- Pre-configured auth headers (Bearer token)
- Post-response scripts that extract IDs for request chaining
- Chai.js test assertions validating status codes and response shape
- Markdown documentation explaining the endpoint
