// Parallel — Landing Page
// Framer-ready React component
// Import via Framer: Assets panel → Code → New File → paste this

import { useState, useEffect, useRef } from "react"

// ─── Design tokens ───────────────────────────────────────────
const T = {
  black:     "#0a1209",
  offBlack:  "#0d1610",
  card:      "#111d13",
  border:    "#1e3022",
  sage:      "#4a7c6a",
  sageLight: "#5d9b85",
  sageGlow:  "rgba(74,124,106,0.18)",
  warm:      "#c9b99a",
  warmDim:   "#7a6e60",
  white:     "#f0ece4",
  muted:     "#4a5e4d",
  red:       "#c0392b",
}

const fonts = {
  display: "'Playfair Display', Georgia, serif",
  body:    "'DM Sans', system-ui, sans-serif",
}

// ─── SSR guard ───────────────────────────────────────────────
const isBrowser = typeof window !== "undefined"

// ─── Hook: scroll reveal ──────────────────────────────────────
function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!isBrowser) return
    const el = ref.current
    if (!el) return
    if (!("IntersectionObserver" in window)) { setVisible(true); return }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

// ─── Reveal wrapper ───────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  )
}

// ─── Google Fonts injector ────────────────────────────────────
function useFonts() {
  useEffect(() => {
    if (document.getElementById("parallel-fonts")) return
    const link = document.createElement("link")
    link.id = "parallel-fonts"
    link.rel = "stylesheet"
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap"
    document.head.appendChild(link)
  }, [])
}

// ─── Keyframe injector ────────────────────────────────────────
function useKeyframes() {
  useEffect(() => {
    if (document.getElementById("parallel-keyframes")) return
    const style = document.createElement("style")
    style.id = "parallel-keyframes"
    style.textContent = `
      @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
      @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
      @keyframes blink { 0%,100% { opacity:0.2; } 50% { opacity:1; } }
      .p-hero-eye  { opacity:0; animation: fadeUp 0.8s ease forwards 0.2s; }
      .p-hero-h1   { opacity:0; animation: fadeUp 0.9s ease forwards 0.4s; }
      .p-hero-sub  { opacity:0; animation: fadeUp 0.9s ease forwards 0.6s; }
      .p-hero-acts { opacity:0; animation: fadeUp 0.9s ease forwards 0.8s; }
      .p-hero-stat { opacity:0; animation: fadeUp 0.9s ease forwards 1.0s; }
      .p-marquee   { display:flex; gap:56px; white-space:nowrap; animation: marquee 28s linear infinite; }
      .p-dot1 { animation: blink 1.2s ease infinite; }
      .p-dot2 { animation: blink 1.2s ease infinite 0.2s; }
      .p-dot3 { animation: blink 1.2s ease infinite 0.4s; }
      .p-card-hover:hover { border-color: ${T.sage} !important; transform: translateY(-3px); }
      .p-hiw-hover:hover  { background: #162018 !important; }
      .p-feat-hover:hover { border-color: ${T.sage} !important; transform: translateY(-3px); }
    `
    document.head.appendChild(style)
  }, [])
}

// ─── Nav ──────────────────────────────────────────────────────
function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "22px 48px",
      background: `linear-gradient(to bottom, rgba(10,18,9,0.97), transparent)`,
    }}>
      <span style={{ fontFamily: fonts.display, fontSize: "1.4rem", letterSpacing: "0.04em", color: T.white }}>
        Parallel<span style={{ color: T.sageLight }}>.</span>
      </span>
      <div style={{ display: "flex", gap: 36, alignItems: "center", listStyle: "none" }}>
        {["How it works", "Features", "Sage AI", "About"].map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(/ /g,"")}`} style={{
            color: T.warmDim, textDecoration: "none", fontSize: "0.85rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>{l}</a>
        ))}
        <a href="#waitlist" style={{
          background: T.sage, color: T.white, padding: "9px 22px",
          borderRadius: 100, fontSize: "0.875rem", textDecoration: "none", fontWeight: 500,
        }}>Join waitlist</a>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "140px 48px 80px",
      position: "relative", overflow: "hidden", background: T.black,
    }}>
      {/* bg glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 60% 50% at 70% 40%, rgba(74,124,106,0.12) 0%, transparent 70%),
          radial-gradient(ellipse 40% 30% at 20% 70%, rgba(201,185,154,0.06) 0%, transparent 60%)
        `,
      }} />

      <p className="p-hero-eye" style={{
        fontFamily: fonts.body, fontSize: "0.75rem", letterSpacing: "0.16em",
        textTransform: "uppercase", color: T.sageLight, marginBottom: 28,
      }}>Peer Support · Community · Real Experience</p>

      <h1 className="p-hero-h1" style={{
        fontFamily: fonts.display, fontSize: "clamp(3rem,7vw,6.5rem)",
        lineHeight: 1.08, fontWeight: 700, maxWidth: "14ch", color: T.white,
      }}>
        Support that{" "}
        <em style={{ fontStyle: "italic", color: T.sageLight }}>actually</em>
        {" "}gets it.
      </h1>

      <p className="p-hero-sub" style={{
        marginTop: 32, maxWidth: "44ch", fontSize: "1.125rem", color: T.warm,
        fontFamily: fonts.body,
      }}>
        Parallel connects you with people who've lived what you're living — not algorithms, not diagnoses. Community built on shared experience.
      </p>

      <div className="p-hero-acts" style={{ marginTop: 48, display: "flex", gap: 16, flexWrap: "wrap" }}>
        <a href="#waitlist" style={{
          background: T.sage, color: T.white, border: "none", padding: "16px 36px",
          borderRadius: 100, fontFamily: fonts.body, fontSize: "0.95rem", fontWeight: 500,
          cursor: "pointer", textDecoration: "none",
        }}>Join the waitlist</a>
        <a href="#how" style={{
          background: "transparent", color: T.warmDim, border: `1px solid ${T.border}`,
          padding: "15px 32px", borderRadius: 100, fontFamily: fonts.body,
          fontSize: "0.95rem", cursor: "pointer", textDecoration: "none",
        }}>See how it works</a>
      </div>

      <div className="p-hero-stat" style={{ marginTop: 72, display: "flex", gap: 56 }}>
        {[
          { num: "3",   label: "Ways to show up" },
          { num: "0",   label: "Therapists. That's on purpose." },
          { num: "∞",   label: "People who get it" },
        ].map(s => (
          <div key={s.num}>
            <span style={{ display: "block", fontFamily: fonts.display, fontSize: "2rem", color: T.white }}>{s.num}</span>
            <span style={{ display: "block", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted }}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Marquee ──────────────────────────────────────────────────
const MARQUEE_ITEMS = ["Grief","Anxiety","Recovery","Loss","Identity","Trauma","Mental Health","Chronic illness","Relationships","Parenting"]

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div style={{ overflow: "hidden", borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "16px 0", background: T.offBlack }}>
      <div className="p-marquee">
        {items.map((item, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 56, flexShrink: 0 }}>
            <span style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: T.muted }}>{item}</span>
            <span style={{ color: T.sageLight, fontSize: "0.6rem" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── How It Works ─────────────────────────────────────────────
const HIW_CARDS = [
  { num: "01", title: "Seeking", desc: "You need to be heard. Share what you're going through, find people who've been there, and get responses rooted in lived experience — not advice from a stranger.", badge: "I need support" },
  { num: "02", title: "Helping", desc: "You've been through it and you want to give back. Your experience is the credential. No certification required. Just presence and truth.", badge: "I'm ready to help" },
  { num: "03", title: "Browsing", desc: "Not ready to post? That's okay. Read stories, absorb community wisdom, and get a feel for the space before you decide how you want to engage.", badge: "Just looking" },
]

function HowItWorks() {
  return (
    <section id="howitworks" style={{ padding: "112px 48px", maxWidth: 1200, margin: "0 auto" }}>
      <Reveal><p style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: T.sageLight, marginBottom: 16 }}>How it works</p></Reveal>
      <Reveal delay={0.1}><h2 style={{ fontFamily: fonts.display, fontSize: "clamp(2rem,4vw,3.4rem)", lineHeight: 1.12, fontWeight: 700, color: T.white }}>
        You choose <em style={{ fontStyle: "italic", color: T.sageLight }}>how</em> you show up.
      </h2></Reveal>
      <Reveal delay={0.15}><p style={{ marginTop: 16, maxWidth: "50ch", color: T.warm, fontSize: "1.05rem" }}>No forced roles. Move between modes as you need. Some days you need the room. Some days you are the room.</p></Reveal>

      <Reveal delay={0.2}>
        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: T.border, border: `1px solid ${T.border}` }}>
          {HIW_CARDS.map(c => (
            <div key={c.num} className="p-hiw-hover" style={{ background: T.card, padding: "48px 36px", transition: "background 0.25s" }}>
              <div style={{ fontFamily: fonts.display, fontSize: "4rem", fontWeight: 700, color: T.border, lineHeight: 1, marginBottom: 24 }}>{c.num}</div>
              <div style={{ fontSize: "1.05rem", fontWeight: 500, marginBottom: 12, color: T.white }}>{c.title}</div>
              <div style={{ fontSize: "0.9rem", color: T.warmDim, lineHeight: 1.6 }}>{c.desc}</div>
              <span style={{
                display: "inline-block", marginTop: 20, fontSize: "0.7rem", letterSpacing: "0.1em",
                textTransform: "uppercase", color: T.sageLight, border: `1px solid ${T.sage}`,
                padding: "4px 12px", borderRadius: 100,
              }}>{c.badge}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────
const FEATURES = [
  { icon: "🌊", title: "Venting — sacred space", desc: "Sometimes you just need to let it out without anyone offering solutions. Venting is a disappearing message feature with three modes — Float, Heartbeat, and Burn — and three themes. No tone scanning inside. No nudges. Just you and the release.", tag: "Float · Heartbeat · Burn", tall: true },
  { icon: "🧠", title: "SmartTextBox", desc: "Before you post, Parallel gently checks in. A silent 2.5s scan catches distress signals and offers a soft nudge — never a hard block.", tag: "Powered by Sage AI" },
  { icon: "🔍", title: "Fuzzy experience finder", desc: "Find your people without having to name exactly what you're going through. First-person trigger matching meets you where the language is still forming.", tag: "Taxonomy search" },
  { icon: "🏅", title: "Tier system", desc: "Growth is real on Parallel. A badge and tier system that recognizes consistency, care, and community contribution — not just post count.", tag: "Progression · Recognition" },
]

function Features() {
  return (
    <section id="features" style={{ padding: "0 48px 112px", maxWidth: 1200, margin: "0 auto" }}>
      <Reveal><p style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: T.sageLight, marginBottom: 16 }}>Built different</p></Reveal>
      <Reveal delay={0.1}><h2 style={{ fontFamily: fonts.display, fontSize: "clamp(2rem,4vw,3.4rem)", lineHeight: 1.12, fontWeight: 700, color: T.white }}>
        Every feature is a <em style={{ fontStyle: "italic", color: T.sageLight }}>decision</em> about you.
      </h2></Reveal>

      <Reveal delay={0.2}>
        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="p-feat-hover" style={{
              background: T.card, border: `1px solid ${T.border}`, borderRadius: 16,
              padding: "40px", gridRow: f.tall ? "span 2" : undefined,
              transition: "border-color 0.25s, transform 0.2s",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: T.sageGlow,
                border: `1px solid ${T.sage}`, display: "flex", alignItems: "center",
                justifyContent: "center", marginBottom: 24, fontSize: "1.2rem",
              }}>{f.icon}</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: 10, color: T.white }}>{f.title}</div>
              <div style={{ fontSize: "0.9rem", color: T.warmDim, lineHeight: 1.65 }}>{f.desc}</div>
              <div style={{ marginTop: 18, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.sageLight }}>{f.tag}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

// ─── Sage AI ──────────────────────────────────────────────────
function SageSection() {
  const principles = [
    "Style is never flagged. Slang, AAVE, casual language — all fine.",
    "No tone scanning inside Venting. Ever.",
    `Always labeled "Parallel AI." No ambiguity.`,
    "Crisis detection routes to real resources — not a chatbot loop.",
  ]
  return (
    <div id="sageai" style={{ padding: "112px 48px", background: T.offBlack, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <Reveal><p style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: T.sageLight, marginBottom: 16 }}>Sage AI</p></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: fonts.display, fontSize: "clamp(2rem,4vw,3.4rem)", lineHeight: 1.12, fontWeight: 700, color: T.white }}>
            An AI that <em style={{ fontStyle: "italic", color: T.sageLight }}>holds space</em>, not center stage.
          </h2></Reveal>
          <Reveal delay={0.15}><p style={{ marginTop: 20, maxWidth: "50ch", color: T.warm, fontSize: "1.05rem", lineHeight: 1.7 }}>
            Sage is Parallel's built-in AI — always labeled, always transparent. It helps you find your words, checks in when posts carry weight, and surfaces resources when needed.
          </p></Reveal>
          <Reveal delay={0.2}>
            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.sageLight, marginBottom: 16 }}>Sage principles</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {principles.map((p, i) => (
                  <div key={i} style={{ fontSize: "0.9rem", color: T.warmDim, display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: T.sageLight, marginTop: 3, fontSize: "0.5rem" }}>◆</span>{p}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Chat UI */}
        <Reveal delay={0.25}>
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, overflow: "hidden" }}>
            <div style={{ padding: "18px 24px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.sage, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", color: T.white, fontWeight: 500 }}>S</div>
              <span style={{ fontSize: "0.9rem", fontWeight: 500, color: T.white }}>Sage</span>
              <span style={{ marginLeft: "auto", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.sageLight, background: T.sageGlow, border: `1px solid ${T.sage}`, padding: "3px 10px", borderRadius: 100 }}>Parallel AI</span>
            </div>
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ maxWidth: "80%", padding: "12px 16px", borderRadius: "14px 14px 4px 14px", background: "#1e2e20", color: T.warm, fontSize: "0.88rem", lineHeight: 1.55, alignSelf: "flex-end" }}>
                I've been trying to explain what I'm feeling to my family and nobody gets it. It's exhausting.
              </div>
              <div style={{ maxWidth: "80%", padding: "12px 16px", borderRadius: "14px 14px 14px 4px", background: "rgba(74,124,106,0.14)", border: "1px solid rgba(74,124,106,0.3)", color: T.white, fontSize: "0.88rem", lineHeight: 1.55 }}>
                That's one of the loneliest feelings — being surrounded by people who care but still feeling unseen. You don't have to keep translating yourself here.
              </div>
              <div style={{ maxWidth: "80%", padding: "12px 16px", borderRadius: "14px 14px 4px 14px", background: "#1e2e20", color: T.warm, fontSize: "0.88rem", lineHeight: 1.55, alignSelf: "flex-end" }}>
                How do I even find them?
              </div>
              <div style={{ display: "flex", gap: 4, padding: "14px 18px", background: "rgba(74,124,106,0.08)", border: "1px solid rgba(74,124,106,0.2)", borderRadius: "14px 14px 14px 4px", width: "fit-content" }}>
                {["p-dot1","p-dot2","p-dot3"].map(cls => (
                  <div key={cls} className={cls} style={{ width: 6, height: 6, borderRadius: "50%", background: T.sageLight }} />
                ))}
              </div>
            </div>
            <div style={{ padding: "14px 24px", borderTop: `1px solid ${T.border}`, fontSize: "0.72rem", color: T.muted, textAlign: "center" }}>
              Sage is an AI, not a therapist. For crisis support, real help is one tap away.
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

// ─── Testimonials ─────────────────────────────────────────────
const TESTIMONIALS = [
  { quote: "I've tried every mental health app. They all feel like I'm filling out a form. This feels like an actual community.", name: "D.M.", location: "Beta tester, Los Angeles", mode: "Seeking mode" },
  { quote: "I went through something bad three years ago. I finally feel like it was for something — I can actually help someone now.", name: "T.W.", location: "Beta tester, Atlanta", mode: "Helping mode" },
  { quote: "The venting feature alone. Sometimes I just need to say the thing and let it disappear. I didn't know I needed that until I had it.", name: "R.A.", location: "Beta tester, Oakland", mode: "Venting — Burn mode" },
]

function Testimonials() {
  return (
    <section id="voices" style={{ padding: "112px 48px", maxWidth: 1200, margin: "0 auto" }}>
      <Reveal><p style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: T.sageLight, marginBottom: 16 }}>Early voices</p></Reveal>
      <Reveal delay={0.1}><h2 style={{ fontFamily: fonts.display, fontSize: "clamp(2rem,4vw,3.4rem)", lineHeight: 1.12, fontWeight: 700, color: T.white }}>
        What people are <em style={{ fontStyle: "italic", color: T.sageLight }}>already</em> saying.
      </h2></Reveal>
      <Reveal delay={0.2}>
        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="p-card-hover" style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 32, transition: "border-color 0.2s, transform 0.2s" }}>
              <p style={{ fontSize: "0.95rem", color: T.warm, lineHeight: 1.7, marginBottom: 24, fontStyle: "italic" }}>"{t.quote}"</p>
              <div style={{ fontSize: "0.8rem", color: T.warmDim }}>
                <strong style={{ display: "block", color: T.white, fontWeight: 500, marginBottom: 2 }}>{t.name}</strong>
                {t.location}
                <span style={{ display: "inline-block", marginTop: 10, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.sageLight, border: `1px solid ${T.sage}`, padding: "3px 10px", borderRadius: 100 }}>{t.mode}</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────
function About() {
  const tags = ["Peer Support","Not therapy","Community first","Lived experience","No gatekeeping","Human-centered AI"]
  return (
    <section id="about" style={{ padding: "0 48px 112px", maxWidth: 1200, margin: "0 auto" }}>
      <Reveal><p style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: T.sageLight, marginBottom: 16 }}>Why Parallel exists</p></Reveal>
      <Reveal delay={0.1}><h2 style={{ fontFamily: fonts.display, fontSize: "clamp(2rem,4vw,3.4rem)", lineHeight: 1.12, fontWeight: 700, color: T.white }}>
        Not therapy. <em style={{ fontStyle: "italic", color: T.sageLight }}>Community.</em>
      </h2></Reveal>
      <Reveal delay={0.2}>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
          <blockquote style={{ fontFamily: fonts.display, fontSize: "1.5rem", fontStyle: "italic", lineHeight: 1.5, color: T.warm, borderLeft: `2px solid ${T.sage}`, paddingLeft: 28 }}>
            "The most powerful thing you can say to someone in pain is: me too."
          </blockquote>
          <div style={{ color: T.warmDim, fontSize: "0.95rem", lineHeight: 1.85 }}>
            <p>Parallel was built out of a simple observation: when people are struggling, what helps most is often not a professional — it's someone who's been there. Someone who can say "I know that exact feeling" and actually mean it.</p>
            <p style={{ marginTop: 20 }}>Therapists are valuable. But they're also inaccessible, expensive, and fundamentally one step removed from lived experience. Parallel exists in a different space — where community, connection, and shared story are the medicine.</p>
            <p style={{ marginTop: 20 }}>We're not trying to replace mental health care. We're building the thing that exists alongside it, underneath it, and sometimes before it.</p>
            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {tags.map(tag => (
                <span key={tag} style={{ fontSize: "0.75rem", letterSpacing: "0.08em", padding: "7px 16px", border: `1px solid ${T.border}`, borderRadius: 100, color: T.warmDim }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ─── Waitlist ─────────────────────────────────────────────────
// IMPORTANT: Replace YOUR_BEEHIIV_API_KEY with your real key (never commit to git)
const BEEHIIV_API_KEY = "YOUR_BEEHIIV_API_KEY"
const BEEHIIV_PUB_ID  = "pub_edb23a79-7116-47fd-9f1f-e44ef922c6eb"

function Waitlist() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)
  const [form, setForm]           = useState({ name: "", email: "", role: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${BEEHIIV_API_KEY}`,
          },
          body: JSON.stringify({
            email: form.email,
            first_name: form.name,
            reactivate_existing: true,
            send_welcome_email: true,
            custom_fields: [
              { name: "role", value: form.role }
            ],
          }),
        }
      )
      if (!res.ok) throw new Error("Signup failed")
      setSubmitted(true)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="waitlist" style={{
      padding: "120px 48px",
      background: `linear-gradient(160deg, ${T.offBlack} 0%, #0a1a10 100%)`,
      borderTop: `1px solid ${T.border}`,
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <Reveal><p style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: T.sageLight, marginBottom: 16 }}>Early access</p></Reveal>
        <Reveal delay={0.1}><h2 style={{ fontFamily: fonts.display, fontSize: "clamp(2rem,4vw,3.2rem)", lineHeight: 1.12, fontWeight: 700, color: T.white }}>
          Be first in the <em style={{ fontStyle: "italic", color: T.sageLight }}>room</em>.
        </h2></Reveal>
        <Reveal delay={0.15}><p style={{ marginTop: 16, color: T.warmDim, fontSize: "1rem" }}>Parallel is launching soon. Join the waitlist and help shape what this community becomes.</p></Reveal>

        <Reveal delay={0.2}>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <input
                  type="text" placeholder="First name" required
                  value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  style={{ flex: 1, background: T.card, border: `1px solid ${T.border}`, borderRadius: 100, padding: "14px 22px", color: T.white, fontFamily: fonts.body, fontSize: "0.9rem", outline: "none" }}
                />
                <input
                  type="email" placeholder="Email address" required
                  value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  style={{ flex: 1, background: T.card, border: `1px solid ${T.border}`, borderRadius: 100, padding: "14px 22px", color: T.white, fontFamily: fonts.body, fontSize: "0.9rem", outline: "none" }}
                />
              </div>
              <select
                value={form.role} onChange={e => setForm({...form, role: e.target.value})}
                style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 100, padding: "14px 22px", color: T.warmDim, fontFamily: fonts.body, fontSize: "0.9rem", outline: "none", appearance: "none", cursor: "pointer" }}
              >
                <option value="" disabled>How do you see yourself showing up?</option>
                <option value="seeking">Seeking — I need support</option>
                <option value="helping">Helping — I want to give back</option>
                <option value="both">Both, depending on the day</option>
                <option value="curious">Just curious</option>
              </select>
              <button type="submit" disabled={loading} style={{ background: loading ? T.sage + "99" : T.sage, color: T.white, border: "none", padding: 16, borderRadius: 100, fontFamily: fonts.body, fontSize: "0.95rem", fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", width: "100%", transition: "background 0.2s" }}>
                {loading ? "Joining..." : "Join the waitlist"}
              </button>
              {error && <p style={{ fontSize: "0.82rem", color: "#c0392b", marginTop: 4 }}>{error}</p>}
              <p style={{ fontSize: "0.78rem", color: T.muted }}>No spam. No selling your data. Just a heads up when we're ready for you.</p>
            </form>
          ) : (
            <div style={{ marginTop: 32, padding: "20px 28px", background: T.sageGlow, border: `1px solid ${T.sage}`, borderRadius: 16, color: T.sageLight, fontSize: "0.95rem" }}>
              ✓ You're on the list. We'll be in touch when Parallel is ready for you.
            </div>
          )}
        </Reveal>
      </div>
    </div>
  )
}

// ─── Blog Preview ─────────────────────────────────────────────
const PREVIEW_POSTS = [
  { id: 1, cat: "product",       emoji: "🌿", date: "May 12, 2025", title: "Why Parallel doesn't have a therapy feature — and never will",        excerpt: "There's a version of this product that could have been a meditation app. Or a CBT tool. We built something different on purpose.", featured: true },
  { id: 2, cat: "mental-health", emoji: "🧠", date: "May 5, 2025",  title: "The difference between venting and processing — and why both matter", excerpt: "We built a whole feature around the idea that sometimes you just need to say the thing. No feedback. No solutions. Just release." },
  { id: 3, cat: "community",     emoji: "🌱", date: "Apr 28, 2025", title: "What 'lived experience' actually means on Parallel",                  excerpt: "We keep using that phrase. Here's what it means in practice — and what it demands of the people who show up to help." },
]

const PILL_STYLES = {
  "product":      { borderColor: "#4a7c6a", color: "#5d9b85" },
  "mental-health":{ borderColor: "#7a6ea0", color: "#a99fc8" },
  "community":    { borderColor: "#7a6e50", color: "#c8b880" },
}
const PILL_LABELS = { "product": "Product", "mental-health": "Mental Health", "community": "Community" }

function BlogPreviewSection() {
  return (
    <div style={{ borderTop: `1px solid ${T.border}`, background: T.offBlack }}>
      <div style={{ padding: "100px 48px 112px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52 }}>
            <div>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: T.sageLight, marginBottom: 14 }}>From the Parallel team</p>
              <h2 style={{ fontFamily: fonts.display, fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.12, fontWeight: 700, color: T.white }}>
                What we're <em style={{ fontStyle: "italic", color: T.sageLight }}>thinking</em> about.
              </h2>
              <p style={{ marginTop: 12, color: T.warmDim, fontSize: "0.95rem", maxWidth: "44ch" }}>Product updates, mental health insights, and honest writing about why we're building this.</p>
            </div>
            <a href="/blog" style={{ fontSize: "0.85rem", color: T.sageLight, textDecoration: "none", whiteSpace: "nowrap" }}>All posts →</a>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20 }}>
            {/* Featured */}
            <a href="/blog" style={{ textDecoration: "none" }}>
              <div className="p-card-hover" style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "border-color 0.25s, transform 0.2s", display: "flex", flexDirection: "column" }}>
                <div style={{ height: 220, background: "linear-gradient(135deg,#1a2e26 0%,#0f1a14 50%,#1a1a2e 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem", position: "relative" }}>
                  {PREVIEW_POSTS[0].emoji}
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(74,124,106,0.12) 0%, transparent 70%)" }} />
                </div>
                <div style={{ padding: "28px 28px 32px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 100, border: `1px solid ${PILL_STYLES["product"].borderColor}`, color: PILL_STYLES["product"].color }}>Product</span>
                    <span style={{ fontSize: "0.75rem", color: T.muted }}>{PREVIEW_POSTS[0].date}</span>
                  </div>
                  <h3 style={{ fontFamily: fonts.display, fontSize: "1.4rem", fontWeight: 700, lineHeight: 1.25, color: T.white }}>{PREVIEW_POSTS[0].title}</h3>
                  <p style={{ fontSize: "0.9rem", color: T.warmDim, lineHeight: 1.7 }}>{PREVIEW_POSTS[0].excerpt}</p>
                  <span style={{ marginTop: 8, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.sageLight }}>Read more →</span>
                </div>
              </div>
            </a>
            {/* Side cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {PREVIEW_POSTS.slice(1).map(p => (
                <a key={p.id} href="/blog" style={{ textDecoration: "none", flex: 1 }}>
                  <div className="p-card-hover" style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 24, cursor: "pointer", transition: "border-color 0.25s, transform 0.2s", display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 100, border: `1px solid ${PILL_STYLES[p.cat].borderColor}`, color: PILL_STYLES[p.cat].color }}>{PILL_LABELS[p.cat]}</span>
                      <span style={{ fontSize: "0.72rem", color: T.muted }}>{p.date}</span>
                    </div>
                    <h3 style={{ fontFamily: fonts.display, fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.3, color: T.white }}>{p.title}</h3>
                    <p style={{ fontSize: "0.85rem", color: T.warmDim, lineHeight: 1.6 }}>{p.excerpt}</p>
                    <span style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.sageLight, marginTop: 4 }}>Read more →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${T.border}`, padding: "48px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
      <span style={{ fontFamily: fonts.display, fontSize: "1.2rem", color: T.warmDim }}>
        Parallel<span style={{ color: T.sageLight }}>.</span>
      </span>
      <p style={{ fontSize: "0.78rem", color: T.muted }}>Not therapy. Community. &nbsp;©2025 Parallel</p>
      <div style={{ display: "flex", gap: 28 }}>
        {["Privacy","Terms","Contact"].map(l => (
          <a key={l} href="#" style={{ fontSize: "0.78rem", color: T.muted, textDecoration: "none" }}>{l}</a>
        ))}
      </div>
    </footer>
  )
}

// ─── Root export ──────────────────────────────────────────────
export default function ParallelLanding() {
  useFonts()
  useKeyframes()

  return (
    <div style={{ background: T.black, color: T.white, fontFamily: fonts.body, fontWeight: 300, lineHeight: 1.7, overflowX: "hidden" }}>
      <Nav />
      <Hero />
      <Marquee />
      <HowItWorks />
      <Features />
      <SageSection />
      <Testimonials />
      <About />
      <BlogPreviewSection />
      <Waitlist />
      <Footer />
    </div>
  )
}
