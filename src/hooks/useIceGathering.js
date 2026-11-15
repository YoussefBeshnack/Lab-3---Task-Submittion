import { useState, useEffect } from "react";
import { gatherCandidates } from "../lib/gatherCandidates";

export function useIceGathering(iceServers) {
  const [candidates, setCandidates] = useState([]);
  const [elapsed, setElapsed] = useState(null);
  const [gatheringState, setGatheringState] = useState("new");

  useEffect(() => {
    let active = true;

    setCandidates([]);
    setElapsed(null);
    setGatheringState("new");

    const start = performance.now();

    const stop = gatherCandidates({
      iceServers,
      onStateChange: (state) => {
        setGatheringState(state);
      },
      onCandidate: (candidate) => {
        if (!active) return;
        setCandidates((prev) => [...prev, candidate]);
      },
      onDone: () => {
        if (!active) return;
        const end = performance.now();
        setElapsed(Math.round(end - start));
      },
    });

    return () => {
      active = false;
      stop();
    };
  }, [iceServers]);

  return {
    candidates,
    elapsed,
    gatheringState,
  };
}
