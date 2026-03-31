import { requiredAdmin } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await requiredAdmin();

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar userName={user.name} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <MobileSidebar />

                <main className="flex-1 overflow-y-auto bg-surface-lowest">
                    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}