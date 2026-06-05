// Booking flow logic
window.GG_booking = (function(){
  const state = {
    step: 1,
    destination: null,
    guide: null,
    date: null,
    time: 'Morning',
    groupSize: 2,
    tourType: 'shared', // shared | private
    base: 999,
  };

  function setStep(n){ state.step = n; renderSteps(); renderPanels(); updatePrice(); }
  function calcPrice(){
    let p = state.base * state.groupSize;
    if (state.tourType === 'private') p = state.base * 6; // flat private fee
    if (state.groupSize >= 5) p = p * 0.9; // group discount
    // weekend / peak
    if (state.date){
      const d = new Date(state.date).getDay();
      if (d===0 || d===6) p *= 1.15;
    }
    return Math.round(p);
  }
  function updatePrice(){
    const el = document.getElementById('ggPriceLive');
    if (el) el.textContent = GG.INR(calcPrice());
    const sub = document.getElementById('ggPriceBreak');
    if (sub){
      const lines = [
        `Base: ${GG.INR(state.base)} × ${state.tourType==='private'?6:state.groupSize}`,
        state.groupSize>=5 ? '<span style="color:var(--accent)">Group discount −10%</span>' : '',
        (state.date && [0,6].includes(new Date(state.date).getDay())) ? '<span style="color:var(--warm)">Weekend +15%</span>' : '',
      ].filter(Boolean);
      sub.innerHTML = lines.map(l=>`<div>${l}</div>`).join('');
    }
  }
  function renderSteps(){
    const labels = ['Destination','Guide','Date','Time','Group','Payment','Confirm'];
    const wrap = document.getElementById('ggStepsBar'); if (!wrap) return;
    wrap.innerHTML = labels.map((l,i)=>{
      const n = i+1;
      const cls = state.step===n ? 'active' : (state.step>n ? 'done' : '');
      return `<div class="step ${cls}"><div class="dot">${state.step>n?'<i data-lucide=\"check\" style=\"width:14px;height:14px\"></i>':n}</div><div class="label">${l}</div></div>${i<labels.length-1?'<div style="flex:1;height:2px;background:var(--border);border-radius:2px;margin:0 6px"></div>':''}`;
    }).join('');
    if (window.lucide) lucide.createIcons();
  }
  function renderPanels(){
    document.querySelectorAll('[data-panel]').forEach(p => p.style.display = (+p.dataset.panel === state.step) ? 'block' : 'none');
  }

  function renderDestinations(){
    const grid = document.getElementById('ggBookDest'); if (!grid) return;
    grid.innerHTML = GG.destinations.slice(0,8).map(d=>`
      <button class="card" style="text-align:left;cursor:pointer;border:2px solid ${state.destination===d.id?'var(--primary)':'transparent'}" onclick="GG_booking.pick('dest','${d.id}')">
        <div style="height:120px;background:url(${d.img}) center/cover"></div>
        <div style="padding:10px 12px"><div style="font-weight:700">${d.name}</div><div style="font-size:.75rem;color:var(--text-soft)">${d.state} • ${GG.INR(d.cost)}</div></div>
      </button>`).join('');
  }
  function renderGuides(){
    const grid = document.getElementById('ggBookGuides'); if (!grid) return;
    grid.innerHTML = GG.guides.slice(0,6).map(g=>`
      <button class="card" style="text-align:left;cursor:pointer;border:2px solid ${state.guide===g.id?'var(--primary)':'transparent'}" onclick="GG_booking.pick('guide','${g.id}')">
        <div style="padding:14px;display:flex;gap:12px;align-items:center">
          <img src="${g.img}" style="width:54px;height:54px;border-radius:50%;object-fit:cover"/>
          <div style="flex:1">
            <div style="font-weight:700;display:flex;align-items:center;gap:.3rem">${g.name} ${g.verified?'<span class="badge badge-verified" style="font-size:.6rem">✓</span>':''}</div>
            <div style="font-size:.75rem;color:var(--text-soft)">${g.city} • ⭐ ${g.rating}</div>
            <div style="font-size:.8rem;font-weight:700;color:var(--primary);margin-top:2px">${GG.INR(g.price)}/day</div>
          </div>
        </div>
      </button>`).join('');
  }
  function renderCalendar(){
    const cal = document.getElementById('ggBookCal'); if (!cal) return;
    const today = new Date(); today.setHours(0,0,0,0);
    const month = today.getMonth(); const year = today.getFullYear();
    const first = new Date(year, month, 1).getDay();
    const days = new Date(year, month+1, 0).getDate();
    let html = '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:8px;font-size:.7rem;color:var(--text-soft);text-align:center;font-weight:600">'+['S','M','T','W','T','F','S'].map(d=>`<div>${d}</div>`).join('')+'</div>';
    html += '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px">';
    for (let i=0;i<first;i++) html += '<div></div>';
    for (let d=1; d<=days; d++){
      const dt = new Date(year, month, d);
      const iso = dt.toISOString().slice(0,10);
      const isPast = dt < today;
      const isFull = [4,11,19].includes(d);
      const isLeave = [7,21].includes(d);
      const cls = isPast?'muted':isFull?'full':isLeave?'leave':'';
      const sel = state.date===iso?'selected':'';
      html += `<div class="date-cell ${cls} ${sel}" ${!isPast && !isFull && !isLeave ? `onclick="GG_booking.pick('date','${iso}')"`:''}>${d}</div>`;
    }
    html += '</div>';
    html += '<div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:12px;font-size:.72rem;color:var(--text-soft)"><span><span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:rgba(239,68,68,.4);margin-right:4px"></span>Fully booked</span><span><span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:rgba(148,163,184,.4);margin-right:4px"></span>Guide leave</span></div>';
    cal.innerHTML = html;
  }
  function renderTimes(){
    const w = document.getElementById('ggBookTimes'); if (!w) return;
    w.innerHTML = ['Morning','Afternoon','Evening'].map(t=>`
      <button class="btn ${state.time===t?'btn-primary':'btn-neo'}" onclick="GG_booking.pick('time','${t}')" style="flex:1">${t==='Morning'?'🌅':t==='Afternoon'?'☀️':'🌇'} ${t}</button>`).join('');
  }
  function renderGroup(){
    const w = document.getElementById('ggBookGroup'); if (!w) return;
    w.innerHTML = `
      <div style="display:flex;align-items:center;gap:14px;justify-content:space-between">
        <div>
          <div style="font-weight:700;font-size:1.1rem">Travelers</div>
          <div style="font-size:.8rem;color:var(--text-soft)">5+ unlocks 10% group discount</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <button class="btn btn-neo btn-sm" onclick="GG_booking.adjust(-1)">−</button>
          <div style="font-size:1.6rem;font-weight:800;min-width:50px;text-align:center">${state.groupSize}</div>
          <button class="btn btn-neo btn-sm" onclick="GG_booking.adjust(1)">+</button>
        </div>
      </div>
      <div class="divider"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <button class="card" style="text-align:left;padding:14px;cursor:pointer;border:2px solid ${state.tourType==='shared'?'var(--primary)':'transparent'}" onclick="GG_booking.setType('shared')">
          <div style="font-weight:700">Shared Tour</div><div style="font-size:.78rem;color:var(--text-soft)">Join other travelers • Lower per-person cost</div>
        </button>
        <button class="card" style="text-align:left;padding:14px;cursor:pointer;border:2px solid ${state.tourType==='private'?'var(--primary)':'transparent'}" onclick="GG_booking.setType('private')">
          <div style="font-weight:700">Private Tour</div><div style="font-size:.78rem;color:var(--text-soft)">Just your group with the guide</div>
        </button>
      </div>`;
  }
  function renderPayment(){
    const w = document.getElementById('ggBookPay'); if (!w) return;
    const methods = [
      ['upi','UPI / PhonePe / GPay / Paytm','smartphone'],
      ['card','Credit / Debit Card (RuPay, Visa, MC)','credit-card'],
      ['wallet','Wallets (Paytm, Amazon Pay)','wallet'],
      ['netbank','Net Banking','landmark'],
    ];
    w.innerHTML = `
      <div style="display:grid;gap:10px">
        ${methods.map(([id,label,ic])=>`<label class="card" style="padding:14px;display:flex;align-items:center;gap:12px;cursor:pointer">
          <input type="radio" name="pay" value="${id}" ${id==='upi'?'checked':''}/>
          <i data-lucide="${ic}" style="width:20px;height:20px;color:var(--primary)"></i>
          <div style="font-weight:600">${label}</div>
        </label>`).join('')}
      </div>
      <div class="glass" style="margin-top:14px;padding:14px;display:flex;align-items:center;gap:14px">
        <div style="width:120px;height:120px;background:#fff;border-radius:12px;display:grid;place-items:center;color:#000;font-family:monospace;font-size:.7rem;text-align:center;padding:8px;background-image:linear-gradient(45deg,#000 25%,transparent 25%),linear-gradient(-45deg,#000 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#000 75%),linear-gradient(-45deg,transparent 75%,#000 75%);background-size:8px 8px;background-position:0 0,0 4px,4px -4px,-4px 0px"></div>
        <div>
          <div style="font-weight:700">Scan & Pay</div>
          <div style="font-size:.8rem;color:var(--text-soft);margin:.3rem 0">guidego@upi</div>
          <div style="font-size:1.4rem;font-weight:800;color:var(--primary)">${GG.INR(calcPrice())}</div>
        </div>
      </div>`;
    if (window.lucide) lucide.createIcons();
  }
  function renderConfirm(){
    const w = document.getElementById('ggBookConfirm'); if (!w) return;
    const dest = GG.destinations.find(d=>d.id===state.destination);
    const guide = GG.guides.find(g=>g.id===state.guide);
    w.innerHTML = `
      <div style="text-align:center;padding:30px 10px">
        <div style="width:80px;height:80px;margin:0 auto 16px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--primary));display:grid;place-items:center;color:#fff;animation:floatY 2.4s ease-in-out infinite"><i data-lucide="check" style="width:38px;height:38px"></i></div>
        <h2 style="font-size:1.6rem;font-weight:800;margin-bottom:.4rem">Booking Confirmed!</h2>
        <p style="color:var(--text-soft);margin-bottom:1.4rem">Your QR pass and itinerary have been sent to your email.</p>
        <div class="glass" style="max-width:420px;margin:0 auto;padding:18px;text-align:left">
          <div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span style="color:var(--text-soft)">Destination</span><b>${dest?.name||'—'}</b></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span style="color:var(--text-soft)">Guide</span><b>${guide?.name||'—'}</b></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span style="color:var(--text-soft)">Date</span><b>${state.date||'—'}</b></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span style="color:var(--text-soft)">Time</span><b>${state.time}</b></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span style="color:var(--text-soft)">Travelers</span><b>${state.groupSize}</b></div>
          <div class="divider"></div>
          <div style="display:flex;justify-content:space-between;font-size:1.1rem"><b>Total Paid</b><b style="color:var(--primary)">${GG.INR(calcPrice())}</b></div>
        </div>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:18px">
          <a href="dashboard.html" class="btn btn-primary"><i data-lucide="layout-dashboard" style="width:16px;height:16px"></i> Go to Dashboard</a>
          <button class="btn btn-ghost" onclick="window.print()"><i data-lucide="download" style="width:16px;height:16px"></i> Download Pass</button>
        </div>
      </div>`;
    if (window.lucide) lucide.createIcons();
  }

  return {
    init(){
      // pre-pick from URL
      const p = new URLSearchParams(location.search);
      if (p.get('guide')){ state.guide = p.get('guide'); const g = GG.guides.find(x=>x.id===state.guide); if (g) state.base = g.price; }
      if (p.get('dest')) state.destination = p.get('dest');
      renderSteps(); renderPanels();
      renderDestinations(); renderGuides(); renderCalendar(); renderTimes(); renderGroup(); renderPayment();
      updatePrice();
    },
    pick(k,v){
      if (k==='dest'){ state.destination=v; renderDestinations(); }
      if (k==='guide'){ state.guide=v; const g=GG.guides.find(x=>x.id===v); if(g) state.base=g.price; renderGuides(); updatePrice(); renderPayment(); }
      if (k==='date'){ state.date=v; renderCalendar(); updatePrice(); renderPayment(); }
      if (k==='time'){ state.time=v; renderTimes(); }
    },
    adjust(d){ state.groupSize = Math.max(1, Math.min(25, state.groupSize+d)); renderGroup(); updatePrice(); renderPayment(); },
    setType(t){ state.tourType=t; renderGroup(); updatePrice(); renderPayment(); },
    next(){
      if (state.step===1 && !state.destination) return GG.toast('Pick a destination','info');
      if (state.step===2 && !state.guide) return GG.toast('Pick a guide','info');
      if (state.step===3 && !state.date) return GG.toast('Pick a date','info');
      if (state.step===6) renderConfirm();
      setStep(Math.min(7, state.step+1));
    },
    prev(){ setStep(Math.max(1, state.step-1)); },
    state
  };
})();
