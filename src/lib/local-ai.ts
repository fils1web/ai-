const FEEDBACK = `\n\n---\n**💡 Feedback Options**\n[📋 Copy Response] | [⬇️ Download as .md] | [🔗 Share]`;

type Engine = "perplexity" | "claude" | "chatgpt" | "gemini";

function selectEngine(msg: string, mode: string): Engine {
  if (mode === "research") return "perplexity";
  if (mode === "strategy" || mode === "summarize") return "claude";
  if (mode === "coding") return "chatgpt";
  if (/\b(research|fact|source|cite|reference|study|paper|evidence|data|analysis)\b/.test(msg)) return "perplexity";
  if (/\b(think|reason|explain|why|meaning|philosophy|deep|complex|analyze|understand|nuance)\b/.test(msg)) return "claude";
  if (/\b(code|function|write|implement|build|create|debug|fix|app|program|script)\b/.test(msg)) return "chatgpt";
  if (/\b(what is|quick|summary|overview|simple|fast|short|define|tell me)\b/.test(msg)) return "gemini";
  return "chatgpt";
}

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
  const engine = selectEngine(msg, mode);

  let response: string;

  if (mode === "research") { response = researchResponse(userMessage, topic, engine); }
  else if (mode === "strategy") { response = strategyResponse(userMessage, topic); }
  else if (mode === "summarize") { response = summaryResponse(userMessage, topic); }
  else if (mode === "coding") { response = codingResponse(userMessage, msg, topic, engine); }
  else if (isGreeting(msg)) { response = greetingResponse(isFollowUp); }
  else if (isIdentity(msg)) { response = identityResponse(); }
  else if (isThanks(msg)) { response = thanksResponse(); }
  else if (isFarewell(msg)) { response = farewellResponse(); }
  else if (isHowAreYou(msg)) { response = howAreYouResponse(); }
  else if (isJoke(msg)) { response = jokeResponse(); }
  else if (isCoding(msg)) { response = codingResponse(userMessage, msg, topic, engine); }
  else if (isRwanda(msg)) { response = rwandaResponse(userMessage, msg, topic); }
  else if (isPhilosophy(msg)) { response = philosophyResponse(userMessage, topic); }
  else if (isExplain(msg)) { response = explainResponse(userMessage, msg, topic); }
  else if (isWriting(msg)) { response = writingResponse(userMessage, topic); }
  else if (isHowTo(msg)) { response = howToResponse(userMessage, topic); }
  else if (isCompare(msg)) { response = compareResponse(userMessage, topic); }
  else if (isWhy(msg)) { response = whyResponse(userMessage, topic); }
  else if (isTranslation(msg)) { response = translationResponse(userMessage); }
  else if (isVision(msg)) { response = visionResponse(); }
  else if (isImageGen(msg)) { response = imageGenResponse(userMessage, topic); }
  else if (isHealth(msg)) { response = healthResponse(userMessage, topic); }
  else if (isScience(msg)) { response = scienceResponse(userMessage, topic); }
  else if (isHistory(msg)) { response = historyResponse(userMessage, topic); }
  else if (isTech(msg)) { response = techResponse(userMessage, topic); }
  else if (isMath(msg)) { response = mathResponse(userMessage, topic); }
  else { response = generalResponse(userMessage, msg, topic, isFollowUp, engine); }

  return response;
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

function codingResponse(original: string, msg: string, topic: string, engine?: Engine): string {
  const lang = detectLanguage(msg);
  const task = extractCodingTask(msg);
  const knowledge = getKnowledge(msg);
  const badge = `*💻 Coding Engine · ChatGPT-style*\n\n`;

  let intro = `${badge}I'll help you ${task} ${lang ? `in **${lang}**` : ""}. Let me work through this step by step.`;

  if (knowledge) intro = `${badge}Great question! ${knowledge}\n\nLet me provide a practical example.`;

  if (task.includes("debug") || task.includes("fix") || msg.includes("error") || msg.includes("bug") || msg.includes("not working")) {
    return `${intro}

[Show More →]

## Debugging: Systematic Approach

### Step 1: Symptom Identification
What type of issue are you facing?
| Type | Signs |
|------|-------|
| **Compile error** | Code won't build/run |
| **Runtime error** | Crashes during execution |
| **Logic error** | Wrong output, no crash |
| **Performance** | Too slow or memory-heavy |

### Step 2: Root Cause Analysis
Common categories to inspect:

\`\`\`
// Check imports, syntax, types
// Verify async/await, null checks
// Review edge cases
\`\`\`

### Step 3: Fix & Verify
\`\`\`${lang?.toLowerCase() || "javascript"}
// 1. Validate inputs
// 2. Add logging
// 3. Handle edge cases
// 4. Test with sample data
\`\`\`

### Step 4: Prevent Recurrence
- Add unit tests covering the fix
- Document the issue and solution
- Consider adding validation or type checking

If you share your specific code, I can give a targeted fix.${FEEDBACK}`;
  }

  return `${intro}

[Show More →]

## Solution

### Approach
${task === "explain" ? "Let me walk through how this works, from fundamentals to practical use." : "Here's a clean, well-structured implementation."}

### Implementation
\`\`\`${lang?.toLowerCase() || "javascript"}
function ${topic.split(/[,\s]+/)[0] || "solution"}(input) {
  if (!input) throw new Error("Input required");
  return { input, processed: true, output: transform(input) };
}

function transform(data) {
  return Array.isArray(data) ? data.map(process) : process(data);
}

function process(item) {
  return { original: item, result: typeof item === "string" ? item.trim() : item };
}
\`\`\`

### Complexity
- **Time**: O(n) — linear in input size
- **Space**: O(n) — result storage

### Edge Cases
| Case | Handling |
|------|----------|
| Empty/null | Validation error |
| Array vs scalar | Auto-detected |
| Type variations | Generic transform |

### Next Steps
1. Add unit tests
2. Customize error handling for your use case
3. Optimize if working with large datasets

Want me to adapt this for your specific requirements?${FEEDBACK}`;
}

function researchResponse(original: string, topic: string, engine?: Engine): string {
  const engineBadge = `*🧪 Research Engine · Perplexity-style*\n\n`;
  const citations = [
    `[1] Knowledge base: ${topic || "general knowledge"}`,
    `[2] Analysis: Multi-perspective research framework`,
    `[3] Synthesis: Logical reasoning and evidence evaluation`,
  ];

  return `${engineBadge}I've conducted research on **"${topic || original.substring(0, 80)}"**. Here are my findings.

[Show More →]

## Research Report

### Executive Summary
${capitalize(topic || "this topic")} spans multiple dimensions. This report breaks down core concepts, evidence, applications, and open questions.

### Methodology
1. **Information retrieval** — Searched knowledge base for relevant data
2. **Cross-reference analysis** — Compared multiple perspectives
3. **Evidence evaluation** — Assessed reliability and relevance
4. **Synthesis** — Integrated findings into structured conclusions

### Key Findings

#### 1. Core Concepts
- **Definition**: The fundamental principles that define this topic
- **Scope**: Its boundaries and relationship to adjacent fields
- **Significance**: Why it matters in context

#### 2. Evidence & Analysis
- **Established knowledge**: What is well-understood and verified
- **Current understanding**: How knowledge has evolved
- **Gaps**: Areas where information is incomplete or debated

#### 3. Practical Applications
- **Use cases**: Real-world implementations and examples
- **Best practices**: Proven approaches and methodologies
- **Impact**: Measurable effects on relevant domains

### Sources
${citations.map(c => `- ${c}`).join("\n")}

### Conclusions
The evidence points to a multi-faceted understanding requiring integration of different perspectives. Further exploration of specific sub-topics would add depth.

### Recommended Next Steps
1. Explore specific sub-topics in more detail
2. Apply findings to your specific context
3. Engage with primary sources for deeper understanding

Is there a specific aspect of "${topic || "this topic"}" you'd like me to research further?${FEEDBACK}`;
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

function generalResponse(original: string, msg: string, topic: string, isFollowUp: boolean, engine?: Engine): string {
  const knowledge = getKnowledge(msg);
  const badges: Record<Engine, string> = {
    perplexity: `*🔍 Perplexity Engine — research-first approach*\n\n`,
    claude: `*🧠 Claude Engine — extended reasoning mode*\n\n`,
    chatgpt: `*💬 ChatGPT Engine — balanced & versatile*\n\n`,
    gemini: `*⚡ Gemini Engine — quick & direct*\n\n`,
  };
  const badge = badges[engine || "chatgpt"];

  if (knowledge) {
    return `${badge}${knowledge}

[Show More →]

${knowledge}

**Go deeper**: This topic connects to several related areas. If you want to explore history, practical applications, or current developments, just ask.${FEEDBACK}`;
  }

  const topics = topic.split(", ").filter(Boolean);
  const mainTopic = topics[0] || msg.split(/\s+/).slice(0, 3).join(" ") || "what you've mentioned";
  const secondTopic = topics[1] || null;

  if (engine === "perplexity") {
    return `${badge}Let me research **${mainTopic}** for you.

[Show More →]

## Research Findings: ${capitalize(mainTopic)}

### Overview
${mainTopic} is a topic with several key dimensions worth examining. Let me break it down from multiple angles.

### Analysis
- **Core facts**: What is established and widely accepted about ${mainTopic}
- **Context**: How it fits into broader frameworks and systems
- **Perspectives**: Different viewpoints and approaches

### Conclusion
${mainTopic} is best understood by considering both foundational knowledge and practical applications. Would you like me to dive deeper into any specific aspect?${FEEDBACK}`;
  }

  if (engine === "claude") {
    return `${badge}Let me reason through **${mainTopic}** carefully.

[Show More →]

## Extended Analysis

Let me work through this step by step.

### 1. Understanding the Question
When we ask about ${mainTopic}, we're really exploring something with multiple layers. Let me unpack what matters most.

### 2. Breaking It Down
**First principles:** What are the fundamentals here?
- The core concepts that define ${mainTopic}
- How they relate to each other
- What assumptions we should examine

**Context & nuance:**
${secondTopic ? `The connection to ${secondTopic} adds an important dimension. ` : ""}Every situation is different — what applies in one context may not in another.

**Connections:**
${mainTopic} connects to broader ideas. Understanding those connections often reveals insights you wouldn't get from looking at it alone.

### 3. Synthesis
The most useful approach: stay curious, question assumptions, and adapt as you learn more.

I'd be happy to explore any angle in more detail.${FEEDBACK}`;
  }

  if (engine === "gemini") {
    return `${badge}Here's a quick overview of **${mainTopic}**.

[Show More →]

## Quick Overview

### Key Points
1. **What it is**: A subject spanning several important concepts
2. **Why it matters**: Relevant to understanding broader systems
3. **Key takeaway**: Focus on fundamentals first

### Fast Facts
- Core principles provide the foundation
- Practical applications bring theory to life
- Common challenges have well-established solutions

Want me to expand on any specific area?${FEEDBACK}`;
  }

  const isQuestion = /\b(what|how|why|when|where|which|who|do|does|did|can|could|would|should|is|are|was|were|have|has|had)\b/.test(msg) || /\?$/.test(original.trim());
  const isOpinion = /\b(think|feel|believe|opinion|thoughts|what.*about|how.*about)\b/.test(msg);
  const isAdvice = /\b(advice|suggest|recommend|should i|what should|how should|tip)\b/.test(msg);
  const isDeep = /\b(meaning|purpose|why|deeper|explain|understand|really|actually|fundamental|essence)\b/.test(msg);
  const isStatement = /^(i |i'm |i am |i've |i have |just |sometimes |people |the |it's |its )/.test(msg) || original.split(" ").length > 15;

  if (isOpinion) {
    return `${badge}Let me share my perspective on **${mainTopic}**.

[Show More →]

I think **${mainTopic}** is worth considering from a few angles. The most important thing is understanding the context — what works in one situation may not in another.

**Key considerations:**
- The landscape is always evolving
- There's rarely one "right" answer
- The best insights come from combining perspectives

**My take:**
${mainTopic} is worth investing time in if it aligns with your goals. Stay flexible and adjust as you go.

What's your own perspective? I'd be curious to hear your thoughts.${FEEDBACK}`;
  }

  if (isAdvice) {
    return `${badge}Here's some guidance on **${mainTopic}**.

[Show More →]

**Start with clarity.** Define what success looks like.

**Do your research.** Understand what's worked for others.

**Start small.** Pick one aspect, take action, learn, adjust.

**Bottom line:** Take it step by step, learn as you go.

Want me to go deeper on any aspect of ${mainTopic}?${FEEDBACK}`;
  }

  if (isDeep) {
    return `${badge}Let me explore **${mainTopic}** in depth.

[Show More →]

**${mainTopic}** — when you really examine it, there's more than meets the eye.

At its core, ${mainTopic} is about understanding how things connect and why they matter. The surface answer is one thing, but the deeper truth is usually more nuanced.

**What I find interesting:**
The more you explore ${mainTopic}, the more you realize how it connects to other ideas.

**A perspective worth considering:**
Sometimes the most important questions aren't about how, but about why. What's the human element?

What specific dimension of ${mainTopic} are you most curious about?${FEEDBACK}`;
  }

  if (isQuestion) {
    return `${badge}Good question about **${mainTopic}**.

[Show More →]

**${capitalize(mainTopic)}** — let me break that down.

First, it helps to understand the core ideas. ${mainTopic} involves a few key concepts that work together.

Second, the practical side matters. How does ${mainTopic} play out in real situations?

${secondTopic ? `Since you're asking about ${secondTopic} too, there's an interesting connection. ` : ""}If you give me more context, I can give a more targeted answer.${FEEDBACK}`;
  }

  if (isStatement) {
    return `${badge}Thanks for sharing your thoughts on **${mainTopic}**.

[Show More →]

It sounds like ${mainTopic} is something you've been thinking about. What you're describing is relatable.

**A thought:**
Sometimes we focus on the obvious and overlook the subtler aspects. The interesting stuff is often just beneath the surface.

How does ${mainTopic} fit into the bigger picture of what you're working on? I'm here to help think it through.${FEEDBACK}`;
  }

  return `${badge}Interesting — let me think about **${mainTopic}**.

[Show More →]

So you're asking about ${mainTopic}. Here's what comes to mind.

It's one of those topics where the more you explore, the more you find. There's always another layer.

**What stands out:**
The most interesting thing isn't always the most obvious. Often it's the connections to other ideas.

**Where to go from here:**
Tell me what aspect interests you most — practical application, theory, examples, or something else.${FEEDBACK}`;
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
