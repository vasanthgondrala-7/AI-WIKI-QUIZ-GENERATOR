# LangChain Prompt Templates

## Quiz Generation Prompt Template

This document contains the prompt templates used in the AI Wiki Quiz Generator for generating high-quality, factually accurate quizzes from Wikipedia articles.

### Main Quiz Generation Prompt

**Location:** `supabase/functions/generate-quiz/index.ts`

**Prompt Structure:**

```
You are an expert quiz generator. Create a comprehensive quiz based on the following Wikipedia article.

Article Title: {title}
Article Content: {content}

Generate a JSON quiz with the following structure:
{
  "title": "Article title",
  "summary": "A 2-3 sentence summary of the article (max 200 words)",
  "questions": [
    {
      "question": "Question text",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "answer": 0,
      "difficulty": "easy|medium|hard",
      "explanation": "Explanation of the correct answer with context from the article"
    }
  ]
}

Requirements:
1. Create 5-10 questions based on the article content
2. Mix difficulty levels: 40% easy, 40% medium, 20% hard
3. All questions MUST be directly answerable from the article content - NO HALLUCINATION
4. Include diverse question types (factual, conceptual, analytical)
5. Provide detailed explanations that reference the article
6. Ensure options are plausible and well-distributed
7. Ground all content in the actual article - cite specific facts

Quality Criteria:
- Factual Accuracy: All information must come from the article
- Relevance: Questions should cover key concepts from the article
- Clarity: Questions should be unambiguous and well-phrased
- Diversity: Cover different sections and aspects of the topic
- Explanation Quality: Explanations should educate and reference the source

Return ONLY valid JSON, no additional text.
```

### Prompt Design Principles

#### 1. Grounding in Source Material
- **Explicit Instructions:** The prompt explicitly states "All questions MUST be directly answerable from the article content - NO HALLUCINATION"
- **Source Citation:** Requires explanations to reference the article
- **Content Extraction:** Extracts actual article text to provide concrete context

#### 2. Quality Control Measures
- **Difficulty Distribution:** Specifies exact percentages (40% easy, 40% medium, 20% hard)
- **Question Diversity:** Requires different question types (factual, conceptual, analytical)
- **Option Quality:** Ensures plausible and well-distributed answer options

#### 3. Output Structure
- **JSON Schema:** Provides clear JSON structure for consistent parsing
- **Detailed Requirements:** Lists 7 specific requirements for quiz generation
- **Quality Criteria:** Defines 5 explicit quality dimensions

#### 4. Minimizing Hallucination

The prompt uses multiple techniques to prevent AI hallucination:

1. **Direct Content Inclusion:** Provides the actual article content in the prompt
2. **Explicit Warnings:** Multiple mentions of "NO HALLUCINATION" and "MUST be directly answerable"
3. **Grounding Requirements:** "Ground all content in the actual article - cite specific facts"
4. **Source-Based Explanations:** Explanations must "reference the article"
5. **Content Validation:** Only questions answerable from provided content

### Content Extraction Strategy

```typescript
// Extract title
const titleMatch = html.match(/<title>(.*?) - Wikipedia<\/title>/);
const title = titleMatch ? titleMatch[1] : 'Unknown Article';

// Extract main content from Wikipedia article body
const contentMatch = html.match(/<div[^>]*class="[^"]*mw-parser-output[^"]*"[^>]*>([\s\S]*?)<\/div>/);
let content = contentMatch ? contentMatch[1] : '';

// Clean HTML tags but preserve structure
content = content
  .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .substring(0, 8000); // Limit content to prevent token overflow
```

### Model Selection

- **Model:** `google/gemini-2.5-flash` (via Lovable AI Gateway)
- **Rationale:** 
  - Balanced performance for multimodal understanding
  - Good at structured JSON generation
  - Fast response time for user experience
  - Cost-efficient for production use

### Response Parsing

```typescript
// Extract JSON from markdown code blocks if present
let jsonMatch = aiText.match(/```json\s*([\s\S]*?)\s*```/);
if (!jsonMatch) {
  jsonMatch = aiText.match(/```\s*([\s\S]*?)\s*```/);
}

const jsonText = jsonMatch ? jsonMatch[1] : aiText;
const quizData = JSON.parse(jsonText);
```

### Error Handling Strategy

The system handles several error scenarios:

1. **Invalid URLs:** Returns 400 error for malformed Wikipedia URLs
2. **Network Failures:** Returns 500 error with descriptive message
3. **AI Service Errors:** 
   - Rate limits (429): Informs user to try again later
   - Credit exhaustion (402): Instructs to add funds
4. **Parse Errors:** Catches JSON parsing failures gracefully

### Optimization Techniques

1. **Content Limiting:** Restricts article content to 8000 characters to stay within token limits
2. **HTML Cleaning:** Removes scripts, styles, and formatting while preserving text
3. **Structured Output:** Uses JSON schema to ensure consistent, parseable responses
4. **Caching Opportunity:** Article content could be cached to prevent duplicate scraping (bonus feature)

## Future Enhancements

Potential improvements to the prompt system:

1. **Section-Based Generation:** Generate questions per article section
2. **Difficulty Calibration:** Use article complexity to adjust difficulty distribution
3. **Related Topics:** Generate follow-up topic suggestions
4. **Adaptive Questioning:** Adjust based on user performance history
5. **Multilingual Support:** Generate quizzes in multiple languages
