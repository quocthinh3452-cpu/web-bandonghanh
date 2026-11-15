import CompanionSidebar from '@/modules/companion/components/CompanionSidebar';

export default function CompanionPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0b0b0f]">
      <CompanionSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
