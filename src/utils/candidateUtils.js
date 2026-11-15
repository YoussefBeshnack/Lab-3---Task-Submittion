export const sortCandidatesByPriority = (candidates) => {
  return [...candidates].sort(
    (a, b) => b.priority - a.priority
  );
};
