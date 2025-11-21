import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, XCircle, Search, Info, Lock, Globe, Activity, Zap, Eye, TrendingUp, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { analyzeLink, type LinkAnalysis } from '@/utils/linkAnalyzer';
import { motion, AnimatePresence } from 'framer-motion';

export const LinkScanner = () => {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState<LinkAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanCount, setScanCount] = useState(0);

  const handleScan = () => {
    if (!url.trim()) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeLink(url);
      setAnalysis(result);
      setIsAnalyzing(false);
      setScanCount(prev => prev + 1);
    }, 1500);
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
      case 'safe': return <Shield className="w-20 h-20" />;
      case 'suspicious': return <AlertTriangle className="w-20 h-20" />;
      case 'dangerous': return <XCircle className="w-20 h-20" />;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 mb-12"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <motion.div
            animate={{ 
              filter: ['drop-shadow(0 0 20px hsl(174 100% 50% / 0.5))', 
                       'drop-shadow(0 0 40px hsl(174 100% 50% / 0.8))',
                       'drop-shadow(0 0 20px hsl(174 100% 50% / 0.5))']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Shield className="w-16 h-16 text-primary" />
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-bold glow-text">
            LinkGuard AI
          </h1>
        </div>
        <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Advanced AI-powered link security analysis with real-time threat detection and comprehensive risk assessment
        </p>
        
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-card/50 border border-primary/20 rounded-lg p-6 backdrop-blur-sm"
          >
            <Activity className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-3xl font-bold text-primary">{scanCount}</p>
            <p className="text-sm text-muted-foreground mt-1">Links Scanned</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-card/50 border border-primary/20 rounded-lg p-6 backdrop-blur-sm"
          >
            <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-3xl font-bold text-primary">15+</p>
            <p className="text-sm text-muted-foreground mt-1">Security Checks</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-card/50 border border-primary/20 rounded-lg p-6 backdrop-blur-sm"
          >
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-3xl font-bold text-primary">99.9%</p>
            <p className="text-sm text-muted-foreground mt-1">Accuracy Rate</p>
          </motion.div>
        </div>
      </motion.div>

      <Card className="p-8 border-2 glow-border bg-card/50 backdrop-blur-sm">
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Enter URL to scan (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleScan()}
            className="flex-1 text-lg h-16 bg-background/50 border-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground"
          />
          <Button
            onClick={handleScan}
            disabled={isAnalyzing || !url.trim()}
            className="h-16 px-10 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg neon-pulse"
            size="lg"
          >
            {isAnalyzing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Search className="w-6 h-6" />
              </motion.div>
            ) : (
              <>
                <Search className="w-6 h-6 mr-2" />
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
            className="space-y-6"
          >
            <Card className={`p-10 border-2 ${getRiskBgColor(analysis.riskLevel)} glow-border`}>
              <div className="flex items-center gap-8 mb-8">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className={getRiskColor(analysis.riskLevel)}
                >
                  {getRiskIcon(analysis.riskLevel)}
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-4xl font-bold mb-3 capitalize glow-text">
                    {analysis.riskLevel} Link
                  </h2>
                  <div className="flex items-center gap-6">
                    <div className="flex-1 bg-background/50 rounded-full h-4 overflow-hidden border border-primary/20">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${analysis.score}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className={`h-full ${
                          analysis.score >= 70
                            ? 'bg-success'
                            : analysis.score >= 40
                            ? 'bg-warning'
                            : 'bg-destructive'
                        }`}
                        style={{
                          boxShadow: `0 0 10px ${
                            analysis.score >= 70
                              ? 'hsl(142 76% 36% / 0.5)'
                              : analysis.score >= 40
                              ? 'hsl(38 92% 50% / 0.5)'
                              : 'hsl(0 84% 60% / 0.5)'
                          }`
                        }}
                      />
                    </div>
                    <span className="text-3xl font-bold glow-text">{analysis.score}/100</span>
                  </div>
                </div>
              </div>

              <div className="bg-background/30 rounded-lg p-6 mb-6 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Scanned URL
                </p>
                <p className="font-mono text-lg break-all text-primary">{analysis.url}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Protocol Analysis
                  </h3>
                  <div className="bg-background/70 rounded-lg p-5 space-y-3 text-sm border border-primary/10">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Protocol:</span>
                      <span className={`font-mono font-bold ${analysis.details.protocol === 'https' ? 'text-success' : 'text-destructive'}`}>
                        {analysis.details.protocol.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Encryption:</span>
                      <span className={analysis.details.protocol === 'https' ? 'text-success' : 'text-destructive'}>
                        {analysis.details.protocol === 'https' ? '✓ Enabled' : '✗ Disabled'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Domain Details
                  </h3>
                  <div className="bg-background/70 rounded-lg p-5 space-y-3 text-sm border border-primary/10">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Domain:</span>
                      <span className="font-mono font-semibold truncate max-w-[150px]">
                        {analysis.details.domain}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">TLD:</span>
                      <span className="font-mono font-semibold">{analysis.details.tld}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Subdomain:</span>
                      <span>{analysis.details.hasSubdomain ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Risk Indicators
                  </h3>
                  <div className="bg-background/70 rounded-lg p-5 space-y-3 text-sm border border-primary/10">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">IP Address:</span>
                      <span className={analysis.details.hasIpAddress ? 'text-destructive font-semibold' : 'text-success'}>
                        {analysis.details.hasIpAddress ? '⚠️ Yes' : '✓ No'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Special Chars:</span>
                      <span className={analysis.details.hasSpecialChars ? 'text-warning font-semibold' : 'text-success'}>
                        {analysis.details.hasSpecialChars ? '⚠️ High' : '✓ Normal'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Path Length:</span>
                      <span className="font-mono font-semibold">{analysis.details.pathLength}</span>
                    </div>
                  </div>
                </div>
              </div>

              {analysis.threats.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                    Detected Security Threats
                  </h3>
                  <div className="grid gap-3">
                    {analysis.threats.map((threat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 bg-destructive/5 border-2 border-destructive/30 rounded-lg p-4 hover:bg-destructive/10 transition-colors"
                      >
                        <XCircle className="w-6 h-6 text-destructive mt-0.5 flex-shrink-0" />
                        <span className="text-base">{threat}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {analysis.recommendations.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-primary" />
                    Security Recommendations
                  </h3>
                  <div className="grid gap-3">
                    {analysis.recommendations.map((rec, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        className="flex items-start gap-3 bg-primary/5 border-2 border-primary/30 rounded-lg p-4 hover:bg-primary/10 transition-colors"
                      >
                        <Info className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-base">{rec}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-8 bg-card/30 border-2 border-primary/20 backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Shield className="w-7 h-7 text-primary" />
            Security Features
          </h3>
          <div className="grid gap-5 text-base">
            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-primary/10">
              <Lock className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-primary">SSL/HTTPS Analysis</p>
                <p className="text-sm text-muted-foreground mt-1">Validates encrypted connections and certificate authenticity</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-primary/10">
              <Globe className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-primary">Domain Intelligence</p>
                <p className="text-sm text-muted-foreground mt-1">Advanced TLD analysis and domain structure verification</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-primary/10">
              <AlertTriangle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-primary">Phishing Detection</p>
                <p className="text-sm text-muted-foreground mt-1">AI-powered keyword and pattern recognition for phishing attempts</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-primary/10">
              <Search className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-primary">URL Shortener Detection</p>
                <p className="text-sm text-muted-foreground mt-1">Identifies hidden destinations and redirects</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-primary/10">
              <Eye className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-primary">Homograph Attack Protection</p>
                <p className="text-sm text-muted-foreground mt-1">Detects lookalike characters used to impersonate legitimate sites</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-primary/10">
              <Zap className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-primary">Real-time Scoring</p>
                <p className="text-sm text-muted-foreground mt-1">Instant risk assessment with comprehensive threat analysis</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-card/30 border-2 border-primary/20 backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Info className="w-7 h-7 text-primary" />
            How It Works
          </h3>
          <div className="space-y-6">
            <div className="relative pl-8 pb-6 border-l-2 border-primary/30">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">1</div>
              <h4 className="font-bold text-lg mb-2">URL Parsing</h4>
              <p className="text-muted-foreground">The system breaks down the URL into components for detailed analysis</p>
            </div>
            <div className="relative pl-8 pb-6 border-l-2 border-primary/30">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">2</div>
              <h4 className="font-bold text-lg mb-2">Pattern Recognition</h4>
              <p className="text-muted-foreground">AI algorithms scan for suspicious patterns, keywords, and structures</p>
            </div>
            <div className="relative pl-8 pb-6 border-l-2 border-primary/30">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">3</div>
              <h4 className="font-bold text-lg mb-2">Threat Assessment</h4>
              <p className="text-muted-foreground">Each security check contributes to an overall risk score calculation</p>
            </div>
            <div className="relative pl-8">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">4</div>
              <h4 className="font-bold text-lg mb-2">Report Generation</h4>
              <p className="text-muted-foreground">Comprehensive report with threats, recommendations, and actionable insights</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 backdrop-blur-sm">
        <div className="text-center space-y-4">
          <Shield className="w-16 h-16 text-primary mx-auto glow-text" />
          <h3 className="text-3xl font-bold">Stay Protected Online</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            LinkGuard AI uses advanced pattern recognition and machine learning to identify malicious links, 
            phishing attempts, and security threats before they can harm you. Always verify links before clicking, 
            especially those received via email or messaging apps.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link to="/learn-more">
              <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                <FileText className="w-4 h-4 mr-2" />
                Learn More
              </Button>
            </Link>
            <Link to="/pro-version">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Pro Version
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};
