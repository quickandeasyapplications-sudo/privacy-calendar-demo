// ============================================
// PRIVACY CALENDAR - INTERACTIVE DEMO
// Multi-Theme Support with Theme-Specific Features
// ============================================

// ============================================
// GLOBAL STATE
// ============================================
let currentDate = new Date();
let events = JSON.parse(localStorage.getItem('calendarEvents')) || {};
let currentTheme = localStorage.getItem('selectedTheme') || 'default';
let selectedTemplate = null;

// ============================================
// THEME DEFINITIONS
// ============================================
const themes = {
    default: {
        name: 'Zero-Trust (Cybersecurity)',
        description: 'Ultra-dark mode with neon-green accents. Perfect for security-conscious users.',
        widget: 'securityAudit'
    },
    minimalist: {
        name: 'Mindful Minimalist',
        description: 'Light, airy design with soft pastels. Focus on well-being and productivity.',
        widget: 'focusMode'
    },
    enterprise: {
        name: 'Global Connect',
        description: 'Professional blue and white. Perfect for enterprise teams and integrations.',
        widget: 'integrationHub'
    },
    compliance: {
        name: 'Data Guardian',
        description: 'Sophisticated burgundy and gold. Built for regulated industries.',
        widget: 'complianceTagging'
    },
    ai: {
        name: 'Adaptive AI',
        description: 'Dynamic gradients with AI-powered features. The future of scheduling.',
        widget: 'aiSuggestions'
    }
};

// ============================================
// TEMPLATE DEFINITIONS
// ============================================
const templates = {
    meeting: {
        title: 'Quick Meeting',
        description: 'A standard 30-minute meeting',
        details: 'Perfect for quick sync-ups and discussions. Includes time for Q&A.',
        duration: 30
    },
    standup: {
        title: 'Daily Standup',
        description: 'Team synchronization meeting',
        details: 'Brief daily meeting for team updates. Typically 15 minutes.',
        duration: 15
    },
    review: {
        title: '1:1 Review',
        description: 'One-on-one meeting',
        details: 'Personal development and feedback session. Usually 30-60 minutes.',
        duration: 60
    },
    project: {
        title: 'Project Kickoff',
        description: 'Project initiation meeting',
        details: 'Launch a new project with stakeholders. 60-90 minutes recommended.',
        duration: 90
    },
    planning: {
        title: 'Sprint Planning',
        description: 'Agile sprint planning',
        details: 'Plan upcoming sprint work. Duration depends on sprint length.',
        duration: 120
    },
    retrospective: {
        title: 'Retrospective',
        description: 'Team reflection meeting',
        details: 'Review what went well and what to improve. 45-60 minutes.',
        duration: 60
    },
    conference: {
        title: 'Conference',
        description: 'Large-scale event',
        details: 'Multi-day professional conference with keynotes and sessions.',
        duration: 480
    },
    workshop: {
        title: 'Workshop',
        description: 'Hands-on training session',
        details: 'Interactive learning session. Usually 2-4 hours.',
        duration: 180
    },
    webinar: {
        title: 'Webinar',
        description: 'Online seminar',
        details: 'Virtual presentation and Q&A session. 45-90 minutes.',
        duration: 60
    },
    networking: {
        title: 'Networking Event',
        description: 'Professional networking',
        details: 'Casual networking opportunity to meet peers and colleagues.',
        duration: 120
    },
    kickoff: {
        title: 'Project Kickoff',
        description: 'Project launch meeting',
        details: 'Align team on project goals, timeline, and deliverables.',
        duration: 90
    },
    milestone: {
        title: 'Milestone Review',
        description: 'Progress checkpoint',
        details: 'Review milestone completion and adjust plan if needed.',
        duration: 60
    },
    deadline: {
        title: 'Deadline Alert',
        description: 'Important deadline reminder',
        details: 'Critical deadline for project deliverable or submission.',
        duration: 30
    },
    closure: {
        title: 'Project Closure',
        description: 'Project completion meeting',
        details: 'Wrap up project, celebrate success, and document lessons learned.',
        duration: 60
    },
    demo: {
        title: 'Product Demo',
        description: 'Product demonstration',
        details: 'Show product features and capabilities to prospects.',
        duration: 45
    },
    pitch: {
        title: 'Sales Pitch',
        description: 'Sales presentation',
        details: 'Present solution to potential customer.',
        duration: 60
    },
    negotiation: {
        title: 'Negotiation',
        description: 'Deal negotiation meeting',
        details: 'Discuss terms and finalize agreement.',
        duration: 90
    },
    followup: {
        title: 'Follow-up Call',
        description: 'Post-meeting follow-up',
        details: 'Check in on action items and next steps.',
        duration: 30
    }
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    renderCalendar();
    renderEventsList();
    setupEventListeners();
    updateThemeWidget();
});

// ============================================
// THEME MANAGEMENT
// ============================================
function initializeTheme() {
    applyTheme(currentTheme);
    document.getElementById('themeSelect').value = currentTheme;
}

function applyTheme(themeName) {
    // Remove all theme classes
    Object.keys(themes).forEach(theme => {
        document.body.classList.remove(`theme-${theme}`);
    });
    
    // Apply selected theme
    if (themeName !== 'default') {
        document.body.classList.add(`theme-${themeName}`);
    }
    
    currentTheme = themeName;
    localStorage.setItem('selectedTheme', themeName);
    updateThemeWidget();
}

function updateThemeWidget() {
    const widget = document.getElementById('themeWidget');
    const themeInfo = themes[currentTheme];
    
    let widgetHTML = '';
    
    switch(themeInfo.widget) {
        case 'securityAudit':
            widgetHTML = `
                <h4>🔐 Security Audit Dashboard</h4>
                <div class="widget-content">
                    <div class="security-score">98/100</div>
                    <p>Your calendar security score</p>
                    <div class="widget-feature">
                        <span class="widget-feature-icon">✓</span>
                        <span>End-to-End Encryption: Active</span>
                    </div>
                    <div class="widget-feature">
                        <span class="widget-feature-icon">✓</span>
                        <span>Zero-Knowledge Architecture: Enabled</span>
                    </div>
                    <div class="widget-feature">
                        <span class="widget-feature-icon">✓</span>
                        <span>Audit Logging: Recording</span>
                    </div>
                </div>
            `;
            break;
            
        case 'focusMode':
            widgetHTML = `
                <h4>🎯 Focus Mode</h4>
                <div class="widget-content">
                    <p>Minimize distractions and maximize productivity</p>
                    <button class="focus-mode-toggle" onclick="toggleFocusMode()">
                        Enable Focus Mode
                    </button>
                    <p style="margin-top: 1rem; font-size: 0.85rem;">
                        Hide non-essential UI elements and show only your current event.
                    </p>
                </div>
            `;
            break;
            
        case 'integrationHub':
            widgetHTML = `
                <h4>🔗 Integration Hub</h4>
                <div class="widget-content">
                    <p>Connected services status</p>
                    <div class="integration-status">
                        <div class="integration-item">
                            <span class="integration-status-dot"></span>
                            <span>Slack</span>
                        </div>
                        <div class="integration-item">
                            <span class="integration-status-dot"></span>
                            <span>Google Calendar</span>
                        </div>
                        <div class="integration-item">
                            <span class="integration-status-dot"></span>
                            <span>Zoom</span>
                        </div>
                        <div class="integration-item">
                            <span class="integration-status-dot"></span>
                            <span>Microsoft Teams</span>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'complianceTagging':
            widgetHTML = `
                <h4>📋 Compliance Tagging</h4>
                <div class="widget-content">
                    <p>Tag sensitive events for enhanced protection</p>
                    <div class="compliance-tag-selector">
                        <button class="compliance-tag-btn" onclick="alert('HIPAA protection enabled for this event')">
                            🏥 HIPAA Sensitive
                        </button>
                        <button class="compliance-tag-btn" onclick="alert('GDPR compliance enabled for this event')">
                            🔒 GDPR Data
                        </button>
                        <button class="compliance-tag-btn" onclick="alert('Confidential protection enabled')">
                            ⚠️ Confidential
                        </button>
                    </div>
                </div>
            `;
            break;
            
        case 'aiSuggestions':
            widgetHTML = `
                <h4>🤖 AI Suggestions</h4>
                <div class="widget-content">
                    <p>Smart scheduling powered by AI</p>
                    <div class="ai-suggestion">
                        <strong>💡 Suggestion:</strong> Based on your patterns, you have 2 hours of free time tomorrow at 2 PM. Perfect for a focused work session.
                    </div>
                    <div class="ai-suggestion">
                        <strong>⚡ Optimization:</strong> Your meetings are clustered. Consider spreading them out for better focus time.
                    </div>
                </div>
            `;
            break;
    }
    
    widget.innerHTML = widgetHTML;
}

function toggleFocusMode() {
    alert('Focus Mode activated! In the full app, this would hide all distractions and show only your current event with a countdown timer.');
}

// ============================================
// CALENDAR FUNCTIONS
// ============================================
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update month/year display
    const monthYear = document.getElementById('monthYear');
    monthYear.textContent = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    // Clear calendar
    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';
    
    // Previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const dayEl = createDayElement(day, true);
        calendarDays.appendChild(dayEl);
    }
    
    // Current month's days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = createDayElement(day, false);
        
        // Check if today
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayEl.classList.add('today');
        }
        
        // Check if has events
        const dateKey = `${year}-${month + 1}-${day}`;
        if (events[dateKey] && events[dateKey].length > 0) {
            dayEl.classList.add('has-event');
        }
        
        calendarDays.appendChild(dayEl);
    }
    
    // Next month's days
    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells; // 6 rows * 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dayEl = createDayElement(day, true);
        calendarDays.appendChild(dayEl);
    }
    
    // Update insights widget
    updateInsightsWidget();
}

function createDayElement(day, isOtherMonth) {
    const el = document.createElement('div');
    el.className = 'calendar-day';
    el.textContent = day;
    
    if (isOtherMonth) {
        el.classList.add('other-month');
    } else {
        el.onclick = () => openEventModalForNew(day);
    }
    
    return el;
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
    updateInsightsWidget();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
    updateInsightsWidget();
}

// ============================================
// EVENT MANAGEMENT
// ============================================
function openEventModal(day) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    document.getElementById('eventDate').value = dateStr;
    document.getElementById('eventTitle').value = '';
    document.getElementById('eventTime').value = '10:00';
    document.getElementById('eventDuration').value = '60';
    document.getElementById('eventPrivacy').value = 'private';
    document.getElementById('eventEncryption').checked = true;
    
    // Show compliance tag group only for compliance theme
    const complianceTagGroup = document.getElementById('complianceTagGroup');
    if (currentTheme === 'compliance') {
        complianceTagGroup.style.display = 'block';
    } else {
        complianceTagGroup.style.display = 'none';
    }
    
    document.getElementById('eventModal').style.display = 'flex';
}

function closeEventModal() {
    document.getElementById('eventModal').style.display = 'none';
}

function createEventFromTemplate(templateKey) {
    const template = templates[templateKey];
    if (!template) return;
    
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    document.getElementById('eventDate').value = dateStr;
    document.getElementById('eventTitle').value = template.title;
    document.getElementById('eventTime').value = '10:00';
    document.getElementById('eventDuration').value = template.duration;
    document.getElementById('eventPrivacy').value = 'private';
    document.getElementById('eventEncryption').checked = true;
    
    // Show compliance tag group only for compliance theme
    const complianceTagGroup = document.getElementById('complianceTagGroup');
    if (currentTheme === 'compliance') {
        complianceTagGroup.style.display = 'block';
    } else {
        complianceTagGroup.style.display = 'none';
    }
    
    document.getElementById('eventModal').style.display = 'flex';
}

document.getElementById('eventForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const duration = document.getElementById('eventDuration').value;
    const privacy = document.getElementById('eventPrivacy').value;
    const encryption = document.getElementById('eventEncryption').checked;
    
    if (!title || !date) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Create event object
    const event = {
        id: Date.now(),
        title: title,
        time: time,
        duration: duration,
        privacy: privacy,
        encrypted: encryption,
        complianceTag: document.getElementById('complianceTag')?.value || 'none'
    };
    
    // Add to events
    if (!events[date]) {
        events[date] = [];
    }
    events[date].push(event);
    
    // Save to localStorage
    localStorage.setItem('calendarEvents', JSON.stringify(events));
    
    // Update UI
    renderCalendar();
    renderEventsList();
    closeEventModal();
    
    // Show success message
    alert(`✓ Event "${title}" created successfully!`);
});

function renderEventsList() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayKey = `${year}-${month}-${day}`;
    
    const eventsList = document.getElementById('eventsList');
    const todayEvents = events[todayKey] || [];
    
    if (todayEvents.length === 0) {
        eventsList.innerHTML = '<p class="empty-state">No events today. Click a date to add one!</p>';
        return;
    }
    
    eventsList.innerHTML = todayEvents.map(event => `
        <div class="event-item">
            <div class="event-time">${event.time}</div>
            <div class="event-title">${event.title}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">
                ${event.encrypted ? '🔐 Encrypted' : '🔓 Not encrypted'} • ${event.privacy}
            </div>
        </div>
    `).join('');
}

// ============================================
// TEMPLATE MODAL
// ============================================
function showTemplateDetail(templateKey) {
    const template = templates[templateKey];
    if (!template) return;
    
    selectedTemplate = templateKey;
    document.getElementById('templateTitle').textContent = template.title;
    document.getElementById('templateDescription').textContent = template.description;
    document.getElementById('templateDetails').innerHTML = `
        <p><strong>Description:</strong> ${template.details}</p>
        <p><strong>Default Duration:</strong> ${template.duration} minutes</p>
    `;
    
    document.getElementById('templateModal').style.display = 'flex';
}

function closeTemplateDetail() {
    document.getElementById('templateModal').style.display = 'none';
}

function useTemplate() {
    if (selectedTemplate) {
        createEventFromTemplate(selectedTemplate);
        closeTemplateDetail();
    }
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Theme selector
    document.getElementById('themeSelect').addEventListener('change', function(e) {
        applyTheme(e.target.value);
    });
    
    // Close modals on background click
    document.getElementById('eventModal').addEventListener('click', function(e) {
        if (e.target === this) closeEventModal();
    });
    
    document.getElementById('templateModal').addEventListener('click', function(e) {
        if (e.target === this) closeTemplateDetail();
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Close modals on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeEventModal();
        closeTemplateDetail();
    }
});



// ============================================
// INTERNATIONAL DAYS & AI HINTS DATABASE
// ============================================

const internationalDays = {
  // January
  '01-01': { name: 'New Year\'s Day', emoji: '🎆', category: 'celebration' },
  '01-04': { name: 'World Braille Day', emoji: '⠿', category: 'awareness' },
  '01-11': { name: 'International Day of Education', emoji: '📚', category: 'awareness' },
  '01-20': { name: 'International Day of Chocolate', emoji: '🍫', category: 'fun' },
  '01-24': { name: 'International Day of Education', emoji: '🎓', category: 'awareness' },
  '01-27': { name: 'International Holocaust Remembrance Day', emoji: '🕯️', category: 'remembrance' },
  
  // February
  '02-02': { name: 'World Wetlands Day', emoji: '🌿', category: 'environment' },
  '02-10': { name: 'International Day of Women and Girls in Science', emoji: '🔬', category: 'awareness' },
  '02-12': { name: 'Darwin Day', emoji: '🦎', category: 'celebration' },
  '02-14': { name: 'Valentine\'s Day', emoji: '💝', category: 'celebration' },
  '02-20': { name: 'World Day of Social Justice', emoji: '⚖️', category: 'awareness' },
  '02-21': { name: 'International Mother Language Day', emoji: '🗣️', category: 'awareness' },
  
  // March
  '03-03': { name: 'World Hearing Day', emoji: '👂', category: 'health' },
  '03-08': { name: 'International Women\'s Day', emoji: '👩', category: 'awareness' },
  '03-14': { name: 'Pi Day', emoji: '🥧', category: 'celebration' },
  '03-17': { name: 'St. Patrick\'s Day', emoji: '🍀', category: 'fun' },
  '03-20': { name: 'International Day of Happiness', emoji: '😊', category: 'awareness' },
  '03-21': { name: 'World Water Day', emoji: '💧', category: 'environment' },
  '03-22': { name: 'World Water Day', emoji: '💧', category: 'environment' },
  
  // April
  '04-01': { name: 'April Fools\' Day', emoji: '🤡', category: 'fun' },
  '04-02': { name: 'International Children\'s Book Day', emoji: '📖', category: 'celebration' },
  '04-07': { name: 'World Health Day', emoji: '⚕️', category: 'health' },
  '04-12': { name: 'International Day of Human Space Flight', emoji: '🚀', category: 'celebration' },
  '04-22': { name: 'Earth Day', emoji: '🌍', category: 'environment' },
  '04-23': { name: 'World Book Day', emoji: '📚', category: 'celebration' },
  
  // May
  '05-01': { name: 'International Labor Day', emoji: '👷', category: 'celebration' },
  '05-05': { name: 'Cinco de Mayo', emoji: '🇲🇽', category: 'celebration' },
  '05-05': { name: 'International Coffee Day', emoji: '☕', category: 'fun' },
  '05-12': { name: 'International Nurses Day', emoji: '👩‍⚕️', category: 'awareness' },
  '05-17': { name: 'International Day Against Homophobia', emoji: '🏳️‍🌈', category: 'awareness' },
  '05-22': { name: 'International Day for Biological Diversity', emoji: '🦋', category: 'environment' },
  
  // June
  '06-01': { name: 'Global Day of Parents', emoji: '👨‍👩‍👧', category: 'celebration' },
  '06-05': { name: 'World Environment Day', emoji: '🌱', category: 'environment' },
  '06-08': { name: 'World Oceans Day', emoji: '🌊', category: 'environment' },
  '06-12': { name: 'World Day Against Child Labor', emoji: '🙏', category: 'awareness' },
  '06-20': { name: 'World Refugee Day', emoji: '🕊️', category: 'awareness' },
  '06-21': { name: 'International Day of Yoga', emoji: '🧘', category: 'health' },
  '06-26': { name: 'International Day Against Drug Abuse', emoji: '🚫', category: 'awareness' },
  
  // July
  '07-04': { name: 'Independence Day (USA)', emoji: '🇺🇸', category: 'celebration' },
  '07-11': { name: 'World Population Day', emoji: '👥', category: 'awareness' },
  '07-18': { name: 'Nelson Mandela International Day', emoji: '🕊️', category: 'celebration' },
  '07-30': { name: 'International Day of Friendship', emoji: '👫', category: 'celebration' },
  
  // August
  '08-01': { name: 'International Day of the World\'s Indigenous Peoples', emoji: '🌍', category: 'awareness' },
  '08-12': { name: 'International Youth Day', emoji: '👨‍🎓', category: 'celebration' },
  '08-19': { name: 'World Humanitarian Day', emoji: '❤️', category: 'awareness' },
  '08-23': { name: 'International Day of Remembrance of Slave Trade', emoji: '🕯️', category: 'remembrance' },
  
  // September
  '09-05': { name: 'International Day of Charity', emoji: '💝', category: 'awareness' },
  '09-08': { name: 'International Literacy Day', emoji: '📚', category: 'awareness' },
  '09-10': { name: 'World Suicide Prevention Day', emoji: '💙', category: 'health' },
  '09-15': { name: 'International Day of Democracy', emoji: '🗳️', category: 'awareness' },
  '09-19': { name: 'International Talk Like a Pirate Day', emoji: '🏴‍☠️', category: 'fun' },
  '09-21': { name: 'International Day of Peace', emoji: '☮️', category: 'awareness' },
  '09-27': { name: 'World Tourism Day', emoji: '✈️', category: 'celebration' },
  
  // October
  '10-01': { name: 'International Day of Older Persons', emoji: '👴', category: 'awareness' },
  '10-02': { name: 'International Day of Non-Violence', emoji: '☮️', category: 'awareness' },
  '10-05': { name: 'World Teachers\' Day', emoji: '👨‍🏫', category: 'celebration' },
  '10-10': { name: 'World Mental Health Day', emoji: '🧠', category: 'health' },
  '10-11': { name: 'International Day of the Girl Child', emoji: '👧', category: 'awareness' },
  '10-16': { name: 'World Food Day', emoji: '🍽️', category: 'awareness' },
  '10-24': { name: 'United Nations Day', emoji: '🇺🇳', category: 'celebration' },
  '10-31': { name: 'Halloween', emoji: '🎃', category: 'celebration' },
  '10-31': { name: 'International Chocolate Day', emoji: '🍫', category: 'fun' },
  
  // November
  '11-02': { name: 'International Day to End Impunity for Crimes Against Journalists', emoji: '📰', category: 'awareness' },
  '11-10': { name: 'World Science Day for Peace and Development', emoji: '🔬', category: 'awareness' },
  '11-14': { name: 'World Diabetes Day', emoji: '💉', category: 'health' },
  '11-16': { name: 'International Day for Tolerance', emoji: '🤝', category: 'awareness' },
  '11-20': { name: 'Universal Children\'s Day', emoji: '👧', category: 'celebration' },
  '11-25': { name: 'International Day for the Elimination of Violence Against Women', emoji: '💪', category: 'awareness' },
  
  // December
  '12-01': { name: 'World AIDS Day', emoji: '🎗️', category: 'health' },
  '12-03': { name: 'International Day of Persons with Disabilities', emoji: '♿', category: 'awareness' },
  '12-10': { name: 'Human Rights Day', emoji: '✊', category: 'awareness' },
  '12-25': { name: 'Christmas Day', emoji: '🎄', category: 'celebration' },
};

const aiHints = [
  { title: 'Time Blocking', hint: 'Group similar tasks together in your calendar. Dedicate specific time blocks for meetings, focused work, and breaks to boost productivity.', emoji: '⏱️' },
  { title: 'Buffer Time', hint: 'Always add 15-30 minutes between meetings for transitions and mental breaks. This prevents back-to-back fatigue.', emoji: '⏰' },
  { title: 'Priority First', hint: 'Schedule your most important tasks during your peak energy hours. For most people, this is early morning.', emoji: '⭐' },
  { title: 'Meeting-Free Days', hint: 'Designate at least one day per week with no meetings. This gives you uninterrupted time for deep work.', emoji: '🚫' },
  { title: 'Recurring Tasks', hint: 'Use recurring events for regular activities like team meetings, personal exercise, or weekly reviews.', emoji: '🔄' },
  { title: 'Time Zone Awareness', hint: 'When scheduling with international teams, use a world clock to find optimal meeting times for everyone.', emoji: '🌍' },
  { title: 'Deadline Planning', hint: 'Work backward from deadlines. Break large projects into smaller milestones and schedule them in advance.', emoji: '📅' },
  { title: 'Energy Management', hint: 'Track your energy levels and schedule demanding tasks when you\'re most alert. Save routine tasks for low-energy times.', emoji: '⚡' },
  { title: 'Batch Processing', hint: 'Group similar small tasks (emails, calls, admin) into specific time slots rather than scattered throughout the day.', emoji: '📦' },
  { title: 'Pomodoro Technique', hint: 'Work in 25-minute focused intervals with 5-minute breaks. This boosts concentration and prevents burnout.', emoji: '🍅' },
  { title: 'Calendar Blocking', hint: 'Block time for personal tasks and self-care. Treat these calendar entries as seriously as client meetings.', emoji: '🔒' },
  { title: 'Review & Adjust', hint: 'Weekly, review your calendar. What worked? What didn\'t? Adjust your scheduling strategy accordingly.', emoji: '📊' },
  { title: 'Meeting Agendas', hint: 'Always include an agenda in meeting invites. This sets expectations and makes meetings more productive.', emoji: '📝' },
  { title: 'Notification Management', hint: 'Turn off notifications during focus time. Batch-check messages at set intervals instead.', emoji: '🔕' },
  { title: 'Travel Time', hint: 'Factor in travel time between locations. Don\'t schedule back-to-back meetings in different places.', emoji: '🚗' },
  { title: 'Decision Fatigue', hint: 'Schedule important decisions when you\'re fresh. Avoid major decisions late in the day.', emoji: '🧠' },
  { title: 'Flexible Scheduling', hint: 'Build flexibility into your schedule. Leave room for unexpected opportunities and emergencies.', emoji: '🎯' },
  { title: 'Sync Calendars', hint: 'Keep all your calendars (work, personal, family) synced to avoid double-booking.', emoji: '🔗' },
  { title: 'Lunch Breaks', hint: 'Always schedule proper lunch breaks. Eating away from your desk improves focus and well-being.', emoji: '🍽️' },
  { title: 'End-of-Day Review', hint: 'Spend 10 minutes at day\'s end reviewing what you accomplished and planning tomorrow.', emoji: '✅' },
];

function getTodayInternationalDay() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateKey = `${month}-${day}`;
  return internationalDays[dateKey] || null;
}

function getRandomAIHint() {
  return aiHints[Math.floor(Math.random() * aiHints.length)];
}

function getInternationalDaysInMonth(month, year) {
  const monthStr = String(month).padStart(2, '0');
  const days = [];
  
  Object.entries(internationalDays).forEach(([dateKey, dayInfo]) => {
    const [m, d] = dateKey.split('-');
    if (m === monthStr) {
      days.push({
        date: dateKey,
        day: parseInt(d),
        ...dayInfo,
      });
    }
  });
  
  return days.sort((a, b) => a.day - b.day);
}

function renderInsightsWidget() {
  // Render today's international day
  const todayDay = getTodayInternationalDay();
  const internationalDayWidget = document.getElementById('internationalDayWidget');
  if (todayDay) {
    internationalDayWidget.innerHTML = `
      <div class="insight-item">
        <span class="insight-emoji">${todayDay.emoji}</span>
        <div class="insight-text">
          <p class="insight-title">${todayDay.name}</p>
          <p class="insight-category">${todayDay.category}</p>
        </div>
      </div>
    `;
  } else {
    internationalDayWidget.innerHTML = '<p class="empty-state">No special observance today</p>';
  }
  
  // Render random AI hint
  const hint = getRandomAIHint();
  const aiHintWidget = document.getElementById('aiHintWidget');
  aiHintWidget.innerHTML = `
    <div class="insight-item">
      <span class="insight-emoji">${hint.emoji}</span>
      <div class="insight-text">
        <p class="insight-title">${hint.title}</p>
        <p class="insight-hint">${hint.hint}</p>
      </div>
    </div>
  `;
  
  // Render this month's observances
  const monthDays = getInternationalDaysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear());
  const monthDaysWidget = document.getElementById('monthDaysWidget');
  if (monthDays.length > 0) {
    const daysHtml = monthDays.slice(0, 5).map(d => `
      <div class="month-day-item">
        <span class="day-emoji">${d.emoji}</span>
        <span class="day-date">${d.day}</span>
        <span class="day-name">${d.name}</span>
      </div>
    `).join('');
    monthDaysWidget.innerHTML = `<div class="month-days-list">${daysHtml}</div>`;
  } else {
    monthDaysWidget.innerHTML = '<p class="empty-state">No special observances this month</p>';
  }
}

// Call this when calendar is rendered
function updateInsightsWidget() {
  renderInsightsWidget();
}


// ============================================
// EVENT MANAGEMENT - EDIT, DELETE, MODIFY
// ============================================

let currentEditingEventId = null;
let currentEditingEventDate = null;

function openEventModalForNew(day) {
    // Reset form
    document.getElementById('eventId').value = '';
    document.getElementById('eventOriginalDate').value = '';
    document.getElementById('eventTitle').value = '';
    document.getElementById('eventTime').value = '10:00';
    document.getElementById('eventDuration').value = '60';
    document.getElementById('eventPrivacy').value = 'private';
    document.getElementById('eventEncryption').checked = true;
    document.getElementById('complianceTag').value = 'none';
    
    // Update modal title and button
    document.getElementById('eventModalTitle').textContent = 'Create New Event';
    document.getElementById('eventSubmitBtn').textContent = 'Create Event';
    document.getElementById('eventDeleteBtn').style.display = 'none';
    
    // Set date
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${year}-${month}-${dayStr}`;
    document.getElementById('eventDate').value = dateStr;
    
    // Show compliance tag group only for compliance theme
    const complianceTagGroup = document.getElementById('complianceTagGroup');
    if (currentTheme === 'compliance') {
        complianceTagGroup.style.display = 'block';
    } else {
        complianceTagGroup.style.display = 'none';
    }
    
    // Reset editing state
    currentEditingEventId = null;
    currentEditingEventDate = null;
    
    document.getElementById('eventModal').style.display = 'flex';
}

function editEvent(dateKey, eventId) {
    const dayEvents = events[dateKey] || [];
    const event = dayEvents.find(e => e.id === eventId);
    
    if (!event) {
        alert('Event not found');
        return;
    }
    
    // Store current editing info
    currentEditingEventId = eventId;
    currentEditingEventDate = dateKey;
    
    // Populate form with event data
    document.getElementById('eventId').value = eventId;
    document.getElementById('eventOriginalDate').value = dateKey;
    document.getElementById('eventTitle').value = event.title;
    document.getElementById('eventDate').value = dateKey;
    document.getElementById('eventTime').value = event.time;
    document.getElementById('eventDuration').value = event.duration;
    document.getElementById('eventPrivacy').value = event.privacy;
    document.getElementById('eventEncryption').checked = event.encrypted;
    document.getElementById('complianceTag').value = event.complianceTag || 'none';
    
    // Update modal title and button
    document.getElementById('eventModalTitle').textContent = 'Edit Event';
    document.getElementById('eventSubmitBtn').textContent = 'Update Event';
    document.getElementById('eventDeleteBtn').style.display = 'block';
    
    // Show compliance tag group only for compliance theme
    const complianceTagGroup = document.getElementById('complianceTagGroup');
    if (currentTheme === 'compliance') {
        complianceTagGroup.style.display = 'block';
    } else {
        complianceTagGroup.style.display = 'none';
    }
    
    document.getElementById('eventModal').style.display = 'flex';
}

function deleteCurrentEvent() {
    if (!currentEditingEventId || !currentEditingEventDate) {
        alert('No event selected for deletion');
        return;
    }
    
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
        return;
    }
    
    const dayEvents = events[currentEditingEventDate] || [];
    const eventIndex = dayEvents.findIndex(e => e.id === currentEditingEventId);
    
    if (eventIndex > -1) {
        const eventTitle = dayEvents[eventIndex].title;
        dayEvents.splice(eventIndex, 1);
        
        // If no more events on this day, remove the day entry
        if (dayEvents.length === 0) {
            delete events[currentEditingEventDate];
        } else {
            events[currentEditingEventDate] = dayEvents;
        }
        
        // Save to localStorage
        localStorage.setItem('calendarEvents', JSON.stringify(events));
        
        // Update UI
        renderCalendar();
        renderEventsList();
        closeEventModal();
        
        // Reset editing state
        currentEditingEventId = null;
        currentEditingEventDate = null;
        
        // Show success message
        alert('Event deleted successfully!');
    }
}

// Update event form submission to handle both create and edit
document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('eventTitle').value;
            const date = document.getElementById('eventDate').value;
            const time = document.getElementById('eventTime').value;
            const duration = document.getElementById('eventDuration').value;
            const privacy = document.getElementById('eventPrivacy').value;
            const encryption = document.getElementById('eventEncryption').checked;
            const complianceTag = document.getElementById('complianceTag')?.value || 'none';
            const eventId = document.getElementById('eventId').value;
            const originalDate = document.getElementById('eventOriginalDate').value;
            
            if (!title || !date) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (eventId) {
                // EDIT MODE - Update existing event
                updateEvent(originalDate, parseInt(eventId), {
                    title: title,
                    time: time,
                    duration: duration,
                    privacy: privacy,
                    encrypted: encryption,
                    complianceTag: complianceTag
                }, date);
            } else {
                // CREATE MODE - Create new event
                createEvent(date, {
                    title: title,
                    time: time,
                    duration: duration,
                    privacy: privacy,
                    encrypted: encryption,
                    complianceTag: complianceTag
                });
            }
        });
    }
});

function createEvent(date, eventData) {
    const event = {
        id: Date.now(),
        title: eventData.title,
        time: eventData.time,
        duration: eventData.duration,
        privacy: eventData.privacy,
        encrypted: eventData.encrypted,
        complianceTag: eventData.complianceTag
    };
    
    if (!events[date]) {
        events[date] = [];
    }
    events[date].push(event);
    
    // Save to localStorage
    localStorage.setItem('calendarEvents', JSON.stringify(events));
    
    // Update UI
    renderCalendar();
    renderEventsList();
    closeEventModal();
    
    // Show success message
    alert('Event "' + event.title + '" created successfully!');
}

function updateEvent(originalDate, eventId, eventData, newDate) {
    const dayEvents = events[originalDate] || [];
    const eventIndex = dayEvents.findIndex(e => e.id === eventId);
    
    if (eventIndex === -1) {
        alert('Event not found');
        return;
    }
    
    // If date changed, move event to new date
    if (originalDate !== newDate) {
        // Remove from original date
        dayEvents.splice(eventIndex, 1);
        if (dayEvents.length === 0) {
            delete events[originalDate];
        } else {
            events[originalDate] = dayEvents;
        }
        
        // Add to new date
        if (!events[newDate]) {
            events[newDate] = [];
        }
        events[newDate].push({
            id: eventId,
            ...eventData
        });
    } else {
        // Update event on same date
        events[originalDate][eventIndex] = {
            id: eventId,
            ...eventData
        };
    }
    
    // Save to localStorage
    localStorage.setItem('calendarEvents', JSON.stringify(events));
    
    // Update UI
    renderCalendar();
    renderEventsList();
    closeEventModal();
    
    // Reset editing state
    currentEditingEventId = null;
    currentEditingEventDate = null;
    
    // Show success message
    alert('Event "' + eventData.title + '" updated successfully!');
}

// Update renderEventsList to make events clickable
function renderEventsList() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayKey = `${year}-${month}-${day}`;
    
    const eventsList = document.getElementById('eventsList');
    const todayEvents = events[todayKey] || [];
    
    if (todayEvents.length === 0) {
        eventsList.innerHTML = '<p class="empty-state">No events today. Click a date to add one!</p>';
        return;
    }
    
    let html = '';
    todayEvents.forEach(event => {
        const encryptionStatus = event.encrypted ? '🔐 Encrypted' : '🔓 Not encrypted';
        html += '<div class="event-item" onclick="editEvent(\'' + todayKey + '\', ' + event.id + ')" style="cursor: pointer; transition: all 0.2s;">';
        html += '<div class="event-time">' + event.time + '</div>';
        html += '<div class="event-title">' + event.title + '</div>';
        html += '<div style="font-size: 0.75rem; color: var(--text-muted);">';
        html += encryptionStatus + ' • ' + event.privacy;
        html += '</div></div>';
    });
    
    eventsList.innerHTML = html;
}
