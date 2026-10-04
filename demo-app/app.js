// Global state
let selectedSlot = null;
let leadData = null;
let responseTime = 0;

// Show caption
function showCaption(text, duration = 4000) {
  const caption = document.getElementById('caption');
  caption.textContent = text;
  caption.classList.add('show');
  
  setTimeout(() => {
    caption.classList.remove('show');
  }, duration);
}

// Navigation
function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
}

function backToListing() {
  showView('listing-view');
}

// Form submission
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const startTime = Date.now();
  
  leadData = {
    name: document.getElementById('input-name').value,
    email: document.getElementById('input-email').value,
    phone: document.getElementById('input-phone').value,
    message: document.getElementById('input-message').value,
    time: '21:40',
    property: 'Ruime gezinswoning met tuin, Gent'
  };
  
  // Show inbox view
  showView('inbox-view');
  
  // Add initial message
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = `
    <div class="message">
      <div class="message-header">
        <span><strong>U</strong></span>
        <span>21:40</span>
      </div>
      <div class="message-body">
        ${leadData.message || 'Ik zou graag meer informatie over deze woning.'}
      </div>
    </div>
  `;
  
  // Update dashboard - new lead
  updateDashboard('new');
  
  // Simulate processing delay (3 seconds)
  await sleep(3000);
  
  responseTime = Math.round((Date.now() - startTime) / 1000);
  
  // Add auto-reply
  const autoReply = `
    <div class="message">
      <div class="message-header">
        <span><strong>Vastgoed Voorbeeld</strong></span>
        <span>21:40</span>
      </div>
      <div class="message-body">
        Beste ${leadData.name},<br><br>
        Bedankt voor uw interesse in onze ruime gezinswoning in Gent!<br><br>
        We begrijpen dat u buiten kantooruren contact opneemt. 
        U kunt hieronder direct een moment kiezen voor een bezichtiging 
        die u het beste uitkomt.<br><br>
        Tot snel!
      </div>
      <div class="message-action">
        <button class="btn-secondary" onclick="openBooking()">📅 Kies een moment</button>
      </div>
    </div>
  `;
  
  messagesDiv.innerHTML += autoReply;
  
  // Update dashboard - replied
  updateDashboard('replied');
});

// Booking
function openBooking() {
  showView('booking-view');
}

function selectSlot(element, slotText) {
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  element.classList.add('selected');
  selectedSlot = slotText;
  document.getElementById('confirm-booking').disabled = false;
}

function confirmBooking() {
  if (!selectedSlot) return;
  
  // Show confirmation in inbox
  showView('inbox-view');
  
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML += `
    <div class="message">
      <div class="message-header">
        <span><strong>Systeem</strong></span>
        <span>21:41</span>
      </div>
      <div class="message-body">
        ✅ <strong>Bezichtiging bevestigd</strong><br>
        ${selectedSlot}<br><br>
        U ontvangt een bevestiging per e-mail en SMS. 
        We sturen u een herinnering 1 dag van tevoren.
      </div>
    </div>
  `;
  
  // Update dashboard - booked
  updateDashboard('booked');
}

// Dashboard updates
function updateDashboard(status) {
  const leadsCount = document.getElementById('kpi-leads');
  const responseTimeEl = document.getElementById('kpi-response');
  const bookingsCount = document.getElementById('kpi-bookings');
  const leadsList = document.getElementById('leads-list');
  
  if (status === 'new') {
    // New lead
    leadsCount.textContent = '1';
    
    const leadCard = document.createElement('div');
    leadCard.className = 'lead-card';
    leadCard.id = 'lead-1';
    leadCard.innerHTML = `
      <div class="lead-header">
        <div>
          <div class="lead-name">${leadData.name}</div>
          <div class="lead-property">${leadData.property}</div>
        </div>
        <div class="lead-time">21:40</div>
      </div>
      <span class="lead-status status-new">Nieuw</span>
      <div class="lead-timeline" id="timeline-1">
        <div class="timeline-item">
          <span class="timeline-icon">📨</span>
          <span>Lead ontvangen via website</span>
        </div>
      </div>
    `;
    
    leadsList.innerHTML = '';
    leadsList.appendChild(leadCard);
    
  } else if (status === 'replied') {
    // Update to replied status
    responseTimeEl.textContent = responseTime + ' sec';
    
    const leadCard = document.getElementById('lead-1');
    const statusEl = leadCard.querySelector('.lead-status');
    statusEl.className = 'lead-status status-replied';
    statusEl.textContent = `Beantwoord in ${responseTime} sec`;
    
    const timeline = document.getElementById('timeline-1');
    timeline.innerHTML += `
      <div class="timeline-item">
        <span class="timeline-icon">✅</span>
        <span>Automatisch antwoord verstuurd</span>
      </div>
    `;
    
  } else if (status === 'booked') {
    // Update to booked status
    bookingsCount.textContent = '1';
    
    const leadCard = document.getElementById('lead-1');
    const statusEl = leadCard.querySelector('.lead-status');
    statusEl.className = 'lead-status status-booked';
    statusEl.textContent = 'Bezichtiging geboekt';
    
    const timeline = document.getElementById('timeline-1');
    timeline.innerHTML += `
      <div class="timeline-item">
        <span class="timeline-icon">📅</span>
        <span>Bezichtiging geboekt: ${selectedSlot}</span>
      </div>
      <div class="timeline-item">
        <span class="timeline-icon">🔔</span>
        <span>Herinnering gepland: vrijdag 18:00</span>
      </div>
    `;
  }
}

// Utility
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize
window.addEventListener('load', () => {
  console.log('Demo app loaded');
});
