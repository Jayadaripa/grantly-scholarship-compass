import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/grantly/AppShell";

export const Route = createFileRoute("/_shell")({ component: () => <AppShell><Outlet /></AppShell> });
