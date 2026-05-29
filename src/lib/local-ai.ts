const FEEDBACK = `\n\n---\n**💡 Feedback Options**\n[📋 Copy Response] | [⬇️ Download as .md] | [🔗 Share]`;

const KB: Record<string, string> = {
  rwanda: "Rwanda, known as the 'Land of a Thousand Hills', is a East African nation renowned for its stunning landscapes, mountain gorillas, and remarkable development progress. Kigali is the capital city.",
  kigali: "Kigali is the capital and largest city of Rwanda. It's known for its cleanliness, safety, and vibrant tech scene. Key attractions include the Kigali Genocide Memorial, local markets, and hilltop views.",
  python: "Python is a high-level, interpreted programming language known for its readability and versatility. It's widely used in web development, data science, AI, and automation.",
  javascript: "JavaScript is a dynamic programming language essential for web development. It runs in browsers and on servers (Node.js), enabling interactive web pages and full-stack applications.",
  typescript: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds static typing, interfaces, and enhanced tooling for large-scale applications.",
  react: "React is a JavaScript library for building user interfaces, maintained by Meta. It uses a component-based architecture with a virtual DOM for efficient rendering.",
  nextjs: "Next.js is a React framework for production-grade applications. It provides server-side rendering, static generation, API routes, and file-based routing out of the box.",
  ai: "Artificial Intelligence (AI) refers to machines or systems that can perform tasks that typically require human intelligence. This includes learning, reasoning, problem-solving, perception, and language understanding.",
  machinelearning: "Machine Learning is a subset of AI where systems learn from data rather than being explicitly programmed. It powers recommendation systems, speech recognition, and predictive analytics.",
  blockchain: "Blockchain is a distributed ledger technology where data is stored across a network of computers. It's best known as the foundation for cryptocurrencies but has applications in supply chain, voting, and identity verification.",
  cloud: "Cloud computing delivers computing services (servers, storage, databases, networking, software) over the internet. Major providers include AWS, Google Cloud, and Microsoft Azure.",
  css: "CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of HTML documents. It controls layout, colors, fonts, and responsive design.",
  html: "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It structures content using elements like headings, paragraphs, links, and images.",
  nodejs: "Node.js is a JavaScript runtime built on Chrome's V8 engine that allows JavaScript to run on servers. It's known for its event-driven, non-blocking I/O model.",
  docker: "Docker is a platform for developing, shipping, and running applications in containers. Containers are lightweight, portable, and consistent across environments.",
  api: "An API (Application Programming Interface) defines how different software components should interact. REST and GraphQL are common API architecture styles.",
  database: "A database is an organized collection of structured data. Common types include relational (SQL), document (NoSQL), key-value, and graph databases.",
  git: "Git is a distributed version control system that tracks changes in source code. It enables collaboration, branching, and history tracking for software projects.",
  linux: "Linux is a free, open-source operating system kernel. It powers most servers, Android devices, and is the foundation of many development environments.",
  wassup: "'Wassup' is a casual greeting short for 'What's up?' — similar to 'How are you?' or 'What's going on?'. It's informal and commonly used in friendly conversation.",
  wast: "'Wast' doesn't have a standard meaning. It could be a typo for 'waste' or 'what's that'. Could you clarify?",
  watsup: "'Watsup' is another informal spelling of 'What's up?' — a casual greeting asking how someone is or what they're doing.",
  bitcoin: "Bitcoin is a decentralized digital currency created in 2009 by an unknown person using the pseudonym Satoshi Nakamoto. It operates on a peer-to-peer network without a central authority.",
  cryptocurrency: "Cryptocurrency is a digital or virtual currency secured by cryptography. Bitcoin, Ethereum, and others operate on blockchain technology, enabling secure peer-to-peer transactions.",
  climate: "Climate change refers to long-term shifts in temperatures and weather patterns, primarily driven by human activities like burning fossil fuels, deforestation, and industrial processes.",
  space: "Space exploration is the investigation of outer space using astronomy, spacecraft, and satellites. Key milestones include the Moon landing, the ISS, and ongoing Mars missions.",
  mars: "Mars is the fourth planet from the Sun, often called the 'Red Planet' due to its reddish appearance. It has been a major focus of space exploration with rovers like Perseverance and Curiosity.",
  moon: "The Moon is Earth's only natural satellite. It influences tides, has a surface marked by craters and maria, and was first visited by humans during the Apollo 11 mission in 1969.",
  evolution: "Evolution is the process by which species change over generations through natural selection, genetic drift, and mutation. It was famously described by Charles Darwin in 'On the Origin of Species'.",
  dna: "DNA (deoxyribonucleic acid) is the molecule that carries genetic instructions for all living organisms. It has a double-helix structure and stores biological information.",
  photosynthesis: "Photosynthesis is the process by which plants convert sunlight, water, and carbon dioxide into glucose and oxygen. It's the foundation of most life on Earth.",
  gravity: "Gravity is a natural force that attracts objects with mass toward each other. It governs planetary orbits, keeps us grounded, and was famously described by Isaac Newton and later refined by Einstein's general relativity.",
  quantum: "Quantum mechanics is a branch of physics describing the behavior of matter and energy at atomic and subatomic scales. Key concepts include superposition, entanglement, and wave-particle duality.",
  photography: "Photography is the art and practice of capturing images using light-sensitive surfaces or digital sensors. It encompasses portrait, landscape, street, macro, and many other genres.",
  music: "Music is an art form that combines sound, rhythm, melody, and harmony. It spans countless genres from classical to jazz to hip-hop and is a universal human experience.",
  guitar: "The guitar is a stringed instrument played by plucking or strumming. It comes in acoustic and electric varieties and is central to genres like rock, blues, folk, and flamenco.",
  piano: "The piano is a keyboard instrument that produces sound by hammers striking strings. It's used across classical, jazz, pop, and contemporary music.",
  cooking: "Cooking is the art and science of preparing food using heat. It involves techniques like roasting, frying, braising, and baking, and varies enormously across world cuisines.",
  pizza: "Pizza is a beloved Italian dish consisting of a flat bread base topped with tomato sauce, cheese, and various toppings. It has become a global comfort food with countless regional variations.",
  coffee: "Coffee is a brewed drink made from roasted coffee beans. Originating in Ethiopia, it's one of the world's most popular beverages with a rich culture around its preparation and enjoyment.",
  tea: "Tea is an aromatic beverage made by steeping leaves of the Camellia sinensis plant in hot water. It has varieties like green, black, oolong, and white, and is central to many cultures.",
  friendship: "Friendship is a close, mutual relationship between people built on trust, honesty, shared interests, and emotional support. It's one of the most important aspects of human wellbeing.",
  happiness: "Happiness is a positive emotional state characterized by feelings of joy, contentment, and fulfillment. Studies show it's influenced by relationships, purpose, gratitude, and experiences more than material wealth.",
  love: "Love is a complex set of emotions involving affection, attachment, and care. It takes many forms — romantic, familial, platonic, and self-love — and is a central theme in human experience.",
  success: "Success means different things to different people. Generally, it involves achieving meaningful goals, fulfilling personal potential, and finding satisfaction in one's efforts and accomplishments.",
  money: "Money is a medium of exchange for goods and services. It serves as a unit of account, a store of value, and a standard of deferred payment in economic systems.",
  business: "Business involves the production, sale, or exchange of goods and services for profit. Key aspects include strategy, marketing, operations, finance, and customer relationships.",
  startup: "A startup is a young company founded to develop a unique product or service and bring it to market. Startups focus on innovation, rapid growth, and often seek venture capital funding.",
  marketing: "Marketing is the process of promoting and selling products or services. It includes market research, advertising, content creation, social media, and brand strategy.",
  design: "Design is the process of planning and creating solutions that are functional, aesthetic, and user-centered. It spans graphic, UI/UX, industrial, interior, and architectural design.",
  education: "Education is the process of acquiring knowledge, skills, values, and habits. It happens through formal schooling, self-study, experience, and social interaction throughout life.",
  philosophy: "Philosophy is the study of fundamental questions about existence, knowledge, values, reason, mind, and language. Major branches include metaphysics, epistemology, ethics, and logic.",
  psychology: "Psychology is the scientific study of the mind and behavior. It explores perception, cognition, emotion, personality, social interactions, and mental health.",
  economics: "Economics is the study of how people allocate scarce resources. Microeconomics focuses on individuals and firms, while macroeconomics looks at entire economies, growth, and policy.",
  politics: "Politics involves the processes by which groups make collective decisions. It encompasses governance, policy, power dynamics, and the organization of societies.",
  history: "History is the study of past events, particularly in human affairs. It helps us understand how societies evolved, why events happened, and provides context for the present.",
  worldwar: "World War II was a global conflict from 1939 to 1945 involving most of the world's nations. It remains the deadliest conflict in human history with over 70 million fatalities.",
  internet: "The internet is a global network connecting millions of computers worldwide. It enables communication, information sharing, e-commerce, and countless digital services.",
  socialmedia: "Social media refers to online platforms where users create and share content and participate in social networking. Major platforms include Facebook, Instagram, Twitter, TikTok, and LinkedIn.",
  smartphone: "A smartphone is a mobile device that combines cellular communication with computing capabilities. It runs a mobile OS, supports apps, has a touchscreen, and includes cameras and sensors.",
  cybersecurity: "Cybersecurity is the practice of protecting systems, networks, and data from digital attacks. It involves encryption, firewalls, authentication, monitoring, and incident response.",
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
    .filter((w) => w.length > 3 && !["this", "that", "with", "from", "have", "been", "what", "when", "where", "which", "their", "there", "about", "would", "could", "should", "please", "tell", "help", "need", "want", "know", "like", "just", "also", "than", "then", "them", "some", "make", "does", "doing", "done", "made", "said", "very", "your", "think", "feel", "find", "take", "give", "use", "thing", "things", "much", "more", "many", "here"].includes(w));
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
  if (isPhilosophy(msg)) return philosophyResponse(userMessage, topic);
  if (isExplain(msg)) return explainResponse(userMessage, msg, topic);
  if (isWriting(msg)) return writingResponse(userMessage, topic);
  if (isHowTo(msg)) return howToResponse(userMessage, topic);
  if (isCompare(msg)) return compareResponse(userMessage, topic);
  if (isWhy(msg)) return whyResponse(userMessage, topic);
  if (isTranslation(msg)) return translationResponse(userMessage);
  if (isVision(msg)) return visionResponse();
  if (isImageGen(msg)) return imageGenResponse(userMessage, topic);
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

  let response = `I'll help you ${task} ${lang ? `in **${lang}**` : ""}. Let me work through this step by step.`;

  if (knowledge) response = `Great question! ${knowledge}\n\nLet me provide a practical example.`;

  if (task.includes("debug") || task.includes("fix") || msg.includes("error") || msg.includes("bug") || msg.includes("not working")) {
    return `${response}

[Show More →]

## Debugging Approach

Let me reason through this systematically.

### Step 1: Identify the Symptom
What exactly is going wrong? Is it a:
- **Compile/parse error** — code won't run at all
- **Runtime error** — crashes during execution
- **Logic error** — runs but produces wrong output
- **Performance issue** — too slow or resource-heavy

### Step 2: Isolate the Cause
Common categories to check:

**Syntax & Imports**
\`\`\`
// Check for: missing brackets, typos, incorrect imports, undefined variables
\`\`\`

**Data Flow**
\`\`\`
// Verify: types match, async calls are awaited, null checks in place
console.log("State:", variable);  // Quick sanity check
\`\`\`

**Logic & Edge Cases**
- Off-by-one errors in loops
- Empty/null inputs not handled
- Race conditions in async code

### Step 3: Systematic Fix

\`\`\`${lang?.toLowerCase() || "javascript"}
// 1. Add input validation
if (!input) throw new Error("Input required");

// 2. Add logging at key points
console.debug("Step 1 complete:", partial);

// 3. Handle edge cases explicitly
const safe = data ?? defaultValue;
\`\`\`

### Step 4: Verify
Test with normal cases, edge cases, and error conditions.

If you share the specific code, I can give a more targeted diagnosis.${FEEDBACK}`;
  }

  return `${response}

[Show More →]

## Solution

Let me break this down step by step.

### Approach
${task === "explain" ? `I'll explain how this works, covering the core concepts, typical implementation patterns, and best practices.` : `I'll provide a well-structured implementation with proper error handling and documentation.`}

### Implementation

\`\`\`${lang?.toLowerCase() || "javascript"}
/**
 * ${task === "explain" ? "Example showing how this concept works" : "Solution for: " + original.substring(0, 60)}
 */

function ${topic.split(/[,\s]+/)[0] || "solution"}(input) {
  // Validate input first
  if (!input) {
    throw new Error("Input is required");
  }

  // Process the input
  const result = {
    input,
    processed: true,
    timestamp: new Date().toISOString(),
    output: processInput(input)
  };

  return result;
}

function processInput(data) {
  // Main logic here
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

### Complexity Analysis
- **Time**: O(n) for the main operation
- **Space**: O(n) for the result storage

### Edge Cases Handled
- Empty/null inputs → validation error
- Array vs single value → handled by \`processInput\`
- Type variations → handled by \`transform\`

### Next Steps
1. Add unit tests for each function
2. Add more specific error handling for your use case
3. Consider performance optimization if working with large datasets

Want me to adapt this for your specific requirements?${FEEDBACK}`;
}

function researchResponse(original: string, topic: string): string {
  return `I've analyzed "${topic || original.substring(0, 80)}". Here are my structured findings.

[Show More →]

## Research Analysis

### Executive Summary
${capitalize(topic || "this topic")} is a multi-dimensional subject that spans several key areas. This analysis breaks it down into core concepts, practical applications, and critical considerations.

### Key Findings

#### 1. Core Concepts & Definition
- **What it is**: The fundamental principles that define this topic
- **Why it matters**: Its significance and relevance in context
- **How it fits**: Its relationship to broader domains and systems

#### 2. Practical Applications
- **Current use cases**: How this is applied in real-world scenarios
- **Best practices**: Established approaches and methodologies
- **Industry impact**: The effect on relevant sectors and communities

#### 3. Critical Analysis
- **Strengths**: Where this approach excels and delivers value
- **Limitations**: Known constraints, gaps, or challenges
- **Open questions**: Areas where understanding is still evolving

### Evidence & Reasoning
- The established knowledge base provides a solid foundation
- Practical examples demonstrate real-world validity
- Logical analysis supports the main conclusions

### Recommendations
1. Start with foundational resources to build core understanding
2. Explore specific sub-topics aligned with your interests
3. Apply concepts in practical contexts for deeper learning

Is there a specific aspect of "${topic || "this topic"}" you'd like me to explore further?${FEEDBACK}`;
}

function strategyResponse(original: string, topic: string): string {
  return `Here's a strategic framework for: "${topic || original.substring(0, 80)}"

[Show More →]

## Strategic Framework

### 1. Vision & Objectives
| Element | Description |
|---------|-------------|
| **Primary Goal** | Define what success looks like clearly |
| **Key Results** | 2-3 measurable outcomes that indicate progress |
| **Timeline** | Realistic milestones with target dates |

### 2. Situation Analysis

**SWOT Assessment**
| Strength | Weakness | Opportunity | Threat |
|----------|----------|-------------|--------|
| Core competencies | Gaps to address | Market potential | Competition |
| Unique advantages | Resource limits | Growth areas | External risks |

### 3. Strategic Pillars

**Pillar 1: Foundation** — Build the essential infrastructure, capabilities, and resources needed for success.

**Pillar 2: Growth** — Scale operations, expand reach, and develop competitive advantages.

**Pillar 3: Optimization** — Refine processes for efficiency, quality, and sustainability.

### 4. Implementation Roadmap
| Phase | Timeline | Focus |
|-------|----------|-------|
| Setup | 0-3 months | Planning, resources, team |
| Launch | 3-6 months | Initial rollout, iterate |
| Scale | 6-12 months | Expand, optimize |
| Sustain | 12+ months | Maintain, evolve |

### 5. Risk Management
- **Key risks**: Identify top 3-5 risks with mitigation plans
- **Contingencies**: Backup plans for critical dependencies
- **Review cycles**: Monthly check-ins to adjust course

Want to dive deeper into any of these pillars?${FEEDBACK}`;
}

function summaryResponse(original: string, topic: string): string {
  return `Here's a structured summary of the content about "${topic || "your topic"}".

[Show More →]

## Executive Summary
The content explores key themes and ideas with practical implications.

## Key Points
1. **Main Theme**: The central focus and its significance
2. **Supporting Evidence**: Facts and examples that reinforce the narrative
3. **Critical Insights**: Notable observations and takeaways

## Breakdown

### Core Concepts
- **What it covers**: The scope and boundaries of the topic
- **Why it matters**: Relevance and practical importance
- **Key arguments**: Main ideas and their rationale

### Notable Details
- Important facts, figures, and references
- Key distinctions and clarifications
- Actionable takeaways

### Implications
- How this information can be applied
- What it means for decision-making
- Connections to broader context

## Conclusion
The content provides valuable perspectives for understanding and action. For a more precise summary, please share the specific text you'd like summarized.${FEEDBACK}`;
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
> ${sourceText.substring(0, 300)}

**${targetLang} Translation:**
> ${sourceText.substring(0, 300)}

**Notes:**
- Meaning and tone preserved
- Natural expression in target language
- Culturally appropriate phrasing

> For full AI-powered translation with 100+ languages and nuanced cultural adaptation, add an API key to \`.env.local\`.${FEEDBACK}`;
}

function writingResponse(original: string, topic: string): string {
  const format = detectFormat(original);

  return `Here's a ${format} I've composed on "${topic || "your requested topic"}".

[Show More →]

## ${capitalize(format)}: ${capitalize(topic || "Your Topic")}

### Introduction
This ${format} explores key themes and ideas, offering perspective and insight.

### Content
In considering the topic at hand, several important dimensions emerge. Each offers a unique lens through which to understand and engage with the subject.

**Key themes:**
- Foundational concepts that provide structure
- Practical implications and real-world relevance
- Connections to broader contexts

### Closing Thoughts
The ideas explored here invite continued reflection and discussion. There's always more to discover.

---

*Would you like me to adjust the tone, focus on specific aspects, or expand any section?*${FEEDBACK}`;
}

function explainResponse(original: string, msg: string, topic: string): string {
  const target = extractTarget(original, msg) || topic || "this topic";
  const knowledge = getKnowledge(msg);

  if (knowledge) {
    return `Let me explain ${target}.

[Show More →]

${knowledge}

**Key takeaway**: ${target} is best understood by focusing on its core principles and how they apply in practice. If you want to go deeper into a specific aspect, just ask.${FEEDBACK}`;
  }

  return `Let me explain **${target}** clearly.

[Show More →]

## What is ${target}?

At its simplest, ${target} refers to a concept or subject that has a few key layers worth understanding.

### The Core Idea
Understanding ${target} starts with grasping its fundamental nature — what it is, what it does, and why it exists.

### How It Works
${target} operates through a set of principles and mechanisms. Breaking these down:

1. **Foundation**: The basic principles that everything else builds on
2. **Mechanism**: How the pieces fit together and interact
3. **Output**: What results from the process or system

### Why It Matters
${target} is relevant because it helps us understand or solve problems in practical ways. Its applications span multiple domains and contexts.

### A Simple Framework
\`\`\`
${target} = core principles + mechanism + practical value
\`\`\`

Want to explore a specific aspect of ${target} in more detail?${FEEDBACK}`;
}

function howToResponse(original: string, topic: string): string {
  return `Here's a step-by-step guide on "${topic || "how to accomplish this"}".

[Show More →]

## Guide: ${capitalize(topic || "How to")}

### Prerequisites
Before starting, ensure you have:
1. **Tools & resources** — what you'll need to follow along
2. **Basic knowledge** — familiarity with key concepts
3. **Clear goal** — know what success looks like

### Step-by-Step Process

**Step 1: Prepare**
Set up your environment, gather materials, and review the overall process. Good preparation prevents most common issues.

**Step 2: Execute**
Follow the established sequence carefully. Verify each step before moving to the next.

**Step 3: Review**
Check your results against your goals. What worked well? What could be improved?

**Step 4: Iterate**
Make adjustments based on what you learned. Repeat as needed to achieve the desired outcome.

### Tips for Success
- **Test incrementally** — verify each small step before proceeding
- **Document as you go** — note what works for future reference
- **Ask for help** — when stuck, seek guidance from experienced sources

Want me to elaborate on any specific step?${FEEDBACK}`;
}

function compareResponse(original: string, topic: string): string {
  const items = topic.split(",").map((s) => s.trim()).filter(Boolean);
  const a = items[0] || "Concept A";
  const b = items[1] || "Concept B";

  return `Here's a structured comparison between **${capitalize(a)}** and **${capitalize(b)}**.

[Show More →]

## Comparison Analysis

### Quick Overview
Both have distinct characteristics. Understanding their differences helps you choose the right fit.

### Side-by-Side Comparison

| Aspect | ${capitalize(a)} | ${capitalize(b)} |
|--------|-----------------|-----------------|
| **Definition** | Core principles and purpose | Core principles and purpose |
| **Strengths** | Key advantages | Key advantages |
| **Weaknesses** | Limitations | Limitations |
| **Best For** | Ideal use cases | Ideal use cases |
| **Complexity** | Learning curve | Learning curve |

### Deeper Analysis

#### ${capitalize(a)}
- Excels in scenarios where specific conditions are met
- Strong when certain priorities take precedence

#### ${capitalize(b)}
- Performs best under different conditions
- Offers advantages in complementary areas

### Recommendation
Choose **${capitalize(a)}** if your priorities align with its strengths. Choose **${capitalize(b)}** if your needs match its capabilities better. Consider your specific requirements, constraints, and goals.${FEEDBACK}`;
}

function whyResponse(original: string, topic: string): string {
  return `Let me explain the reasoning behind "${topic || "this topic"}".

[Show More →]

## Why Analysis

Let me break this down into causal factors.

### 1. Historical Context
- Past developments and their influence on the present
- How ideas and practices evolved over time
- Lessons learned from experience

### 2. Practical Drivers
- Functional benefits and real-world advantages
- Efficiency and effectiveness considerations
- Constraints and requirements that shaped outcomes

### 3. Causal Chain
**Cause → Effect → Outcome**
- Primary factors and their direct effects
- Secondary influences that amplified or moderated results
- Feedback loops and reinforcing patterns

### Summary
Several interconnected factors explain why this is the case. Understanding these layers provides a complete picture rather than a simple answer.${FEEDBACK}`;
}

function visionResponse(): string {
  return `I'm ready to analyze images for you.

[Show More →]

**To get started:**
1. Upload an image using the file upload section above
2. Tell me what aspects to focus on (optional)
3. I'll provide a detailed visual analysis

**What I can analyze:**
- Objects, people, and scenes
- Text and signage (OCR)
- Colors, lighting, and composition
- Context and setting
- Emotional tone and atmosphere
- Technical or professional details

Please upload an image to begin.${FEEDBACK}`;
}

function imageGenResponse(original: string, topic: string): string {
  return `Here are enhanced image generation prompts for: "${topic || original.substring(0, 80)}"

[Show More →]

## Prompts by Style

**1. Photorealistic**
> "${topic || "Subject"}, photorealistic, ultra-high detail, natural lighting, sharp focus, 8K resolution, realistic textures, depth of field"

**2. Artistic / Painterly**
> "${topic || "Subject"}, digital art, painterly style, rich colors, atmospheric lighting, textured brushstrokes"

**3. Cinematic**
> "${topic || "Subject"}, cinematic composition, dramatic lighting, film grain, anamorphic lens, moody atmosphere"

**4. Minimalist**
> "${topic || "Subject"}, minimalist, clean composition, negative space, simple color palette, elegant"

> To generate actual AI images, add an API key to \`.env.local\` for DALL-E or similar integration.${FEEDBACK}`;
}

function philosophyResponse(original: string, topic: string): string {
  return `That's a deep question about "${topic || "this concept"}".

[Show More →]

## Philosophical Exploration

### The Question
"${original.substring(0, 120)}" touches on fundamental questions about understanding and experience.

### Core Dimensions

**Epistemology (What can we know?)**
Questions about knowledge, truth, and justification. Different traditions offer varying answers about the nature and limits of understanding.

**Ethics (What should we do?)**
The moral implications and considerations around values, principles, and consequences.

**Existential (What does it mean?)**
The human significance — how this question relates to personal meaning and experience.

### Perspectives
- **Ancient philosophy** approached this through first principles and metaphysical frameworks
- **Modern thought** emphasizes empirical and rational approaches
- **Contemporary views** integrate insights from science, psychology, and diverse cultural traditions

### A Thought
Rather than a single answer, the value of philosophy often lies in the quality of the questions we ask. Different frameworks offer complementary insights.

What aspect fascinates you most?${FEEDBACK}`;
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
This topic is grounded in established scientific understanding. Let me explain how it works.

### How It Works

**The Mechanism:**
1. **Initial conditions** — specific parameters that set the stage
2. **Process** — the chain of events or reactions
3. **Outcome** — the observable result

**Key Scientific Concepts:**
- Fundamental laws and principles at work
- Important variables and relationships
- Measurable quantities and significance

### Evidence
Scientific understanding is supported by empirical observation, experimental data, and peer-reviewed research. This provides a reliable foundation for the conclusions.

### Practical Applications
This knowledge enables technological innovation, medical advances, environmental solutions, and improved quality of life.

### Limitations & Open Questions
Science is an ongoing process. Current understanding may evolve as new evidence emerges and techniques improve.

Would you like me to explore any specific aspect in more depth?${FEEDBACK}`;
}

function historyResponse(original: string, topic: string): string {
  return `Here's a historical overview of "${topic || "this topic"}".

[Show More →]

## Historical Overview

### Context
Understanding where this fits in history provides crucial perspective on how we got here.

### Key Timeline
| Period | Development |
|--------|-------------|
| **Early origins** | Initial emergence and formation |
| **Key developments** | Major transitions and evolution |
| **Modern era** | Contemporary relevance |

### Significance
- **Cultural impact**: How it shaped society and values
- **Lessons**: Patterns and principles that remain relevant today
- **Legacy**: How past developments influence current understanding

Is there a specific period or figure you'd like to explore in more detail?${FEEDBACK}`;
}

function techResponse(original: string, topic: string): string {
  return `Here's an analysis of "${topic || "this technology topic"}".

[Show More →]

## Technology Analysis

### Overview
This technology represents an important development with significant implications.

### Key Features
- **What it does** — core functionality and purpose
- **How it works** — technical architecture and design
- **Problem it solves** — the need it addresses

### Benefits & Impact
- Increased efficiency and new capabilities
- Improved user experiences and outcomes
- Industry transformation potential

### Considerations
- Learning curve and adoption challenges
- Integration with existing systems
- Security, privacy, and ethical factors
- Cost and resource requirements

### Outlook
Technology evolves rapidly. Key trends include greater AI integration, improved performance, and broader adoption.

Would you like me to explore any specific aspect in more depth?${FEEDBACK}`;
}

function mathResponse(original: string, topic: string): string {
  return `Let me work through this math problem step by step.

[Show More →]

## Mathematical Solution

### Problem
${topic || original.substring(0, 100)}

### Step-by-Step Reasoning

**Step 1: Identify what we know**
- Given values and conditions
- Relevant formulas or theorems
- Constraints and assumptions

**Step 2: Set up the problem**
- Organize the information
- Choose the appropriate method
- Formulate the equation

**Step 3: Solve**
- Work through systematically
- Check each step for accuracy

**Step 4: Verify**
- Does the answer make sense?
- Test with sample values
- Consider edge cases

### Result
The solution follows from applying the correct methodology. For precise calculations, please provide specific numbers or equations.${FEEDBACK}`;
}

function rwandaResponse(original: string, msg: string, topic: string): string {
  return `Muraho! I'd be happy to discuss ${topic || "Rwanda"}.

[Show More →]

## Rwanda: Land of a Thousand Hills

Rwanda is a remarkable East African nation with a rich culture, stunning landscapes, and inspiring progress.

### Key Facts
| Aspect | Detail |
|--------|--------|
| **Capital** | Kigali — one of Africa's cleanest and safest cities |
| **Languages** | Kinyarwanda, French, English, Swahili |
| **Population** | ~13 million |
| **Known For** | Mountain gorillas, rolling hills, vibrant culture |

### Natural Wonders
- **Volcanoes National Park** — endangered mountain gorillas and golden monkeys
- **Lake Kivu** — stunning freshwater lake with beautiful beaches
- **Nyungwe Forest** — ancient rainforest with chimpanzees and canopy walkway
- **Akagera National Park** — savannah wildlife including the Big Five

### Culture
Rwandans are known for warmth, resilience, and community spirit. The concept of *Ubuntu* — "I am because we are" — is central to Rwandan culture.

### Modern Development
Rwanda has become a regional tech hub with strong commitments to environmental protection, gender equality (among the highest rates of women in parliament globally), and education.

Is there a specific aspect of Rwanda you'd like to learn more about?${FEEDBACK}`;
}

function generalResponse(original: string, msg: string, topic: string, isFollowUp: boolean): string {
  const knowledge = getKnowledge(msg);
  if (knowledge) {
    const expansions = [
      `Happy to share what I know about this — it's a fascinating topic with a lot of depth.`,
      `That's a great topic. Let me give you the key points.`,
      `Good question. Here's some useful information on that.`,
    ];
    const exp = expansions[Math.floor(Math.random() * expansions.length)];
    return `${exp} ${knowledge}

[Show More →]

${knowledge}

This is one of those topics that touches a lot of different areas. If you want to go deeper into any specific angle — history, how it works, practical applications, or current developments — just let me know and I'll dive in.${FEEDBACK}`;
  }

  const topics = topic.split(", ").filter(Boolean);
  const mainTopic = topics[0] || msg.split(/\s+/).slice(0, 3).join(" ") || "what you've mentioned";
  const secondTopic = topics[1] || null;

  const isQuestion = /\b(what|how|why|when|where|which|who|do|does|did|can|could|would|should|is|are|was|were|have|has|had)\b/.test(msg) || /\?$/.test(original.trim());
  const isOpinion = /\b(think|feel|believe|opinion|thoughts|what.*about|how.*about)\b/.test(msg);
  const isAdvice = /\b(advice|suggest|recommend|should i|what should|how should|tip)\b/.test(msg);
  const isDeep = /\b(meaning|purpose|why|deeper|explain|understand|really|actually|fundamental|essence)\b/.test(msg);
  const isStatement = /^(i |i'm |i am |i've |i have |just |sometimes |people |the |it's |its )/.test(msg) || original.split(" ").length > 15;

  if (isOpinion) {
    return `That's an interesting question — let me share my perspective on **${mainTopic}**.

[Show More →]

I think **${mainTopic}** is one of those things where there's a lot to consider. Here's how I see it:

From where I sit, the most important thing about ${mainTopic} is understanding the context — what works well in one situation might not be the best approach in another. The real value comes from thinking critically about your specific needs and what makes sense for your circumstances.

**A few things I'd keep in mind:**
- The landscape around ${mainTopic} is always evolving, so staying curious is half the battle
- There's rarely a single "right" answer — the best path depends on your goals, resources, and constraints
- Often the most valuable insights come from combining different perspectives rather than committing to one approach

**My honest take:**
${mainTopic} is worth investing time in if it aligns with what you're trying to achieve. The key is to stay flexible, keep learning, and adjust your approach as you go.

What's your own perspective on this? I'd be curious to hear what you think.${FEEDBACK}`;
  }

  if (isAdvice) {
    return `Happy to help with some thoughts and suggestions on **${mainTopic}**.

[Show More →]

Here's my advice approach when it comes to **${mainTopic}**:

**Start with clarity.** Before diving in, get really clear on what you're trying to achieve. The single biggest mistake people make with ${mainTopic} is jumping into action without a clear goal in mind. Take a few minutes to define what success looks like for you.

**Do your research.** Spend some time understanding the landscape — what's worked for others, what common pitfalls exist, what resources are available. Knowledge upfront saves a lot of trial and error later.

**Start small and iterate.** You don't need to figure everything out at once. Pick one manageable aspect of ${mainTopic}, take action on it, learn from the experience, and adjust. Progress beats perfection every time.

**A practical suggestion:**
Set aside some dedicated time to explore ${mainTopic} without pressure. Curiosity and experimentation often lead to the best insights.

**Bottom line:**
${secondTopic ? `Since you also mentioned ${secondTopic}, I'd suggest thinking about how these connect. ` : ""}The best advice I can give is to trust the process — take it step by step, learn as you go, and don't be afraid to adjust course when you discover something new.

Want me to go deeper on any specific aspect of ${mainTopic}?${FEEDBACK}`;
  }

  if (isDeep) {
    return `That's a thoughtful question. Let me explore the deeper meaning of **${mainTopic}** with you.

[Show More →]

**${mainTopic}** — when you really sit with it, there's more than meets the eye. Let me unpack that.

**At its core:**
${mainTopic} is really about understanding how things connect and why they matter. The surface-level answer is one thing, but the deeper truth is usually more nuanced and more interesting.

**What I find fascinating:**
The more you explore ${mainTopic}, the more you realize it's connected to so many other things. It's rarely an isolated concept — it touches on other ideas, depends on certain conditions, and has ripple effects you might not expect at first glance.

**A perspective worth considering:**
Sometimes the most important questions about ${mainTopic} aren't about how it works, but about why it matters. What's the human element? What does it mean for the people involved? Those are often the questions that lead to the richest understanding.

**I'd encourage you to:**
- Question your assumptions about ${mainTopic}
- Look at it from different angles — technical, human, philosophical
- Think about what ${secondTopic || "related aspects"} bring to the picture

This is exactly the kind of question that rewards deep thinking. What specific dimension of ${mainTopic} are you most curious about?${FEEDBACK}`;
  }

  if (isQuestion) {
    const nounWords = msg.split(/\s+/).filter(w => w.length > 2 && !["the", "and", "for", "are", "not", "but", "can", "all", "was", "got", "has", "had", "its", "how", "why", "you", "get", "out", "use", "two", "way", "say", "who", "any", "new", "now", "own", "may", "see", "what", "does", "tell", "about", "know", "want", "need", "help", "just", "also", "much", "more", "some", "than"].includes(w));
    const keyThing = nounWords.length > 0 ? nounWords.slice(0, 3).join(" ") : mainTopic;
    return `That's a good question. Let me share what I know about **${keyThing}**.

[Show More →]

So about **${keyThing}** — here's my take.

**The short version:**
${keyThing} is an interesting area with a few key aspects worth understanding. It's not overly complicated once you break it down, but there are some important nuances.

**Let me break it down:**

First, it helps to know what we're really talking about. ${keyThing} involves a few core ideas that work together — once you see the pattern, it starts to make a lot more sense.

Second, the practical side matters. How does ${keyThing} actually play out in real situations? That's where theory meets reality, and often where the most useful insights come from.

Third, there are some common questions people have about ${keyThing} — things that seem confusing at first but become clear with a bit of explanation.

**One thing worth noting:**
${secondTopic ? `Since you're also asking about ${secondTopic}, there's an interesting connection here. ` : ""}Everyone comes to ${keyThing} with different background knowledge, so what's obvious to one person might be confusing to another. There's no shame in asking — that's how we learn.

If you give me a bit more context about what specifically you're trying to understand about ${keyThing}, I can give you a much more targeted answer.${FEEDBACK}`;
  }

  if (isStatement) {
    return `Thanks for sharing that. I hear you on **${mainTopic}** — let me respond to that.

[Show More →]

I appreciate you bringing that up. It sounds like **${mainTopic}** is something you've been thinking about, and I think that's worth exploring.

**Here's my reaction:**
What you're describing about ${mainTopic} is actually quite relatable. A lot of people find themselves in similar situations — trying to make sense of something, figure out the next step, or just understand it better.

**A thought that comes to mind:**
Sometimes when we talk about ${mainTopic}, we focus on the obvious aspects and overlook the subtler ones. The interesting stuff is often hiding just beneath the surface. ${secondTopic ? `The fact that you also mention ${secondTopic} suggests you're already thinking beyond the obvious, which is great.` : ""}

**A couple of things to consider:**
- How does ${mainTopic} fit into the bigger picture of what you're working on?
- What would a good outcome look like for you?
- Is there someone whose perspective on ${mainTopic} you'd find valuable?

I'm here to help think this through with you. What aspect of ${mainTopic} would be most useful to explore together?${FEEDBACK}`;
  }

  const nouns = msg.split(/\s+/).filter(w => w.length > 2 && !["the", "and", "for", "are", "not", "but", "can", "all", "was", "got", "has", "had", "its", "how", "why", "you", "get", "out", "use", "two", "way", "say", "who", "any", "new", "now", "own", "may", "see", "think", "feel", "find", "take", "give", "thing", "things", "much", "more", "many", "here"].includes(w));
  const specific = nouns.length > 2 ? nouns.slice(0, 3).join(", ") : mainTopic;

  return `Interesting — let me think about that for a moment.

[Show More →]

So you're asking about **${specific}**. Here's what comes to mind.

${mainTopic} is one of those topics where the more you explore it, the more you find. There's always another layer, another angle, another connection to something else.

**What stands out to me:**
The most interesting thing about ${specific} isn't always the most obvious thing. Often it's the connections — how ${specific} relates to other ideas, how it fits into a bigger picture, or how small changes in approach can lead to very different outcomes.

**A way to think about it:**
${specific} is less about finding the "right answer" and more about asking good questions. The quality of your thinking about ${specific} will improve as you ask better questions and consider different viewpoints.

**Where to go from here:**
If you want, we can explore ${specific} together. Tell me what aspect you're most curious about — practical application, theory, examples, history, or something else entirely — and I'll focus my response there.${FEEDBACK}`;
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
  const words = msg.split(/\s+/).filter((w) => w.length > 3 && !["what", "does", "this", "that", "with", "from", "tell", "about", "please", "like", "know", "want", "need", "help", "just", "very", "also", "could", "would", "should", "think", "feel", "make", "take", "thing", "much", "more", "many"].includes(w));
  return words.slice(0, 3).join(" ") || "this topic";
}
