import { LinkScanner } from '@/components/LinkScanner';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.05),transparent_50%)] pointer-events-none" />
      <div className="relative py-12">
        <LinkScanner />
      </div>
    </div>
  );
};

export default Index;
