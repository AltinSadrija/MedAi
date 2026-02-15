'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Brain, Shield, Send, Lock, Eye, FileText, CheckCircle, Pill } from 'lucide-react';
import { T, fontDisplay, font, symptoms, initialChatMessages } from '@/lib/constants';
import { Badge } from '@/components/ui';

export default function SymptomChecker() {
  const [messages, setMessages] = useState(initialChatMessages);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const chatEnd = useRef(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const aiRespond = useCallback(
    (userMsg) => {
      setIsTyping(true);
      const lower = userMsg.toLowerCase();
      let response = "";
      setTimeout(() => {
        if (lower.includes("headache") || selected.includes(1)) {
          response =
            "I see you're experiencing a headache. Let me ask a few follow-up questions:\n\n• How long have you had this headache?\n• On a scale of 1-10, how severe is the pain?\n• Is the pain localized or generalized?\n• Have you experienced any visual changes, nausea, or neck stiffness?";
        } else if (lower.includes("chest") || selected.includes(5)) {
          response =
            "⚠️ Chest pain requires careful evaluation. I need to ask some important questions:\n\n• Is the pain sharp, dull, or pressure-like?\n• Does it radiate to your arm, jaw, or back?\n• Are you experiencing shortness of breath or sweating?\n• How long has this been going on?\n\n🚨 If you're experiencing severe chest pain with shortness of breath, please call 911 immediately.";
        } else if (lower.includes("fever") || selected.includes(2)) {
          response =
            "You mentioned fever. Let me gather more information:\n\n• What is your current temperature?\n• When did the fever start?\n• Are you experiencing any other symptoms like chills, body aches, or cough?\n• Have you been in contact with anyone who is ill?";
        } else if (selected.length > 0) {
          response = `Thank you for selecting ${selected.length} symptom(s). Based on your selections, I'd like to ask:\n\n• When did these symptoms first appear?\n• Have they been getting better, worse, or staying the same?\n• Are you currently taking any medications?\n• Do you have any known allergies?`;
        } else {
          response =
            "Thank you for that information. Could you tell me more about:\n\n• When these symptoms started?\n• Their severity on a scale of 1-10?\n• Any medications you're currently taking?\n• Your relevant medical history?";
        }
        setMessages((prev) => [...prev, { role: "assistant", text: response }]);
        setIsTyping(false);
      }, 1500);
    },
    [selected]
  );

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    aiRespond(input);
    setInput("");
  };

  const handleSymptomClick = (s) => {
    const newSelected = selected.includes(s.id)
      ? selected.filter((x) => x !== s.id)
      : [...selected, s.id];
    setSelected(newSelected);
  };

  const handleAnalyze = () => {
    if (selected.length === 0) return;
    const names = selected
      .map((id) => symptoms.find((s) => s.id === id)?.name)
      .join(", ");
    setMessages((prev) => [
      ...prev,
      { role: "user", text: `I'm experiencing: ${names}` },
    ]);
    setIsTyping(true);
    setTimeout(() => {
      const isUrgent = selected.includes(5) || selected.includes(7);
      const hasHeadacheFever = selected.includes(1) && selected.includes(2);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Analyzing your symptoms: ${names}...\n\nBased on my assessment:\n\n📊 **Risk Level: ${
            isUrgent
              ? "URGENT — Please seek immediate care"
              : "MODERATE — Schedule a visit within 48 hours"
          }**\n\n🔍 Possible conditions to discuss with your provider:\n${
            hasHeadacheFever
              ? "• Viral infection (high probability)\n• Tension headache with concurrent illness\n• Sinusitis"
              : selected.includes(5)
              ? "• Cardiac evaluation recommended\n• Musculoskeletal cause\n• Anxiety-related"
              : "• Further evaluation needed\n• Consider lab work"
          }\n\n⚕️ **Recommended Action:** ${
            isUrgent
              ? "Seek emergency care or call 911 if symptoms worsen."
              : "Schedule a telemedicine or in-person visit with your provider."
          }\n\n⚠️ *This is an AI-assisted assessment and does not replace professional medical advice.*`,
        },
      ]);
      setIsTyping(false);
      setShowResult(true);
    }, 2500);
  };

  // Consent Screen
  if (!consentGiven) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: 24,
        }}
      >
        <div
          className="animate-scale"
          style={{
            background: T.card,
            borderRadius: 24,
            padding: 40,
            maxWidth: 520,
            width: "100%",
            border: `1px solid ${T.border}`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: `${T.primary}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <Shield size={32} color={T.primary} />
          </div>
          <h2
            style={{
              fontFamily: fontDisplay,
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            Consent Required
          </h2>
          <p
            style={{
              color: T.textMuted,
              lineHeight: 1.7,
              fontSize: 14,
              marginBottom: 8,
            }}
          >
            Before using the AI Symptom Checker, please review and agree to the
            following:
          </p>
          <div
            style={{
              background: T.surface,
              borderRadius: 16,
              padding: 20,
              textAlign: "left",
              margin: "20px 0",
              border: `1px solid ${T.border}`,
            }}
          >
            {[
              {
                icon: Lock,
                text: "Your symptoms and health data will be processed by AI to provide a preliminary assessment. All data is encrypted and HIPAA-compliant.",
              },
              {
                icon: Eye,
                text: "This tool provides informational guidance only and does not replace professional medical diagnosis or treatment.",
              },
              {
                icon: FileText,
                text: "A summary may be shared with your care team if you choose. You can revoke consent at any time.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  marginBottom: i < 2 ? 12 : 0,
                  alignItems: "flex-start",
                }}
              >
                <item.icon
                  size={16}
                  color={T.accent}
                  style={{ marginTop: 2, flexShrink: 0 }}
                />
                <span
                  style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.6 }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setConsentGiven(true)}
            style={{
              width: "100%",
              padding: "14px 24px",
              borderRadius: 14,
              border: "none",
              background: T.gradient1,
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            I Understand & Agree
          </button>
          <p style={{ fontSize: 11, color: T.textDim, marginTop: 12 }}>
            By proceeding, you consent to AI-assisted symptom analysis under our
            Privacy Policy.
          </p>
        </div>
      </div>
    );
  }

  // Chat UI
  return (
    <div style={{ display: "flex", height: "100%", gap: 0 }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: T.accent,
              boxShadow: `0 0 8px ${T.accent}`,
            }}
          />
          <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 16 }}>
            AI Symptom Assessment
          </span>
          <Badge color={T.accent}>Active</Badge>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user" ? "animate-slide-right" : "animate-slide-left"
              }
              style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              {m.role === "assistant" && (
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: T.gradient1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                    flexShrink: 0,
                    marginTop: 4,
                  }}
                >
                  <Brain size={16} color="#fff" />
                </div>
              )}
              <div
                style={{
                  background: m.role === "user" ? T.primary : T.card,
                  borderRadius:
                    m.role === "user"
                      ? "18px 18px 4px 18px"
                      : "18px 18px 18px 4px",
                  padding: "14px 18px",
                  border:
                    m.role === "user" ? "none" : `1px solid ${T.border}`,
                  color: T.text,
                  fontSize: 14,
                  lineHeight: 1.7,
                  whiteSpace: "pre-line",
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div
              className="animate-slide-left"
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: T.gradient1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Brain size={16} color="#fff" />
              </div>
              <div
                style={{
                  background: T.card,
                  borderRadius: 18,
                  padding: "14px 20px",
                  border: `1px solid ${T.border}`,
                }}
              >
                <div className="typing-indicator">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}
          <div ref={chatEnd} />
        </div>

        {/* Input */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: `1px solid ${T.border}`,
            background: T.surface,
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Describe your symptoms..."
              style={{
                flex: 1,
                padding: "12px 18px",
                borderRadius: 14,
                border: `1px solid ${T.border}`,
                background: T.card,
                color: T.text,
                fontSize: 14,
                outline: "none",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                padding: "12px 18px",
                borderRadius: 14,
                border: "none",
                background: T.gradient1,
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              <Send size={16} /> Send
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        style={{
          width: 280,
          borderLeft: `1px solid ${T.border}`,
          background: T.surface,
          overflowY: "auto",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <h3
          style={{
            fontFamily: fontDisplay,
            fontSize: 14,
            fontWeight: 600,
            color: T.textMuted,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Quick Select
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {symptoms.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSymptomClick(s)}
              style={{
                padding: "8px 14px",
                borderRadius: 12,
                border: `1px solid ${
                  selected.includes(s.id) ? T.primary : T.border
                }`,
                background: selected.includes(s.id)
                  ? `${T.primary}20`
                  : "transparent",
                color: selected.includes(s.id) ? T.primary : T.textMuted,
                cursor: "pointer",
                fontSize: 13,
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>{s.icon}</span> {s.name}
            </button>
          ))}
        </div>
        {selected.length > 0 && (
          <button
            onClick={handleAnalyze}
            style={{
              padding: "12px 18px",
              borderRadius: 14,
              border: "none",
              background: T.gradient2,
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
              marginTop: 8,
            }}
          >
            Analyze {selected.length} Symptom{selected.length > 1 ? "s" : ""} →
          </button>
        )}
        {showResult && (
          <div
            className="animate-in"
            style={{
              background: `${T.accent}10`,
              border: `1px solid ${T.accent}30`,
              borderRadius: 14,
              padding: 16,
              marginTop: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <CheckCircle size={16} color={T.accent} />
              <span style={{ fontSize: 13, fontWeight: 600, color: T.accent }}>
                Assessment Complete
              </span>
            </div>
            <p style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.6 }}>
              Results shared with your provider. You can schedule a follow-up
              visit or start a telehealth consultation.
            </p>
            <button
              style={{
                marginTop: 10,
                padding: "8px 14px",
                borderRadius: 10,
                border: `1px solid ${T.primary}`,
                background: "transparent",
                color: T.primary,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                width: "100%",
              }}
            >
              Book Appointment →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
