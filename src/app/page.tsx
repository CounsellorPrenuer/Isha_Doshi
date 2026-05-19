"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Service = { title: string; description: string; whoFor: string };
type Contact = { phone: string; email: string; office: string; linkedin: string };
type Content = {
  brandName: string;
  tagline: string;
  aboutBrand: string;
  mode: string;
  founderName: string;
  founderBio: string;
  services: Service[];
  planGroups?: {
    key: string;
    label: string;
    leftPlan: Plan;
    rightPlan: Plan;
  }[];
  customPackages?: CustomItem[];
  testimonials: string[];
  contact: Contact;
};

type Plan = { tier: string; name: string; price: string; features: string[]; cutFrom: number };

type GroupPlans = Record<string, { left: Plan; right: Plan }>;

type CustomItem = { title: string; price: string; description: string };

const SANITY_PROJECT_ID = "mx8xtgih";
const SANITY_DATASET = "production";
const ASSET_BASE_PATH = process.env.NODE_ENV === "production" ? "/Isha_Doshi" : "";

const assetPath = (path: string) => `${ASSET_BASE_PATH}${path}`;

const DEFAULT_CONTENT: Content = {
  brandName: "UDAAN",
  tagline: "The/ We are the bridge between 'what ifs' and what's next",
  aboutBrand:
    "UDAAN Career Counseling is where we stop ghosting your potential and start building your future. Most counselors give you a generic map; we give you a lens to see the paths the herd ignores. If you're tired of being pushed into 'safe' choices, we're here to decode the career that matches your psychological DNA. We serve as the definitive bridge between your 'what ifs' and a 'Customized' 'what's next.' At UDAAN, we don't just provide guidance, we provide the clarity to launch your most authentic self.",
  mode: "HYBRID",
  founderName: "ISHA DOSHI",
  founderBio:
    "With an MSc in Industrial & Organizational Psychology, I bring a unique, data-driven \"lens\" to the world of career development. I don't just look at what jobs are available; I understand the psychological DNA of how people thrive in organizations. As a Certified Career Counselor who has guided 70+ clients through their professional pivots, I specialize in helping students from 8th to 12th grade break away from the herd to find their authentic flight path. My background is rooted in 2+ years of experience as a School Counselor, giving me a deep, contextual understanding of the academic pressures and emotional hurdles today's students face. At UDAAN, I combine this professional expertise with a commitment to providing a safe, non-judgmental space where you are truly heard. Whether we are decoding your career path or navigating personal transitions, my goal is to provide the empathy and expert training needed to turn your \"what ifs\" into a confident \"what's next.\"",
  services: [
    {
      title: "Career counseling - The Mindset Bridge",
      description:
        "Stop following the herd and start viewing your future through a high-definition lens. We use deep psychometric mapping to decode your unique psychological DNA, identifying unconventional paths that align with your natural strengths. This isn't just about picking a job; it's about building a strategic bridge from your current \"what ifs\" to a career you actually want to show up for.",
      whoFor:
        "Students (Grade 8-12) and early professionals who feel trapped by traditional expectations or are \"ghosting\" their potential because they don't fit the standard mold.",
    },
    {
      title: "Therapy Services",
      description:
        "Navigating the transition to \"what's next\" can be heavy, but you don't have to carry the mental clutter alone. Our therapy sessions provide a safe, non-judgmental space to unpack anxiety, academic burnout, and the pressure of perfectionism. We focus on emotional resilience, helping you clear the fog so you can walk across your bridge with a calm mind and a steady heart.",
      whoFor:
        "Adult Individuals dealing with the emotional weight of life transitions, persistent stress, or the \"what if\" anxiety that prevents them from taking the next step in their personal or professional journey.",
    },
  ],
  testimonials: [
    "I thought career counseling was just going to be another lecture about getting good grades. But with you Isha ma'am, it was different.You didn't just give me a list of jobs; you helped me understand why I get bored with some things and super excited about others. Thank you for actually listening to me. — A.S., 12th Standard",
    "Everyone at home was pushing me toward Science because that's what everyone does, but I felt like I was drowning. You gave me a safe space to say 'I don't want this' without feeling guilty. Finding out my true interest showed me that my creativity is actually a strength, not a distraction. — I.K., 10th Standard",
    "I was so stressed about college applications and 'ghosting' my own future because I was scared of making the wrong choice. You didn't give me a generic map; you gave me a lens to see where I actually fit. Having someone who gets the context of our school pressure but stays non-judgmental made all the difference. I'm finally excited for what's next. — R V., 12th Standard",
    "I used to get so angry when people asked what I wanted to be because I had no idea. I thought you'd just give me a boring test, but talking to you was actually chill. You didn't judge me for liking gaming more than math. You helped me see how the things I'm already good at can actually become a real career. I feel way less confused now. — AR. 8th standard",
  ],
  contact: {
    phone: "7338153662",
    email: "ishadoshi3019@gmail.com",
    office: "NIPANI",
    linkedin: "https://www.linkedin.com/in/isha-doshi-a9a460236",
  },
};

const plans: GroupPlans = {
  g1: {
    left: { tier: "STANDARD", name: "Discover", price: "₹ 5,500", features: ["Psychometric assessment to measure your interests", "1 career counselling session with Mentoria's expert career coaches", "Lifetime access to Knowledge Gateway", "Invites to live webinars by industry experts", "Customised reports after each session with education pathways", "Guidance on studying abroad", "CV building during internships/graduation"], cutFrom: 4 },
    right: { tier: "PREMIUM", name: "Discover plus+", price: "₹ 15,000", features: ["Psychometric assessments to measure your interests, personality and abilities", "8 career counselling sessions (1 every year) with Mentoria's expert career coaches until graduation", "Lifetime access to Knowledge Gateway", "Invites to live webinars by industry experts", "Customised reports after each session with education pathways", "Guidance on studying abroad", "CV building during internships/graduation"], cutFrom: 99 },
  },
  g2: {
    left: { tier: "STANDARD", name: "Achieve Online", price: "₹ 5,999", features: ["Psychometric assessment to measure your interests, personality and abilities", "1 career counselling session", "Lifetime access to Knowledge Gateway", "Pre-recorded webinars by industry experts", "Customised reports after each session with education pathways", "Guidance on studying abroad", "CV reviews during internships/graduation"], cutFrom: 4 },
    right: { tier: "PREMIUM", name: "Achieve Plus+", price: "₹ 10,599", features: ["Psychometric assessment to measure your interests, personality and abilities", "4 career counselling sessions", "Lifetime access to Knowledge Gateway", "Attend live webinars by industry experts", "Customised reports after each session with education pathways", "Guidance on studying abroad", "CV reviews during internships/graduation"], cutFrom: 99 },
  },
  g3: {
    left: { tier: "STANDARD", name: "Ascend Online", price: "₹ 6,499", features: ["Psychometric assessment to measure your interests, personality and abilities", "1 career counselling session", "Lifetime access to Knowledge Gateway", "Pre-recorded webinars by industry experts", "Customised reports after each session with information on certificate/online courses", "Guidance on studying abroad", "CV reviews for job application"], cutFrom: 4 },
    right: { tier: "PREMIUM", name: "Ascend Plus+", price: "₹ 10,599", features: ["Psychometric assessment to measure your interests, personality and abilities", "3 career counselling sessions", "Lifetime access to Knowledge Gateway", "Attend live webinars by industry experts", "Customised reports after each session with information on certificate/online courses", "Guidance on studying abroad", "CV reviews for job application"], cutFrom: 99 },
  },
  g4: {
    left: { tier: "STANDARD", name: "Ascend Online", price: "₹ 6,499", features: ["Psychometric assessment to measure your interests, personality and abilities", "1 career counselling session", "Lifetime access to Knowledge Gateway", "Pre-recorded webinars by industry experts", "Customised reports after each session with information on certificate/online courses", "Guidance on studying abroad", "CV reviews for job application"], cutFrom: 4 },
    right: { tier: "PREMIUM", name: "Ascend Plus+", price: "₹ 10,599", features: ["Psychometric assessment to measure your interests, personality and abilities", "3 career counselling sessions", "Lifetime access to Knowledge Gateway", "Attend live webinars by industry experts", "Customised reports after each session with information on certificate/online courses", "Guidance on studying abroad", "CV reviews for job application"], cutFrom: 99 },
  },
};

const defaultCustomItems: CustomItem[] = [
  { title: "CV Building", price: "₹2000", description: "Is your CV making a great first impression on your behalf? Our HR experts will help you build the kind of CV that stands out from the crowd and increases your chances of getting interview calls." },
  { title: "LinkedIn Profile Building", price: "₹2000", description: "Revamp your LinkedIn profile with recommendations from recruitment experts to showcase your career journey and increase your chances of interview calls." },
  { title: "LinkedIn Profile + CV Building", price: "₹3500", description: "Build a profile recruiters would love to spend time on. Get your CV and LinkedIn profile built by our HR/Recruitment experts." },
  { title: "Job Application Strategy", price: "₹4000", description: "Build the right pipeline for job interviews through a customised job application tracker with information on companies, job postings and steps you need to follow to land your dream job." },
  { title: "Career Report", price: "₹2500", description: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests, personality and abilities. Find out where your interests lie and which future paths you can potentially consider." },
  { title: "Career Report + Career Counselling", price: "₹4000", description: "Connect with India's top career coaches to analyse your psychometric report, get a detailed action plan for your development areas and shortlist the top three career paths you're most likely to enjoy and excel at." },
  { title: "Knowledge Gateway + Career Helpline Access", price: "₹250/month", description: "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline. Validate your career decisions from now until you land a job you love." },
  { title: "One-to-One Session with a Career Expert", price: "₹3500 per interaction for 1 hour", description: "Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field." },
  { title: "Overseas Admission Planner", price: "₹3000 for a planner with top 10 colleges in India OR any 1 country abroad", description: "Planning your masters studies? Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner." },
  { title: "Overseas Admission: SOP Brainstorm", price: "₹3000 for a one-hour session", description: "Increase your chances of getting admissions in your dream college by structuring your SOP in the most ideal manner through discussions with an overseas admissions expert." },
  { title: "Overseas Admission: SOP Review", price: "₹2500", description: "Is your SOP/Essay good enough to get you shortlisted? Get it reviewed by our team of overseas admissions experts to make sure you make the cut." },
  { title: "Interview Prep Session", price: "₹2000", description: "Ace your upcoming interviews with guidance from India's top HR experts and increase your chances of landing your dream job." },
];

export default function HomePage() {
  const [content, setContent] = useState<Content>(DEFAULT_CONTENT);
  const [activeTab, setActiveTab] = useState<"mentoria" | "custom">("mentoria");
  const [activeGroup, setActiveGroup] = useState<"g1" | "g2" | "g3" | "g4">("g1");
  const [dynamicPlans, setDynamicPlans] = useState<GroupPlans>(plans);
  const [customItems, setCustomItems] = useState<CustomItem[]>(defaultCustomItems);

  useEffect(() => {
    const query = encodeURIComponent('*[_type=="websiteContent" && _id=="websiteContent"][0]');
    fetch(`https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_DATASET}?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data?.result) return;
        setContent((prev) => ({ ...prev, ...data.result }));
        if (Array.isArray(data.result.planGroups) && data.result.planGroups.length > 0) {
          const mapped: GroupPlans = {};
          for (const pg of data.result.planGroups) {
            if (pg?.key && pg?.leftPlan && pg?.rightPlan) {
              mapped[pg.key] = { left: pg.leftPlan, right: pg.rightPlan };
            }
          }
          if (Object.keys(mapped).length > 0) setDynamicPlans(mapped);
        }
        if (Array.isArray(data.result.customPackages) && data.result.customPackages.length > 0) {
          setCustomItems(data.result.customPackages);
        }
      })
      .catch(() => undefined);
  }, []);

  const active = useMemo(() => dynamicPlans[activeGroup] ?? plans[activeGroup], [activeGroup, dynamicPlans]);

  return (
    <>
      <header className="site-header">
        <div className="wrap nav-wrap">
          <a href="#home" className="brand brand-logo-link" aria-label="UDAAN Home">
            <Image src={assetPath("/udaan-logo.png")} alt="UDAAN logo" width={180} height={158} className="nav-logo" priority />
          </a>
          <nav>
            <a href="#home">Home</a>
            <a href="#founder">About Founder</a>
            <a href="#services">Services</a>
            <a href="#packages">Packages</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact Us</a>
          </nav>
        </div>
      </header>

      <section id="home" className="hero section">
        <div className="wrap">
          <p className="kicker">Career Counseling and Emotional Wellness</p>
          <p className="eyebrow">{content.tagline}</p>
          <h1>{content.brandName} Career Counseling</h1>
          <p>{content.aboutBrand}</p>
          <div className="hero-cta-row">
            <a href="#packages" className="hero-btn">Explore Packages</a>
            <a href="#contact" className="hero-btn ghost">Contact Us</a>
          </div>
        </div>
      </section>

      <section id="founder" className="section section-light">
        <div className="wrap founder-wrap">
          <div className="founder-copy card">
            <h2>About Founder</h2>
            <h3>{content.founderName}</h3>
            <p>{content.founderBio}</p>
          </div>
          <aside className="founder-card card">
            <Image
              src={assetPath("/founder-photo.jpg")}
              alt="Isha Doshi – Founder"
              fill
              sizes="(max-width: 980px) 92vw, 30vw"
              className="founder-card-photo"
              priority
            />
          </aside>
        </div>
      </section>

      <section id="services" className="section">
        <div className="wrap">
          <h2>Services</h2>
          <div className="service-grid">
            {content.services.map((service) => (
              <article key={service.title} className="card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p><strong>Who it is for:</strong> {service.whoFor}</p>
              </article>
            ))}
          </div>
          <div className="services-cta card">
            <p><strong>Mode:</strong> {content.mode}</p>
            <a href="#contact" className="hero-btn">Book a Consultation</a>
          </div>
        </div>
      </section>

      <section id="packages" className="section section-light">
        <div className="wrap">
          <h2>Packages</h2>

          <div className="tab-row top-tabs">
            <button className={`tab ${activeTab === "mentoria" ? "active" : ""}`} onClick={() => setActiveTab("mentoria")}>Mentoria&apos;s Plans</button>
            <button className={`tab ${activeTab === "custom" ? "active" : ""}`} onClick={() => setActiveTab("custom")}>Customise Your Mentorship Plan</button>
          </div>

          {activeTab === "mentoria" ? (
            <>
              <div className="tab-row group-row">
                <button className={`group ${activeGroup === "g1" ? "active" : ""}`} onClick={() => setActiveGroup("g1")}>8-9 STUDENTS</button>
                <button className={`group ${activeGroup === "g2" ? "active" : ""}`} onClick={() => setActiveGroup("g2")}>10-12 STUDENTS</button>
                <button className={`group ${activeGroup === "g3" ? "active" : ""}`} onClick={() => setActiveGroup("g3")}>COLLEGE GRADUATES</button>
                <button className={`group ${activeGroup === "g4" ? "active" : ""}`} onClick={() => setActiveGroup("g4")}>WORKING PROFESSIONALS</button>
              </div>

              <div className="plan-grid">
                {[active.left, active.right].map((plan) => (
                  <article key={plan.name} className="plan card">
                    <h4>{plan.tier}</h4>
                    <div className="name">{plan.name}</div>
                    <div className="price">{plan.price}</div>
                    <ul>
                      {plan.features.map((feature, idx) => (
                        <li key={feature} className={idx >= plan.cutFrom ? "off" : ""}>{feature}</li>
                      ))}
                    </ul>
                    <button className="buy">BUY NOW</button>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="centered">Want To Customise Your Mentorship Plan?</h3>
              <p className="sub center">If you want to subscribe to specific services from Mentoria that resolve your career challenges, you can choose one or more of the following.</p>
              <div className="custom-grid">
                {customItems.map((item) => (
                  <article key={item.title} className="custom-item card">
                    <h4>{item.title}</h4>
                    <strong>{item.price}</strong>
                    <p>{item.description}</p>
                    <button className="buy buy-left">BUY NOW</button>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section id="testimonials" className="section">
        <div className="wrap">
          <h2>Testimonials</h2>
          <div className="testimonials">
            {content.testimonials.map((testimonial, idx) => (
              <blockquote key={`${idx}-${testimonial.slice(0, 20)}`} className="card">{testimonial}</blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section section-light">
        <div className="wrap contact-wrap card">
          <div className="contact-info">
            <h2>Contact Us</h2>
            <p><strong>Phone / WhatsApp:</strong> {content.contact.phone}</p>
            <p><strong>Email:</strong> {content.contact.email}</p>
            <p><strong>Office location:</strong> {content.contact.office}</p>
            <p><strong>LinkedIn:</strong> <a href={content.contact.linkedin} target="_blank" rel="noreferrer">{content.contact.linkedin}</a></p>
          </div>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              Name
              <input type="text" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" placeholder="you@example.com" />
            </label>
            <label>
              Message
              <textarea rows={5} placeholder="Tell us what support you need" />
            </label>
            <button type="submit" className="hero-btn">Send Message</button>
          </form>
        </div>
      </section>
    </>
  );
}
