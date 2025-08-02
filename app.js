// Sample conversation data and responses
const conversationData = {
    greetings: [
        "Hello! I'm your friendly mental health companion. I'm here to listen and support you. How are you feeling today?",
        "Hi there! I'm glad you're here. I'm your supportive mental health companion. What's on your mind today?",
        "Welcome! I'm here to provide a safe space for you to share and explore your feelings. How can I support you today?"
    ],
    
    responses: {
        async function respondToUser(input) {
  displayMessage("Typing...", "bot"); // temp message

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearersk-proj-Yg8XCg-fyovMc77LS_SR08vQaWfgDlZEJ78Ce-665mmYqAE7chiUrKGOhPd8EN1U1yyA_CWGpOT3BlbkFJ-tmr0Rc3K-cnpLXcoI-lZxEotVYctz7-bl_VDk8aV00tBw-qKjrCqR1SaD6XW4ToNnQOv4X8gA ", // Replace this line
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a friendly mental health chatbot offering empathy and support." },
          { role: "user", content: input }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";

    // Remove 'Typing...' and show real message
    document.querySelector(".bot-message:last-child").remove();
    displayMessage(reply, "bot");

  } catch (error) {
    displayMessage("⚠ Error talking to ChatGPT. Please try again later.", "bot");
  }
}
        
        
       
    },
    
    techniques: [
        "Here's a simple breathing exercise: Breathe in for 4 counts, hold for 4, then exhale for 6. This can help activate your body's relaxation response.",
        "Try the 5-4-3-2-1 grounding technique: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
        "Remember: thoughts are not facts. When you notice anxious thoughts, try asking yourself: 'Is this thought helpful right now? What would I tell a good friend in this situation?'",
        "Progressive muscle relaxation can help: Starting with your toes, tense and then relax each muscle group in your body, working your way up to your head."
    ]
};

// Chat state
let conversationCount = 0;
let userMood = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    setupEventListeners();
    setupFeatureToggles();
    setupSmoothScrolling();
    addScrollAnimations();
});

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Get DOM elements
    const chatModal = document.getElementById('chatbot-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const tryDemoBtn = document.getElementById('try-demo-btn');
    const demoCTABtn = document.getElementById('demo-cta-btn');
    const viewFeaturesBtn = document.getElementById('view-features-btn');
    
    // Check if elements exist
    if (!chatModal) console.error('Chat modal not found');
    if (!tryDemoBtn) console.error('Try demo button not found');
    
    // Modal controls
    if (tryDemoBtn) {
        tryDemoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Try demo button clicked');
            openChatModal();
        });
    }
    
    if (demoCTABtn) {
        demoCTABtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Demo CTA button clicked');
            openChatModal();
        });
    }
    
    if (closeModalBtn && chatModal) {
        closeModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeChatModal();
        });
    }
    
    if (modalOverlay && chatModal) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeChatModal();
            }
        });
    }
    
    // Chat functionality
    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', handleSendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
            }
        });
    }
    
    // View features smooth scroll
    if (viewFeaturesBtn) {
        viewFeaturesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('View features button clicked');
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        const chatModal = document.getElementById('chatbot-modal');
        if (e.key === 'Escape' && chatModal && !chatModal.classList.contains('hidden')) {
            closeChatModal();
        }
    });
}

function setupFeatureToggles() {
    console.log('Setting up feature toggles...');
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        const toggleBtn = card.querySelector('.feature-toggle');
        const details = card.querySelector('.feature-details');
        
        console.log(`Feature card ${index}:`, { card, toggleBtn, details });
        
        if (toggleBtn && details) {
            toggleBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Feature toggle clicked for card ${index}`);
                
                const isHidden = details.classList.contains('hidden');
                
                if (isHidden) {
                    details.classList.remove('hidden');
                    toggleBtn.textContent = 'Show Less';
                    card.style.transform = 'translateY(-4px)';
                    console.log('Showing details');
                } else {
                    details.classList.add('hidden');
                    toggleBtn.textContent = 'Learn More';
                    card.style.transform = '';
                    console.log('Hiding details');
                }
            });
        } else {
            console.warn(`Missing elements for feature card ${index}`);
        }
    });
}

function setupSmoothScrolling() {
    console.log('Setting up smooth scrolling...');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function openChatModal() {
    console.log('Opening chat modal...');
    const chatModal = document.getElementById('chatbot-modal');
    if (chatModal) {
        chatModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            setTimeout(() => chatInput.focus(), 100);
        }
        
        // Add initial greeting if first time
        if (conversationCount === 0) {
            const initialMessage = getRandomResponse(conversationData.greetings);
            // Clear any existing messages first
            const chatMessages = document.getElementById('chat-messages');
            if (chatMessages) {
                chatMessages.innerHTML = `
                    <div class="message bot-message">
                        <div class="message-avatar">🤖</div>
                        <div class="message-content">
                            <p>${initialMessage}</p>
                        </div>
                    </div>
                `;
            }
            addQuickStarters();
        }
    }
}

function closeChatModal() {
    console.log('Closing chat modal...');
    const chatModal = document.getElementById('chatbot-modal');
    if (chatModal) {
        chatModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function handleSendMessage() {
    console.log('Handling send message...');
    const chatInput = document.getElementById('chat-input');
    if (!chatInput) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    chatInput.value = '';
    
    // Show typing indicator and generate response
    const typingIndicator = showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateBotResponse(message);
        addBotMessage(response);
        
        // Remove quick starters if they exist
        const quickStarters = document.querySelector('.quick-starters');
        if (quickStarters) {
            quickStarters.remove();
        }
        
        // Occasionally add a follow-up technique
        if (Math.random() > 0.7 && conversationCount > 2) {
            setTimeout(() => {
                const technique = getRandomResponse(conversationData.techniques);
                addBotMessage(technique);
            }, 2000);
        }
    }, 1500 + Math.random() * 1500);
    
    conversationCount++;
}

function addUserMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">👤</div>
        <div class="message-content">
            <p>${escapeHtml(message)}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function addBotMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return null;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <p><em>Typing...</em></p>
        </div>
    `;
    typingDiv.id = 'typing-indicator';
    
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
    
    return typingDiv;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Crisis detection
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'self harm', 'die', 'death'];
    if (crisisKeywords.some(keyword => message.includes(keyword))) {
        return getRandomResponse(conversationData.responses.crisis);
    }
    
    // Emotional keywords detection
    const emotionalKeywords = {
        stress: ['stress', 'stressed', 'pressure', 'overwhelmed', 'busy', 'work', 'deadline'],
        anxiety: ['anxious', 'anxiety', 'worried', 'panic', 'nervous', 'scared', 'fear'],
        sad: ['sad', 'depressed', 'down', 'low', 'unhappy', 'crying', 'tears'],
        sleep: ['sleep', 'insomnia', 'tired', 'exhausted', 'can\'t sleep', 'sleepless'],
        positive: ['good', 'great', 'happy', 'better', 'fine', 'okay', 'well', 'excellent', 'fantastic']
    };
    
    // Check for emotional keywords
    for (const [emotion, keywords] of Object.entries(emotionalKeywords)) {
        if (keywords.some(keyword => message.includes(keyword))) {
            userMood = emotion;
            return getRandomResponse(conversationData.responses[emotion]);
        }
    }
    
    // Greeting responses
    const greetingKeywords = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
    if (greetingKeywords.some(keyword => message.includes(keyword))) {
        return getRandomResponse(conversationData.greetings);
    }
    
    // Technique requests
    const techniqueKeywords = ['help', 'technique', 'exercise', 'breathing', 'relax', 'calm'];
    if (techniqueKeywords.some(keyword => message.includes(keyword))) {
        return getRandomResponse(conversationData.techniques);
    }
    
    // Thank you responses
    if (message.includes('thank') || message.includes('thanks')) {
        return "You're very welcome! I'm here whenever you need support. Is there anything else you'd like to talk about or explore together?";
    }
    
    // Scale responses (1-10)
    const scaleMatch = message.match(/\b([1-9]|10)\b/);
    if (scaleMatch && conversationCount > 1) {
        const scale = parseInt(scaleMatch[1]);
        if (scale <= 3) {
            return "That's a relatively low level, which is good to hear. Even small amounts of stress are worth acknowledging. What do you think is helping you manage it well?";
        } else if (scale <= 6) {
            return "That's a moderate level. It sounds like you're aware of what you're experiencing, which is an important first step. Would you like to explore some coping strategies that might help?";
        } else {
            return "That sounds like a high level of stress. I'm glad you're reaching out for support. Let's work together on some techniques that might help bring that down. Would you like to try a breathing exercise?";
        }
    }
    
    // Default empathetic responses
    return getRandomResponse(conversationData.responses.default);
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function scrollToBottom() {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    document.querySelectorAll('.about-card, .feature-card, .phase-card, .team-member').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function addQuickStarters() {
    const quickStarters = [
        "I'm feeling stressed about work",
        "I'm having trouble sleeping", 
        "I'm feeling anxious today",
        "I want to learn some coping techniques"
    ];
    
    const chatInputContainer = document.querySelector('.chat-input-container');
    if (!chatInputContainer) return;
    
    // Remove existing quick starters
    const existingStarters = document.querySelector('.quick-starters');
    if (existingStarters) {
        existingStarters.remove();
    }
    
    const startersDiv = document.createElement('div');
    startersDiv.className = 'quick-starters';
    startersDiv.innerHTML = `
        <p style="font-size: 12px; color: var(--color-text-secondary); margin: 0 0 8px 0;">Quick starters:</p>
        ${quickStarters.map(starter => 
            `<button class="quick-starter-btn" data-message="${starter}">${starter}</button>`
        ).join('')}
    `;
    
    // Add event listeners for quick starter buttons
    startersDiv.addEventListener('click', function(e) {
        if (e.target.classList.contains('quick-starter-btn')) {
            const message = e.target.getAttribute('data-message');
            const chatInput = document.getElementById('chat-input');
            if (chatInput) {
                chatInput.value = message;
                handleSendMessage();
            }
        }
    });
    
    chatInputContainer.insertAdjacentElement('beforebegin', startersDiv);
}

// Add styles for quick starters
const quickStarterStyles = `
.quick-starters {
    padding: 12px;
    border-top: 1px solid var(--color-card-border-inner);
}
.quick-starter-btn {
    display: block;
    width: 100%;
    margin-bottom: 8px;
    padding: 8px 12px;
    background: var(--color-bg-1);
    border: 1px solid var(--color-card-border);
    border-radius: var(--radius-base);
    color: var(--color-text);
    cursor: pointer;
    font-size: 12px;
    text-align: left;
    transition: background-color 0.2s ease;
}
.quick-starter-btn:hover {
    background: var(--color-secondary);
}
.quick-starter-btn:last-child {
    margin-bottom: 0;
}
`;

// Inject quick starter styles
const styleElement = document.createElement('style');
styleElement.textContent = quickStarterStyles;
document.head.appendChild(styleElement);
