import type { InjectionKey } from "vue";

export const TOTAL_GAMES_LIVECASINO_INJECTION_KEY = Symbol() as InjectionKey<{
  updateTotalItems(totalItems: number, totalGameLobby: number): void;
}>;
