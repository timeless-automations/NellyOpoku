/* === APP LOGIC === */

// Language management
let currentLang = "nl";

function setLang(lang) {
  if (!I18N[lang]) return;
  
  currentLang = lang;
  const t = I18N[lang];
  
  document.documentElement.lang = lang === "fr" ? "fr" : "nl";
  
  // Update all text content
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      el.textContent = t[key];
    }
  });
  
  // Update meta tags
  document.title = t.metaTitle;
  
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", t.metaDesc);
  
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", t.metaTitle);
  
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", t.metaDesc);
  
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) ogLocale.setAttribute("content", lang === "fr" ? "fr_BE" : "nl_BE");
  
  // Update language toggle buttons
  document.getElementById("btn-nl").classList.toggle("active", lang === "nl");
  document.getElementById("btn-fr").classList.toggle("active", lang === "fr");
  document.getElementById("btn-nl").setAttribute("aria-pressed", lang === "nl" ? "true" : "false");
  document.getElementById("btn-fr").setAttribute("aria-pressed", lang === "fr" ? "true" : "false");
  
  // Save preference
  try {
    localStorage.setItem("site-lang", lang);
  } catch (_) {}
}

// Initialize language
function initLang() {
  let initial = "nl";
  try {
    const saved = localStorage.getItem("site-lang");
    if (saved === "fr" || saved === "nl") initial = saved;
  } catch (_) {}
  setLang(initial);
}

// Sector detail navigation
function showSectorDetail(sector) {
  // Hide all sector details
  document.querySelectorAll(".section-detail").forEach(section => {
    section.style.display = "none";
  });
  
  // Show selected sector detail
  const sectorSection = document.getElementById(`sector-${sector}`);
  if (sectorSection) {
    sectorSection.style.display = "block";
    
    // Scroll to it smoothly
    setTimeout(() => {
      sectorSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }
}

function hideSectorDetail() {
  // Hide all sector details
  document.querySelectorAll(".section-detail").forEach(section => {
    section.style.display = "none";
  });
  
  // Scroll back to sectors
  const sectorsSection = document.getElementById("sectoren");
  if (sectorsSection) {
    sectorsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Form submission handler
async function handleFormSubmit(event, formType) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  const t = I18N[currentLang];
  
  // Check if we have a form endpoint configured
  if (FORM_CONFIG.endpoint && FORM_CONFIG.endpoint.trim() !== "") {
    // Use the configured form endpoint (e.g., Formspree)
    try {
      const response = await fetch(FORM_CONFIG.endpoint, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        showFormSuccess(form, t.formSuccess);
        form.reset();
      } else {
        showFormError(form, t.formError);
      }
    } catch (error) {
      showFormError(form, t.formError);
    }
  } else {
    // Fallback to mailto:
    const subject = formType === "other" 
      ? `Nieuwe aanvraag - Andere sector: ${data.sector}`
      : `Contact aanvraag - ${data.sector}`;
    
    const body = `
Naam: ${data.name}
Bedrijf: ${data.company}
Sector: ${data.sector}
E-mail: ${data.email}
${data.phone ? `Telefoon: ${data.phone}` : ''}

Bericht:
${data.message}
    `.trim();
    
    const mailtoLink = `mailto:${FORM_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open mailto link
    window.location.href = mailtoLink;
    
    // Show success message
    setTimeout(() => {
      showFormSuccess(form, t.formSuccess);
      form.reset();
    }, 500);
  }
}

function showFormSuccess(form, message) {
  // Remove any existing messages
  const existingMsg = form.parentElement.querySelector(".form-message");
  if (existingMsg) existingMsg.remove();
  
  // Create success message
  const msg = document.createElement("div");
  msg.className = "form-message form-success";
  msg.textContent = message;
  form.parentElement.insertBefore(msg, form);
  
  // Scroll to message
  msg.scrollIntoView({ behavior: "smooth", block: "nearest" });
  
  // Remove after 8 seconds
  setTimeout(() => {
    msg.remove();
  }, 8000);
}

function showFormError(form, message) {
  // Remove any existing messages
  const existingMsg = form.parentElement.querySelector(".form-message");
  if (existingMsg) existingMsg.remove();
  
  // Create error message
  const msg = document.createElement("div");
  msg.className = "form-message form-error";
  msg.innerHTML = `${message} <a href="mailto:${FORM_CONFIG.email}">${FORM_CONFIG.email}</a>`;
  form.parentElement.insertBefore(msg, form);
  
  // Scroll to message
  msg.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize language
  initLang();
  
  // Language toggle buttons
  document.getElementById("btn-nl").addEventListener("click", () => setLang("nl"));
  document.getElementById("btn-fr").addEventListener("click", () => setLang("fr"));
  
  // Check for hash on load (e.g., #sector-realestate)
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    if (hash.startsWith("sector-")) {
      const sector = hash.replace("sector-", "");
      setTimeout(() => {
        showSectorDetail(sector);
      }, 300);
    }
  }
});
