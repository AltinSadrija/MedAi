'use client';
import{useState}from'react';
import{Activity,Heart,Brain,User,AlertTriangle,ChevronRight,ChevronDown,Search,Calendar,Bell,TrendingUp,Thermometer,Pill,Users,Zap,X,Phone,Mail,FileText,Lock}from'lucide-react';
import{T,fd,fm,PATIENTS,useApp}from'@/lib/store';
import{useM}from'@/lib/hooks';
import{Bg,RiskBg,Stat,Card,Btn}from'@/components/ui';

export default function Dashboard(){
  const{appts,notifs,setModal,t}=useApp();
  const[sel,setSel]=useState(null);
  const[af,setAf]=useState("all");
  const[q,setQ]=useState("");
  const mob=useM();const c=mob;
  const fa=notifs.filter(a=>af==="all"||a.type===af);
  const fp=q?PATIENTS.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())||p.condition.toLowerCase().includes(q.toLowerCase())):PATIENTS;
  const aa=appts.filter(a=>a.status!=="cancelled");

  return<div style={{padding:mob?16:28,overflowY:"auto",height:"100%"}}>
    <div style={{marginBottom:mob?16:24}}><h1 style={{fontFamily:fd,fontSize:mob?22:28,fontWeight:700}}>Provider Dashboard</h1><p style={{color:T.tm,fontSize:mob?12:14,marginTop:4}}>Good morning, Dr. Martinez — Feb 15, 2026</p></div>

    <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:mob?10:16,marginBottom:mob?16:24}}>
      <Stat icon={Users} label="Active Patients" value={`${PATIENTS.length}`} trend="+12 this month" color={T.p} compact={c}/>
      <Stat icon={Calendar} label="Appointments" value={`${aa.length}`} trend={`${appts.filter(a=>a.status==="pending").length} pending`} color={T.a} delay={100} compact={c}/>
      <Stat icon={AlertTriangle} label="Critical Alerts" value={`${notifs.filter(n=>n.type==="critical").length}`} trend="Action required" color={T.d} delay={200} compact={c}/>
      <Stat icon={TrendingUp} label="AI Accuracy" value="96.3%" trend="Target: >95%" color={T.pp} delay={300} compact={c}/>
    </div>

    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 360px",gap:mob?12:20}}>
      <div style={{display:"flex",flexDirection:"column",gap:mob?12:16,minWidth:0}}>
        {/* Alerts */}
        <Card title="AI Alerts & CDS" icon={Bell} iconColor={T.w} noPad right={<div style={{display:"flex",gap:3,overflowX:"auto"}}>{["all","critical","warning","info"].map(f=><button key={f} onClick={()=>setAf(f)} style={{padding:"3px 8px",borderRadius:6,border:"none",background:af===f?`${T.p}20`:"transparent",color:af===f?T.p:T.td,fontSize:10,fontWeight:500,cursor:"pointer",textTransform:"capitalize"}}>{f}</button>)}</div>}>
          <div style={{maxHeight:mob?180:240,overflowY:"auto"}}>
            {fa.map((a,i)=><div key={a.id} className="ai" onClick={()=>{const p=PATIENTS.find(p=>p.id===a.pid);if(p)setSel(sel?.id===p.id?null:p)}} style={{animationDelay:`${i*60}ms`,padding:mob?"8px 12px":"12px 16px",borderBottom:`1px solid ${T.bd}`,display:"flex",alignItems:"flex-start",gap:8,cursor:"pointer"}}>
              <div style={{width:7,height:7,borderRadius:"50%",marginTop:5,flexShrink:0,background:a.type==="critical"?T.d:a.type==="warning"?T.w:T.p,boxShadow:a.type==="critical"?`0 0 6px ${T.d}`:"none"}}/>
              <div style={{flex:1,minWidth:0}}><p style={{fontSize:mob?11:12,lineHeight:1.5,color:T.tx}}>{a.msg}</p><span style={{fontSize:10,color:T.td}}>{a.time}</span>{a.severity&&<Bg color={a.severity==="contraindicated"?T.d:T.w} small> {a.severity}</Bg>}{a.action&&<p style={{fontSize:10,color:T.p,marginTop:3}}>→ {a.action}</p>}</div>
            </div>)}
          </div>
        </Card>

        {/* Patient Panel */}
        <Card title="Patient Panel" icon={Users} iconColor={T.p} noPad right={<div style={{display:"flex",alignItems:"center",gap:5,background:T.sf,borderRadius:6,padding:"4px 8px",border:`1px solid ${T.bd}`,maxWidth:mob?140:180}}><Search size={12} color={T.td}/><input placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} style={{border:"none",background:"transparent",color:T.tx,fontSize:11,outline:"none",width:"100%",minWidth:0}}/>{q&&<button onClick={()=>setQ("")} style={{background:"none",border:"none",cursor:"pointer",color:T.td}}><X size={12}/></button>}</div>}>
          {fp.map(p=><div key={p.id} onClick={()=>setSel(sel?.id===p.id?null:p)} style={{padding:mob?"8px 12px":"12px 16px",borderBottom:`1px solid ${T.bd}`,display:"flex",alignItems:"center",gap:mob?8:12,cursor:"pointer",background:sel?.id===p.id?`${T.p}08`:"transparent"}}>
            <div style={{width:mob?30:36,height:mob?30:36,borderRadius:8,background:`${p.color}20`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><User size={mob?14:16} color={p.color}/></div>
            <div style={{flex:1,minWidth:0}}><div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}><span style={{fontSize:mob?12:13,fontWeight:600}}>{p.name}</span><RiskBg risk={p.risk}/></div><span style={{fontSize:mob?10:11,color:T.td}}>{p.condition} · Age {p.age}</span></div>
            {!mob&&<div style={{fontSize:11,color:T.tm,flexShrink:0}}>Next: {p.nextAppt}</div>}
            {sel?.id===p.id?<ChevronDown size={14} color={T.td}/>:<ChevronRight size={14} color={T.td}/>}
          </div>)}
          {!fp.length&&<div style={{padding:20,textAlign:"center",color:T.td,fontSize:12}}>No patients found</div>}
        </Card>

        {/* Patient Detail */}
        {sel&&<div className="sc" style={{background:T.cd,borderRadius:14,border:`1px solid ${T.p}30`,padding:mob?14:20}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14,gap:8}}>
            <div><h3 style={{fontFamily:fd,fontSize:mob?15:17,fontWeight:700}}>{sel.name}</h3><p style={{fontSize:12,color:T.tm}}>Age {sel.age} · {sel.condition}</p></div>
            <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}><RiskBg risk={sel.risk}/><button onClick={()=>setSel(null)} style={{background:"none",border:"none",cursor:"pointer",color:T.td}}><X size={16}/></button></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:mob?6:10,marginBottom:14}}>
            {[["BP",sel.vitals.bp,Heart,T.d],["HR",`${sel.vitals.hr} bpm`,Activity,T.p],["Temp",sel.vitals.temp,Thermometer,T.w],["SpO2",sel.vitals.spo2,Zap,T.a]].map(([l,v,I,cl],i)=><div key={i} style={{background:T.sf,borderRadius:10,padding:mob?8:12,border:`1px solid ${T.bd}`}}><div style={{display:"flex",alignItems:"center",gap:4,marginBottom:3}}><I size={12} color={cl}/><span style={{fontSize:9,color:T.td}}>{l}</span></div><span style={{fontSize:mob?14:16,fontWeight:700,fontFamily:fd}}>{v}</span></div>)}
          </div>
          <div style={{fontSize:11,fontWeight:600,color:T.tm,marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Medications</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>{sel.meds.map((m,i)=><span key={i} style={{padding:"4px 8px",borderRadius:6,background:`${T.a}12`,border:`1px solid ${T.a}25`,fontSize:10,color:T.a,fontWeight:500}}><Pill size={10} style={{marginRight:2,verticalAlign:-1}}/>{m}</span>)}</div>
          <div style={{fontSize:11,fontWeight:600,color:T.tm,marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Active Consents</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:12}}>{sel.consents?.map(c=><Bg key={c} color={T.p} small>{c}</Bg>)}</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            <Btn small onClick={()=>setModal({type:"patientDetail",title:`${sel.name} — Full Record`,data:sel})}><FileText size={12}/>Full Record</Btn>
            <Btn small v="secondary" onClick={()=>t(`Calling ${sel.phone}...`)}><Phone size={12}/>Call</Btn>
            <Btn small v="secondary" onClick={()=>t(`Message sent to ${sel.name}`)}><Mail size={12}/>Message</Btn>
            <Btn small v="danger" onClick={()=>setModal({type:"breakglass",title:"Emergency Override"})}><Lock size={12}/>Break-Glass</Btn>
          </div>
        </div>}
      </div>

      {/* Right */}
      <div style={{display:"flex",flexDirection:"column",gap:mob?12:16,minWidth:0}}>
        <Card title="Today's Schedule" icon={Calendar} iconColor={T.a} noPad>
          {appts.map(a=><div key={a.id} onClick={()=>setModal({type:"apptDetail",title:"Appointment",data:a})} style={{padding:mob?"8px 12px":"10px 16px",borderBottom:`1px solid ${T.bd}`,display:"flex",alignItems:"center",gap:mob?8:12,cursor:"pointer",opacity:a.status==="cancelled"?.4:1}}>
            <span style={{fontSize:mob?10:12,fontWeight:600,fontFamily:fm,color:T.p,minWidth:mob?46:56}}>{a.time}</span>
            <div style={{width:3,height:28,borderRadius:2,background:a.status==="confirmed"?T.a:a.status==="cancelled"?T.d:T.w,flexShrink:0}}/>
            <div style={{flex:1,minWidth:0}}><div style={{fontSize:mob?12:13,fontWeight:500,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{a.patient}</div><div style={{fontSize:11,color:T.td}}>{a.type}</div></div>
            <Bg color={a.status==="confirmed"?T.a:a.status==="cancelled"?T.d:T.w} small>{a.status}</Bg>
          </div>)}
        </Card>

        <div className="ai" style={{animationDelay:"200ms",background:`linear-gradient(135deg,${T.cd},#1a2744)`,borderRadius:14,border:`1px solid ${T.p}30`,padding:mob?14:18}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><div style={{width:30,height:30,borderRadius:8,background:T.g1,display:"flex",alignItems:"center",justifyContent:"center"}}><Brain size={14} color="#fff"/></div><span style={{fontFamily:fd,fontWeight:600,fontSize:13}}>AI Clinical Insights</span></div>
          {[{text:"James Wilson COPD risk ↑34% — adjust bronchodilator therapy.",color:T.d,pid:2},{text:"Sarah Chen HbA1c 7.8%→7.2% — Metformin effective.",color:T.a,pid:1},{text:"Robert Kim overdue cardiac rehab eval — ECG recommended.",color:T.w,pid:4}].map((ins,i)=><div key={i} onClick={()=>{const p=PATIENTS.find(p=>p.id===ins.pid);if(p)setSel(p)}} style={{padding:"8px 10px",borderRadius:8,background:`${ins.color}08`,border:`1px solid ${ins.color}20`,fontSize:11,lineHeight:1.6,color:T.tm,cursor:"pointer",marginBottom:i<2?8:0}}><div style={{width:5,height:5,borderRadius:"50%",background:ins.color,display:"inline-block",marginRight:6,verticalAlign:"middle"}}/>{ins.text}</div>)}
        </div>
      </div>
    </div>
  </div>
}
