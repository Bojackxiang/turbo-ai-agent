import { atom } from "jotai";
import { WidgetScreen } from "../types";

// NOTE: default to "auth" to force auth screen for demo
export const screenAtom = atom<WidgetScreen>("loading");
