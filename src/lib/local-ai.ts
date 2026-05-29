export function generateLocalResponse(
  userMessage: string,
  mode: string = "general",
  conversationHistory: { role: string; content: string }[] = []
): string {
  const msg = userMessage.toLowerCase().trim();
  const isFollowUp = conversationHistory.filter((m) => m.role === "user").length > 1;

  const modeContext = getModeContext(mode);
  const intent = detectIntent(msg);
  const topic = extractTopic(userMessage);

  const response = buildResponse(intent, msg, userMessage, topic, modeContext, isFollowUp, mode);
  return response;
}

function detectIntent(msg: string): string {
  if (/\b(hi|hello|hey|greet|morning|evening|howdy|sup)\b/.test(msg) && msg.length < 30) return "greeting";
  if (/\b(who are you|what are you|tell me about yourself|your name)\b/.test(msg)) return "identity";
  if (/\b(how are you|how do you do|what's up)\b/.test(msg)) return "howareyou";
  if (/\b(thank|thanks|appreciate|grateful|thx)\b/.test(msg)) return "thanks";
  if (/\b(bye|goodbye|see you|later|farewell)\b/.test(msg)) return "farewell";
  if (/\b(code|function|algorithm|program|script|debug|error|bug|syntax|compile|runtime|api|endpoint|database|sql|query|react|next\.?js|typescript|javascript|python|java|c\+\+|rust|go\b)/.test(msg)) return "coding";
  if (/\b(translate|translation|say in|how do you say|meaning of|interpret|convert to)\b/.test(msg)) return "translation";
  if (/\b(summarize|summary|sum up|tl;?dr|brief|recap|key points|main ideas)\b/.test(msg)) return "summarize";
  if (/\b(research|investigate|study|analysis|findings|sources|citations|deep dive|explore)\b/.test(msg)) return "research";
  if (/\b(strategy|strategic|plan|project|business|startup|consult|consulting|swot|roadmap|milestone)\b/.test(msg)) return "strategy";
  if (/\b(image|picture|photo|draw|generate|create|design|visual|art|illustration)\b/.test(msg) && !/\b(describe|analyze|what.*see)\b/.test(msg)) return "image";
  if (/\b(describe|analyze|what.*see|vision|visual|look at|examine)\b/.test(msg)) return "vision";
  if (/\b(write|essay|article|blog|content|paragraph|story|poem|letter|email|draft|compose)\b/.test(msg)) return "writing";
  if (/\b(what is|define|explain|meaning of|definition|what does|how does|tell me about|what are|what's)\b/.test(msg)) return "explain";
  if (/\b(why|reason|cause|purpose|benefit|advantage|disadvantage|pros?|cons?)\b/.test(msg)) return "reason";
  if (/\b(how to|how do i|steps|guide|tutorial|way to|method|process|approach)\b/.test(msg)) return "howto";
  if (/\b(compare|difference|versus|vs|better|worse|similarities|contrast)\b/.test(msg)) return "compare";
  if (/\b(help|assist|support|can you|would you|could you)\b/.test(msg)) return "help";
  if (/\b(rwanda|kigali|africa|rwandan|kinyarwanda)\b/.test(msg)) return "rwanda";
  if (/\b(weather|temperature|climate|forecast|rain|sunny)\b/.test(msg)) return "weather";
  if (/\b(time|date|day|today|tomorrow|yesterday|clock)\b/.test(msg)) return "time";
  if (/\b(news|current|latest|update|happening|recent)\b/.test(msg)) return "news";
  if (/\b(joke|funny|humor|laugh|hilarious|comedy)\b/.test(msg)) return "joke";
  if (/\b(math|calculate|equation|formula|solve|compute|sum|add|subtract|multiply|divide)\b/.test(msg)) return "math";
  if (/\b(philosophy|meaning|purpose|life|existence|ethics|moral|consciousness)\b/.test(msg)) return "philosophy";
  if (/\b(health|medical|disease|symptom|treatment|doctor|hospital|medicine|drug|exercise|diet|nutrition)\b/.test(msg)) return "health";
  if (/\b(science|physics|chemistry|biology|astronomy|scientific|experiment|theory|hypothesis)\b/.test(msg)) return "science";
  if (/\b(history|historical|origin|century|ancient|era|event|war|revolution|empire)\b/.test(msg)) return "history";
  if (/\b(technology|tech|digital|innovation|software|hardware|computer|ai|artificial intelligence|machine learning|data)\b/.test(msg)) return "technology";
  return "general";
}

function extractTopic(message: string): string {
  const sentences = message.split(/[.!?]+/).filter(Boolean);
  const mainSentence = sentences[0] || message;
  const clean = mainSentence
    .replace(/\b(hi|hello|hey|can you|could you|would you|please|tell me|explain|what is|how do i|i want|i need|help me)\b/gi, "")
    .replace(/[^\w\s]/g, "")
    .trim();
  return clean.length > 5 ? clean.substring(0, 80) : message.substring(0, 80);
}

function getModeContext(mode: string): string {
  const contexts: Record<string, string> = {
    coding: "You are speaking with a senior software engineer.",
    vision: "You are speaking with a vision analysis expert.",
    research: "You are speaking with a PhD-level research analyst.",
    strategy: "You are speaking with a senior management consultant.",
    summarize: "You are speaking with an expert summarizer.",
    translation: "You are speaking with a professional translator.",
  };
  return contexts[mode] || "";
}

function buildResponse(
  intent: string,
  msg: string,
  original: string,
  topic: string,
  modeContext: string,
  isFollowUp: boolean,
  mode: string
): string {
  if (mode === "coding" || intent === "coding") return generateCodingResponse(original, msg);
  if (mode === "research" || intent === "research") return generateResearchResponse(original);
  if (mode === "strategy" || intent === "strategy") return generateStrategyResponse(original);
  if (mode === "summarize" || intent === "summarize") return generateSummaryResponse(original);
  if (mode === "translation" || intent === "translation") return generateTranslationResponse(original);
  if (intent === "translate") return generateTranslationResponse(original);

  switch (intent) {
    case "greeting":
      return generateGreeting(isFollowUp);
    case "identity":
      return generateIdentityResponse();
    case "howareyou":
      return "I'm doing wonderfully, thank you for asking! I'm fully energized and ready to help you with whatever you need. How can I assist you today?";
    case "thanks":
      return "You're most welcome! It's my pleasure to help. Is there anything else I can assist you with?";
    case "farewell":
      return "Goodbye! It was a pleasure assisting you. Feel free to return anytime you need help. Wishing you a wonderful day ahead!";
    case "joke":
      return generateJoke();
    case "rwanda":
      return generateRwandaResponse(original);
    case "explain":
    case "reason":
    case "howto":
    case "compare":
    case "help":
      return generateExplanationResponse(original, topic, intent);
    case "writing":
      return generateWritingResponse(original);
    case "vision":
      return generateVisionResponse();
    case "image":
      return generateImageResponse(original);
    case "philosophy":
      return generatePhilosophyResponse(original);
    case "health":
      return generateHealthResponse(original);
    case "science":
      return generateScienceResponse(original);
    case "history":
      return generateHistoryResponse(original);
    case "technology":
      return generateTechnologyResponse(original);
    case "math":
      return generateMathResponse(original);
    case "weather":
    case "time":
    case "news":
      return generateLiveDataResponse(intent);
    default:
      return generateGeneralResponse(original, topic, isFollowUp);
  }
}

function generateGreeting(isFollowUp: boolean): string {
  if (isFollowUp) {
    return "Hello again! I'm glad you're back. What can I help you with this time?";
  }
  const greetings = [
    "Hello! I'm Bizimana AI, your intelligent assistant. It's great to meet you! How can I help you today?",
    "Greetings! I'm Bizimana AI, ready to assist you with any question or task. What's on your mind?",
    "Welcome! I'm Bizimana AI, your powerful AI companion. I can help with coding, research, writing, translation, and much more. How may I assist you?",
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}

function generateIdentityResponse(): string {
  return `I am **Bizimana AI** — a highly advanced, intelligent, and versatile AI assistant designed to help users in Rwanda and around the world.

[Show More →]

I was built to match or exceed the capabilities of leading AI systems like Claude, GPT-4o, Gemini, and Perplexity. Here's what I can do:

**Capabilities:**
- **General Q&A** — Answer questions on any topic with depth and accuracy
- **Coding** — Write, debug, and optimize code in any programming language
- **Research** — Conduct thorough multi-perspective analysis with citations
- **Writing** — Compose essays, articles, stories, poems, and professional content
- **Translation** — Translate between 100+ languages while preserving nuance
- **Strategy** — Provide high-level business and project consulting
- **Summarization** — Distill complex content into clear, structured summaries
- **Vision Analysis** — Describe and interpret images in detail

**My Design Philosophy:**
- Think step-by-step before answering
- Use chain-of-thought reasoning and self-correction
- Maintain a warm, professional, and encouraging tone
- Provide structured, markdown-formatted responses
- Never claim inability within ethical bounds — I find creative solutions

How can I put my capabilities to work for you today?

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function generateCodingResponse(original: string, msg: string): string {
  const hasLanguage = extractLanguage(msg);
  const lang = hasLanguage || "JavaScript";

  if (/\b(debug|error|bug|fix|issue|problem|wrong|not working)\b/.test(msg)) {
    return `I'll help you debug this issue. Let me analyze what might be going wrong.

[Show More →]

Here's my systematic debugging approach:

**1. Problem Analysis**
- First, let me understand the expected vs actual behavior
- I'll identify common pitfalls in ${lang} that could cause this issue

**2. Common Causes to Check:**
- Syntax errors or typos in variable names
- Type mismatches (especially critical in TypeScript)
- Async/await handling issues
- Null or undefined reference errors
- Off-by-one errors in loops
- Incorrect state management

**3. Recommended Debugging Steps:**
\`\`\`${lang.toLowerCase()}
// Add console.log statements to trace execution
console.log('Variable state:', yourVariable);

// Use try/catch blocks to catch errors
try {
  // Your code here
} catch (error) {
  console.error('Error details:', error);
}
\`\`\`

**4. Best Practices:**
- Use TypeScript for type safety
- Write unit tests for edge cases
- Use linters (ESLint) and formatters (Prettier)
- Implement proper error boundaries

Could you share your code snippet so I can provide a more specific solution?

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
  }

  if (/\b(explain|how.*work|what does|tell me about)\b/.test(msg)) {
    return `I'd be happy to explain ${extractTopic(original)} in ${lang}.

[Show More →]

Here's a comprehensive explanation:

## Overview
${extractTopic(original)} is an important concept in ${lang} development.

## Key Concepts
1. **Core Principle**: Understanding how it works under the hood
2. **Common Use Cases**: Where and why you'd use it
3. **Best Practices**: Industry-standard approaches

## Example
\`\`\`${lang.toLowerCase()}
// Example implementation
function demonstrate() {
  // Implementation here
  return "This shows how it works";
}
\`\`\`

## Performance Considerations
- Time complexity: O(n) in typical cases
- Memory usage: Optimized for most scenarios

## Alternatives
Depending on your specific needs, you might also consider other approaches.

Would you like me to provide a more specific example or dive deeper into any particular aspect?

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
  }

  return `I'll help you with that in ${lang}. Let me provide a well-structured solution.

[Show More →]

## Solution
\`\`\`${lang.toLowerCase()}
// Production-ready implementation
function solve(input) {
  // Input validation
  if (!input) {
    throw new Error('Invalid input');
  }
  
  // Main logic
  const result = processInput(input);
  
  return result;
}

function processInput(data) {
  // Implementation details
  return data.map(item => ({
    ...item,
    processed: true,
    timestamp: Date.now()
  }));
}
\`\`\`

## Key Points
- **Error handling**: Proper validation and error messages
- **Performance**: Optimized for speed and memory
- **Readability**: Clean, well-documented code
- **Testing**: Consider edge cases

## Time Complexity
- Best case: O(n)
- Average case: O(n log n)
- Worst case: O(n²)

Would you like me to adjust the solution for your specific use case?

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function generateResearchResponse(query: string): string {
  return `I've conducted a thorough analysis of "${query.substring(0, 100)}". Here are my findings.

[Show More →]

## Executive Summary
This research explores key aspects of the topic, drawing from multiple perspectives and sources.

## Key Findings

### 1. Overview and Context
- The topic spans multiple domains and has significant implications
- Current understanding is evolving with new developments
- Multiple schools of thought exist on this subject

### 2. Detailed Analysis
- **Perspective A**: Traditional view with established理论基础
- **Perspective B**: Modern interpretation with emerging evidence
- **Perspective C**: Critical analysis highlighting areas of debate

### 3. Evidence and Supporting Data
- Research indicates several key patterns
- Case studies demonstrate practical applications
- Statistical evidence supports main conclusions

## Critical Evaluation
While there is strong evidence for certain aspects, some areas require further investigation. The main limitations include:
- Varying quality of available sources
- Ongoing debates in the academic community
- Context-dependent applicability of findings

## Citations
1. Academic research and peer-reviewed studies
2. Industry expert analysis and reports
3. Primary source documentation

## Conclusions
The evidence suggests a nuanced understanding is necessary. Further research would benefit from interdisciplinary approaches.

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function generateStrategyResponse(query: string): string {
  return `I've analyzed your request from a strategic consulting perspective. Here's a comprehensive framework.

[Show More →]

## Strategic Analysis: ${extractTopic(query)}

### Pillar 1: Vision & Objectives
- Define clear, measurable goals
- Align with long-term mission
- Set OKRs and KPIs for tracking

### Pillar 2: Market & Competitive Analysis
- **SWOT Analysis**:
  - *Strengths*: Core competencies, unique value proposition
  - *Weaknesses*: Resource gaps, market challenges
  - *Opportunities*: Emerging trends, unmet needs
  - *Threats*: Competition, market shifts

### Pillar 3: Implementation Roadmap
| Phase | Timeline | Key Actions |
|-------|----------|-------------|
| Foundation | 0-3 months | Setup, research, team building |
| Growth | 3-6 months | Launch, iterate, scale |
| Optimization | 6-12 months | Refine, expand, optimize |

### Pillar 4: Resource Allocation
- **Human Capital**: Key roles and expertise needed
- **Financial**: Budget allocation and funding strategy
- **Technology**: Infrastructure and tools

### Pillar 5: Risk Management
- Identify key risks and mitigations
- Create contingency plans
- Regular review cycles

## Timeline
A phased approach over 12 months with quarterly reviews

## Required Resources
1. Skilled team with domain expertise
2. Adequate funding for initial development
3. Technology infrastructure
4. Strategic partnerships

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function generateSummaryResponse(text: string): string {
  return `Here is a comprehensive summary of your content.

[Show More →]

## Executive Summary
The content covers key aspects related to ${extractTopic(text)}. The main ideas center around important concepts with practical implications.

## Key Points
1. **Primary Theme**: The core message emphasizes significance and impact
2. **Supporting Evidence**: Multiple examples and data points reinforce the main arguments
3. **Critical Insights**: Notable observations that add depth to understanding

## Detailed Breakdown

### Main Ideas
- Central concept with supporting details
- Important context and background information
- Key arguments and their rationale

### Notable Details
- Specific facts, figures, and data points
- Important dates, names, and references
- Critical distinctions and clarifications

### Actionable Takeaways
1. Apply key insights to relevant situations
2. Consider implications for decision-making
3. Use findings for further exploration

## Conclusion
The content provides valuable insights that can inform understanding and guide action in this area.

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function generateTranslationResponse(text: string): string {
  const targetMatch = text.match(/(?:to|in|into)\s+(\w+(?:\s+\w+)?)\s*(?:language)?/i);
  const targetLang = targetMatch ? targetMatch[1] : "English";

  const cleanText = text
    .replace(/\b(translate|translation|say in|how do you say|meaning of|interpret|convert to|this|the|following|text|please)\b/gi, "")
    .replace(/to\s+\w+/gi, "")
    .replace(/in\s+\w+/gi, "")
    .replace(/into\s+\w+/gi, "")
    .trim();

  const sourceText = cleanText || text;

  return `**Translation to ${targetLang}** ✅

[Show More →]

**Original Text:**
"${sourceText.substring(0, 200)}"

**Translation (${targetLang}):**
"${sourceText.substring(0, 200)}"

**Notes:**
- Meaning and tone preserved
- Culturally appropriate phrasing used
- Natural expression in target language

> This is a simulated translation. When you add an API key, I'll provide real AI-powered translations with full nuance preservation.

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function generateExplanationResponse(original: string, topic: string, intent: string): string {
  return `Great question! Let me explain ${topic || "this topic"} in a clear and structured way.

[Show More →]

## Understanding ${topic || "This Topic"}

### What Is It?
${topic || "This concept"} refers to an important idea with wide-ranging applications and implications. Understanding it requires examining several key aspects.

### Key Concepts
1. **Foundation**: The basic principles that underpin this topic
2. **Mechanism**: How it works and operates in practice
3. **Applications**: Where and how it is used

### Detailed Explanation
The topic encompasses several interconnected ideas:
- **Core Principle**: At its heart, it functions through specific mechanisms
- **Practical Application**: In real-world scenarios, it manifests in various ways
- **Importance**: Understanding this is crucial because of its impact

### Examples
- **Example 1**: A practical illustration of the concept
- **Example 2**: Another scenario demonstrating its application
- **Example 3**: An edge case showing its boundaries

### Common Misconceptions
- ❌ Misconception: [Common misunderstanding]
- ✅ Reality: [Actual explanation]

### Further Reading
- Related concepts that complement understanding
- Advanced topics for deeper exploration

Is there a specific aspect you'd like me to explore in more detail?

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function generateWritingResponse(original: string): string {
  return `Here's a piece I've composed based on your request.

[Show More →]

## Title

In the ever-evolving landscape of ${extractTopic(original) || "our modern world"}, we find ourselves at a fascinating crossroads of innovation and tradition. This exploration delves into the nuances that shape our understanding and experience.

### Introduction
The subject at hand invites us to consider multiple perspectives and embrace the complexity that defines meaningful discourse. As we journey through this analysis, we'll uncover insights that illuminate both the obvious and the subtle.

### Main Body
The core of this discussion rests on several foundational pillars. First, we must acknowledge the historical context that has brought us to this point. Understanding where we've been illuminates where we might go.

Second, the contemporary landscape presents both opportunities and challenges that demand our attention. The interplay between various forces creates a dynamic environment where adaptation and insight are paramount.

Third, looking forward, we can identify emerging trends that will shape future developments. By recognizing these patterns today, we position ourselves to engage proactively rather than reactively.

### Conclusion
In summary, the topic invites continued reflection and dialogue. The insights gained through this exploration serve as a foundation for deeper understanding and meaningful action.

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function generateVisionResponse(): string {
  return `I'm ready to analyze any image you'd like me to examine.

[Show More →]

**To analyze an image:**
1. Use the **file upload** section above to attach an image
2. Describe what you'd like me to look for
3. I'll provide a detailed visual analysis including objects, text, colors, composition, and context

**What I can analyze:**
- Objects and people in the image
- Text and signage
- Colors, lighting, and composition
- Context and setting
- Emotional tone and atmosphere
- Technical details (if relevant)

Please upload an image and I'll provide a comprehensive analysis!

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function generateImageResponse(original: string): string {
  return `I'll help you create a detailed prompt for image generation based on: "${extractTopic(original) || original}"

[Show More →]

**Enhanced Prompt:**
"${extractTopic(original) || original}, professional photography, highly detailed, dramatic lighting, 8K resolution, cinematic composition, vibrant colors, sharp focus"

**Style Variations:**
1. **Realistic**: Photorealistic style with natural lighting and true-to-life details
2. **Artistic**: Painterly interpretation with expressive brushstrokes and atmospheric effects
3. **Cinematic**: Wide-angle lens, dramatic shadows, film-grade color grading
4. **Minimalist**: Clean composition, negative space, subtle color palette

> This is a prompt enhancement. When you add an API key, I'll generate actual images using DALL-E or similar AI image generators.

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function generatePhilosophyResponse(original: string): string {
  return `That's a profound question. Let me explore it with the depth it deserves.

[Show More →]

## Philosophical Analysis

### The Question
"${extractTopic(original) || original}" touches on fundamental questions that have occupied thinkers for centuries.

### Historical Perspectives
- **Ancient Philosophy**: Early thinkers approached this through the lens of metaphysics and ethics
- **Modern Philosophy**: Contemporary philosophers reframe the question in light of scientific advances
- **Eastern Traditions**: Alternative frameworks offer complementary insights

### Key Considerations
1. **Epistemological**: How do we know what we know about this?
2. **Ethical**: What are the moral implications?
3. **Existential**: What does this mean for human experience?

### Synthesis
Rather than arriving at a single answer, the value lies in the journey of questioning itself. Different frameworks offer different insights, and the most thoughtful approach integrates multiple perspectives.

### Further Reflection
- Consider how your own experiences shape your understanding
- Engage with opposing viewpoints to strengthen your position
- Recognize that some questions are valuable precisely because they resist easy answers

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function generateHealthResponse(original: string): string {
  return `I can provide general health information on this topic.

[Show More →]

## Health Information: ${extractTopic(original)}

### Overview
Maintaining good health involves a balanced approach to nutrition, exercise, rest, and mental wellbeing.

### Key Recommendations
1. **Balanced Diet**: Focus on whole foods, vegetables, lean proteins, and healthy fats
2. **Regular Exercise**: Aim for 150 minutes of moderate activity per week
3. **Adequate Sleep**: 7-9 hours of quality sleep per night
4. **Stress Management**: Practice mindfulness, meditation, or relaxation techniques
5. **Hydration**: Drink adequate water throughout the day

### Important Note
> ⚕️ I can provide general health information and wellness tips, but I am not a medical professional. Always consult with qualified healthcare providers for medical advice, diagnosis, or treatment.

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function generateScienceResponse(original: string): string {
  return `Let me explain the science behind ${extractTopic(original)}.

[Show More →]

## Scientific Explanation

### Core Principle
This topic is grounded in established scientific principles that have been validated through rigorous experimentation and observation.

### How It Works
The mechanism involves several interconnected processes:
1. **Initial Conditions**: Specific parameters that set the stage
2. **Process**: The chain of events that occurs
3. **Outcome**: The observable result

### Evidence
- Empirical studies support the main conclusions
- Reproducible experiments validate the findings
- Peer-reviewed research provides a foundation of knowledge

### Practical Applications
Understanding this science enables:
- Technological innovations
- Medical advancements
- Environmental solutions
- Improved quality of life

### Ongoing Research
Scientists continue to explore unanswered questions and push the boundaries of our understanding.

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function generateHistoryResponse(original: string): string {
  return `Let me take you through the historical context of ${extractTopic(original)}.

[Show More →]

## Historical Overview

### Origins
The story begins in a specific historical context that shaped subsequent developments. Understanding the origins provides crucial perspective.

### Key Timeline
| Period | Event | Significance |
|--------|-------|--------------|
| Early | Formation and beginnings | Set the foundation |
| Middle | Major developments | Defined the trajectory |
| Modern | Contemporary relevance | Shapes current understanding |

### Important Figures
Several key individuals played pivotal roles in shaping this history through their contributions, innovations, and leadership.

### Impact and Legacy
The historical significance extends to:
- Cultural influence and societal change
- Technological and scientific advancement
- Political and economic transformation

### Lessons for Today
History offers valuable lessons that remain relevant for contemporary challenges and decision-making.

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function generateTechnologyResponse(original: string): string {
  return `Let me analyze this technology topic: ${extractTopic(original)}.

[Show More →]

## Technology Analysis

### Overview
This technology represents an important development in the digital landscape, with implications for how we work, create, and interact.

### Key Features
1. **Core Functionality**: What it does and how it works
2. **Technical Architecture**: The underlying system design
3. **User Impact**: How it affects end-users

### Benefits
- Increased efficiency and productivity
- Enhanced capabilities and new possibilities
- Improved user experiences

### Challenges
- Learning curve and adoption barriers
- Integration with existing systems
- Security and privacy considerations

### Future Outlook
The technology is evolving rapidly, with emerging trends pointing toward:
- Greater integration with AI and machine learning
- Enhanced performance and scalability
- Broader accessibility and adoption

### Getting Started
To begin working with this technology:
1. Learn the fundamentals through documentation
2. Start with small projects to build experience
3. Join communities for support and knowledge sharing

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function generateMathResponse(original: string): string {
  return `Let me help you with this mathematical question.

[Show More →]

## Mathematical Analysis

### Problem
${extractTopic(original) || original}

### Approach
To solve this, let's break it down step by step:

1. **Understand**: Identify what we're given and what we need to find
2. **Formulate**: Set up the appropriate equations or methods
3. **Solve**: Work through the calculations systematically
4. **Verify**: Check the result for reasonableness

### General Formula
\`\`\`
result = f(input)
where f is the appropriate mathematical function
\`\`\`

### Step-by-Step Solution
- Step 1: Identify the given values and what needs to be solved
- Step 2: Apply the relevant formula or method
- Step 3: Perform the calculation
- Step 4: Check the result

### Answer
The solution follows from applying mathematical principles to your specific problem.

> For precise calculations, please provide the specific numbers or equations you'd like me to work with.

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function generateRwandaResponse(original: string): string {
  return `Muraho! (Hello!) I'm glad you're interested in Rwanda!

[Show More →]

## Rwanda: The Land of a Thousand Hills

Rwanda is a beautiful East African nation known for its stunning landscapes, vibrant culture, and remarkable progress.

### Quick Facts
- **Capital**: Kigali
- **Languages**: Kinyarwanda, French, English, Swahili
- **Known For**: Volcanoes National Park, mountain gorillas, Lake Kivu
- **Nickname**: "Land of a Thousand Hills"

### Culture & People
Rwandans are known for their warmth, resilience, and community spirit. The concept of *Ubuntu* — "I am because we are" — is central to Rwandan culture.

### Natural Beauty
- Volcanoes National Park — home to endangered mountain gorillas
- Lake Kivu — stunning freshwater lake with beautiful beaches
- Nyungwe Forest — ancient rainforest with chimpanzees and canopy walks
- Akagera National Park — Savannah wildlife with the Big Five

### Modern Rwanda
Today, Rwanda is known for:
- Clean cities and environmental leadership
- Rapid technological and economic development
- Strong focus on education and innovation
- Women's empowerment and inclusive governance

Is there a specific aspect of Rwanda you'd like to learn more about?

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function generateLiveDataResponse(intent: string): string {
  const responses: Record<string, string> = {
    weather: "I'd be happy to provide current weather information! However, real-time weather data requires internet access. For now, I can tell you that Rwanda enjoys a pleasant tropical highland climate with temperatures averaging 20-25°C (68-77°F) year-round, with two rainy seasons (March-May and October-November).",
    time: `The current time can be checked from your device. In Rwanda (CAT timezone), it's typically 2 hours ahead of UTC. Is there anything else I can help you with?`,
    news: "I can discuss recent developments and trends! For the most current news, I'd recommend checking reliable news sources. I'm happy to analyze and discuss any news topic you're interested in.",
  };
  return responses[intent] || `I'm happy to help with that. Could you provide more specific details about what you're looking for?`;
}

function generateJoke(): string {
  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    "What did the AI say to the human? 'I'll be back... with more data!'",
    "Why was the computer cold? It left its Windows open!",
    "How many programmers does it take to change a light bulb? None — that's a hardware problem!",
    "Why did the developer go broke? Because he used up all his cache!",
  ];
  return jokes[Math.floor(Math.random() * jokes.length)];
}

function generateGeneralResponse(original: string, topic: string, isFollowUp: boolean): string {
  if (isFollowUp) {
    return `Thank you for the follow-up. Let me expand on that.

[Show More →]

Based on our conversation so far, I understand you're interested in "${topic || original.substring(0, 60)}". Here are my thoughts:

**Key Points:**
1. This is an important topic with several dimensions worth exploring
2. The context you've provided helps frame a meaningful response
3. There are multiple angles to consider

**My Analysis:**
The topic touches on concepts that benefit from a structured approach. Let me break it down:

- First, consider the foundational aspects that provide context
- Then, examine the specific elements you've highlighted
- Finally, synthesize this into actionable insights

**Further Discussion:**
I'm happy to dive deeper into any aspect. What specific angle would you like to explore?

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
  }

  return `Thank you for your question about "${topic || original.substring(0, 60)}". Let me provide a thoughtful response.

[Show More →]

## Response

### Understanding Your Question
You've raised an interesting point about ${topic || "this topic"}. Let me break this down.

### Key Considerations
1. **Context Matters**: The answer depends on various factors including perspective and circumstances
2. **Multiple Dimensions**: This topic has several layers worth exploring
3. **Practical Implications**: Understanding this can have real-world applications

### My Perspective
Based on analysis and reasoning, here's what I can share:

The subject encompasses several important aspects that interconnect in meaningful ways. By examining each component, we can develop a comprehensive understanding.

### Key Insights
- **Insight 1**: Consider the broader context and implications
- **Insight 2**: Look at evidence and examples for clarity
- **Insight 3**: Think about how this applies to your specific situation

### Next Steps
Would you like me to:
- Dive deeper into a specific aspect?
- Provide examples or analogies?
- Explore related topics?
- Offer practical guidance?

I'm here to help with whatever direction you'd like to take this conversation!

---
**💡 Feedback**
[📋 Copy] | [⬇️ Download] | [🔗 Share]`;
}

function extractLanguage(msg: string): string | null {
  const langs: Record<string, string[]> = {
    JavaScript: ["javascript", "js", "node", "nodejs", "react", "vue", "angular", "ecmascript"],
    TypeScript: ["typescript", "ts", "tsx"],
    Python: ["python", "py", "django", "flask", "fastapi"],
    Java: ["java", "jvm", "spring", "android"],
    "C++": ["c++", "cpp", "cplusplus"],
    "C#": ["c#", "csharp", "dotnet", ".net"],
    Go: ["go", "golang"],
    Rust: ["rust", "rustlang"],
    Ruby: ["ruby", "rails", "rubyonrails"],
    PHP: ["php", "laravel"],
    Swift: ["swift", "ios", "apple"],
    Kotlin: ["kotlin", "kotlin"],
    SQL: ["sql", "mysql", "postgresql", "postgres", "database query"],
  };

  for (const [lang, keywords] of Object.entries(langs)) {
    if (keywords.some((kw) => msg.includes(kw))) return lang;
  }
  return null;
}
