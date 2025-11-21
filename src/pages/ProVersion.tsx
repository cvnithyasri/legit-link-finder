import { Link } from 'react-router-dom';
import { Check, ArrowLeft, Zap, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ProVersion = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,217,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="relative max-w-6xl mx-auto px-4 py-16">
        <Link to="/">
          <Button variant="ghost" className="mb-8 glow-text">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Scanner
          </Button>
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 glow-text">
            LinkGuard AI Pro
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upgrade to Pro for advanced protection and enterprise-grade security features
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 bg-card/50 backdrop-blur border-border hover:border-primary/40 transition-all">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">10 scans per day</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Basic threat detection</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Standard security analysis</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Community support</span>
              </li>
            </ul>
            <Link to="/">
              <Button variant="outline" className="w-full">
                Current Plan
              </Button>
            </Link>
          </Card>

          <Card className="p-8 bg-card/50 backdrop-blur border-primary glow-border relative transform scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
              MOST POPULAR
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold glow-text">$19</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Unlimited scans</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Advanced threat intelligence</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Real-time database updates</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Browser extension</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Bulk URL scanning</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Priority support</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">API access</span>
              </li>
            </ul>
            <Button className="w-full glow-border">
              Upgrade to Pro
            </Button>
          </Card>

          <Card className="p-8 bg-card/50 backdrop-blur border-border hover:border-primary/40 transition-all">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">Custom</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Everything in Pro</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Custom threat rules</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Dedicated support team</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">SLA guarantees</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">On-premise deployment</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Team management</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full">
              Contact Sales
            </Button>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-2">99.9%</h3>
            <p className="text-muted-foreground">Threat detection accuracy</p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 text-center">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-2">&lt;100ms</h3>
            <p className="text-muted-foreground">Average scan time</p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 text-center">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-2">2M+</h3>
            <p className="text-muted-foreground">URLs scanned monthly</p>
          </Card>
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur border-primary/20 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Upgrade to Pro?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary">Advanced Protection</h3>
              <p className="text-muted-foreground mb-4">
                Pro users get access to our advanced threat intelligence database, updated in real-time with the latest phishing campaigns, malware distribution sites, and scam URLs.
              </p>
              <p className="text-muted-foreground">
                Our machine learning algorithms continuously improve detection accuracy, giving you the most up-to-date protection available.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary">Business Value</h3>
              <p className="text-muted-foreground mb-4">
                For businesses, the Pro version offers ROI through reduced security incidents. On average, our enterprise clients report a 78% reduction in successful phishing attacks.
              </p>
              <p className="text-muted-foreground">
                With API access, you can integrate LinkGuard AI into your existing security infrastructure and automate URL scanning across your organization.
              </p>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            All plans include a 14-day money-back guarantee
          </p>
          <Link to="/">
            <Button variant="outline" size="lg">
              Start with Free Version
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProVersion;
