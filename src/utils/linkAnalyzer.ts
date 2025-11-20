export interface LinkAnalysis {
  url: string;
  isValid: boolean;
  riskLevel: 'safe' | 'suspicious' | 'dangerous';
  score: number;
  threats: string[];
  recommendations: string[];
  details: {
    protocol: string;
    domain: string;
    hasSubdomain: boolean;
    tld: string;
    pathLength: number;
    hasSpecialChars: boolean;
    hasIpAddress: boolean;
    domainAge: string;
  };
}

const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top', '.loan', '.win', '.bid'];
const phishingKeywords = ['verify', 'account', 'secure', 'update', 'confirm', 'login', 'banking', 'suspend', 'click'];
const shortenerDomains = ['bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly'];

export const analyzeLink = (url: string): LinkAnalysis => {
  const threats: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Basic URL validation
  let parsedUrl: URL;
  try {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    parsedUrl = new URL(url);
  } catch {
    return {
      url,
      isValid: false,
      riskLevel: 'dangerous',
      score: 0,
      threats: ['Invalid URL format'],
      recommendations: ['Please enter a valid URL'],
      details: {
        protocol: '',
        domain: '',
        hasSubdomain: false,
        tld: '',
        pathLength: 0,
        hasSpecialChars: false,
        hasIpAddress: false,
        domainAge: 'Unknown',
      },
    };
  }

  const protocol = parsedUrl.protocol;
  const domain = parsedUrl.hostname;
  const path = parsedUrl.pathname + parsedUrl.search;
  const tld = '.' + domain.split('.').pop();
  const hasSubdomain = domain.split('.').length > 2;
  const pathLength = path.length;

  // Check for HTTP instead of HTTPS
  if (protocol === 'http:') {
    threats.push('Unencrypted connection (HTTP)');
    score -= 30;
    recommendations.push('Avoid entering sensitive information on HTTP sites');
  }

  // Check for IP address instead of domain
  const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  const hasIpAddress = ipPattern.test(domain);
  if (hasIpAddress) {
    threats.push('Using IP address instead of domain name');
    score -= 40;
    recommendations.push('Legitimate sites rarely use IP addresses');
  }

  // Check for suspicious TLDs
  if (suspiciousTLDs.includes(tld)) {
    threats.push(`Suspicious domain extension: ${tld}`);
    score -= 25;
    recommendations.push('This TLD is commonly used in spam and phishing');
  }

  // Check for excessive subdomains
  if (domain.split('.').length > 4) {
    threats.push('Unusually long domain with multiple subdomains');
    score -= 20;
    recommendations.push('Be cautious of domains with many subdomains');
  }

  // Check for phishing keywords
  const lowerUrl = url.toLowerCase();
  const foundKeywords = phishingKeywords.filter(keyword => lowerUrl.includes(keyword));
  if (foundKeywords.length >= 2) {
    threats.push(`Contains suspicious keywords: ${foundKeywords.join(', ')}`);
    score -= 30;
    recommendations.push('Phishing sites often use urgent language');
  }

  // Check for URL shorteners
  if (shortenerDomains.some(shortener => domain.includes(shortener))) {
    threats.push('URL shortener detected');
    score -= 15;
    recommendations.push('Shortened URLs can hide malicious destinations');
  }

  // Check for excessive special characters
  const specialCharCount = (url.match(/[-_.@]/g) || []).length;
  const hasSpecialChars = specialCharCount > 5;
  if (hasSpecialChars) {
    threats.push('Excessive special characters in URL');
    score -= 15;
    recommendations.push('Legitimate URLs typically use minimal special characters');
  }

  // Check path length
  if (pathLength > 100) {
    threats.push('Unusually long URL path');
    score -= 10;
    recommendations.push('Long URLs may be attempting to hide malicious parameters');
  }

  // Check for @ symbol (sometimes used to trick users)
  if (url.includes('@')) {
    threats.push('Contains @ symbol (potential spoofing)');
    score -= 35;
    recommendations.push('The @ symbol can be used to redirect to different domains');
  }

  // Check for homograph attacks (lookalike characters)
  const hasLookalikes = /[а-яА-Я]/u.test(domain); // Cyrillic characters
  if (hasLookalikes) {
    threats.push('Contains lookalike characters (potential homograph attack)');
    score -= 40;
    recommendations.push('Domain may be impersonating a legitimate site');
  }

  score = Math.max(0, score);

  let riskLevel: 'safe' | 'suspicious' | 'dangerous';
  if (score >= 70) riskLevel = 'safe';
  else if (score >= 40) riskLevel = 'suspicious';
  else riskLevel = 'dangerous';

  if (score >= 70) {
    recommendations.push('This link appears relatively safe, but always verify the source');
  }

  return {
    url: parsedUrl.href,
    isValid: true,
    riskLevel,
    score,
    threats,
    recommendations,
    details: {
      protocol: protocol.replace(':', ''),
      domain,
      hasSubdomain,
      tld,
      pathLength,
      hasSpecialChars,
      hasIpAddress,
      domainAge: 'Analysis based on URL structure',
    },
  };
};
