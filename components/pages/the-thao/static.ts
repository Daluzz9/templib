type ISport = {
  name: string;
  imagePC: string;
  imageMB: string;
  url: string;
};

export const LEAGUE_ALL = { id: "all", name: "Tất cả giải đấu", logo: "/sport/sport-schedule/logo-league-all.svg" };
export const LEAGUE_HOT = { id: "hot", name: "Giải đấu HOT", logo: "/sport/sport-schedule/logo-league-hot.svg" };

export enum TabScheduleFilterEnum {
  LEAGUE = "league",
  PERIOD = "period",
}

export const sportCardList: ISport[] = [
  {
    name: "ksport",
    imagePC: "sport/PC-K-sports.webp",
    imageMB: "sport/MB-K-sports.webp",
    url: APP_PATH.K_SPORTS,
  },
  {
    name: "asport",
    imagePC: "sport/PC-A-sports.webp",
    imageMB: "sport/MB-A-sports.webp",
    url: APP_PATH.A_SPORTS,
  },
  {
    name: "psport",
    imagePC: "sport/PC-P-sports.webp",
    imageMB: "sport/MB-P-sports.webp",
    url: APP_PATH.P_SPORTS,
  },
  {
    name: "isport",
    imagePC: "sport/PC-I-sports.webp",
    imageMB: "sport/MB-I-sports.webp",
    url: APP_PATH.I_SPORTS,
  },
  {
    name: "tsport",
    imagePC: "sport/PC-T-sports.webp",
    imageMB: "sport/MB-T-sports.webp",
    url: APP_PATH.T_SPORTS,
  },
  {
    name: "volta",
    imagePC: "sport/PC-Volta-3X3.webp",
    imageMB: "sport/MB-Volta-3X3.webp",
    url: APP_PATH.VOLTA,
  },
  {
    name: "virtual-sport",
    imagePC: "sport/PC-virtual-sport.webp",
    imageMB: "sport/MB-virtual-sport.webp",
    url: APP_PATH.VS_SPORTS,
  },
  {
    name: "esport",
    imagePC: "sport/PC-e-sport.webp",
    imageMB: "sport/MB-e-sport.webp",
    url: APP_PATH.E_SPORTS,
  },
  {
    name: "matchSchedule",
    imagePC: "sport/PC-match-schedule.webp",
    imageMB: "sport/MB-match-schedule.webp",
    url: APP_PATH.E_SPORTS,
  },
];
