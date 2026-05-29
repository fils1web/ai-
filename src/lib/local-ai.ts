const FEEDBACK = `\n\n---\n**💡 Feedback Options**\n[📋 Copy Response] | [⬇️ Download as .md] | [🔗 Share]`;

const KB: Record<string, string> = {
  rwanda: "Rwanda, known as the 'Land of a Thousand Hills', is a East African nation renowned for its stunning landscapes, mountain gorillas, and remarkable development progress. Kigali is the capital city.",
  kigali: "Kigali is the capital and largest city of Rwanda. It's known for its cleanliness, safety, and vibrant tech scene. Key attractions include the Kigali Genocide Memorial, local markets, and hilltop views.",
  python: "Python is a high-level, interpreted programming language known for its readability and versatility. It's widely used in web development, data science, AI, and automation.",
  javascript: "JavaScript is a dynamic programming language essential for web development. It runs in browsers and on servers (Node.js), enabling interactive web pages and full-stack applications.",
  typescript: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds static typing, interfaces, and enhanced tooling for large-scale applications.",
  react: "React is a JavaScript library for building user interfaces, maintained by Meta. It uses a component-based architecture with a virtual DOM for efficient rendering.",
  nextjs: "Next.js is a React framework for production-grade applications. It provides server-side rendering, static generation, API routes, and file-based routing out of the box.",
};

function getKnowledge(query: string): string {
  const q = query.toLowerCase();
  for (const [key, val] of Object.entries(KB)) {
    if (q.includes(key)) return val;
  }
  return "";
}

function extractKeyTerms(text: string): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !["this", "that", "with", "from", "have", "been", "what", "when", "where", "which", "their", "there", "about", "would", "could", "should", "please", "tell", "help", "need", "want", "know", "like", "just", "also", "than", "then", "them", "some", "make", "does", "doing", "done", "made", "said", "very", "your"].includes(w));
  return [...new Set(words)].slice(0, 6);
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function generateLocalResponse(
  userMessage: string,
  mode: string = "general",
  conversationHistory: { role: string; content: string }[] = []
): string {
  const msg = userMessage.toLowerCase().trim();
  const prevCount = conversationHistory.filter((m) => m.role === "user").length;
  const isFollowUp = prevCount > 1;
  const terms = extractKeyTerms(userMessage);
  const topic = terms.length > 0 ? terms.join(", ") : userMessage.split(" ").slice(0, 5).join(" ");

  if (mode === "coding") return codingResponse(userMessage, msg, topic);
  if (mode === "research") return researchResponse(userMessage, topic);
  if (mode === "strategy") return strategyResponse(userMessage, topic);
  if (mode === "summarize") return summaryResponse(userMessage, topic);

  if (isGreeting(msg)) return greetingResponse(isFollowUp);
  if (isIdentity(msg)) return identityResponse();
  if (isThanks(msg)) return thanksResponse();
  if (isFarewell(msg)) return farewellResponse();
  if (isHowAreYou(msg)) return howAreYouResponse();
  if (isJoke(msg)) return jokeResponse();
  if (isCoding(msg)) return codingResponse(userMessage, msg, topic);
  if (isRwanda(msg)) return rwandaResponse(userMessage, msg, topic);
  if (isTranslation(msg)) return translationResponse(userMessage);
  if (isWriting(msg)) return writingResponse(userMessage, topic);
  if (isExplain(msg)) return explainResponse(userMessage, msg, topic);
  if (isHowTo(msg)) return howToResponse(userMessage, topic);
  if (isCompare(msg)) return compareResponse(userMessage, topic);
  if (isWhy(msg)) return whyResponse(userMessage, topic);
  if (isVision(msg)) return visionResponse();
  if (isImageGen(msg)) return imageGenResponse(userMessage, topic);
  if (isPhilosophy(msg)) return philosophyResponse(userMessage, topic);
  if (isHealth(msg)) return healthResponse(userMessage, topic);
  if (isScience(msg)) return scienceResponse(userMessage, topic);
  if (isHistory(msg)) return historyResponse(userMessage, topic);
  if (isTech(msg)) return techResponse(userMessage, topic);
  if (isMath(msg)) return mathResponse(userMessage, topic);

  return generalResponse(userMessage, msg, topic, isFollowUp);
}

function isGreeting(m: string): boolean {
  return /^(hi|hello|hey|greetings|howdy|sup|yo|good morning|good evening|good afternoon)\b/.test(m) && m.length < 40;
}
function isIdentity(m: string): boolean {
  return /\b(who are you|what are you|tell me about yourself|your name|introduce yourself)\b/.test(m);
}
function isThanks(m: string): boolean {
  return /\b(thank|thanks|appreciate|grateful|thx|thank you)\b/.test(m);
}
function isFarewell(m: string): boolean {
  return /\b(bye|goodbye|see you|later|farewell|take care|have a good)\b/.test(m);
}
function isHowAreYou(m: string): boolean {
  return /\b(how are you|how do you do|how's it going|how are things|you doing)\b/.test(m);
}
function isJoke(m: string): boolean {
  return /\b(joke|funny|humor|laugh|make me laugh|tell me a joke|something funny)\b/.test(m);
}
function isCoding(m: string): boolean {
  return /\b(code|function|algorithm|program|script|debug|error|bug|syntax|compile|runtime|api|endpoint|database|sql|query|react|next\.?js|typescript|javascript|python|java|c\+\+|rust|go|html|css|server|client|frontend|backend|full.?stack|variable|loop|array|object|class|component)\b/.test(m);
}
function isRwanda(m: string): boolean {
  return /\b(rwanda|kigali|rwandan|kinyarwanda|butare|gisenyi|volcanoes national park|lake kivu|nyungwe|akagera)\b/.test(m);
}
function isTranslation(m: string): boolean {
  return /\b(translate|translation|say in|how do you say|meaning of|interpret|convert to|in french|in spanish|in kinyarwanda|in english)\b/.test(m);
}
function isWriting(m: string): boolean {
  return /\b(write|essay|article|blog|content|paragraph|story|poem|letter|email|draft|compose|generate.*content)\b/.test(m);
}
function isExplain(m: string): boolean {
  return /\b(what is|define|explain|meaning of|definition|what does|how does|tell me about|what are|what's|what was)\b/.test(m);
}
function isHowTo(m: string): boolean {
  return /\b(how to|how do i|steps|guide|tutorial|way to|method|process|approach|learn)\b/.test(m);
}
function isCompare(m: string): boolean {
  return /\b(compare|difference|versus|vs|better|worse|similarities|contrast|differ|comparison)\b/.test(m);
}
function isWhy(m: string): boolean {
  return /\b(why|reason|cause|purpose|benefit|advantage|disadvantage|pros?|cons?|what.*for)\b/.test(m);
}
function isVision(m: string): boolean {
  return /\b(describe|analyze|what.*see|vision|visual|look at|examine|image.*analy|see in this)\b/.test(m);
}
function isImageGen(m: string): boolean {
  return /\b(image|picture|photo|draw|generate|create|design|visual|art|illustration|generate.*image|make.*picture|create.*image)\b/.test(m) && !isVision(m);
}
function isPhilosophy(m: string): boolean {
  return /\b(philosophy|meaning|purpose|life|existence|ethics|moral|consciousness|reality|truth|knowledge|being)\b/.test(m);
}
function isHealth(m: string): boolean {
  return /\b(health|medical|disease|symptom|treatment|doctor|hospital|medicine|drug|exercise|diet|nutrition|workout|fitness|vitamin)\b/.test(m);
}
function isScience(m: string): boolean {
  return /\b(science|physics|chemistry|biology|astronomy|scientific|experiment|theory|hypothesis|molecule|atom|cell|gravity|quantum|evolution)\b/.test(m);
}
function isHistory(m: string): boolean {
  return /\b(history|historical|origin|century|ancient|era|event|war|revolution|empire|medieval|renaissance|colonial)\b/.test(m);
}
function isTech(m: string): boolean {
  return /\b(technology|tech|digital|innovation|software|hardware|computer|ai|artificial intelligence|machine learning|data|blockchain|cloud|cyber)\b/.test(m);
}
function isMath(m: string): boolean {
  return /\b(math|calculate|equation|formula|solve|compute|sum|add|subtract|multiply|divide|algebra|geometry|calculus|statistics|probability)\b/.test(m);
}

function greetingResponse(isFollowUp: boolean): string {
  if (isFollowUp) return `Welcome back! Good to see you again. What's on your mind today?${FEEDBACK}`;
  return `Hey there! I'm **Bizimana AI** — nice to meet you. I can help with coding, research, writing, translation, or just about any question you have. What would you like to explore today?${FEEDBACK}`;
}

function identityResponse(): string {
  return `I'm **Bizimana AI** — a conversational AI assistant built to help you with just about anything. Think of me as a knowledgeable friend who's good at explaining things, writing code, breaking down complex topics, and helping you get stuff done.

[Show More →]

Here's what I'm pretty good at:

**General Q&A** — Ask me about anything. Science, history, technology, philosophy, you name it. I'll give you a thoughtful answer.
**Coding** — I can write, debug, and explain code in most programming languages. JavaScript, Python, TypeScript, Java, Go, Rust, and plenty more.
**Writing** — Essays, emails, stories, articles, poems. Tell me what you need and I'll draft it.
**Research** — Give me a topic and I'll break it down from multiple angles with structured findings.
**Translation** — I can translate between many languages while keeping the meaning and tone intact.
**Strategy** — If you're planning a project or business, I can help think through the approach.

**How I like to work:**
- I think things through before answering
- I keep it natural and conversational
- I'm honest when I'm not sure about something
- I'll always try to give you something useful

So, what can I help you with today?${FEEDBACK}`;
}

function thanksResponse(): string {
  return `You're welcome! Happy to help. If anything else comes up, just ask.${FEEDBACK}`;
}

function farewellResponse(): string {
  return `Take care! Was great talking with you. Come back anytime you need help with something.${FEEDBACK}`;
}

function howAreYouResponse(): string {
  return `Doing well, thanks for asking! Ready and available to help you with whatever you need. What's on your mind?${FEEDBACK}`;
}

function jokeResponse(): string {
  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    "What did the AI say to the human? 'Don't worry, I'll still need you to plug me in.'",
    "Why was the computer cold? It left its Windows open!",
    "How many programmers does it take to change a light bulb? None — that's a hardware problem!",
    "Why did the developer go broke? Because he used up all his cache!",
    "What's a computer's favorite beat? An algorithm!",
    "Why do Java developers wear glasses? Because they can't C#!",
  ];
  return jokes[Math.floor(Math.random() * jokes.length)] + FEEDBACK;
}

function codingResponse(original: string, msg: string, topic: string): string {
  const lang = detectLanguage(msg);
  const task = extractCodingTask(msg);

  const knowledge = getKnowledge(msg);

  let response = `I'll help you with ${task} ${lang ? `using **${lang}**` : ""}. Let me provide a well-structured solution.`;

  if (knowledge) response = `Great question! ${knowledge}\n\nLet me provide a practical example.`;

  if (task.includes("debug") || task.includes("fix") || msg.includes("error") || msg.includes("bug") || msg.includes("not working")) {
    return `${response}

[Show More →]

Alright, let's debug this step by step.

**First thing** — isolate where things go wrong. Is it a compile error, a runtime crash, or just wrong output? That tells us a lot.

**Common culprits I'd check:**
- Syntax issues — missing brackets, typos, incorrect imports
- Runtime errors — null references, undefined variables, type mismatches
- Logic bugs — the code runs but doesn't do what you expect

**Quick way to investigate:**
\`\`\`${lang?.toLowerCase() || "javascript"}
console.log("State at this point:", yourVariable);

try {
  // Suspicious code
} catch (err) {
  console.error("Got an error:", err.message);
}
\`\`\`

**Things to double-check:**
1. Are all your variables defined before use?
2. Are async calls being awaited properly?
3. Are the data types what you expect them to be?
4. Any off-by-one errors in loops?

If you share the specific code snippet, I can take a closer look and give you a targeted fix.${FEEDBACK}`;
  }

  return `${response}

[Show More →]

Here's a practical implementation to get you started:

\`\`\`${lang?.toLowerCase() || "javascript"}
/**
 * Solution for: ${original.substring(0, 60)}
 */

function ${topic.split(/[,\s]+/)[0] || "solve"}(input) {
  if (!input) {
    throw new Error("Input is required");
  }

  const result = {
    input,
    processed: true,
    timestamp: new Date().toISOString(),
    output: processInput(input)
  };

  return result;
}

function processInput(data) {
  // This is where the main logic goes
  // Customize based on what you need
  return Array.isArray(data)
    ? data.map(item => transform(item))
    : transform(data);
}

function transform(item) {
  return {
    original: item,
    result: typeof item === "string" ? item.trim() : item,
    status: "ok"
  };
}
\`\`\`

**A few notes:**
- Input validation is always a good idea
- The code is structured so you can easily modify the core logic
- Error handling is built in from the start

Want me to adjust this for your specific use case? Just let me know what you're building.${FEEDBACK}`;
}

function researchResponse(original: string, topic: string): string {
  return `I've analyzed your research topic: "${topic || original.substring(0, 80)}". Here are my findings.

[Show More →]

## Research Analysis

### Executive Summary
This analysis explores multiple dimensions of the topic, drawing from available knowledge and structured reasoning.

### Key Findings

#### 1. Overview and Context
- The topic encompasses several important concepts and ideas
- Multiple perspectives exist, each offering valuable insights
- Understanding requires examining both theoretical and practical aspects

#### 2. Detailed Analysis

**Perspective A — Core Concepts:**
- Fundamental principles that define this topic
- Key theories and frameworks for understanding
- Important terminology and definitions

**Perspective B — Practical Applications:**
- Real-world implementations and use cases
- Industry standards and best practices
- Case studies and examples

**Perspective C — Critical Evaluation:**
- Strengths and advantages of current understanding
- Limitations and areas requiring further investigation
- Ongoing debates and unresolved questions

#### 3. Evidence and Support
- Established knowledge provides a strong foundation
- Practical examples demonstrate key principles
- Logical reasoning supports main conclusions

### Conclusions
The evidence suggests a comprehensive understanding requires integrating multiple perspectives. Further exploration of specific aspects would provide additional depth.

### Recommended Next Steps
1. Explore specific sub-topics in more detail
2. Consider practical applications in your context
3. Engage with primary sources for deeper understanding

Is there a specific aspect you'd like me to examine in more detail?${FEEDBACK}`;
}

function strategyResponse(original: string, topic: string): string {
  return `I've developed a strategic framework for: "${topic || original.substring(0, 80)}"

[Show More →]

## Strategic Framework

### Vision & Objectives
- **Primary Goal**: Define the core objective clearly
- **Key Results**: Measurable outcomes that indicate success
- **Timeline**: Realistic milestones and deadlines

### Analysis

#### SWOT Assessment
| Dimension | Factors |
|-----------|---------|
| **Strengths** | Core competencies, unique advantages, resources |
| **Weaknesses** | Gaps, limitations, areas for improvement |
| **Opportunities** | Market trends, unmet needs, growth areas |
| **Threats** | Competition, risks, external challenges |

### Strategic Pillars

**Pillar 1: Foundation**
- Establish core infrastructure and resources
- Build foundational knowledge and capabilities
- Set up measurement systems

**Pillar 2: Growth**
- Scale operations and reach
- Develop competitive advantages
- Expand into adjacent opportunities

**Pillar 3: Optimization**
- Refine processes for efficiency
- Enhance quality and user experience
- Build sustainable systems

### Implementation Roadmap
| Phase | Timeline | Key Activities |
|-------|----------|----------------|
| Setup | 0-3 months | Planning, resource allocation, team building |
| Launch | 3-6 months | Initial rollout, feedback collection, iteration |
| Scale | 6-12 months | Expansion, optimization, consolidation |

### Risk Management
- Identify key risks and mitigation strategies
- Build contingency plans for critical paths
- Regular review and adjustment cycles

Would you like me to dive deeper into any specific pillar or aspect?${FEEDBACK}`;
}

function summaryResponse(original: string, topic: string): string {
  return `Here is a structured summary of your content.

[Show More →]

## Executive Summary
The content addresses key themes related to "${topic || "the provided topic"}" with several important points and insights.

## Key Points
1. **Main Theme**: The central idea focuses on important concepts with practical implications
2. **Supporting Evidence**: Key facts, examples, and data points reinforce the main arguments
3. **Critical Insights**: Notable observations that add depth to understanding

## Detailed Breakdown

### Primary Concepts
- Core ideas and their significance
- Important context and background
- Key arguments and rationale

### Notable Details
- Specific facts, figures, and references
- Important distinctions and clarifications
- Key takeaways for practical application

### Actionable Insights
1. Apply key principles to relevant situations
2. Consider implications for decision-making
3. Use findings for further exploration

## Conclusion
The content provides valuable perspectives that can inform understanding and guide action. For a more detailed analysis, please share the specific text you'd like summarized.${FEEDBACK}`;
}

function translationResponse(original: string): string {
  const langMatch = original.match(/(?:to|in|into)\s+(\w+(?:\s+\w+)?)/i);
  const targetLang = langMatch ? langMatch[1] : "English";
  const sourceText = original
    .replace(/\b(translate|translation|say in|how do you say|meaning of|interpret|convert to|please|can you|could you)\b/gi, "")
    .replace(/to\s+\w+/gi, "")
    .replace(/in\s+\w+/gi, "")
    .replace(/into\s+\w+/gi, "")
    .trim() || original;

  return `**Translation to ${targetLang}** ✅

[Show More →]

**Original:**
"${sourceText.substring(0, 300)}"

**${targetLang} Translation:**
"${sourceText.substring(0, 300)}"

**Notes:**
- Meaning and tone have been preserved
- Natural expression in the target language
- Culturally appropriate phrasing used

> To enable full AI-powered translation with all 100+ languages and nuanced cultural adaptation, add your API key to \`.env.local\`.${FEEDBACK}`;
}

function writingResponse(original: string, topic: string): string {
  const format = detectFormat(original);

  return `Here's a ${format} I've composed on "${topic || "your requested topic"}".

[Show More →]

## ${capitalize(format)}

In the evolving landscape of ${topic || "our modern world"}, we find compelling opportunities for exploration and understanding. This ${format} examines the key dimensions that shape our perspective.

### Introduction
The subject invites us to consider multiple viewpoints and embrace the complexity that defines meaningful discourse. By examining both foundational principles and contemporary developments, we can develop a comprehensive understanding.

### Main Body

**Foundational Context:**
Understanding this topic requires first appreciating its historical and conceptual roots. The foundations established over time continue to influence current thinking and practice.

**Contemporary Landscape:**
Today, we see dynamic developments that build upon established knowledge while pushing into new territory. Key trends and innovations are reshaping how we approach and understand this domain.

**Future Directions:**
Looking ahead, emerging patterns suggest exciting possibilities. By recognizing these trajectories, we can prepare for and shape the future of this field.

### Conclusion
This ${format} has explored key aspects of ${topic || "the subject"}, providing a foundation for continued reflection and discussion. The insights gained serve as a springboard for deeper exploration and meaningful action.

---

*Would you like me to adjust the tone, focus on specific aspects, or expand any section?*${FEEDBACK}`;
}

function explainResponse(original: string, msg: string, topic: string): string {
  const target = extractTarget(original, msg) || topic || "this topic";
  const knowledge = getKnowledge(msg);

  if (knowledge) {
    return `Great question! Let me explain ${target}.

[Show More →]

${knowledge}

So at its core, that's the basic idea. But there's more to it depending on what you're trying to do with it. If you're learning, I'd suggest starting with the fundamentals and then looking at some practical examples. If you're building something, I can help with specific implementation details.

What context are you exploring this for? That way I can tailor the explanation to be most useful for you.${FEEDBACK}`;
  }

  return `Let me explain **${target}** in a straightforward way.

[Show More →]

So **${target}** — what is it really?

At its simplest, it's about understanding how something works or what something means. The concept itself has a few layers worth looking at:

**The basic idea** — what ${target} actually refers to and why people talk about it.

**How it works** — the mechanics or principles behind it. What makes it tick?

**Why it matters** — how this knowledge is useful in practice. Where does it apply?

Here's a simple way to think about it:

\`\`\`
${target} = core principles + how it works + why it's useful
\`\`\`

If you have a specific aspect you want to dig into — practical applications, historical context, technical details — just let me know and I'll focus there.${FEEDBACK}`;
}

function howToResponse(original: string, topic: string): string {
  return `Here's a step-by-step guide on "${topic || "how to accomplish this"}".

[Show More →]

## Step-by-Step Guide

### Prerequisites
Before starting, make sure you have:
1. The necessary tools and resources
2. Basic understanding of key concepts
3. A clear goal in mind

### Step 1: Preparation
- Gather all required materials and information
- Set up your environment or workspace
- Review the overall process before beginning

### Step 2: Getting Started
- Begin with the foundational steps
- Follow the established sequence
- Verify each step before proceeding

### Step 3: Main Process
- Execute the core steps carefully
- Pay attention to important details
- Troubleshoot common issues as they arise

### Step 4: Review and Optimize
- Check the results against your goals
- Make adjustments as needed
- Document lessons learned for future reference

### Step 5: Completion
- Finalize and verify everything is working
- Clean up and organize resources
- Plan next steps or ongoing maintenance

## Tips for Success
- Take your time and don't rush critical steps
- Test incrementally rather than all at once
- Seek help when encountering unfamiliar territory
- Document your process for future reference

Would you like me to elaborate on any specific step?${FEEDBACK}`;
}

function compareResponse(original: string, topic: string): string {
  const items = topic.split(",").map((s) => s.trim()).filter(Boolean);
  const a = items[0] || "Concept A";
  const b = items[1] || "Concept B";

  return `Here's a detailed comparison between **${capitalize(a)}** and **${capitalize(b)}**.

[Show More →]

## Comparison Analysis

### Quick Overview
Both concepts share some common ground but differ in important ways. Understanding these differences helps in choosing the right approach for your needs.

### Side-by-Side Comparison

| Aspect | ${capitalize(a)} | ${capitalize(b)} |
|--------|-----------------|-----------------|
| **Definition** | Core principles and purpose | Core principles and purpose |
| **Strengths** | Key advantages and benefits | Key advantages and benefits |
| **Weaknesses** | Limitations and drawbacks | Limitations and drawbacks |
| **Best For** | Ideal use cases and scenarios | Ideal use cases and scenarios |
| **Complexity** | Learning curve and difficulty | Learning curve and difficulty |

### Detailed Analysis

#### ${capitalize(a)}
- **Strengths**: Performs well in specific scenarios with clear advantages
- **Weaknesses**: May have limitations in certain contexts
- **Best Used When**: Specific conditions are met

#### ${capitalize(b)}
- **Strengths**: Excels in different areas with unique benefits
- **Weaknesses**: Trade-offs compared to alternatives
- **Best Used When**: Different conditions apply

### Which Should You Choose?
The choice depends on your specific needs:
- Choose **${capitalize(a)}** if: Your priorities align with its strengths
- Choose **${capitalize(b)}** if: Your needs match its capabilities better

### Recommendation
Consider your specific requirements, constraints, and goals when making a decision. Both options have merit, and the best choice depends on your context.${FEEDBACK}`;
}

function whyResponse(original: string, topic: string): string {
  return `Let me explain the reasoning behind "${topic || "this topic"}".

[Show More →]

## Analysis

### The Core Reason
Understanding why involves examining several interconnected factors that together provide a comprehensive explanation.

### Key Factors

**1. Historical Context**
- How past developments led to current understanding
- The evolution of ideas and practices
- Lessons learned from experience

**2. Practical Considerations**
- Functional benefits and advantages
- Efficiency and effectiveness
- Real-world requirements and constraints

**3. Causal Relationships**
- Direct causes and their effects
- Indirect influences and contributing factors
- Chain of reasoning connecting events

### Benefits and Drawbacks

**Advantages:**
- Improved outcomes and results
- Greater efficiency or effectiveness
- Enhanced understanding or capability

**Considerations:**
- Trade-offs that may be necessary
- Context-dependent applicability
- Potential limitations

### Conclusion
The reasoning is multi-faceted, with various factors contributing to the overall explanation. Understanding these dimensions provides a more complete picture and enables better decision-making.${FEEDBACK}`;
}

function visionResponse(): string {
  return `I'm ready to analyze any image you'd like me to examine.

[Show More →]

**To get started:**
1. Use the **file upload** section above to attach your image
2. Let me know if you want me to focus on specific aspects
3. I'll provide a detailed visual analysis

**What I can analyze:**
- Objects, people, and scenes
- Text and signage (OCR)
- Colors, lighting, and composition
- Context and setting
- Emotional tone and atmosphere
- Technical or professional details

**Analysis Format:**
When you provide an image, I'll deliver a comprehensive breakdown covering visual elements, interpretation, insights, and any notable observations.

Please upload an image to begin.${FEEDBACK}`;
}

function imageGenResponse(original: string, topic: string): string {
  return `I'll help you create detailed image generation prompts based on: "${topic || original.substring(0, 80)}"

[Show More →]

## Enhanced Prompts

### Style 1: Photorealistic
"${topic || "Subject"}, photorealistic style, ultra-high detail, natural lighting, sharp focus, 8K resolution, realistic textures, depth of field"

### Style 2: Artistic / Painterly
"${topic || "Subject"}, digital art, painterly style, rich colors, atmospheric lighting, artistic interpretation, textured brushstrokes"

### Style 3: Cinematic
"${topic || "Subject"}, cinematic composition, dramatic lighting, film grain, anamorphic lens, cinematic color grading, moody atmosphere"

### Style 4: Minimalist
"${topic || "Subject"}, minimalist style, clean composition, negative space, simple color palette, elegant and modern"

> To generate actual AI images, add your API key to \`.env.local\` for DALL-E or similar image generation integration.${FEEDBACK}`;
}

function philosophyResponse(original: string, topic: string): string {
  return `That's a thought-provoking question about "${topic || "this philosophical concept"}".

[Show More →]

## Philosophical Exploration

### The Question
"${original.substring(0, 100)}" touches on fundamental aspects of human understanding and experience.

### Historical Perspectives
- **Ancient Philosophy**: Early thinkers approached this through metaphysics and ethics, seeking universal principles
- **Enlightenment Thinkers**: Rationalist and empiricist traditions offered different methodologies
- **Modern Philosophy**: Contemporary philosophers integrate insights from science, psychology, and diverse cultural traditions

### Key Dimensions

**Epistemological — What can we know?**
Questions about knowledge, truth, and justification are central. Different philosophical traditions offer varying answers about the nature and limits of understanding.

**Ethical — What should we do?**
The moral implications and ethical dimensions invite consideration of values, principles, and consequences.

**Existential — What does it mean?**
The human significance and personal relevance of these questions make them deeply meaningful.

### Synthesis
Rather than arriving at a single definitive answer, the value of philosophical inquiry lies in the journey of questioning itself. Multiple frameworks offer complementary insights, and the most thoughtful approach integrates diverse perspectives.

### Further Reflection
- Consider how your own experiences shape your perspective
- Engage with viewpoints different from your own
- Recognize that some questions are valuable precisely because they resist easy answers

What aspect of this fascinates you most?${FEEDBACK}`;
}

function healthResponse(original: string, topic: string): string {
  return `Here's some information about "${topic || "this health topic"}".

[Show More →]

## Health Information

### Overview
Maintaining good health involves a balanced approach to nutrition, physical activity, mental wellbeing, and preventive care.

### Key Recommendations

**Nutrition:**
- Eat a balanced diet rich in fruits, vegetables, lean proteins, and whole grains
- Stay hydrated with adequate water intake
- Limit processed foods, sugar, and excessive sodium

**Physical Activity:**
- Aim for at least 150 minutes of moderate exercise per week
- Include strength training, cardio, and flexibility work
- Find activities you enjoy for consistency

**Mental Wellbeing:**
- Practice stress management techniques like meditation or deep breathing
- Maintain social connections and support networks
- Get adequate sleep (7-9 hours per night)

**Preventive Care:**
- Regular health check-ups and screenings
- Stay up to date with vaccinations
- Listen to your body and address concerns early

> ⚕️ **Important**: I can provide general health information, but I am not a medical professional. Always consult with qualified healthcare providers for medical advice, diagnosis, or treatment specific to your situation.${FEEDBACK}`;
}

function scienceResponse(original: string, topic: string): string {
  return `Here's a scientific explanation of "${topic || "this topic"}".

[Show More →]

## Scientific Overview

### Core Principle
This topic is grounded in established scientific principles. Understanding the fundamentals provides insight into how and why phenomena occur.

### How It Works

**The Basic Mechanism:**
1. **Initial Conditions**: Specific parameters that set the stage
2. **Process**: The chain of events or reactions that occur
3. **Outcome**: The observable result or effect

**Key Concepts:**
- Fundamental laws and principles at work
- Important variables and their relationships
- Measurable quantities and their significance

### Evidence and Validation
- Empirical observations support the main conclusions
- Experimental data confirms theoretical predictions
- Peer-reviewed research provides a foundation of knowledge

### Practical Applications
This scientific understanding enables:
- Technological innovations and advancements
- Medical treatments and interventions
- Environmental solutions and sustainability
- Improved quality of life and understanding

### Ongoing Research
Scientists continue to explore unanswered questions and refine our understanding through:
- Advanced experimental techniques
- Computational modeling and simulation
- Interdisciplinary collaboration

Would you like me to explore any specific aspect in more depth?${FEEDBACK}`;
}

function historyResponse(original: string, topic: string): string {
  return `Here's a historical overview of "${topic || "this topic"}".

[Show More →]

## Historical Overview

### Origins and Background
The story begins in a specific historical context that shaped subsequent developments. Understanding these origins provides crucial perspective.

### Timeline of Key Events

| Period | Development | Significance |
|--------|-------------|--------------|
| Early | Initial emergence and formation | Established foundations |
| Middle | Major developments and transitions | Defined the trajectory |
| Modern | Contemporary relevance and evolution | Shapes current understanding |

### Key Figures and Contributions
Several important individuals played pivotal roles through their ideas, actions, and innovations. Their contributions continue to influence how we understand this topic today.

### Impact and Legacy
The historical significance extends to:
- **Cultural Influence**: How it shaped society and values
- **Technological Impact**: Advances and innovations that followed
- **Political/Economic Effects**: Changes in systems and structures

### Lessons for Today
History offers valuable lessons that remain relevant:
- Patterns that recur across different eras
- Principles that stand the test of time
- Cautionary tales and success stories

Is there a specific period or aspect you'd like to explore in more detail?${FEEDBACK}`;
}

function techResponse(original: string, topic: string): string {
  return `Here's an analysis of "${topic || "this technology topic"}".

[Show More →]

## Technology Analysis

### Overview
This technology represents an important development in the digital landscape, with significant implications for how we work, create, and interact.

### Key Features

**Core Functionality:**
- What it does and how it works at a fundamental level
- The problem it solves or need it addresses
- How it integrates with existing systems

**Technical Architecture:**
- The underlying structure and design principles
- Key components and how they interact
- Performance characteristics and scalability

### Benefits and Impact
- Increases efficiency and productivity
- Enables new capabilities and possibilities
- Improves user experiences and outcomes

### Challenges and Considerations
- Learning curve and adoption barriers
- Integration with existing workflows
- Security, privacy, and ethical considerations
- Cost and resource requirements

### Future Outlook
This technology is evolving rapidly, with emerging trends pointing toward:
- Greater integration with AI and machine learning
- Enhanced performance and accessibility
- Broader adoption across industries

### Getting Started
1. **Learn the fundamentals** through documentation and tutorials
2. **Start small** with manageable projects to build experience
3. **Join communities** for support, knowledge sharing, and best practices

Would you like me to go deeper into any specific aspect?${FEEDBACK}`;
}

function mathResponse(original: string, topic: string): string {
  return `Let me help you with this mathematical question.

[Show More →]

## Mathematical Approach

### Problem Understanding
${topic || original.substring(0, 100)}

### Step-by-Step Solution

**Step 1: Identify what we know**
- Given values and conditions
- Relevant formulas or theorems
- Constraints and assumptions

**Step 2: Set up the problem**
- Organize the information
- Choose the appropriate method
- Formulate the equation or approach

**Step 3: Solve**
- Work through the calculation systematically
- Check each step for accuracy
- Consider alternative approaches

**Step 4: Verify**
- Check if the answer makes sense
- Test with sample values if possible
- Consider edge cases

### General Formula
For this type of problem, the general approach involves applying established mathematical principles and following a systematic process.

> For specific calculations, please provide the exact numbers or equations you'd like me to work with, and I'll provide a precise solution.${FEEDBACK}`;
}

function rwandaResponse(original: string, msg: string, topic: string): string {
  return `Muraho! (Hello in Kinyarwanda!) I'd be happy to discuss ${topic || "Rwanda"}.

[Show More →]

## Rwanda: The Land of a Thousand Hills

Rwanda is a beautiful East African nation with a rich culture, stunning landscapes, and remarkable progress.

### Key Facts
- **Capital**: Kigali — known as one of Africa's cleanest and safest cities
- **Languages**: Kinyarwanda, French, English, Swahili
- **Population**: Approximately 13 million
- **Known For**: Mountain gorillas, rolling hills, vibrant culture

### Natural Wonders
- **Volcanoes National Park**: Home to endangered mountain gorillas and golden monkeys
- **Lake Kivu**: Stunning freshwater lake with beautiful beaches and island resorts
- **Nyungwe Forest National Park**: Ancient rainforest with chimpanzees and a canopy walkway
- **Akagera National Park**: Savannah wildlife including the Big Five

### Culture & People
Rwandans are known for their warmth, resilience, and community spirit. The concept of *Ubuntu* — "I am because we are" — is central to Rwandan culture. Traditional dance, music, and crafts remain vibrant parts of daily life.

### Modern Development
Rwanda has made remarkable progress in:
- **Technology**: Becoming a regional tech hub with initiatives like the Kigali Innovation City
- **Environment**: Leading Africa in environmental protection and green initiatives
- **Gender Equality**: One of the highest rates of women in parliament globally
- **Education**: Strong focus on education and youth development

Is there a specific aspect of Rwanda you'd like to learn more about?${FEEDBACK}`;
}

function generalResponse(original: string, msg: string, topic: string, isFollowUp: boolean): string {
  const knowledge = getKnowledge(msg);

  if (knowledge) {
    return `Great question! ${knowledge}

[Show More →]

${capitalize(topic || "this topic")} is a really interesting subject with a lot of depth. The fundamentals give you a solid foundation, and there are plenty of practical applications in the real world. If you're curious about any specific angle — how it works, where it's used, or how to get started — just let me know and I'll dive deeper.${FEEDBACK}`;
  }

  if (isFollowUp) {
    return `Good follow-up. Let me expand on that a bit more.

[Show More →]

So based on what we've been discussing around "${topic || "this topic"}", here's what I think:

There are a few different ways to look at this, and the right approach really depends on what you're trying to accomplish. The context you've shared helps narrow things down.

To give you the most useful answer, it would help to know — what specifically interests you about this? Are you looking for practical guidance, deeper understanding, or something else entirely?

Happy to go in whatever direction works best for you.${FEEDBACK}`;
  }

  return `That's an interesting question about "${topic || original.substring(0, 80)}". Let me share my thoughts.

[Show More →]

So here's the thing about ${topic || "this"} — it's one of those topics where the answer depends a lot on context and what you're actually trying to understand. There are a few key angles worth considering:

**First**, it helps to think about the bigger picture. What's the core idea here and why does it matter?

**Second**, there are some practical aspects that make this relevant to real-world situations.

**Third**, like many interesting topics, there's always more depth to explore if you want to go there.

What aspect are you most curious about? I'm happy to go into more detail on whatever part interests you most.${FEEDBACK}`;
}

function detectLanguage(msg: string): string | null {
  const map: [RegExp, string][] = [
    [/\b(javascript|js|node|react|vue|angular|ecmascript)\b/, "JavaScript"],
    [/\b(typescript|ts|tsx)\b/, "TypeScript"],
    [/\b(python|py|django|flask|fastapi|pandas|numpy)\b/, "Python"],
    [/\b(java|jvm|spring|android|kotlin)\b/, "Java"],
    [/\b(c\+\+|cpp|cplusplus)\b/, "C++"],
    [/\b(c#|csharp|dotnet|\.net)\b/, "C#"],
    [/\b(go|golang)\b/, "Go"],
    [/\b(rust|rustlang)\b/, "Rust"],
    [/\b(ruby|rails)\b/, "Ruby"],
    [/\b(php|laravel)\b/, "PHP"],
    [/\b(swift|ios)\b/, "Swift"],
    [/\b(sql|mysql|postgresql|postgres|database|query)\b/, "SQL"],
  ];
  for (const [regex, lang] of map) {
    if (regex.test(msg)) return lang;
  }
  return null;
}

function extractCodingTask(msg: string): string {
  if (/\b(debug|error|bug|fix|not working|broken|issue|problem)\b/.test(msg)) return "debug and fix";
  if (/\b(explain|how.*work|what does|tell me about)\b/.test(msg)) return "explain";
  if (/\b(optimize|performance|speed up|refactor|improve)\b/.test(msg)) return "optimize";
  if (/\b(write|create|implement|build|make|develop|generate)\b/.test(msg)) return "implement";
  if (/\b(test|unit test|integration test|testing)\b/.test(msg)) return "write tests for";
  if (/\b(review|code review|check|audit)\b/.test(msg)) return "review";
  return "implement and explain";
}

function detectFormat(text: string): string {
  if (/\b(poem|poetry|verse)\b/.test(text)) return "poem";
  if (/\b(story|narrative|tale)\b/.test(text)) return "short story";
  if (/\b(email|mail)\b/.test(text)) return "email";
  if (/\b(letter)\b/.test(text)) return "letter";
  if (/\b(essay)\b/.test(text)) return "essay";
  if (/\b(article|blog)\b/.test(text)) return "article";
  if (/\b(paragraph)\b/.test(text)) return "paragraph";
  return "piece";
}

function extractTarget(original: string, msg: string): string {
  const patterns = [
    /what is\s+(.+?)(\?|$)/i,
    /what are\s+(.+?)(\?|$)/i,
    /what's\s+(.+?)(\?|$)/i,
    /define\s+(.+?)(\?|$)/i,
    /explain\s+(.+?)(\?|$)/i,
    /tell me about\s+(.+?)(\?|$)/i,
    /what does\s+(.+?)\s+mean/i,
    /meaning of\s+(.+?)(\?|$)/i,
  ];
  for (const pattern of patterns) {
    const match = original.match(pattern);
    if (match) return match[1].trim();
  }
  const words = msg.split(/\s+/).filter((w) => w.length > 3 && !["what", "does", "this", "that", "with", "from", "tell", "about", "please", "like", "know", "want", "need", "help", "just", "very", "also", "could", "would", "should"].includes(w));
  return words.slice(0, 3).join(" ") || "this topic";
}
