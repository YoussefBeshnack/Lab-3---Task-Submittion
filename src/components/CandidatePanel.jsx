import { useState } from "react";
import { CONFIGS, COLORS } from "../constants/config";
import { useIceGathering } from "../hooks/useIceGathering";
import { sortCandidatesByPriority } from "../utils/candidateUtils";

export default function CandidatePanel() {
  const [configName, setConfigName] = useState("stun");

  const iceServers = CONFIGS[configName];
  const { candidates, elapsed, gatheringState } = useIceGathering(iceServers);

  const sorted = sortCandidatesByPriority(candidates);

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ marginBottom: "20px" }}>ICE Candidate Panel</h1>

      {/* ==========================================
          STUN SERVER SELECTION
          ========================================== */}
      <select
        value={configName}
        onChange={(e) => setConfigName(e.target.value)}
      >
        <option value="none">No STUN</option>
        <option value="stun">Google STUN</option>
        <option value="wrong">Unreachable STUN</option>
      </select>
      <p>
        Gathering Time: {elapsed !== null ? `${elapsed} ms` : "Gathering..."}
        <p>Gathering State: {gatheringState}</p>
      </p>

      {/* ==========================================\
          CANDIDATES TABLE
          ========================================== */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>Type</th>
            <th>Protocol</th>
            <th>Address : Port</th>
            <th>Priority</th>
            <th>Foundation</th>
          </tr>
        </thead>

        <tbody>
          {sorted.map((c) => (
            <tr
              key={c.candidate}
              style={{
                background: COLORS[c.type] ?? "white",
              }}
            >
              <td>{c.type}</td>
              <td>{c.protocol}</td>
              <td>{c.address}:{c.port}</td>
              <td>{c.priority}</td>
              <td>{c.foundation}</td>
            </tr>
          ))}

          {sorted.length === 0 && (
            <tr>
              <td colSpan={5}>
                Waiting for candidates...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

