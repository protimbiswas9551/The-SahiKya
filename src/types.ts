export type VerdictType = 'True' | 'False' | 'Misleading' | 'Unverifiable';

export interface SourceItem {
  title: string;
  url: string;
  domain_tier: 1 | 2 | 3;
  publisher?: string;
  snippet?: string;
  published_date?: string;
}

export interface KeyEvidence {
  point: string;
  type: 'supporting' | 'refuting' | 'context';
  source_title?: string;
}

export interface FactCheckResult {
  claim_analyzed: string;
  verdict: VerdictType;
  truth_percentage: number;
  reasoning: string;
  dependency_analysis: string;
  sources: SourceItem[];
  key_evidence?: KeyEvidence[];
  bias_rating?: string;
  investigative_summary?: string;
  timestamp?: string;
  search_method_used?: string;
}

export interface VerificationRequest {
  text: string;
  url?: string;
  depth?: 'standard' | 'deep';
  useTavily?: boolean;
}

export interface SampleClaim {
  id: string;
  category: 'Science' | 'Politics' | 'Economy' | 'Health' | 'Tech' | 'Viral Myth';
  claim: string;
  context: string;
}
