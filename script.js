const SANITY_PROJECT_ID = "mx8xtgih";
const SANITY_DATASET = "production";
const SANITY_TOKEN = "sk5BBOJ6aEzGz5bQlNEvTaZny24SVMqCfecwTzJ8TGGtQXDLXeUqyXF79iZcw4igHepzCOkHvd94JfyPErQPGAVjwPQc3GZHhZ38Q9VsHJvDwJtIppfgpkD2M74Akhj3MdSJZua8KqS4LgrlwiPYG8zCly9ihZ4DAJZEA8qST2uB8SDWukpO";

const plans = {
  g1: {
    left: { tier: "STANDARD", name: "Discover", price: "₹ 5,500", features: [
      "Psychometric assessment to measure your interests",
      "1 career counselling session with Mentoria's expert career coaches",
      "Lifetime access to Knowledge Gateway",
      "Invites to live webinars by industry experts",
      "Customised reports after each session with education pathways",
      "Guidance on studying abroad",
      "CV building during internships/graduation"
    ], cutFrom: 4 },
    right: { tier: "PREMIUM", name: "Discover plus+", price: "₹ 15,000", features: [
      "Psychometric assessments to measure your interests, personality and abilities",
      "8 career counselling sessions (1 every year) with Mentoria's expert career coaches until graduation",
      "Lifetime access to Knowledge Gateway",
      "Invites to live webinars by industry experts",
      "Customised reports after each session with education pathways",
      "Guidance on studying abroad",
      "CV building during internships/graduation"
    ], cutFrom: 99 }
  },
  g2: {
    left: { tier: "STANDARD", name: "Achieve Online", price: "₹ 5,999", features: [
      "Psychometric assessment to measure your interests, personality and abilities",
      "1 career counselling session",
      "Lifetime access to Knowledge Gateway",
      "Pre-recorded webinars by industry experts",
      "Customised reports after each session with education pathways",
      "Guidance on studying abroad",
      "CV reviews during internships/graduation"
    ], cutFrom: 4 },
    right: { tier: "PREMIUM", name: "Achieve Plus+", price: "₹ 10,599", features: [
      "Psychometric assessment to measure your interests, personality and abilities",
      "4 career counselling sessions",
      "Lifetime access to Knowledge Gateway",
      "Attend live webinars by industry experts",
      "Customised reports after each session with education pathways",
      "Guidance on studying abroad",
      "CV reviews during internships/graduation"
    ], cutFrom: 99 }
  },
  g3: {
    left: { tier: "STANDARD", name: "Ascend Online", price: "₹ 6,499", features: [
      "Psychometric assessment to measure your interests, personality and abilities",
      "1 career counselling session",
      "Lifetime access to Knowledge Gateway",
      "Pre-recorded webinars by industry experts",
      "Customised reports after each session with information on certificate/online courses",
      "Guidance on studying abroad",
      "CV reviews for job application"
    ], cutFrom: 4 },
    right: { tier: "PREMIUM", name: "Ascend Plus+", price: "₹ 10,599", features: [
      "Psychometric assessment to measure your interests, personality and abilities",
      "3 career counselling sessions",
      "Lifetime access to Knowledge Gateway",
      "Attend live webinars by industry experts",
      "Customised reports after each session with information on certificate/online courses",
      "Guidance on studying abroad",
      "CV reviews for job application"
    ], cutFrom: 99 }
  },
  g4: {
    left: { tier: "STANDARD", name: "Ascend Online", price: "₹ 6,499", features: [
      "Psychometric assessment to measure your interests, personality and abilities",
      "1 career counselling session",
      "Lifetime access to Knowledge Gateway",
      "Pre-recorded webinars by industry experts",
      "Customised reports after each session with information on certificate/online courses",
      "Guidance on studying abroad",
      "CV reviews for job application"
    ], cutFrom: 4 },
    right: { tier: "PREMIUM", name: "Ascend Plus+", price: "₹ 10,599", features: [
      "Psychometric assessment to measure your interests, personality and abilities",
      "3 career counselling sessions",
      "Lifetime access to Knowledge Gateway",
      "Attend live webinars by industry experts",
      "Customised reports after each session with information on certificate/online courses",
      "Guidance on studying abroad",
      "CV reviews for job application"
    ], cutFrom: 99 }
  }
};

const custom = [
  ["CV Building", "₹2000", "Is your CV making a great first impression on your behalf? Our HR experts will help you build the kind of CV that stands out from the crowd and increases your chances of getting interview calls."],
  ["LinkedIn Profile Building", "₹2000", "Revamp your LinkedIn profile with recommendations from recruitment experts to showcase your career journey and increase your chances of interview calls."],
  ["LinkedIn Profile + CV Building", "₹3500", "Build a profile recruiters would love to spend time on. Get your CV and LinkedIn profile built by our HR/Recruitment experts."],
  ["Job Application Strategy", "₹4000", "Build the right pipeline for job interviews through a customised job application tracker with information on companies, job postings and steps you need to follow to land your dream job."],
  ["Career Report", "₹2500", "Get a detailed report of your psychometric assessment for a scientific analysis of your interests, personality and abilities. Find out where your interests lie and which future paths you can potentially consider."],
  ["Career Report + Career Counselling", "₹4000", "Connect with India's top career coaches to analyse your psychometric report, get a detailed action plan for your development areas and shortlist the top three career paths you're most likely to enjoy and excel at."],
  ["Knowledge Gateway + Career Helpline Access", "₹250/month", "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline. Validate your career decisions from now until you land a job you love."],
  ["One-to-One Session with a Career Expert", "₹3500 per interaction for 1 hour", "Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field."],
  ["Overseas Admission Planner", "₹3000 for a planner with top 10 colleges in India OR any 1 country abroad", "Planning your masters studies? Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner."],
  ["Overseas Admission: SOP Brainstorm", "₹3000 for a one-hour session", "Increase your chances of getting admissions in your dream college by structuring your SOP in the most ideal manner through discussions with an overseas admissions expert."],
  ["Overseas Admission: SOP Review", "₹2500", "Is your SOP/Essay good enough to get you shortlisted? Get it reviewed by our team of overseas admissions experts to make sure you make the cut."],
  ["Interview Prep Session", "₹2000", "Ace your upcoming interviews with guidance from India's top HR experts and increase your chances of landing your dream job."]
];

const planCards = document.getElementById("plan-cards");
const customCards = document.getElementById("custom-cards");

function renderPlan(group) {
  const data = plans[group];
  planCards.innerHTML = [data.left, data.right].map((p) => {
    const items = p.features.map((f, idx) => `<li class="${idx >= p.cutFrom ? "off" : ""}">${f}</li>`).join("");
    return `<article class="plan"><h4>${p.tier}</h4><div class="name">${p.name}</div><div class="price">${p.price}</div><ul>${items}</ul><button class="buy">BUY NOW</button></article>`;
  }).join("");
}

function renderCustom() {
  customCards.innerHTML = custom.map(([title, price, desc]) => `
    <article class="custom-item">
      <h4>${title}</h4>
      <strong>${price}</strong>
      <p>${desc}</p>
      <button class="buy" style="margin-inline:0">BUY NOW</button>
    </article>
  `).join("");
}

function bindInteractions() {
  document.querySelectorAll(".group").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".group").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderPlan(btn.dataset.group);
    });
  });

  document.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const mentoria = document.getElementById("mentoria-view");
      const customView = document.getElementById("custom-view");
      const isMentoria = btn.dataset.view === "mentoria";
      mentoria.classList.toggle("hidden", !isMentoria);
      customView.classList.toggle("hidden", isMentoria);
    });
  });

  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const msg = document.getElementById("formMsg");
    if (!form.checkValidity()) {
      msg.textContent = "Please fill all required fields correctly.";
      return;
    }
    msg.textContent = "Message captured successfully.";
    form.reset();
  });
}

async function loadSanityContent() {
  const query = encodeURIComponent('*[_type=="websiteContent" && _id=="websiteContent"][0]');
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_DATASET}?query=${query}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${SANITY_TOKEN}` } });
  if (!res.ok) throw new Error("Sanity fetch failed");
  const data = await res.json();
  return data.result;
}

function applySanityContent(content) {
  if (!content) return;

  const navBrand = document.querySelector(".brand");
  if (navBrand && content.brandName) navBrand.textContent = content.brandName;

  const eyebrow = document.querySelector(".eyebrow");
  if (eyebrow && content.tagline) eyebrow.textContent = content.tagline;

  const homeTitle = document.querySelector("#home h1");
  if (homeTitle && content.brandName) homeTitle.textContent = `${content.brandName} Career Counseling`;

  const homeBody = document.querySelector("#home .hero-grid p:not(.eyebrow)");
  if (homeBody && content.aboutBrand) homeBody.textContent = content.aboutBrand;

  const founderName = document.querySelector("#founder h3");
  if (founderName && content.founderName) founderName.textContent = content.founderName;

  const founderBio = document.querySelector("#founder .two-col > div p");
  if (founderBio && content.founderBio) founderBio.textContent = content.founderBio;

  const founderMode = document.querySelector("#founder .founder-card p");
  if (founderMode && content.mode) founderMode.textContent = `Mode: ${content.mode}`;

  if (Array.isArray(content.services) && content.services.length) {
    const servicesWrap = document.querySelector(".service-grid");
    servicesWrap.innerHTML = content.services.map((svc) => `
      <article>
        <h3>${svc.title || ""}</h3>
        <p>${svc.description || ""}</p>
        <p><strong>Who it is for:</strong> ${svc.whoFor || ""}</p>
      </article>
    `).join("");
  }

  if (Array.isArray(content.testimonials) && content.testimonials.length) {
    const tw = document.querySelector(".testimonials");
    tw.innerHTML = content.testimonials.map((t) => `<blockquote>${t}</blockquote>`).join("");
  }

  if (content.contact) {
    const contactWrap = document.querySelector("#contact .contact-grid > div");
    contactWrap.innerHTML = `
      <h2>Contact Us</h2>
      <p><strong>Phone / WhatsApp:</strong> ${content.contact.phone || ""}</p>
      <p><strong>Email:</strong> ${content.contact.email || ""}</p>
      <p><strong>Office location:</strong> ${content.contact.office || ""}</p>
      <p><strong>LinkedIn:</strong> <a href="${content.contact.linkedin || "#"}" target="_blank" rel="noreferrer">${content.contact.linkedin || ""}</a></p>
    `;
  }
}

renderPlan("g1");
renderCustom();
bindInteractions();
loadSanityContent().then(applySanityContent).catch(() => {});
