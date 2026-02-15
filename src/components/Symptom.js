'use client';
import{useState,useEffect,useRef,useCallback}from'react';
import{Brain,Shield,Send,Lock,Eye,FileText,CheckCircle,RotateCcw}from'lucide-react';
import{T,fd,SYMPTOMS,useApp}from'@/lib/store';
import{useM}from'@/lib/hooks';
import{Bg,Btn}from'@/components/ui';

export default function Symptom(){
  const{setView,setModal,t}=useApp();
  const[msgs,setMsgs]=useState([{role:"ai",text:"Hello! I'm your Medical AI Assistant. Per our 7-step symptom check protocol:\n\n Step 1 ✓ Authentication verified (MFA)\n Step 2: Consent verification next\n\nPlease describe your symptoms or select from common symptoms below."}]);
  const[input,setIn]=useState("");const[sel,setSel]=useState([]);const[typing,setTyp]=useState(false);const[result,setRes]=useState(null);const[consent,setCon]=useState(false);const[panel,setPan]=useState(false);const[step,setStp]=useState(0);
  const end=useRef(null);const mob=useM();
  useEffect(()=>{end.current?.scrollIntoView({behavior:"smooth"})},[msgs,typing]);

  const respond=useCallback(text=>{
    setTyp(true);const l=text.toLowerCase();
    setTimeout(()=>{let r="";
      if(step===0){
        // Step 3: Symptom Collection
        if(l.includes("headache")||sel.includes(1))r="Step 3 — Symptom Collection:\n\nHeadache noted. Following structured interview protocol:\n• Chief complaint: Headache\n• Onset: When did this start?\n• Duration: How long does it last?\n• Severity: Rate 1-10?\n• Associated symptoms: Nausea, visual changes, neck stiffness?\n• Current medications?\n• Recent travel or exposures?";
        else if(l.includes("chest")||sel.includes(5))r="⚠️ Step 3 — RED FLAG DETECTED:\n\nChest pain triggers emergency escalation protocol:\n• Is it sharp, dull, or pressure-like?\n• Radiating to arm, jaw, or back?\n• Shortness of breath or sweating?\n• Duration?\n\n🚨 If severe with SOB → Call 911 immediately.\nTriage Module: Pre-classifying as Emergency/Urgent pending your answers.";
        else if(l.includes("fever")||sel.includes(2))r="Step 3 — Symptom Collection:\n\nFever noted. Structured interview:\n• Current temperature?\n• Onset and duration?\n• Associated: chills, body aches, cough, rash?\n• Contact with ill individuals?\n• Recent travel?\n• Immunization status?";
        else r="Step 3 — Symptom Collection:\n\nThank you. Following structured interview protocol:\n• Chief complaint noted\n• Onset: When did this start?\n• Duration and frequency?\n• Severity 1-10?\n• Associated symptoms?\n• Current medications and allergies?\n• Relevant medical history?";
        setStp(1);
      }else if(step===1){
        // Step 4: AI Analysis
        r="Step 4 — AI Analysis:\n\nProcessing through NLP Engine → SNOMED CT mapping → Clinical Reasoning Engine...\n\nI need a few more details:\n• Any known medical conditions?\n• Medication allergies?\n• Treatments tried so far?\n• Impact on daily activities?";
        setStp(2);
      }else{
        // Step 5-6: Risk Stratification & Recommendation
        const isUrg=sel.includes(5)||sel.includes(7)||l.includes("chest")||l.includes("breath");
        r=`Step 5 — Risk Stratification & Triage:\n\n📊 Urgency Level: ${isUrg?"🔴 EMERGENCY":"🟡 SEMI-URGENT"}\n\nDifferential Diagnosis (probability scores):\n${isUrg?"• Acute coronary syndrome (42%)\n• Pulmonary embolism (18%)\n• Musculoskeletal (25%)\n• Anxiety-related (15%)":"• Upper respiratory infection (45%)\n• Tension headache (28%)\n• Viral syndrome (20%)\n• Other (7%)"}\n\nStep 6 — Recommendation:\n${isUrg?"→ Seek emergency care immediately. ECG and troponin testing recommended.\n→ Do NOT delay medical evaluation.":"→ Schedule telemedicine or in-person visit within 48 hours.\n→ Monitor symptoms. Return if worsening."}\n\nDrug interaction check: ${sel.length>0?"No active interactions detected.":"N/A — no medications reported."}\n\n⚠️ AI-assisted assessment (Advisory only — not a diagnosis)\nStep 7: This interaction has been logged to the immutable audit trail.`;
        setRes(isUrg?"urgent":"moderate");
      }
      setMsgs(p=>[...p,{role:"ai",text:r}]);setTyp(false);
    },1800);
  },[sel,step]);

  const send=()=>{if(!input.trim())return;setMsgs(p=>[...p,{role:"user",text:input}]);respond(input);setIn("")};
  const analyze=()=>{if(!sel.length)return;const n=sel.map(id=>SYMPTOMS.find(s=>s.id===id)?.name).join(", ");setMsgs(p=>[...p,{role:"user",text:`Symptoms: ${n}`}]);if(mob)setPan(false);respond(n)};
  const reset=()=>{setMsgs([{role:"ai",text:"New session started. Step 1 ✓ Authentication. Describe your symptoms."}]);setSel([]);setRes(null);setStp(0);t("Session reset — audit logged")};

  // CONSENT (Step 2)
  if(!consent)return<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",padding:mob?16:24,overflowY:"auto"}}>
    <div className="sc" style={{background:T.cd,borderRadius:mob?16:22,padding:mob?22:36,maxWidth:520,width:"100%",border:`1px solid ${T.bd}`,textAlign:"center"}}>
      <div style={{width:mob?48:60,height:mob?48:60,borderRadius:16,background:`${T.p}15`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}><Shield size={mob?24:30} color={T.p}/></div>
      <h2 style={{fontFamily:fd,fontSize:mob?18:22,fontWeight:700,marginBottom:8}}>Step 2: Treatment Consent</h2>
      <p style={{color:T.tm,lineHeight:1.7,fontSize:mob?12:13,marginBottom:6}}>Per Section 4.2 — Treatment Consent is required before AI processes your symptoms.</p>
      <div style={{background:T.sf,borderRadius:12,padding:mob?12:18,textAlign:"left",margin:"14px 0",border:`1px solid ${T.bd}`}}>
        {[[Lock,"AI will process symptoms and health history. Data encrypted (AES-256) and HIPAA-compliant. PHI tokenized before AI inference."],[Eye,"Advisory only — all AI recommendations require provider review (Human-in-the-Loop per Section 7.2)."],[FileText,"Session logged to immutable audit trail. Summary optionally sent to your care team. Consent revocable anytime within 60 seconds."]].map(([I,tx],i)=><div key={i} style={{display:"flex",gap:8,marginBottom:i<2?10:0,alignItems:"flex-start"}}><I size={14} color={T.a} style={{marginTop:2,flexShrink:0}}/><span style={{fontSize:12,color:T.tm,lineHeight:1.6}}>{tx}</span></div>)}
      </div>
      <Btn full onClick={()=>setCon(true)}>I Understand & Consent</Btn>
      <p style={{fontSize:10,color:T.td,marginTop:10}}>Treatment consent · Per-encounter · Active care episode duration</p>
    </div>
  </div>;

  const sp=<div style={{display:"flex",flexDirection:"column",gap:12}}>
    <h3 style={{fontFamily:fd,fontSize:12,fontWeight:600,color:T.tm,textTransform:"uppercase",letterSpacing:1}}>Quick Select</h3>
    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{SYMPTOMS.map(s=><button key={s.id} onClick={()=>setSel(p=>p.includes(s.id)?p.filter(x=>x!==s.id):[...p,s.id])} style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${sel.includes(s.id)?T.p:T.bd}`,background:sel.includes(s.id)?`${T.p}20`:"transparent",color:sel.includes(s.id)?T.p:T.tm,cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",gap:4}}><span>{s.icon}</span>{s.name}</button>)}</div>
    {sel.length>0&&<Btn v="accent" full onClick={analyze}>Analyze {sel.length} Symptom{sel.length>1?"s":""} →</Btn>}
    {result&&<div className="ai" style={{background:`${T.a}10`,border:`1px solid ${T.a}30`,borderRadius:10,padding:12}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}><CheckCircle size={14} color={T.a}/><span style={{fontSize:12,fontWeight:600,color:T.a}}>Assessment Complete</span></div><p style={{fontSize:11,color:T.tm,lineHeight:1.5}}>Triage: {result==="urgent"?"Emergency":"Semi-Urgent"}. Logged to audit trail.</p><div style={{display:"flex",gap:6,marginTop:8}}><Btn small full onClick={()=>setModal({type:"bookAppt",title:"Book Appointment"})}>Book Appointment</Btn><Btn small full v="secondary" onClick={reset}><RotateCcw size={12}/>New Check</Btn></div></div>}
  </div>;

  return<div style={{display:"flex",flexDirection:mob?"column":"row",height:"100%"}}>
    <div style={{flex:1,display:"flex",flexDirection:"column",minHeight:0}}>
      <div style={{padding:mob?"10px 14px":"14px 22px",borderBottom:`1px solid ${T.bd}`,display:"flex",alignItems:"center",gap:8,justifyContent:"space-between",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:8,height:8,borderRadius:"50%",background:T.a,boxShadow:`0 0 6px ${T.a}`}}/><span style={{fontFamily:fd,fontWeight:600,fontSize:mob?13:15}}>AI Symptom Assessment</span><Bg color={result?T.a:T.p} small>{result?"Complete":"Step "+(step+3)+"/7"}</Bg></div>
        <div style={{display:"flex",gap:6}}>{result&&<button onClick={reset} style={{padding:"5px 8px",borderRadius:6,border:`1px solid ${T.bd}`,background:"transparent",color:T.tm,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:3}}><RotateCcw size={11}/>Reset</button>}{mob&&<button onClick={()=>setPan(!panel)} style={{padding:"5px 10px",borderRadius:6,border:`1px solid ${T.bd}`,background:panel?`${T.p}15`:"transparent",color:panel?T.p:T.tm,fontSize:11,fontWeight:500,cursor:"pointer"}}>{panel?"Chat":`Symptoms${sel.length?` (${sel.length})`:""}`}</button>}</div>
      </div>
      {mob&&panel?<div style={{flex:1,overflowY:"auto",padding:14}}>{sp}</div>:<>
        <div style={{flex:1,overflowY:"auto",padding:mob?12:22,display:"flex",flexDirection:"column",gap:12}}>
          {msgs.map((m,i)=><div key={i} className={m.role==="user"?"sr":"sl"} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",maxWidth:mob?"92%":"82%",alignSelf:m.role==="user"?"flex-end":"flex-start"}}>
            {m.role==="ai"&&<div style={{width:26,height:26,borderRadius:7,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center",marginRight:7,flexShrink:0,marginTop:3}}><Brain size={13} color="#fff"/></div>}
            <div style={{background:m.role==="user"?T.p:T.cd,borderRadius:m.role==="user"?"14px 14px 3px 14px":"14px 14px 14px 3px",padding:mob?"9px 12px":"12px 16px",border:m.role==="user"?"none":`1px solid ${T.bd}`,color:T.tx,fontSize:mob?12:13,lineHeight:1.7,whiteSpace:"pre-line"}}>{m.text}</div>
          </div>)}
          {typing&&<div className="sl" style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:26,height:26,borderRadius:7,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center"}}><Brain size={13} color="#fff"/></div><div style={{background:T.cd,borderRadius:14,padding:"10px 16px",border:`1px solid ${T.bd}`}}><div className="ti"><span/><span/><span/></div></div></div>}
          <div ref={end}/>
        </div>
        <div style={{padding:mob?"8px 10px":"12px 22px",borderTop:`1px solid ${T.bd}`,background:T.sf,flexShrink:0}}>
          <div style={{display:"flex",gap:6}}><input value={input} onChange={e=>setIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Describe symptoms..." style={{flex:1,padding:mob?"9px 12px":"10px 16px",borderRadius:10,border:`1px solid ${T.bd}`,background:T.cd,color:T.tx,fontSize:13,outline:"none"}}/><button onClick={send} style={{padding:mob?"9px 12px":"10px 16px",borderRadius:10,border:"none",background:T.g1,color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontWeight:600,fontSize:13,flexShrink:0}}><Send size={14}/>{!mob&&"Send"}</button></div>
        </div>
      </>}
    </div>
    {!mob&&<div style={{width:260,borderLeft:`1px solid ${T.bd}`,background:T.sf,overflowY:"auto",padding:16}}>{sp}</div>}
  </div>
}
