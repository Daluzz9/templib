export type ISportUrlProvider = {
  maintenance: string; // TODO: need to be verify string or boolean
  url: string;
};

export enum SportProvidersEnum {
  KSPORTS = "ksports",
  CSPORTS = "csports",
  SSPORTS = "ssports",
  MSPORTS = "msports",
  TSPORTS = "tsports",
  VSPORTS = "virtual-sports",
  ESPORTS = "esports",
  PSPORTS = "psports",
  ASPORTS = "asports",
}
