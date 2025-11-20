import { useState } from 'react';
import { Shield, AlertTriangle, XCircle, Search, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { analyzeLink, type LinkAnalysis } from '@/utils/linkAnalyzer';
import { motion, AnimatePresence } from 'framer-motion';

export const LinkScanner = () => {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState<LinkAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleScan = () => {
    if (!url.trim()) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeLink(url);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 1200);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'safe': return 'text-success';
      case 'suspicious': return 'text-warning';
      case 'dangerous': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBgColor = (level: string) => {
    switch (level) {
      case 'safe': return 'bg-success/10 border-success/30';
      case 'suspicious': return 'bg-warning/10 border-warning/30';
      case 'dangerous': return 'bg-destructive/10 border-destructive/30';
      default: return 'bg-muted';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'safe': return <Shield className="w-16 h-16" />;
      case 'suspicious': return <AlertTriangle className="w-16 h-16" />;
      case 'dangerous': return <XCircle className="w-16 h-16" />;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="w-12 h-12 text-primary" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            LinkGuard AI
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Advanced link security analysis powered by intelligent pattern detection
        </p>
      </motion.div>

      <Card className="p-6 border-2 border-primary/20 bg-card/50 backdrop-blur-sm">
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Enter URL to scan (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleScan()}
            className="flex-1 text-lg h-14 bg-background/50 border-primary/20 focus:border-primary"
          />
          <Button
            onClick={handleScan}
            disabled={isAnalyzing || !url.trim()}
            className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            size="lg"
          >
            {isAnalyzing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Search className="w-5 h-5" />
              </motion.div>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Scan Link
              </>
            )}
          </Button>
        </div>
      </Card>

      <AnimatePresence mode="wait">
        {analysis && (
          <motion.div
            key={analysis.url}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4"
          >
            <Card className={`p-8 border-2 ${getRiskBgColor(analysis.riskLevel)}`}>
              <div className="flex items-center gap-6 mb-6">
                <div className={getRiskColor(analysis.riskLevel)}>
                  {getRiskIcon(analysis.riskLevel)}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2 capitalize">
                    {analysis.riskLevel} Link
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-background/50 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${analysis.score}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full ${
                          analysis.score >= 70
                            ? 'bg-success'
                            : analysis.score >= 40
                            ? 'bg-warning'
                            : 'bg-destructive'
                        }`}
                      />
                    </div>
                    <span className="text-2xl font-bold">{analysis.score}/100</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    URL Details
                  </h3>
                  <div className="bg-background/70 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Protocol:</span>
                      <span className="font-mono font-semibold">{analysis.details.protocol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Domain:</span>
                      <span className="font-mono font-semibold truncate max-w-[200px]">
                        {analysis.details.domain}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">TLD:</span>
                      <span className="font-mono font-semibold">{analysis.details.tld}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Path Length:</span>
                      <span className="font-mono font-semibold">{analysis.details.pathLength}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground">Risk Indicators</h3>
                  <div className="bg-background/70 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IP Address:</span>
                      <span className={analysis.details.hasIpAddress ? 'text-destructive font-semibold' : ''}>
                        {analysis.details.hasIpAddress ? 'Yes ⚠️' : 'No ✓'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Special Chars:</span>
                      <span className={analysis.details.hasSpecialChars ? 'text-warning font-semibold' : ''}>
                        {analysis.details.hasSpecialChars ? 'Excessive ⚠️' : 'Normal ✓'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subdomain:</span>
                      <span>{analysis.details.hasSubdomain ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {analysis.threats.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    Detected Threats
                  </h3>
                  <ul className="space-y-2">
                    {analysis.threats.map((threat, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2 bg-destructive/5 border border-destructive/20 rounded-lg p-3"
                      >
                        <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                        <span>{threat}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.recommendations.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Security Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                        className="flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-lg p-3"
                      >
                        <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="p-6 bg-card/30 border-primary/10">
        <h3 className="text-lg font-semibold mb-4">What We Check:</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">SSL/HTTPS</p>
              <p className="text-muted-foreground">Encrypted connections</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Domain Analysis</p>
              <p className="text-muted-foreground">TLD & structure checks</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Phishing Patterns</p>
              <p className="text-muted-foreground">Suspicious keywords</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">URL Shorteners</p>
              <p className="text-muted-foreground">Hidden destinations</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Special Characters</p>
              <p className="text-muted-foreground">Obfuscation attempts</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Homograph Attacks</p>
              <p className="text-muted-foreground">Lookalike characters</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
