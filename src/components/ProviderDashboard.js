'use client';
import { useState } from 'react';
import { Activity, Heart, Brain, User, AlertTriangle, ChevronRight, ChevronDown, Search, Calendar, Bell, TrendingUp, Thermometer, Pill, Users, Zap, X, Phone, Mail, FileText } from 'lucide-react';
import { T, fd, fm, PATIENTS, useApp } from '@/lib/constants';
import { useIsMobile } from '@/lib/hooks';
import { Badge, RiskBadge, StatCard, CardSection, Btn } from '@/components/ui';

export default function ProviderDashboard() {
  const { appts, notifications, setModal, toast, cancelAppt, confirmAppt } = useApp();
  const [selPat, setSelPat] = useState(null);
  const [alertFilter, setAlertFilter] = useState("all");
  const [search, setSearch] = useState("");
  const mob = useIsMobile();
  const compact = mob;

  const activeAlerts = notifications.filter(a => alertFilter === "all" || a.type === alertFilter);
  const filteredPats = search ? PATIENTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.condition.toLowerCase().includes(search.toLowerCase())) : PATIENTS;
  const activeAppts = appts.filter(a => a.status !== "cancelled");

  return (
    <div style={{ padding:mob?16:28,overflowY:"auto",height:"100%" }}>
      <div style={{ marginBottom:mob?18:28 }}>
        <h1 style={{ fontFamily:fd,fontSize:mob?22:28,fontWeight:700 }}>Provider Dashboard</h1>
        <p style={{ color:T.textMuted,fontSize:mob?12:14,marginTop:4 }}>Good morning, Dr. Martinez — Feb 15, 2026</p>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:mob?10:16,marginBottom:mob?18:28 }}>
        <StatCard icon={Users} label="Active Patients" value={`${PATIENTS.length}`} trend="+12 this month" color={T.primary} delay={0} compact={compact}/>
        <StatCard icon={Calendar} label="Appointments" value={`${activeAppts.length}`} trend={`${appts.filter(a=>a.status==="pending").length} pending`} color={T.accent} delay={100} compact={compact}/>
        <StatCard icon={AlertTriangle} label="Critical Alerts" value={`${notifications.filter(n=>n.type==="critical").length}`} trend="Action required" color={T.danger} delay={200} compact={compact}/>
        <StatCard icon={TrendingUp} label="AI Accuracy" value="96.3%" trend="+1.2% this quarter" color="#8B5CF6" delay={300} compact={compact}/>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:mob?"1fr":"1fr 380px",gap:mob?14:20 }}>
        <div style={{ display:"flex",flexDirection:"column",gap:mob?14:20,minWidth:0 }}>
          {/* Alerts */}
          <CardSection title="AI Alerts" icon={Bell} iconColor={T.warning} noPadBody rightContent={
            <div style={{ display:"flex",gap:4,overflowX:"auto",flexShrink:0 }}>
              {["all","critical","warning","info"].map(f => (
                <button key={f} onClick={() => setAlertFilter(f)} style={{ padding:"4px 10px",borderRadius:8,border:"none",whiteSpace:"nowrap",background:alertFilter===f?`${T.primary}20`:"transparent",color:alertFilter===f?T.primary:T.textDim,fontSize:11,fontWeight:500,cursor:"pointer",textTransform:"capitalize" }}>{f}</button>
              ))}
            </div>
          }>
            <div style={{ maxHeight:mob?200:260,overflowY:"auto" }}>
              {activeAlerts.map((a,i) => (
                <div key={a.id} className="animate-in" onClick={() => { const p = PATIENTS.find(p=>p.id===a.patientId); if(p) setSelPat(selPat?.id===p.id?null:p); }}
                  style={{ animationDelay:`${i*80}ms`,padding:mob?"10px 14px":"14px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",transition:"background .15s" }}>
                  <div style={{ width:8,height:8,borderRadius:"50%",marginTop:5,flexShrink:0,background:a.type==="critical"?T.danger:a.type==="warning"?T.warning:T.primary,boxShadow:a.type==="critical"?`0 0 8px ${T.danger}`:"none" }}/>
                  <div style={{ flex:1,minWidth:0 }}>
                    <p style={{ fontSize:mob?12:13,lineHeight:1.5,color:T.text }}>{a.msg}</p>
                    <span style={{ fontSize:11,color:T.textDim }}>{a.time}</span>
                    {a.action && <p style={{ fontSize:11,color:T.primary,marginTop:4 }}>→ {a.action}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardSection>

          {/* Patient List */}
          <CardSection title="Patient Panel" icon={Users} iconColor={T.primary} noPadBody rightContent={
            <div style={{ display:"flex",alignItems:"center",gap:6,background:T.surface,borderRadius:8,padding:"5px 10px",border:`1px solid ${T.border}`,maxWidth:mob?160:200 }}>
              <Search size={14} color={T.textDim} style={{ flexShrink:0 }}/>
              <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} style={{ border:"none",background:"transparent",color:T.text,fontSize:12,outline:"none",width:"100%",minWidth:0 }}/>
              {search && <button onClick={() => setSearch("")} style={{ background:"none",border:"none",cursor:"pointer",color:T.textDim }}><X size={14}/></button>}
            </div>
          }>
            {filteredPats.map(p => (
              <div key={p.id} onClick={() => setSelPat(selPat?.id===p.id?null:p)} style={{ padding:mob?"10px 14px":"14px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:mob?10:14,cursor:"pointer",background:selPat?.id===p.id?`${T.primary}08`:"transparent",transition:"background .15s" }}>
                <div style={{ width:mob?34:40,height:mob?34:40,borderRadius:10,background:`${p.color}20`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><User size={mob?16:18} color={p.color}/></div>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:6,flexWrap:"wrap" }}>
                    <span style={{ fontSize:mob?13:14,fontWeight:600,whiteSpace:"nowrap" }}>{p.name}</span><RiskBadge risk={p.risk}/>
                  </div>
                  <span style={{ fontSize:mob?11:12,color:T.textDim }}>{p.condition} · Age {p.age}</span>
                </div>
                {!mob && <div style={{ textAlign:"right",flexShrink:0 }}><div style={{ fontSize:12,color:T.textMuted }}>Next: {p.nextAppt}</div></div>}
                {selPat?.id===p.id?<ChevronDown size={16} color={T.textDim}/>:<ChevronRight size={16} color={T.textDim}/>}
              </div>
            ))}
            {!filteredPats.length && <div style={{ padding:24,textAlign:"center",color:T.textDim,fontSize:13 }}>No patients found</div>}
          </CardSection>

          {/* Patient Detail */}
          {selPat && (
            <div className="animate-scale" style={{ background:T.card,borderRadius:16,border:`1px solid ${T.primary}30`,padding:mob?16:24 }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:16,gap:10 }}>
                <div><h3 style={{ fontFamily:fd,fontSize:mob?16:18,fontWeight:700 }}>{selPat.name}</h3><p style={{ fontSize:13,color:T.textMuted }}>Age {selPat.age} · {selPat.condition}</p></div>
                <div style={{ display:"flex",alignItems:"center",gap:8,flexShrink:0 }}><RiskBadge risk={selPat.risk}/><button onClick={() => setSelPat(null)} style={{ background:"none",border:"none",cursor:"pointer",color:T.textDim,padding:4 }}><X size={18}/></button></div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:mob?8:12,marginBottom:16 }}>
                {[[" BP",selPat.vitals.bp,Heart,T.danger],["HR",`${selPat.vitals.hr} bpm`,Activity,T.primary],["Temp",selPat.vitals.temp,Thermometer,T.warning],["SpO2",selPat.vitals.spo2,Zap,T.accent]].map(([l,v,Ic,c],i) => (
                  <div key={i} style={{ background:T.surface,borderRadius:12,padding:mob?10:14,border:`1px solid ${T.border}` }}>
                    <div style={{ display:"flex",alignItems:"center",gap:5,marginBottom:4 }}><Ic size={13} color={c}/><span style={{ fontSize:10,color:T.textDim }}>{l}</span></div>
                    <span style={{ fontSize:mob?15:18,fontWeight:700,fontFamily:fd }}>{v}</span>
                  </div>
                ))}
              </div>
              <h4 style={{ fontSize:12,fontWeight:600,color:T.textMuted,marginBottom:8,textTransform:"uppercase",letterSpacing:.5 }}>Medications</h4>
              <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:16 }}>
                {selPat.meds.map((m,i) => <span key={i} style={{ padding:"5px 10px",borderRadius:8,background:`${T.accent}12`,border:`1px solid ${T.accent}25`,fontSize:11,color:T.accent,fontWeight:500 }}><Pill size={11} style={{ marginRight:3,verticalAlign:-1 }}/>{m}</span>)}
              </div>
              <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                <Btn small onClick={() => setModal({ type:"patientDetail",title:`${selPat.name} — Full Record`, data:selPat })}><FileText size={14}/>Record</Btn>
                <Btn small variant="secondary" onClick={() => setModal({ type:"consent",title:`${selPat.name} — Consent Management`, data:selPat })}>Consent</Btn>
                <Btn small variant="secondary" onClick={() => toast(`Calling ${selPat.phone}...`)}><Phone size={14}/>Call</Btn>
                <Btn small variant="secondary" onClick={() => toast(`Message sent to ${selPat.name}`)}><Mail size={14}/>Message</Btn>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ display:"flex",flexDirection:"column",gap:mob?14:20,minWidth:0 }}>
          <CardSection title="Today's Schedule" icon={Calendar} iconColor={T.accent} noPadBody>
            {appts.map(a => (
              <div key={a.id} onClick={() => setModal({ type:"apptDetail",title:"Appointment Details",data:a })} style={{ padding:mob?"10px 14px":"12px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:mob?10:14,cursor:"pointer",opacity:a.status==="cancelled"?.5:1,transition:"opacity .2s" }}>
                <div style={{ minWidth:mob?52:64 }}><span style={{ fontSize:mob?11:13,fontWeight:600,fontFamily:fm,color:T.primary }}>{a.time}</span></div>
                <div style={{ width:3,height:32,borderRadius:2,background:a.status==="confirmed"?T.accent:a.status==="cancelled"?T.danger:T.warning,flexShrink:0 }}/>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontSize:mob?13:14,fontWeight:500,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{a.patient}</div>
                  <div style={{ fontSize:12,color:T.textDim }}>{a.type}{a.status==="cancelled"?" (Cancelled)":""}</div>
                </div>
                <Badge color={a.status==="confirmed"?T.accent:a.status==="cancelled"?T.danger:T.warning} small={mob}>{a.status}</Badge>
              </div>
            ))}
          </CardSection>

          {/* AI Insights */}
          <div className="animate-in" style={{ animationDelay:"300ms",background:`linear-gradient(135deg,${T.card},#1a2744)`,borderRadius:16,border:`1px solid ${T.primary}30`,padding:mob?16:22 }}>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:14 }}>
              <div style={{ width:34,height:34,borderRadius:10,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center" }}><Brain size={16} color="#fff"/></div>
              <span style={{ fontFamily:fd,fontWeight:600,fontSize:14 }}>AI Clinical Insights</span>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
              {[
                {text:"James Wilson's COPD exacerbation risk increased 34% based on SpO2 trends. Consider adjusting bronchodilator therapy.",color:T.danger,pid:2},
                {text:"Sarah Chen's HbA1c improved (7.8% → 7.2%). Current Metformin regimen is effective.",color:T.accent,pid:1},
                {text:"Robert Kim is overdue for cardiac rehab progress evaluation. ECG recommended.",color:T.warning,pid:4},
              ].map((ins,i) => (
                <div key={i} onClick={() => { const p = PATIENTS.find(p=>p.id===ins.pid); if(p) setSelPat(p); }} style={{ padding:"10px 12px",borderRadius:10,background:`${ins.color}08`,border:`1px solid ${ins.color}20`,fontSize:12,lineHeight:1.6,color:T.textMuted,cursor:"pointer",transition:"background .15s" }}>
                  <div style={{ width:6,height:6,borderRadius:"50%",background:ins.color,display:"inline-block",marginRight:8,verticalAlign:"middle" }}/>{ins.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
