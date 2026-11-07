import { useSyncExternalStore } from "react";

export interface Profile {
  fullName: string;
  email: string;
  dob: string;
  state: string;
  city: string;
  educationLevel: string;
  institution: string;
  course: string;
  academicYear: string;
  score: string;
  graduationYear: string;
  preferences: string[];
  incomeRange: string;
  incomeCertificate: "yes" | "no" | "applied" | "";
  gender: string;
  additional: string;
}

export type AppStatus = "Interested" | "Preparing" | "Applied" | "Result Received" | "Not Selected" | "Awarded";
export const APP_STATUSES: AppStatus[] = ["Interested", "Preparing", "Applied", "Result Received", "Not Selected", "Awarded"];

export interface AppState {
  profile: Profile | null;
  saved: string[];
  applications: Record<string, { status: AppStatus; updatedAt: string }>;
  docs: Record<string, boolean>;
}

const KEY = "grantly:v1";
const empty: AppState = { profile: null, saved: [], applications: {}, docs: {} };
let state: AppState = empty;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = { ...empty, ...JSON.parse(raw) };
  } catch {
    state = empty;
  }
}

function set(next: Partial<AppState>) {
  state = { ...state, ...next };
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked */
  }
  listeners.forEach((l) => l());
}

export function useAppState() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => {
      load();
      return state;
    },
    () => empty,
  );
}

export const actions = {
  setProfile: (profile: Profile) => set({ profile }),
  toggleSaved: (id: string) => {
    load();
    const isSaved = state.saved.includes(id);
    const saved = isSaved ? state.saved.filter((x) => x !== id) : [...state.saved, id];
    const applications = { ...state.applications };
    if (!isSaved && !applications[id]) applications[id] = { status: "Interested", updatedAt: new Date().toISOString() };
    set({ saved, applications });
    return !isSaved;
  },
  setStatus: (id: string, status: AppStatus) => {
    load();
    set({ applications: { ...state.applications, [id]: { status, updatedAt: new Date().toISOString() } } });
  },
  removeApplication: (id: string) => {
    load();
    const applications = { ...state.applications };
    delete applications[id];
    set({ applications });
  },
  toggleDoc: (doc: string) => {
    load();
    const next = !state.docs[doc];
    set({ docs: { ...state.docs, [doc]: next } });
    return next;
  },
  reset: () => set({ ...empty }),
};

export function profileCompletion(p: Profile | null) {
  if (!p) return 0;
  const fields: (keyof Profile)[] = [
    "fullName", "email", "dob", "state", "city", "educationLevel", "institution", "course",
    "academicYear", "score", "graduationYear", "incomeRange", "incomeCertificate", "gender",
  ];
  const filled = fields.filter((f) => String(p[f] ?? "").trim()).length + (p.preferences.length ? 1 : 0);
  return Math.round((filled / (fields.length + 1)) * 100);
}
