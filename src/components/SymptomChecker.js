'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Brain, Shield, Send, Lock, Eye, FileText, CheckCircle } from 'lucide-react';
import { T, fontDisplay, symptoms, initialChatMessages } from '@/lib/constants';
import { useIsMobile } from '@/lib/hooks';
import { Badge } from '@/components/ui';

export default function SymptomChecker() {
  const [messages, setMessages] = useState(initialChatMessages);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [showSymptoms, setShowSymptoms] = useState(false);
  const chatEnd = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const aiRespond = useCallback((userMsg) => {
    setIsTyping(true);
    const lower = userMsg.toLowerCase();
    let response = "";
    setTimeout(() => {
      if (lower.includes("headache") || selected.includes(1)) {
        response = "I see you're experiencing a headache. Let me ask some follow-up questions:\n\n• How long have you had this headache?\n• On a scale of 1-10, how severe is the pain?\n• Is the pain localized or generalized?\n• Any visual changes, nausea, or neck stiffness?";
      } else if (lower.includes("chest") || selected.includes(5)) {
        response = "⚠️ Chest pain requires careful evaluation:\n\n• Is the pain sharp, dull, or pressure-like?\n• Does it radiate to your arm, jaw, or back?\n• Are you experiencing shortness of breath or sweating?\n• How long has this been going on?\n\n🚨 If severe chest pain with shortness of breath, please call 911 immediately.";
      } else if (lower.includes("fever") || selected.includes(2)) {
        response = "You mentioned fever. Let me gather more info:\n\n• What is your current temperature?\n• When did the fever start?\n• Any other symptoms like chills, body aches, or cough?\n• Been in contact with anyone who is ill?";
      } else if (lower.includes("cough") || selected.includes(3)) {
        response = "Tell me more about your cough:\n\n• Is it dry or productive (bringing up mucus)?\n• How long have you had it?\n• Any blood when you cough?\n• Do you have a fever or shortness of breath too?";
      } else if (lower.includes("fatigue") || selected.includes(4)) {
        response = "Fatigue can have many causes. Let me understand better:\n\n• How long have you been feeling fatigued?\n• Are you sleeping well? How many hours per night?\n• Any changes in appetite or weight?\n• Are you feeling stressed or depressed?";
      } else if (selected.length > 0) {
        response = `Thank you for selecting ${selected.length} symptom(s). Based on your selections:\n\n• When did these symptoms first appear?\n• Have they been getting better, worse, or the same?\n• Are you currently taking any medications?\n• Do you have any known allergies?`;
      } else {
        response = "Thank you for sharing. Could you tell me more about:\n\n• When these symptoms started?\n• Severity on a scale of 1-10?\n• Any medications you're currently taking?\n• Your relevant medical history?";
      }
      setMessages(prev => [...prev, { role: "assistant", text: response }]);
      setIsTyping(false);
    }, 1500);
  }, [selected]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: input }]);
    aiRespond(input);
    setInput("");
  };

  const handleSymptomClick = (s) => {
    setSelected(prev => prev.includes(s.id) ? prev.filter(x => x !== s.id) : [...prev, s.id]);
  };

  const handleAnalyze = () => {
    if (selected.length === 0) return;
    const names = selected.map(id => symptoms.find(s => s.id === id)?.name).join(", ");
    setMessages(prev => [...prev, { role: "user", text: `I'm experiencing: ${names}` }]);
    setIsTyping(true);
    if (isMobile) setShowSymptoms(false);
    setTimeout(() => {
      const isUrgent = selected.includes(5) || selected.includes(7);
      const hasMultiple = selected.includes(1) && selected.includes(2);
      setMessages(prev => [...prev, { role: "assistant",
        text: `Analyzing your symptoms: ${names}...\n\n📊 Risk Level: ${isUrgent ? "URGENT — Please seek immediate care" : "MODERATE — Schedule a visit within 48 hours"}\n\n🔍 Possible conditions:\n${hasMultiple ? "• Viral infection (high probability)\n• Tension headache with concurrent illness\n• Sinusitis" : selected.includes(5) ? "• Cardiac evaluation recommended\n• Musculoskeletal cause\n• Anxiety-related" : "• Further evaluation needed\n• Consider lab work\n• Monitor symptoms"}\n\n⚕️ Recommended Action: ${isUrgent ? "Seek emergency care or call 911 if symptoms worsen." : "Schedule a telemedicine or in-person visit with your provider."}\n\n⚠️ This is an AI-assisted assessment and does not replace professional medical advice.`
      }]);
      setIsTyping(false);
      setShowResult(true);
    }, 2500);
  };

  // ===== CONSENT SCREEN =====
  if (!consentGiven) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: isMobile ? 16 : 24, overflowY: "auto" }}>
        <div className="animate-scale" style={{ background: T.card, borderRadius: isMobile ? 18 : 24, padding: isMobile ? 24 : 40, maxWidth: 520, width: "100%", border: `1px solid ${T.border}`, textAlign: "center" }}>
          <div style={{ width: isMobile ? 52 : 64, height: isMobile ? 52 : 64, borderRadius: 20, background: `${T.primary}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Shield size={isMobile ? 26 : 32} color={T.primary} />
          </div>
          <h2 style={{ fontFamily: fontDisplay, fontSize: isMobile ? 20 : 24, fontWeight: 700, marginBottom: 10 }}>Consent Required</h2>
          <p style={{ color: T.textMuted, lineHeight: 1.7, fontSize: isMobile ? 13 : 14, marginBottom: 8 }}>Before using the AI Symptom Checker, please review and agree:</p>
          <div style={{ background: T.surface, borderRadius: 14, padding: isMobile ? 14 : 20, textAlign: "left", margin: "16px 0", border: `1px solid ${T.border}` }}>
            {[
              { icon: Lock, text: "Your symptoms and health data will be processed by AI. All data is encrypted and HIPAA-compliant." },
              { icon: Eye, text: "This tool provides informational guidance only and does not replace professional medical diagnosis." },
              { icon: FileText, text: "A summary may be shared with your care team if you choose. You can revoke consent at any time." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < 2 ? 12 : 0, alignItems: "flex-start" }}>
                <item.icon size={16} color={T.accent} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.6 }}>{item.text}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setConsentGiven(true)} style={{ width: "100%", padding: "14px 24px", borderRadius: 14, border: "none", background: T.gradient1, color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            I Understand & Agree
          </button>
          <p style={{ fontSize: 11, color: T.textDim, marginTop: 12 }}>By proceeding, you consent to AI-assisted symptom analysis.</p>
        </div>
      </div>
    );
  }

  // ===== SYMPTOM PANEL (shared between mobile/desktop) =====
  const symptomPanel = (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: isMobile ? 0 : undefined }}>
      <h3 style={{ fontFamily: fontDisplay, fontSize: 13, fontWeight: 600, color: T.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>Quick Select</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {symptoms.map(s => (
          <button key={s.id} onClick={() => handleSymptomClick(s)} style={{
            padding: "7px 12px", borderRadius: 10,
            border: `1px solid ${selected.includes(s.id) ? T.primary : T.border}`,
            background: selected.includes(s.id) ? `${T.primary}20` : "transparent",
            color: selected.includes(s.id) ? T.primary : T.textMuted,
            cursor: "pointer", fontSize: 12, transition: "all 0.2s", display: "flex", alignItems: "center", gap: 5,
          }}>
            <span>{s.icon}</span> {s.name}
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <button onClick={handleAnalyze} style={{ padding: "12px 18px", borderRadius: 12, border: "none", background: T.gradient2, color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
          Analyze {selected.length} Symptom{selected.length > 1 ? "s" : ""} →
        </button>
      )}
      {showResult && (
        <div className="animate-in" style={{ background: `${T.accent}10`, border: `1px solid ${T.accent}30`, borderRadius: 12, padding: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <CheckCircle size={16} color={T.accent} />
            <span style={{ fontSize: 13, fontWeight: 600, color: T.accent }}>Assessment Complete</span>
          </div>
          <p style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.6 }}>Results shared with your provider.</p>
          <button style={{ marginTop: 8, padding: "8px 14px", borderRadius: 10, border: `1px solid ${T.primary}`, background: "transparent", color: T.primary, fontSize: 12, fontWeight: 600, cursor: "pointer", width: "100%" }}>
            Book Appointment →
          </button>
        </div>
      )}
    </div>
  );

  // ===== CHAT UI =====
  return (
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", height: "100%" }}>
      {/* Chat */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        {/* Chat Header */}
        <div style={{ padding: isMobile ? "12px 16px" : "16px 24px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.accent, boxShadow: `0 0 8px ${T.accent}` }} />
            <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: isMobile ? 14 : 16 }}>AI Symptom Assessment</span>
          </div>
          {isMobile && (
            <button onClick={() => setShowSymptoms(!showSymptoms)} style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: showSymptoms ? `${T.primary}15` : "transparent", color: showSymptoms ? T.primary : T.textMuted, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
              {showSymptoms ? "Chat" : `Symptoms${selected.length ? ` (${selected.length})` : ""}`}
            </button>
          )}
        </div>

        {/* Mobile: toggle between chat and symptoms */}
        {isMobile && showSymptoms ? (
          <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
            {symptomPanel}
          </div>
        ) : (
          <>
            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? 14 : 24, display: "flex", flexDirection: "column", gap: 14 }}>
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "animate-slide-right" : "animate-slide-left"} style={{
                  display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: isMobile ? "92%" : "85%", alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                }}>
                  {m.role === "assistant" && (
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: T.gradient1, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 8, flexShrink: 0, marginTop: 4 }}>
                      <Brain size={14} color="#fff" />
                    </div>
                  )}
                  <div style={{
                    background: m.role === "user" ? T.primary : T.card,
                    borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    padding: isMobile ? "10px 14px" : "14px 18px",
                    border: m.role === "user" ? "none" : `1px solid ${T.border}`,
                    color: T.text, fontSize: isMobile ? 13 : 14, lineHeight: 1.7, whiteSpace: "pre-line",
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="animate-slide-left" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: T.gradient1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Brain size={14} color="#fff" />
                  </div>
                  <div style={{ background: T.card, borderRadius: 16, padding: "12px 18px", border: `1px solid ${T.border}` }}>
                    <div className="typing-indicator"><span /><span /><span /></div>
                  </div>
                </div>
              )}
              <div ref={chatEnd} />
            </div>

            {/* Input */}
            <div style={{ padding: isMobile ? "10px 12px" : "14px 24px", borderTop: `1px solid ${T.border}`, background: T.surface, flexShrink: 0 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()}
                  placeholder="Describe your symptoms..."
                  style={{ flex: 1, padding: isMobile ? "10px 14px" : "12px 18px", borderRadius: 12, border: `1px solid ${T.border}`, background: T.card, color: T.text, fontSize: 14, outline: "none" }}
                />
                <button onClick={handleSend} style={{ padding: isMobile ? "10px 14px" : "12px 18px", borderRadius: 12, border: "none", background: T.gradient1, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontWeight: 600, fontSize: 14, flexShrink: 0 }}>
                  <Send size={16} /> {!isMobile && "Send"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div style={{ width: 280, borderLeft: `1px solid ${T.border}`, background: T.surface, overflowY: "auto", padding: 20 }}>
          {symptomPanel}
        </div>
      )}
    </div>
  );
}
