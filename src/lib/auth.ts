import { useEffect, useState } from "react";

export type Role = "admin" | "doctor" | "patient";

export type SessionUser = {
  role: Role;
  name: string;
  email: string;
};

const KEY = "ipcms.session";

const DEFAULT_NAMES: Record<Role, string> = {
  admin: "Alex Morgan",
  doctor: "Dr. Sarah Chen",
  patient: "Jamie Rivera",
};

export function getSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
}

export function setSession(user: SessionUser) {
  window.localStorage.setItem(KEY, JSON.stringify(user));
}

export function clearSession() {
  window.localStorage.removeItem(KEY);
}

export function loginAs(role: Role, email?: string): SessionUser {
  const user: SessionUser = {
    role,
    email: email || `${role}@medicore.health`,
    name: DEFAULT_NAMES[role],
  };
  setSession(user);
  return user;
}

export function useSession(): { user: SessionUser | null; ready: boolean } {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setUser(getSession());
    setReady(true);
  }, []);
  return { user, ready };
}
