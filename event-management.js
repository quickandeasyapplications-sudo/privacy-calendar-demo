// ============================================
// EVENT MANAGEMENT FUNCTIONS
// Edit, Delete, and Modify Events
// ============================================

let currentEditingEventId = null;
let currentEditingEventDate = null;

// Open event for editing
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

// Delete current event
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
        
        // Show success message
        alert(`✓ Event "${eventTitle}" deleted successfully!`);
    }
}

// Update the event form submission to handle both create and edit
function setupEventFormHandler() {
    const eventForm = document.getElementById('eventForm');
    
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
            updateEvent(originalDate, eventId, {
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

// Create new event
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
    alert(`✓ Event "${event.title}" created successfully!`);
}

// Update existing event
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
    alert(`✓ Event "${eventData.title}" updated successfully!`);
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
        html += `
            <div class="event-item" onclick="editEvent('${todayKey}', ${event.id})" style="cursor: pointer; transition: all 0.2s;">
                <div class="event-time">${event.time}</div>
                <div class="event-title">${event.title}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">
                    ${encryptionStatus} • ${event.privacy}
                </div>
            </div>
        `;
    });
    
    eventsList.innerHTML = html;
}

// Update openEventModal to reset form for new event
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

// Export functions for use in main script
export {
    editEvent,
    deleteCurrentEvent,
    setupEventFormHandler,
    createEvent,
    updateEvent,
    renderEventsList,
    openEventModalForNew
};

