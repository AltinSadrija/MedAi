'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Brain, Shield, Send, Lock, Eye, FileText, CheckCircle, RotateCcw } from 'lucide-react';
import { T, fd, SYMPTOMS as symptoms, useApp } from '@/lib/constants';
import { useIsMobile } from '@/lib/hooks';
import { Badge, Btn } from '@/components/ui';

export default function SymptomChecker() {
  const { setView, setModal, toast } = useApp();
  const [msgs, setMsgs] = useState([{ role:"ai", text:"Hello! I'm your Medical AI Assistant. I'll help assess your symptoms. Please describe what you're experiencing, or select from common symptoms below." }]);
  const [input, setInput] = useState("");
  const [sel, setSel] = useState([]);
  const [typing, setTyping] = useState(false);
  const [result, setResult] = useState(null);
  const [consent, setConsent] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [step, setStep] = useState(0); // conversation step tracking
  const end = useRef(null);
  const mob = useIsMobile();

  useEffect(() => { end.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs, typing]);

  const respond = useCallback((text) => {
    setTyping(true);
    const l = text.toLowerCase();
    setTimeout(() => {
      let r = "";
      if (step === 0) {
        if (l.includes("headache")||sel.includes(1)) r = "I see — a headache. A few follow-ups:\n\n• How long have you had it?\n• Severity 1-10?\n• Localized or generalized?\n• Any visual changes, nausea, or neck stiffness?";
        else if (l.includes("chest")||sel.includes(5)) r = "⚠️ Chest pain needs careful evaluation:\n\n• Sharp, dull, or pressure-like?\n• Radiating to arm, jaw, or back?\n• Shortness of breath or sweating?\n• How long?\n\n🚨 If severe with SOB, call 911 now.";
        else if (l.includes("fever")||sel.includes(2)) r = "Fever noted. Tell me more:\n\n• Current temperature?\n• When did it start?\n• Other symptoms (chills, aches, cough)?\n• Contact with sick individuals?";
        else if (l.includes("cough")||sel.includes(3)) r = "About your cough:\n\n• Dry or productive?\n• How long?\n• Any blood?\n• Fever or SOB as well?";
        else if (l.includes("fatigue")||sel.includes(4)) r = "Fatigue has many causes:\n\n• How long have you felt this way?\n• Sleep quality and hours?\n• Appetite or weight changes?\n• Stress or mood changes?";
        else if (l.includes("nausea")||sel.includes(6)) r = "About the nausea:\n\n• How long and how often?\n• Any vomiting?\n• Related to eating?\n• Pregnant or possibility of pregnancy?";
        else if (l.includes("dizz")||sel.includes(8)) r = "Dizziness questions:\n\n• Room spinning or lightheadedness?\n• When does it happen?\n• Any hearing changes or headache?\n• Recent medication changes?";
        else r = "Thanks for sharing. Tell me:\n\n• When did this start?\n• Severity 1-10?\n• Current medications?\n• Relevant medical history?";
        setStep(1);
      } else if (step === 1) {
        r = "Thank you for the details. A few more questions:\n\n• Any known medical conditions?\n• Any allergies to medications?\n• Have you tried any treatment so far?\n• Is this affecting your daily activities?";
        setStep(2);
      } else {
        const isUrgent = sel.includes(5)||sel.includes(7)||l.includes("chest")||l.includes("breath");
        r = `Based on our conversation, here's my assessment:\n\n📊 Risk Level: ${isUrgent?"URGENT — Seek immediate care":"MODERATE — Schedule within 48hrs"}\n\n🔍 Considerations:\n${isUrgent?"• Cardiac evaluation recommended\n• ECG and troponin testing suggested\n• Do not delay medical evaluation":"• Primary care evaluation appropriate\n• Lab work may be helpful\n• Monitor for worsening symptoms"}\n\n⚕️ Recommendation: ${isUrgent?"Go to your nearest ER or call 911.":"Schedule an appointment with your provider."}\n\n⚠️ This is AI-assisted and does not replace professional medical advice.`;
        setResult(isUrgent?"urgent":"moderate");
      }
      setMsgs(p => [...p, { role:"ai", text:r }]);
      setTyping(false);
    }, 1500);
  }, [sel, step]);

  const send = () => {
    if (!input.trim()) return;
    setMsgs(p => [...p, { role:"user", text:input }]);
    respond(input);
    setInput("");
  };

  const analyze = () => {
    if (!sel.length) return;
    const names = sel.map(id => symptoms.find(s=>s.id===id)?.name).join(", ");
    setMsgs(p => [...p, { role:"user", text:`I'm experiencing: ${names}` }]);
    if (mob) setShowPanel(false);
    respond(names);
  };

  const reset = () => { setMsgs([{ role:"ai", text:"Hello again! Describe your new symptoms or select from the list." }]); setSel([]); setResult(null); setStep(0); toast("Chat reset"); };

  if (!consent) return (
    <div style={{ display:"flex",alignItems:"center",justifyContent:"center",height:"100%",padding:mob?16:24,overflowY:"auto" }}>
      <div className="animate-scale" style={{ background:T.card,borderRadius:mob?18:24,padding:mob?24:40,maxWidth:520,width:"100%",border:`1px solid ${T.border}`,textAlign:"center" }}>
        <div style={{ width:mob?52:64,height:mob?52:64,borderRadius:18,background:`${T.primary}15`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px" }}><Shield size={mob?26:32} color={T.primary}/></div>
        <h2 style={{ fontFamily:fd,fontSize:mob?20:24,fontWeight:700,marginBottom:10 }}>Consent Required</h2>
        <p style={{ color:T.textMuted,lineHeight:1.7,fontSize:mob?13:14,marginBottom:8 }}>Before using the AI Symptom Checker, please review and agree:</p>
        <div style={{ background:T.surface,borderRadius:14,padding:mob?14:20,textAlign:"left",margin:"16px 0",border:`1px solid ${T.border}` }}>
          {[[Lock,"Your symptoms will be processed by AI. All data is encrypted and HIPAA-compliant."],[Eye,"This provides guidance only — not a replacement for professional diagnosis."],[FileText,"A summary may be shared with your care team. You can revoke consent anytime."]].map(([Ic,t],i) => (
            <div key={i} style={{ display:"flex",gap:10,marginBottom:i<2?12:0,alignItems:"flex-start" }}><Ic size={16} color={T.accent} style={{ marginTop:2,flexShrink:0 }}/><span style={{ fontSize:13,color:T.textMuted,lineHeight:1.6 }}>{t}</span></div>
          ))}
        </div>
        <Btn full onClick={() => setConsent(true)}>I Understand & Agree</Btn>
        <p style={{ fontSize:11,color:T.textDim,marginTop:12 }}>By proceeding, you consent to AI-assisted symptom analysis.</p>
      </div>
    </div>
  );

  const panel = (
    <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
      <h3 style={{ fontFamily:fd,fontSize:13,fontWeight:600,color:T.textMuted,textTransform:"uppercase",letterSpacing:1 }}>Quick Select</h3>
      <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
        {symptoms.map(s => (
          <button key={s.id} onClick={() => setSel(p => p.includes(s.id)?p.filter(x=>x!==s.id):[...p,s.id])} style={{ padding:"7px 12px",borderRadius:10,border:`1px solid ${sel.includes(s.id)?T.primary:T.border}`,background:sel.includes(s.id)?`${T.primary}20`:"transparent",color:sel.includes(s.id)?T.primary:T.textMuted,cursor:"pointer",fontSize:12,transition:"all .2s",display:"flex",alignItems:"center",gap:5 }}>
            <span>{s.icon}</span> {s.name}
          </button>
        ))}
      </div>
      {sel.length>0 && <Btn variant="accent" full onClick={analyze}>Analyze {sel.length} Symptom{sel.length>1?"s":""} →</Btn>}
      {result && (
        <div className="animate-in" style={{ background:`${T.accent}10`,border:`1px solid ${T.accent}30`,borderRadius:12,padding:14 }}>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6 }}><CheckCircle size={16} color={T.accent}/><span style={{ fontSize:13,fontWeight:600,color:T.accent }}>Assessment Complete</span></div>
          <p style={{ fontSize:12,color:T.textMuted,lineHeight:1.6 }}>Results are ready. You can book an appointment or start a new check.</p>
          <div style={{ display:"flex",gap:8,marginTop:10 }}>
            <Btn small full onClick={() => setModal({ type:"bookAppt", title:"Book Appointment" })}>Book Appointment</Btn>
            <Btn small full variant="secondary" onClick={reset}><RotateCcw size={14}/> New Check</Btn>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ display:"flex",flexDirection:mob?"column":"row",height:"100%" }}>
      <div style={{ flex:1,display:"flex",flexDirection:"column",minHeight:0 }}>
        <div style={{ padding:mob?"12px 16px":"16px 24px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10,justifyContent:"space-between",flexShrink:0 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:10,height:10,borderRadius:"50%",background:T.accent,boxShadow:`0 0 8px ${T.accent}` }}/>
            <span style={{ fontFamily:fd,fontWeight:600,fontSize:mob?14:16 }}>AI Symptom Assessment</span>
          </div>
          <div style={{ display:"flex",gap:8 }}>
            {result && <button onClick={reset} style={{ padding:"6px 10px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",color:T.textMuted,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:4 }}><RotateCcw size={12}/>Reset</button>}
            {mob && <button onClick={() => setShowPanel(!showPanel)} style={{ padding:"6px 12px",borderRadius:8,border:`1px solid ${T.border}`,background:showPanel?`${T.primary}15`:"transparent",color:showPanel?T.primary:T.textMuted,fontSize:12,fontWeight:500,cursor:"pointer" }}>
              {showPanel?"Chat":`Symptoms${sel.length?` (${sel.length})`:""}`}
            </button>}
          </div>
        </div>
        {mob && showPanel ? <div style={{ flex:1,overflowY:"auto",padding:16 }}>{panel}</div> : (
          <>
            <div style={{ flex:1,overflowY:"auto",padding:mob?14:24,display:"flex",flexDirection:"column",gap:14 }}>
              {msgs.map((m,i) => (
                <div key={i} className={m.role==="user"?"animate-slide-right":"animate-slide-left"} style={{ display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",maxWidth:mob?"92%":"85%",alignSelf:m.role==="user"?"flex-end":"flex-start" }}>
                  {m.role==="ai" && <div style={{ width:28,height:28,borderRadius:8,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center",marginRight:8,flexShrink:0,marginTop:4 }}><Brain size={14} color="#fff"/></div>}
                  <div style={{ background:m.role==="user"?T.primary:T.card,borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",padding:mob?"10px 14px":"14px 18px",border:m.role==="user"?"none":`1px solid ${T.border}`,color:T.text,fontSize:mob?13:14,lineHeight:1.7,whiteSpace:"pre-line" }}>{m.text}</div>
                </div>
              ))}
              {typing && <div className="animate-slide-left" style={{ display:"flex",alignItems:"center",gap:8 }}><div style={{ width:28,height:28,borderRadius:8,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center" }}><Brain size={14} color="#fff"/></div><div style={{ background:T.card,borderRadius:16,padding:"12px 18px",border:`1px solid ${T.border}` }}><div className="typing-indicator"><span/><span/><span/></div></div></div>}
              <div ref={end}/>
            </div>
            <div style={{ padding:mob?"10px 12px":"14px 24px",borderTop:`1px solid ${T.border}`,background:T.surface,flexShrink:0 }}>
              <div style={{ display:"flex",gap:8 }}>
                <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Describe your symptoms..." style={{ flex:1,padding:mob?"10px 14px":"12px 18px",borderRadius:12,border:`1px solid ${T.border}`,background:T.card,color:T.text,fontSize:14,outline:"none" }}/>
                <button onClick={send} style={{ padding:mob?"10px 14px":"12px 18px",borderRadius:12,border:"none",background:T.g1,color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontWeight:600,fontSize:14,flexShrink:0 }}><Send size={16}/>{!mob&&"Send"}</button>
              </div>
            </div>
          </>
        )}
      </div>
      {!mob && <div style={{ width:280,borderLeft:`1px solid ${T.border}`,background:T.surface,overflowY:"auto",padding:20 }}>{panel}</div>}
    </div>
  );
}
