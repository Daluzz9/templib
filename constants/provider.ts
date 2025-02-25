export const PROVIDER_MAP: Record<string, string> = {
  go: "hit",
};

export const getRenamedProviderCode = (originCode: string | undefined) => {
  if (!originCode) return;
  // GO provider is display to HIT only FE, so need to convert provider name back to go when fetch game
  // No changes from BO cause effect project and QC efforts
  return PROVIDER_MAP[originCode] || originCode;
};

export const getOriginProviderCode = (code?: string) => {
  if (!code) return;
  return (
    Object.keys(PROVIDER_MAP).find((originCode) => {
      return code === PROVIDER_MAP[originCode];
    }) || code
  );
};
