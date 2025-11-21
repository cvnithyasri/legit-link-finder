import { Link } from 'react-router-dom';
import { Shield, Search, AlertTriangle, CheckCircle, ArrowLeft, Lock, Globe, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const LearnMore = () => {
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
            How LinkGuard AI Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced URL security analysis powered by intelligent pattern recognition and threat detection algorithms
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all">
            <Search className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-4">URL Analysis Process</h3>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="font-bold text-primary mr-2">1.</span>
                <span>URL format validation and normalization</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-primary mr-2">2.</span>
                <span>Protocol and encryption verification (HTTPS vs HTTP)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-primary mr-2">3.</span>
                <span>Domain structure and TLD analysis</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-primary mr-2">4.</span>
                <span>Pattern matching against known threat indicators</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-primary mr-2">5.</span>
                <span>Risk score calculation and threat classification</span>
              </li>
            </ol>
          </Card>

          <Card className="p-8 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all">
            <AlertTriangle className="h-12 w-12 text-warning mb-4" />
            <h3 className="text-2xl font-bold mb-4">Threat Detection</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Suspicious TLD detection (.tk, .ml, .xyz, etc.)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Phishing keyword identification</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>URL shortener recognition</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Homograph attack detection</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>IP address usage alerts</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Special character analysis</span>
              </li>
            </ul>
          </Card>
        </div>

        <div className="space-y-8 mb-16">
          <Card className="p-8 bg-card/50 backdrop-blur border-primary/20">
            <div className="flex items-start gap-4">
              <Lock className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-4">Security Score System</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    LinkGuard AI uses a comprehensive scoring system from 0-100 to evaluate URL safety:
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
                      <p className="font-bold text-success mb-2">Safe (70-100)</p>
                      <p className="text-sm">URLs with minimal to no security concerns</p>
                    </div>
                    <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
                      <p className="font-bold text-warning mb-2">Suspicious (40-69)</p>
                      <p className="text-sm">URLs with moderate risk factors requiring caution</p>
                    </div>
                    <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                      <p className="font-bold text-destructive mb-2">Dangerous (0-39)</p>
                      <p className="text-sm">URLs with high risk - avoid clicking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card/50 backdrop-blur border-primary/20">
            <div className="flex items-start gap-4">
              <Globe className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-4">What Makes a URL Suspicious?</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong className="text-foreground">Unencrypted Connections:</strong> URLs using HTTP instead of HTTPS lack encryption</p>
                  <p><strong className="text-foreground">IP Addresses:</strong> Legitimate websites rarely use raw IP addresses instead of domain names</p>
                  <p><strong className="text-foreground">Excessive Subdomains:</strong> Multiple subdomains can indicate attempts to deceive users</p>
                  <p><strong className="text-foreground">Phishing Keywords:</strong> Words like "verify", "account", "urgent", "suspend" often indicate phishing</p>
                  <p><strong className="text-foreground">URL Shorteners:</strong> Can hide the true destination of a link</p>
                  <p><strong className="text-foreground">Lookalike Characters:</strong> Using characters from different alphabets to impersonate legitimate sites</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card/50 backdrop-blur border-primary/20">
            <div className="flex items-start gap-4">
              <Eye className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-4">Best Practices for Online Safety</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Always verify the sender before clicking links in emails or messages</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Look for HTTPS and a valid SSL certificate before entering sensitive information</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Hover over links to preview the destination URL before clicking</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Be cautious of urgent or threatening language in messages</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Use LinkGuard AI to scan suspicious URLs before visiting them</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <Link to="/">
            <Button size="lg" className="glow-border">
              Try LinkGuard AI Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
