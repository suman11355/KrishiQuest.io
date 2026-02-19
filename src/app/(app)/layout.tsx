
import { BottomNav } from '@/components/krishi-quest/bottom-nav';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
