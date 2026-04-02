import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/auth/get-user';
import { AppShell } from '@/components/app/app-shell';

export const metadata = {
  title: 'Dashboard | ChargebackKit',
  description: 'Manage your dispute evidence packs.',
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect('/login?redirect=/app');
  }

  return <AppShell user={user}>{children}</AppShell>;
}
