import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Helper: Normalize claim string
function normalizeClaimKey(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper: Categorize domain tier for citations
function categorizeDomainTier(urlStr: string, title?: string): number {
  try {
    const domain = new URL(urlStr).hostname.toLowerCase();
    const tier1 = [
      'reuters.com', 'apnews.com', 'afp.com', 'bbc.com', 'bbc.co.uk',
      'nature.com', 'science.org', 'nasa.gov', 'federalreserve.gov',
      'cdc.gov', 'who.int', 'un.org', 'nih.gov', 'factcheck.org',
      'politifact.com', 'snopes.com', 'bloomberg.com',
    ];
    const tier2 = [
      'nytimes.com', 'washingtonpost.com', 'theguardian.com', 'wsj.com',
      'forbes.com', 'cnbc.com', 'cnn.com', 'nbcnews.com', 'cbsnews.com',
      'abcnews.go.com', 'indianexpress.com', 'thehindu.com', 'ndtv.com',
      'timesofindia.indiatimes.com', 'hindustantimes.com',
    ];

    if (tier1.some((d) => domain.includes(d))) return 1;
    if (tier2.some((d) => domain.includes(d))) return 2;
    return 3;
  } catch {
    return 3;
  }
}

// -------------------------------------------------------------
// STEP 1: Deep Real-Time Live Web Search via Tavily API
// -------------------------------------------------------------
async function fetchTavilySearch(query: string, customApiKey?: string) {
  const apiKey = customApiKey || process.env.TAVILY_API_KEY;
  if (!apiKey) return [];

  try {
    console.log(`[Tavily Engine] Searching live web for: "${query.slice(0, 60)}"...`);
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        search_depth: 'advanced',
        include_answer: true,
        include_raw_content: false,
        max_results: 7,
      }),
    });

    if (!response.ok) {
      console.warn(`[Tavily Engine] Returned status ${response.status}`);
      return [];
    }

    const data: any = await response.json();
    console.log(`[Tavily Engine] Retrieved ${data?.results?.length || 0} live news & wire citations.`);
    return data.results || [];
  } catch (error) {
    console.warn('[Tavily Engine] Network search failed:', error);
    return [];
  }
}

// -------------------------------------------------------------
// STEP 2: Multi-Model Fact Verification & Synthesis
// -------------------------------------------------------------
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
  });
}

// 1. Try Grok (xAI) if team key has active balance
async function verifyWithGrok(rawClaim: string, searchContext: string, urlContext?: string) {
  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) throw new Error('GROK_API_KEY is not set');

  const systemPrompt = `You are a senior chief fact-checker and investigative journalist.
Investigate the claim using live evidence and verified world knowledge.

Output Schema (Valid JSON only):
- claim_analyzed: Concise extracted claim.
- verdict: "True", "False", "Misleading", or "Unverifiable".
- truth_percentage: Float from 0.0 (100% False / Hoax) to 100.0 (100% True / Verified).
  * If True: 100.0
  * If False: 0.0
  * If Misleading: 50.0
- reasoning: 3 to 5 sentence detailed Editorial Board Reasoning paragraph. State verified facts, dates, names, official statements.
- dependency_analysis: Credibility evaluation of available wire sources.
- sources: Array of [{ title, url, domain_tier (1|2|3), snippet }]
- key_evidence: Array of [{ point, type: "supporting"|"refuting"|"context", source_title }]
- bias_rating: Nature of claim (e.g. "Verified Fact", "Refuted Hoax").`;

  const userPrompt = `Claim to Verify: "${rawClaim}"
${urlContext ? `URL Context: ${urlContext}` : ''}
${searchContext ? `Live Web Wire Findings:\n${searchContext}` : ''}`;

  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'grok-2-latest',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`xAI Grok (${response.status}): ${errText}`);
  }

  const data: any = await response.json();
  const rawContent = data.choices?.[0]?.message?.content || '{}';
  return JSON.parse(rawContent);
}

// 2. High-Precision Gemini Fact Verification (Primary & Fallback Engine)
async function verifyWithGemini(rawClaim: string, searchContext: string, urlContext?: string) {
  const ai = getGeminiClient();
  const systemInstruction = `You are a world-class chief investigative journalist and senior fact-checker.
Your mandate is to cross-examine claims strictly against current verified web evidence, primary documentation, and Tier-1 wire services (Reuters, AP, AFP, BBC, scientific journals, government registries).

CRITICAL FACT-CHECKING RULES:
1. claim_analyzed: Extract and specify the single core factual proposition being investigated.
2. Objectivity: Impartial, balanced, evidence-based reasoning without editorializing.
3. verdict & truth_percentage ALIGNMENT (CRITICAL):
   - "True": truth_percentage MUST be 100.0 (or 85.0 to 100.0).
   - "False": truth_percentage MUST be 0.0 (or 0.0 to 15.0).
   - "Misleading": truth_percentage between 25.0 and 74.0.
   - "Unverifiable": truth_percentage 50.0.
4. reasoning: A thorough, multi-sentence Editorial Board Reasoning paragraph (at least 3–5 sentences). It must explicitly state:
   - What the core claim is and whether it is verified true or a debunked falsehood.
   - Specific verified facts, names, dates, official statements, or law/science citations that prove or refute the claim.
   - Clear context explaining WHY the rumor or claim originated or how it is contradicted by primary records.
5. dependency_analysis: Evaluation of wire source credibility.
6. sources: List of 3-6 cited sources with title, url, domain_tier (1 for primary/wire, 2 for mainstream, 3 for blogs/social), and snippet.
7. key_evidence: 2 to 4 bullet points with point, type ("supporting"|"refuting"|"context"), and optional source_title.
8. bias_rating: Nature of claim (e.g., "Factually Verified", "Fabricated Rumor", "Partisan Misinformation").

Output format MUST be valid JSON only matching the schema described.`;

  const prompt = `Claim / Headline to Verify: "${rawClaim}"
${urlContext ? `Reference URL: ${urlContext}` : ''}
${searchContext ? `\n--- LIVE WEB WIRE SEARCH EVIDENCE ---\n${searchContext}` : ''}

Investigate this claim right now using live search findings and verified world facts. Extract the single core claim into claim_analyzed and produce the complete fact-checking report as JSON.`;

  console.log('[Gemini Engine] Synthesizing live wire fact check report...');
  
  // Try active Gemini models with search tools enabled
  const models = ['gemini-3.6-flash', 'gemini-3.1-pro-preview'];
  let lastErr: any = null;

  for (const model of models) {
    try {
      const response: any = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
          responseMimeType: 'application/json',
        },
      });

      let rawOutput = response.text || '{}';
      rawOutput = rawOutput.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);
      if (jsonMatch) rawOutput = jsonMatch[0];

      const parsed = JSON.parse(rawOutput);

      // Extract Google Grounding web sources if available
      const googleSearchSources: any[] = [];
      const groundingChunks = (response as any).candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      if (Array.isArray(groundingChunks)) {
        for (const chunk of groundingChunks) {
          if (chunk?.web?.uri) {
            const uri = chunk.web.uri;
            const title = chunk.web.title || 'Verified Citation';
            let hostname = '';
            try { hostname = new URL(uri).hostname.replace('www.', ''); } catch { hostname = uri; }
            googleSearchSources.push({
              title,
              url: uri,
              publisher: hostname,
              domain_tier: categorizeDomainTier(uri, title),
              snippet: 'Retrieved via Google Search Grounding',
            });
          }
        }
      }

      parsed.googleSources = googleSearchSources;
      return parsed;
    } catch (err: any) {
      lastErr = err;
      console.warn(`[Gemini Engine] Model ${model} search failed, trying next fallback...`, err?.message || err);
    }
  }

  // Final fallback without googleSearch tool if tool rate limited
  const fallbackResponse: any = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
    },
  });

  let rawOutput = fallbackResponse.text || '{}';
  rawOutput = rawOutput.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
  const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);
  return JSON.parse(jsonMatch ? jsonMatch[0] : rawOutput);
}

// Preset sample claims
const SAMPLE_CLAIMS = [
  {
    id: 'sample-1',
    category: 'Science',
    claim: 'NASA James Webb Space Telescope detected atmospheric water vapor on habitable zone exoplanet LHS 1140 b.',
    context: 'Recent astrophysical publications discussing potential habitable worlds within 50 light years.',
  },
  {
    id: 'sample-2',
    category: 'Economy',
    claim: 'The Federal Reserve announced an emergency policy to completely phase out physical US cash by December 2026.',
    context: 'Viral social media claims about central bank digital currencies (CBDCs) replacing paper dollar bills.',
  },
  {
    id: 'sample-3',
    category: 'Health',
    claim: 'Drinking raw celery juice every morning permanently reverses type 1 and type 2 diabetes with zero insulin needed.',
    context: 'Alternative medicine wellness video circulating on TikTok and Instagram.',
  },
  {
    id: 'sample-4',
    category: 'Tech',
    claim: 'OpenAI and Microsoft signed an agreement to deploy self-replicating military autonomous drone swarms.',
    context: 'Speculative defense technology blog post regarding AI partnerships.',
  },
];

// API: Sample claims
app.get('/api/sample-claims', (req, res) => {
  res.json({ samples: SAMPLE_CLAIMS });
});

// API: Main Fact-checking Endpoint
app.post('/api/verify', async (req, res) => {
  try {
    const { text, url, customTavilyKey } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Please enter a valid statement, news excerpt, or claim to verify.' });
    }

    const rawInput = text.trim();

    // 1. Fetch Real-Time Live Web Evidence via Tavily Search
    const tavilyResults = await fetchTavilySearch(rawInput, customTavilyKey);
    let tavilyContext = '';
    const webSources: any[] = [];

    if (tavilyResults && tavilyResults.length > 0) {
      tavilyContext = tavilyResults
        .map((r: any, i: number) => `[Source ${i + 1}] ${r.title} (${r.url})\n${r.content || ''}`)
        .join('\n\n');

      tavilyResults.forEach((r: any) => {
        webSources.push({
          title: r.title || 'Verified Wire Source',
          url: r.url,
          publisher: (function () {
            try { return new URL(r.url).hostname.replace('www.', ''); } catch { return 'Wire News'; }
          })(),
          domain_tier: categorizeDomainTier(r.url, r.title),
          snippet: r.content ? r.content.slice(0, 280) : '',
        });
      });
    }

    // 2. Perform Investigation via Grok (if account active) or Gemini Deep Search Engine
    let parsedResult: any = null;
    let engineUsed = 'Live Web Search + Gemini Grounding Engine';

    if (process.env.GROK_API_KEY) {
      try {
        parsedResult = await verifyWithGrok(rawInput, tavilyContext, url);
        engineUsed = 'xAI Grok Neural Intelligence + Tavily Web Search';
      } catch (grokErr: any) {
        console.warn('[System Notice] xAI Grok API unverified/unfunded, seamlessly executing Gemini Grounding Engine:', grokErr?.message);
        parsedResult = await verifyWithGemini(rawInput, tavilyContext, url);
        engineUsed = 'Gemini Google Search Grounding + Tavily Live Wire';
      }
    } else {
      parsedResult = await verifyWithGemini(rawInput, tavilyContext, url);
      engineUsed = 'Gemini Google Search Grounding + Tavily Live Wire';
    }

    // 3. Enforce strict truth percentage and verdict alignment
    const validVerdicts = ['True', 'False', 'Misleading', 'Unverifiable'];
    let finalVerdict = parsedResult.verdict || 'Unverifiable';
    if (!validVerdicts.includes(finalVerdict)) {
      finalVerdict = 'Unverifiable';
    }

    let truthPct = 50.0;
    if (typeof parsedResult.truth_percentage === 'number') {
      truthPct = Math.round(parsedResult.truth_percentage * 10) / 10;
    } else if (typeof parsedResult.truth_percentage === 'string') {
      const p = parseFloat(parsedResult.truth_percentage);
      truthPct = isNaN(p) ? 50.0 : Math.round(p * 10) / 10;
    }

    // Direct synchronization: 100% True vs 0% False
    if (finalVerdict === 'True') {
      truthPct = 100.0;
    } else if (finalVerdict === 'False') {
      truthPct = 0.0;
    }

    // 4. Combine and deduplicate citations
    const googleSources = parsedResult.googleSources || [];
    const allSources = [...(parsedResult.sources || []), ...webSources, ...googleSources];
    const seenUrls = new Set<string>();
    const deduplicatedSources: any[] = [];

    for (const src of allSources) {
      if (!src || !src.url) continue;
      const normalizedUrl = src.url.trim().toLowerCase();
      if (!seenUrls.has(normalizedUrl)) {
        seenUrls.add(normalizedUrl);
        deduplicatedSources.push({
          title: src.title || 'Investigative Citation',
          url: src.url,
          domain_tier: src.domain_tier || categorizeDomainTier(src.url, src.title),
          publisher: src.publisher || (function () {
            try { return new URL(src.url).hostname.replace('www.', ''); } catch { return 'News Outlet'; }
          })(),
          snippet: src.snippet || '',
        });
      }
    }

    const finalResponse = {
      claim_analyzed: parsedResult.claim_analyzed || rawInput,
      verdict: finalVerdict,
      truth_percentage: truthPct,
      reasoning: parsedResult.reasoning || 'Investigation concluded based on verified wire records.',
      dependency_analysis: parsedResult.dependency_analysis || 'Corroborated across primary news databases and wire registries.',
      sources: deduplicatedSources.slice(0, 8),
      key_evidence: parsedResult.key_evidence || [],
      bias_rating: parsedResult.bias_rating || (finalVerdict === 'True' ? 'Verified News Fact' : 'Refuted Assertion'),
      timestamp: new Date().toISOString(),
      search_method_used: engineUsed,
    };

    console.log(`[Verdict Renders Cleanly]: ${finalVerdict} (${truthPct}%) via ${engineUsed}`);
    return res.json(finalResponse);
  } catch (error: any) {
    console.error('[Fact-Checking Error]:', error);
    return res.status(500).json({
      error: error?.message || 'An error occurred while verifying the claim. Please try again.',
    });
  }
});

// Vite middleware or static serving
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fact-checking server running at http://0.0.0.0:${PORT}`);
  });
}

start();
