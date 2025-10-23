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
}

function createDayElement(day, isOtherMonth) {
    const el = document.createElement('div');
    el.className = 'calendar-day';
    el.textContent = day;
    
    if (isOtherMonth) {
        el.classList.add('other-month');
    } else {
        el.onclick = () => openEventModal(day);
    }
    
    return el;
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
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

