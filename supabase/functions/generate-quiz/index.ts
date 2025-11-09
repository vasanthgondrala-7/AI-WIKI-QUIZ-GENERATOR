import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url: wikipediaUrl } = await req.json();
    console.log('Generating quiz for URL:', wikipediaUrl);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Fetch Wikipedia article content
    const wikiResponse = await fetch(wikipediaUrl);
    const html = await wikiResponse.text();
    
    // Extract title from HTML
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1].replace(' - Wikipedia', '') : 'Unknown Article';
    
    // Extract main content (simplified extraction)
    const contentMatch = html.match(/<p[^>]*>(.*?)<\/p>/gs);
    const textContent = contentMatch 
      ? contentMatch.slice(0, 20).map(p => p.replace(/<[^>]+>/g, '')).join(' ').slice(0, 5000)
      : '';

    console.log('Extracted title:', title);
    console.log('Content length:', textContent.length);

    // Generate quiz using AI
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are an educational quiz generator. Generate exactly 5-10 multiple choice questions based on the provided article. Return ONLY valid JSON with no additional text.",
          },
          {
            role: "user",
            content: `Generate a quiz from this Wikipedia article about "${title}":\n\n${textContent}\n\nReturn a JSON object with this exact structure:
{
  "title": "${title}",
  "summary": "brief 2-3 sentence summary",
  "key_entities": {
    "people": ["person1", "person2"],
    "organizations": ["org1"],
    "locations": ["location1"]
  },
  "quiz": [
    {
      "question": "question text",
      "options": ["option A", "option B", "option C", "option D"],
      "answer": "correct option",
      "difficulty": "easy|medium|hard",
      "explanation": "why this is correct"
    }
  ],
  "related_topics": ["topic1", "topic2", "topic3"]
}`,
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI Gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices?.[0]?.message?.content;
    
    console.log('AI Response received');

    // Parse the JSON response
    let quizData;
    try {
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      quizData = JSON.parse(jsonMatch ? jsonMatch[0] : aiContent);
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      throw new Error('Failed to parse quiz data from AI response');
    }

    // Return quiz data directly without authentication or database
    return new Response(
      JSON.stringify({ 
        quiz: { id: crypto.randomUUID() },
        quizData 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-quiz:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
