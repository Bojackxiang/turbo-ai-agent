import { atom } from "jotai";
import { WidgetScreen } from "../types";

// NOTE: default to "auth" to force auth screen for demo
export const screenAtom = atom<WidgetScreen>("loading");
// export const screenAtom = atom<WidgetScreen>("auth");
// export const screenAtom = atom<WidgetScreen>("auth");

export const errorMessageAtom = atom<string | null>("Something is wrong");
export const loadingMessageAtom = atom<string | null>("We are loading...");
