import { atom } from "jotai";
import { WidgetScreen } from "../types";
import { atomFamily, atomWithStorage } from "jotai/utils";
import { CONTACT_SESSION_KEY } from "@/constants";
import { Doc, Id } from "@repo/backend/convex/_generated/dataModel";

export const conversationIdAtom = atom<Id<"conversation"> | null>(null);
export const errorMessageAtom = atom<string | null>(null);
export const loadingMessageAtom = atom<string | null>(null);
export const organizationIdAtom = atom<string | null>(null);
export const screenAtom = atom<WidgetScreen>("loading");
export const vapiSecretItem = atom<{
  publicApiKey: string;
} | null>(null);

export const contactSessionIdAtomFamily = atomFamily((orgId: string) =>
  atomWithStorage<Id<"contactSession"> | null>(
    `${CONTACT_SESSION_KEY}_${orgId}`,
    null
  )
);

export const widgetSettingAtom = atom<Doc<"widgetSettings"> | null>(null);
