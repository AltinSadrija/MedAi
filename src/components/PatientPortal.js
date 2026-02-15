'use client';
import { useState } from 'react';
import { Activity, Heart, Home, Calendar, FileText, Plus, Thermometer, Pill, Zap, CheckCircle, AlertTriangle, MessageCircle, ClipboardList, Download } from 'lucide-react';
import { T, fd, fm, PATIENTS, PATIENT_RECORDS, useApp } from '@/lib/constants';
import { useIsMobile } from '@/lib/hooks';
import { Badge, StatCard, CardSection, Btn } from '@/components/ui';

export default function PatientPortal() {
  const { setView, setModal, toast, patientAppts, reschedulePatientAppt } = useApp();
  const [tab, setTab] = useState("overview");
  const mob = useIsMobile();

  const tabs = [{id:"overview",label:"Overview",icon:Home},{id:"labs",label:"Labs",icon:ClipboardList},{id:"medications",label:"Meds",icon:Pill},{id:"appointments",label:"Appts",icon:Calendar}];

  return (
    <div style={{ padding:mob?16:28,overflowY:"auto",height:"100%" }}>
      <div style={{ marginBottom:mob?16:24 }}>
        <h1 style={{ fontFamily:fd,fontSize:mob?22:28,fontWeight:700 }}>Welcome back, Alex</h1>
        <p style={{ color:T.textMuted,fontSize:mob?12:14,marginTop:4 }}>Your health summary for today</p>
      </div>

      <div style={{ display:"flex",gap:4,marginBottom:mob?18:28,background:T.surface,borderRadius:12,padding:4,border:`1px solid ${T.border}`,overflowX:"auto",WebkitOverflowScrolling:"touch" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ display:"flex",alignItems:"center",gap:6,padding:mob?"8px 12px":"10px 18px",borderRadius:8,border:"none",background:tab===t.id?T.card:"transparent",color:tab===t.id?T.text:T.textDim,cursor:"pointer",fontSize:mob?12:13,fontWeight:500,whiteSpace:"nowrap",flexShrink:0 }}>
            <t.icon size={14}/>{t.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === "overview" && <>
        <div style={{ display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:mob?10:16,marginBottom:mob?18:28 }}>
          <StatCard icon={Heart} label="Blood Pressure" value="122/78" trend="Normal range" color={T.accent} delay={0} compact={mob}/>
          <StatCard icon={Activity} label="Heart Rate" value="72 bpm" trend="Resting" color={T.primary} delay={100} compact={mob}/>
          <StatCard icon={Thermometer} label="Temperature" value="98.5°F" trend="Normal" color={T.warning} delay={200} compact={mob}/>
          <StatCard icon={Zap} label="SpO2" value="99%" trend="Excellent" color="#8B5CF6" delay={300} compact={mob}/>
        </div>

        {/* Chart */}
        <div className="animate-in" style={{ animationDelay:"200ms",background:T.card,borderRadius:16,border:`1px solid ${T.border}`,padding:mob?16:24,marginBottom:mob?14:20 }}>
          <h3 style={{ fontFamily:fd,fontWeight:600,fontSize:mob?14:16,marginBottom:16 }}>Blood Pressure Trend</h3>
          <div style={{ display:"flex",alignItems:"flex-end",gap:mob?8:20,height:mob?120:160,paddingBottom:26,position:"relative" }}>
            <div style={{ position:"absolute",left:0,top:0,bottom:26,display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
              {[140,130,120,110].map(v => <span key={v} style={{ fontSize:mob?9:10,color:T.textDim,fontFamily:fm }}>{v}</span>)}
            </div>
            <div style={{ flex:1,marginLeft:mob?28:36,display:"flex",alignItems:"flex-end",gap:mob?6:12,height:"100%",position:"relative" }}>
              {[.25,.5,.75,1].map((p,i) => <div key={i} style={{ position:"absolute",left:0,right:0,bottom:`${p*100}%`,borderBottom:`1px dashed ${T.border}40` }}/>)}
              {PATIENT_RECORDS.vitalsHistory.map((v,i) => {
                const h = ((v.bp-110)/30)*(mob?90:130);
                return (
                  <div key={i} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,zIndex:1 }}>
                    <span style={{ fontSize:mob?9:11,fontWeight:600,fontFamily:fm,color:v.bp>130?T.warning:T.accent }}>{v.bp}</span>
                    <div style={{ width:mob?"80%":"70%",height:Math.max(h,16),borderRadius:"6px 6px 3px 3px",background:v.bp>130?`linear-gradient(to top,${T.warning},${T.warning}80)`:`linear-gradient(to top,${T.accent},${T.accent}80)`,transition:"height .5s" }}/>
                    <span style={{ fontSize:mob?8:10,color:T.textDim }}>{v.date}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:mob?10:16 }}>
          {[
            {icon:MessageCircle,label:"AI Symptom Check",desc:"Get an AI-powered assessment",gradient:T.g1,action:() => setView("symptom")},
            {icon:Calendar,label:"Book Appointment",desc:"Schedule with your provider",gradient:T.g2,action:() => setModal({type:"bookAppt",title:"Book Appointment"})},
            {icon:FileText,label:"Request Records",desc:"Download your health data",gradient:"linear-gradient(135deg,#8B5CF6,#A855F7)",action:() => toast("Health records download started")},
          ].map((a,i) => (
            <div key={i} className="animate-in" onClick={a.action} style={{ animationDelay:`${300+i*100}ms`,background:T.card,borderRadius:14,padding:mob?16:22,border:`1px solid ${T.border}`,cursor:"pointer",display:"flex",gap:mob?14:0,flexDirection:mob?"row":"column",alignItems:mob?"center":"flex-start" }}>
              <div style={{ width:mob?40:44,height:mob?40:44,borderRadius:12,background:a.gradient,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:mob?0:14,flexShrink:0 }}><a.icon size={mob?18:22} color="#fff"/></div>
              <div><h4 style={{ fontFamily:fd,fontWeight:600,fontSize:mob?14:15,marginBottom:2 }}>{a.label}</h4><p style={{ fontSize:12,color:T.textDim }}>{a.desc}</p></div>
            </div>
          ))}
        </div>
      </>}

      {/* LABS */}
      {tab === "labs" && (
        <CardSection title="Recent Lab Results" icon={ClipboardList} iconColor={T.primary} noPadBody rightContent={
          <button onClick={() => toast("Lab report PDF downloaded")} style={{ padding:"6px 12px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",color:T.textMuted,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:4 }}><Download size={12}/>Export</button>
        }>
          {PATIENT_RECORDS.labs.map(l => (
            <div key={l.id} onClick={() => setModal({type:"labDetail",title:l.test,data:l})} style={{ padding:mob?"12px 14px":"16px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:mob?10:14,cursor:"pointer",transition:"background .15s" }}>
              <div style={{ width:mob?34:40,height:mob?34:40,borderRadius:10,background:l.status==="normal"?`${T.accent}15`:`${T.warning}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                {l.status==="normal"?<CheckCircle size={mob?16:18} color={T.accent}/>:<AlertTriangle size={mob?16:18} color={T.warning}/>}
              </div>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ fontSize:mob?13:14,fontWeight:600 }}>{l.test}</div>
                <div style={{ fontSize:11,color:T.textDim }}>{l.date} · Tap for details</div>
              </div>
              <div style={{ textAlign:"right",flexShrink:0 }}>
                <div style={{ fontSize:mob?12:14,fontWeight:500,color:l.status==="normal"?T.accent:T.warning }}>{l.value}</div>
                <Badge color={l.status==="normal"?T.accent:T.warning} small>{l.status}</Badge>
              </div>
            </div>
          ))}
        </CardSection>
      )}

      {/* MEDICATIONS */}
      {tab === "medications" && (
        <CardSection title="My Medications" icon={Pill} iconColor={T.primary} noPadBody rightContent={<Badge color={T.accent} small>No Interactions</Badge>}>
          {PATIENT_RECORDS.medications.map(m => (
            <div key={m.id} onClick={() => setModal({type:"medDetail",title:m.name,data:m})} style={{ padding:mob?"12px 14px":"16px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:mob?10:14,cursor:"pointer" }}>
              <div style={{ width:mob?34:40,height:mob?34:40,borderRadius:10,background:`${T.primary}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Pill size={mob?16:18} color={T.primary}/></div>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ fontSize:mob?13:14,fontWeight:600 }}>{m.name}</div>
                <div style={{ fontSize:11,color:T.textDim }}>{m.schedule} · Tap for details</div>
              </div>
              <div style={{ textAlign:"right",flexShrink:0 }}>
                <div style={{ fontSize:11,color:T.textMuted }}>Refill: {m.refillDate}</div>
                <Badge color={m.status==="active"?T.accent:T.primary} small>{m.status}</Badge>
              </div>
            </div>
          ))}
        </CardSection>
      )}

      {/* APPOINTMENTS */}
      {tab === "appointments" && (
        <CardSection title="Upcoming" icon={Calendar} iconColor={T.accent} noPadBody rightContent={
          <Btn small onClick={() => setModal({type:"bookAppt",title:"Book Appointment"})}><Plus size={12}/>New</Btn>
        }>
          {patientAppts.map(a => (
            <div key={a.id} style={{ padding:mob?"12px 14px":"16px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:mob?10:14 }}>
              <div style={{ width:mob?42:48,height:mob?42:48,borderRadius:12,background:`${T.accent}12`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <span style={{ fontSize:mob?12:14,fontWeight:700,fontFamily:fm,color:T.accent }}>{a.date.split(" ")[1]}</span>
                <span style={{ fontSize:9,color:T.textDim,textTransform:"uppercase" }}>{a.date.split(" ")[0]}</span>
              </div>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ fontSize:mob?13:14,fontWeight:600 }}>{a.type}</div>
                <div style={{ fontSize:12,color:T.textDim }}>{a.provider} · {a.time}{a.location?` · ${a.location}`:""}</div>
              </div>
              <Btn small variant="secondary" onClick={() => setModal({type:"reschedule",title:"Reschedule Appointment",data:a})}>Reschedule</Btn>
            </div>
          ))}
          {!patientAppts.length && <div style={{ padding:24,textAlign:"center",color:T.textDim,fontSize:13 }}>No upcoming appointments</div>}
        </CardSection>
      )}
    </div>
  );
}
