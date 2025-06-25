'use client';
import { LayoutProps } from "@/plugins/interfaces";
import MainLayout from "@/components/layout"

export default function DefaultLayout({ children }: LayoutProps) {
    return (
        <LayoutProvider>{children}</LayoutProvider>
    )
}

function LayoutProvider({ children }: LayoutProps) {
    return <MainLayout>{children}</MainLayout>;
}
