import DisputeWizard from '@/components/packs/dispute-wizard';

export const metadata = {
  title: 'New Dispute Pack | ChargebackKit',
};

export default function NewPackPage() {
  return (
    <div className="py-8 px-4">
      <DisputeWizard />
    </div>
  );
}
