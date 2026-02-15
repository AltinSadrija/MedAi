'use client';
// This file contains all non-primary views: Services Catalog, Architecture, Compliance, KPIs, Risks, Roadmap, Audit, Admin
import{T,fd,fm,ARCH_LAYERS,PATIENT_SERVICES,PROVIDER_SERVICES,ADMIN_SERVICES,ROLES,CONSENT_TYPES,KPIS,RISKS,ROADMAP,SECURITY,COMPLIANCE,AUDIT_LOG,useApp}from'@/lib/store';
import{useM}from'@/lib/hooks';
import{Card,Bg,Btn}from'@/components/ui';
import{Shield,Users,Brain,Layers,BarChart2,AlertTriangle,Calendar,Lock,Activity,CheckCircle,Clock,FileText,Eye}from'lucide-react';

// ===== SERVICES CATALOG (Section 3) =====
export function ServicesView(){
  const mob=useM();
  const Section=({title,icon:I,color,services})=>(
    <div style={{marginBottom:mob?16:24}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}><I size={20} color={color}/><h2 style={{fontFamily:fd,fontSize:mob?16:18,fontWeight:700}}>{title}</h2></div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(2,1fr)",gap:10}}>
        {services.map(s=>(
          <div key={s.id} className="ai" style={{background:T.cd,borderRadius:14,padding:mob?14:18,border:`1px solid ${T.bd}`}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{fontSize:22}}>{s.icon}</span><h3 style={{fontFamily:fd,fontSize:14,fontWeight:600}}>{s.name}</h3></div>
            <p style={{fontSize:12,color:T.tm,lineHeight:1.6,marginBottom:8}}>{s.desc}</p>
            <div style={{background:T.sf,borderRadius:8,padding:8,border:`1px solid ${T.bd}`}}><div style={{fontSize:10,color:T.td,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:3}}>Required Permissions</div><p style={{fontSize:11,color:T.tm}}>{s.perms}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
  return<div style={{padding:mob?16:28,overflowY:"auto",height:"100%"}}>
    <h1 style={{fontFamily:fd,fontSize:mob?22:28,fontWeight:700,marginBottom:4}}>Services Catalog</h1>
    <p style={{color:T.tm,fontSize:13,marginBottom:mob?16:24}}>All services per Section 3 of the architecture document</p>
    <Section title={`Patient-Facing Services (${PATIENT_SERVICES.length})`} icon={Users} color={T.a} services={PATIENT_SERVICES}/>
    <Section title={`Provider-Facing Services (${PROVIDER_SERVICES.length})`} icon={Brain} color={T.p} services={PROVIDER_SERVICES}/>
    <Section title={`Administrative Services (${ADMIN_SERVICES.length})`} icon={Shield} color={T.w} services={ADMIN_SERVICES}/>
  </div>
}

// ===== ARCHITECTURE VIEW (Section 2) =====
export function ArchView(){
  const mob=useM();
  return<div style={{padding:mob?16:28,overflowY:"auto",height:"100%"}}>
    <h1 style={{fontFamily:fd,fontSize:mob?22:28,fontWeight:700,marginBottom:4}}>System Architecture</h1>
    <p style={{color:T.tm,fontSize:13,marginBottom:mob?16:24}}>6-layer architecture per Section 2</p>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
      {ARCH_LAYERS.map((l,i)=>(
        <div key={i} className="ai" style={{animationDelay:`${i*80}ms`,background:T.cd,borderRadius:14,padding:mob?14:20,border:`1px solid ${l.color}30`,borderLeft:`4px solid ${l.color}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}><div style={{width:8,height:8,borderRadius:"50%",background:l.color}}/><h3 style={{fontFamily:fd,fontSize:mob?14:16,fontWeight:700,color:l.color}}>{l.name}</h3></div>
          <p style={{fontSize:12,color:T.tm,lineHeight:1.6}}>{l.components}</p>
        </div>
      ))}
    </div>
    <h2 style={{fontFamily:fd,fontSize:mob?16:18,fontWeight:700,marginBottom:12}}>Core Design Principles</h2>
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:10}}>
      {[["Privacy by Design","All data defaults to minimum necessary access. AES-256 at rest, TLS 1.3 in transit. PHI tokenized in AI pipeline.",Lock,T.a],
        ["Zero-Trust Security","Every service call authenticated via mTLS + short-lived JWT. No implicit trust based on network.",Shield,T.p],
        ["Auditability","Every recommendation, data access, and permission change logged immutably with timestamps and justification.",Eye,T.w]
      ].map(([t,d,I,c],i)=>(
        <div key={i} style={{background:T.cd,borderRadius:14,padding:mob?14:18,border:`1px solid ${T.bd}`}}>
          <div style={{width:36,height:36,borderRadius:10,background:`${c}15`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}><I size={18} color={c}/></div>
          <h3 style={{fontFamily:fd,fontSize:14,fontWeight:600,marginBottom:4}}>{t}</h3>
          <p style={{fontSize:12,color:T.tm,lineHeight:1.6}}>{d}</p>
        </div>
      ))}
    </div>
  </div>
}

// ===== RBAC & ROLES VIEW (Section 4) =====
export function RolesView(){
  const{setModal}=useApp();const mob=useM();
  return<div style={{padding:mob?16:28,overflowY:"auto",height:"100%"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:mob?16:24,flexWrap:"wrap",gap:10}}>
      <div><h1 style={{fontFamily:fd,fontSize:mob?22:28,fontWeight:700}}>Access Control</h1><p style={{color:T.tm,fontSize:13,marginTop:4}}>RBAC + ABAC model per Section 4</p></div>
      <div style={{display:"flex",gap:8}}><Btn small onClick={()=>setModal({type:"consent",title:"Consent Management"})}><Lock size={14}/>Manage Consents</Btn><Btn small v="danger" onClick={()=>setModal({type:"breakglass",title:"Emergency Override"})}><AlertTriangle size={14}/>Break-Glass</Btn></div>
    </div>
    <h2 style={{fontFamily:fd,fontSize:mob?16:18,fontWeight:600,marginBottom:12}}>10 RBAC Roles</h2>
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(2,1fr)",gap:10,marginBottom:24}}>
      {ROLES.map(r=>(
        <div key={r.id} className="ai" style={{background:T.cd,borderRadius:12,padding:mob?12:16,border:`1px solid ${T.bd}`,borderLeft:`3px solid ${r.color}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><h3 style={{fontFamily:fd,fontSize:13,fontWeight:600,color:r.color}}>{r.name}</h3><Bg color={r.color} small>{r.id}</Bg></div>
          <p style={{fontSize:11,color:T.tm,lineHeight:1.5,marginBottom:6}}>{r.perms}</p>
          <div style={{fontSize:10,color:T.td,background:T.sf,borderRadius:6,padding:6,border:`1px solid ${T.bd}`}}><strong>Scope:</strong> {r.scope}</div>
        </div>
      ))}
    </div>
    <h2 style={{fontFamily:fd,fontSize:mob?16:18,fontWeight:600,marginBottom:12}}>7 Consent Types</h2>
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(2,1fr)",gap:10}}>
      {CONSENT_TYPES.map(c=>(
        <div key={c.id} style={{background:T.cd,borderRadius:12,padding:mob?12:16,border:`1px solid ${c.color}25`}}>
          <h3 style={{fontFamily:fd,fontSize:13,fontWeight:600,color:c.color,marginBottom:4}}>{c.name}</h3>
          <p style={{fontSize:11,color:T.tm,lineHeight:1.5,marginBottom:6}}>{c.desc}</p>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Bg color={T.p} small>{c.duration}</Bg></div>
        </div>
      ))}
    </div>
  </div>
}

// ===== KPI DASHBOARD (Section 11) =====
export function KpiView(){
  const mob=useM();
  return<div style={{padding:mob?16:28,overflowY:"auto",height:"100%"}}>
    <h1 style={{fontFamily:fd,fontSize:mob?22:28,fontWeight:700,marginBottom:4}}>Key Performance Indicators</h1>
    <p style={{color:T.tm,fontSize:13,marginBottom:mob?16:24}}>10 KPIs per Section 11</p>
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(2,1fr)",gap:12}}>
      {KPIS.map((k,i)=>{
        const met=k.name==="Bias Variance"?parseFloat(k.current)<3:k.name==="Breach Incidents"?k.current==="0":k.name==="Mean Time to Detection"?parseInt(k.current)<15:parseFloat(k.current)>=parseFloat(k.target);
        return<div key={i} className="ai" style={{animationDelay:`${i*60}ms`,background:T.cd,borderRadius:14,padding:mob?14:18,border:`1px solid ${met?`${T.a}30`:`${T.w}30`}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <h3 style={{fontFamily:fd,fontSize:14,fontWeight:600}}>{k.name}</h3>
            <Bg color={met?T.a:T.w} small>{met?"Met":"Needs Work"}</Bg>
          </div>
          <p style={{fontSize:11,color:T.tm,lineHeight:1.5,marginBottom:10}}>{k.desc}</p>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:6}}>
            <div><div style={{fontSize:10,color:T.td}}>Current</div><div style={{fontSize:20,fontWeight:700,fontFamily:fd,color:met?T.a:T.w}}>{k.current}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:10,color:T.td}}>Target</div><div style={{fontSize:14,fontWeight:600,color:T.tm}}>{k.target}</div></div>
          </div>
          <div style={{height:6,borderRadius:3,background:T.sf,overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:met?T.a:T.w,width:`${Math.min(k.pct,100)}%`,transition:"width .5s"}}/></div>
          <div style={{fontSize:10,color:T.td,marginTop:4}}>Measured: {k.measurement}</div>
        </div>
      })}
    </div>
  </div>
}

// ===== RISK MANAGEMENT (Section 10) =====
export function RiskView(){
  const mob=useM();
  return<div style={{padding:mob?16:28,overflowY:"auto",height:"100%"}}>
    <h1 style={{fontFamily:fd,fontSize:mob?22:28,fontWeight:700,marginBottom:4}}>Risk Management</h1>
    <p style={{color:T.tm,fontSize:13,marginBottom:mob?16:24}}>8 risks per Section 10</p>
    {RISKS.map((r,i)=>(
      <div key={i} className="ai" style={{animationDelay:`${i*60}ms`,background:T.cd,borderRadius:14,padding:mob?14:18,border:`1px solid ${r.color}30`,marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,flexWrap:"wrap",gap:6}}>
          <h3 style={{fontFamily:fd,fontSize:14,fontWeight:600}}>{r.risk}</h3>
          <Bg color={r.color} small>{r.severity}</Bg>
        </div>
        <p style={{fontSize:12,color:T.tm,lineHeight:1.6,marginBottom:6}}>{r.mitigation}</p>
        <div style={{fontSize:11,color:T.td}}>Owner: <strong>{r.owner}</strong></div>
      </div>
    ))}
  </div>
}

// ===== ROADMAP (Section 9) =====
export function RoadmapView(){
  const mob=useM();
  return<div style={{padding:mob?16:28,overflowY:"auto",height:"100%"}}>
    <h1 style={{fontFamily:fd,fontSize:mob?22:28,fontWeight:700,marginBottom:4}}>Implementation Roadmap</h1>
    <p style={{color:T.tm,fontSize:13,marginBottom:mob?16:24}}>5 phases over 20 months per Section 9</p>
    {ROADMAP.map((p,i)=>(
      <div key={i} className="ai" style={{animationDelay:`${i*80}ms`,background:T.cd,borderRadius:14,padding:mob?14:20,border:`1px solid ${p.color}30`,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:6}}>
          <div><h3 style={{fontFamily:fd,fontSize:mob?14:16,fontWeight:700,color:p.color}}>{p.phase}</h3><span style={{fontSize:12,color:T.tm}}>{p.months}</span></div>
          <Bg color={p.pct===100?T.a:p.pct>0?T.w:T.td} small>{p.pct===100?"Complete":p.pct>0?`${p.pct}%`:"Not Started"}</Bg>
        </div>
        <div style={{height:6,borderRadius:3,background:T.sf,overflow:"hidden",marginBottom:10}}><div style={{height:"100%",borderRadius:3,background:p.color,width:`${p.pct}%`,transition:"width .5s"}}/></div>
        <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(2,1fr)",gap:6}}>
          {p.items.map((item,j)=><div key={j} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:T.tm}}><CheckCircle size={12} color={p.pct>=((j+1)/p.items.length)*100?T.a:T.td}/>{item}</div>)}
        </div>
        <div style={{fontSize:11,color:T.td,marginTop:8}}>Team: {p.team}</div>
      </div>
    ))}
  </div>
}

// ===== SECURITY & COMPLIANCE (Sections 7-8) =====
export function SecurityView(){
  const mob=useM();
  return<div style={{padding:mob?16:28,overflowY:"auto",height:"100%"}}>
    <h1 style={{fontFamily:fd,fontSize:mob?22:28,fontWeight:700,marginBottom:4}}>Security & Compliance</h1>
    <p style={{color:T.tm,fontSize:13,marginBottom:mob?16:24}}>Per Sections 7 & 8</p>
    <h2 style={{fontFamily:fd,fontSize:mob?16:18,fontWeight:600,marginBottom:12}}>8 Security Controls</h2>
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(2,1fr)",gap:10,marginBottom:24}}>
      {SECURITY.map((s,i)=>(
        <div key={i} className="ai" style={{animationDelay:`${i*60}ms`,background:T.cd,borderRadius:12,padding:mob?12:16,border:`1px solid ${T.bd}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><h3 style={{fontFamily:fd,fontSize:13,fontWeight:600}}>{s.area}</h3><Bg color={T.a} small>Active</Bg></div>
          <p style={{fontSize:11,color:T.tm,lineHeight:1.6}}>{s.details}</p>
        </div>
      ))}
    </div>
    <h2 style={{fontFamily:fd,fontSize:mob?16:18,fontWeight:600,marginBottom:12}}>Regulatory Compliance</h2>
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {COMPLIANCE.map((c,i)=>(
        <div key={i} style={{background:T.cd,borderRadius:12,padding:mob?12:16,border:`1px solid ${T.bd}`,display:"flex",alignItems:"center",gap:14}}>
          <div style={{flex:1,minWidth:0}}><h3 style={{fontSize:13,fontWeight:600,marginBottom:2}}>{c.reg}</h3><p style={{fontSize:11,color:T.tm}}>{c.desc}</p></div>
          <Bg color={c.status==="Compliant"?T.a:c.status==="Active"?T.p:T.w} small>{c.status}</Bg>
        </div>
      ))}
    </div>
  </div>
}

// ===== AUDIT LOG =====
export function AuditView(){
  const mob=useM();
  return<div style={{padding:mob?16:28,overflowY:"auto",height:"100%"}}>
    <h1 style={{fontFamily:fd,fontSize:mob?22:28,fontWeight:700,marginBottom:4}}>Audit Log</h1>
    <p style={{color:T.tm,fontSize:13,marginBottom:mob?16:24}}>Immutable audit trail per Section 8 — 7-year retention</p>
    <Card title="Recent Activity" icon={FileText} iconColor={T.p} noPad>
      {AUDIT_LOG.map((l,i)=>(
        <div key={i} style={{padding:mob?"10px 14px":"12px 16px",borderBottom:`1px solid ${T.bd}`,display:"flex",alignItems:"center",gap:mob?8:12}}>
          <div style={{minWidth:mob?50:70}}><span style={{fontSize:11,fontWeight:600,fontFamily:fm,color:T.p}}>{l.time}</span></div>
          <div style={{width:3,height:28,borderRadius:2,background:l.status==="authorized"?T.a:l.status==="alert"?T.w:T.p,flexShrink:0}}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:12,fontWeight:500}}><strong>{l.user}</strong> — {l.action}</div>
            <div style={{fontSize:11,color:T.td}}>{l.patient} · {l.justification}</div>
          </div>
          <Bg color={l.status==="authorized"?T.a:l.status==="alert"?T.w:T.p} small>{l.status}</Bg>
        </div>
      ))}
    </Card>
  </div>
}
