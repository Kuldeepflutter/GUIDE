// AI Travel Assistant (mock)
window.GG_initChatbot = function(){
  const fab = document.createElement('button');
  fab.className = 'chatbot-fab';
  fab.title = 'GuideGo AI';
  fab.innerHTML = '<i data-lucide="sparkles" style="width:24px;height:24px"></i>';

  const panel = document.createElement('div');
  panel.className = 'chatbot-panel glass';
  panel.innerHTML = `
    <div style="padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,rgba(14,165,233,.15),rgba(16,185,129,.1))">
      <span style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--primary-2));display:grid;place-items:center;color:#fff"><i data-lucide="sparkles" style="width:16px;height:16px"></i></span>
      <div style="flex:1">
        <div style="font-weight:700;font-size:.95rem">GuideGo AI</div>
        <div style="font-size:.72rem;color:var(--accent);display:flex;align-items:center;gap:.3rem"><span style="width:6px;height:6px;border-radius:50%;background:var(--accent)"></span> Online</div>
      </div>
      <button class="btn btn-ghost btn-sm" id="ggChatMic" title="Voice"><i data-lucide="mic" style="width:14px;height:14px"></i></button>
      <button class="btn btn-ghost btn-sm" id="ggChatClose"><i data-lucide="x" style="width:14px;height:14px"></i></button>
    </div>
    <div id="ggChatLog" style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px"></div>
    <div style="padding:10px;border-top:1px solid var(--border);display:flex;gap:8px;align-items:center">
      <input id="ggChatInput" class="input" placeholder="Ask about destinations, budgets, guides…" style="padding:.65rem .8rem;border-radius:12px"/>
      <button class="btn btn-primary btn-sm" id="ggChatSend"><i data-lucide="send" style="width:14px;height:14px"></i></button>
    </div>`;
  document.body.appendChild(fab);
  document.body.appendChild(panel);

  const log = panel.querySelector('#ggChatLog');
  const input = panel.querySelector('#ggChatInput');
  const send = panel.querySelector('#ggChatSend');
  fab.onclick = () => { panel.classList.toggle('open'); if (panel.classList.contains('open') && !log.dataset.greeted){ log.dataset.greeted='1'; greet(); } };
  panel.querySelector('#ggChatClose').onclick = () => panel.classList.remove('open');

  function pushMsg(text, who='bot'){
    const wrap = document.createElement('div');
    wrap.className = 'chat-msg ' + who;
    wrap.innerHTML = text + `<div style="font-size:.65rem;opacity:.7;margin-top:4px;text-align:right">${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>`;
    log.appendChild(wrap); log.scrollTop = log.scrollHeight;
  }
  function typing(){
    const t = document.createElement('div'); t.className='chat-msg bot typing-dots';
    t.innerHTML = '<span></span><span></span><span></span>';
    log.appendChild(t); log.scrollTop = log.scrollHeight; return t;
  }
  function greet(){
    pushMsg("👋 Namaste! I'm your GuideGo AI assistant. Tell me where you want to go, your budget, or how many travelers — I'll plan it!");
    setTimeout(()=>pushMsg("Try: <b>5-day Manali under ₹15,000</b> or <b>Best guides in Jaipur</b>"), 800);
  }
  function reply(q){
    const ql = q.toLowerCase();
    if (/budget|cheap|under|₹/.test(ql)) return "💸 For budget travel, try <b>Rishikesh</b>, <b>Hampi</b>, or <b>Varanasi</b> — full week under ₹12,000 incl. local guides.";
    if (/manali|himachal|mountain/.test(ql)) return "🏔️ Manali in Mar–Jun is perfect! Top guide: <b>Riya Kapoor</b> ⭐4.7, ₹1,299/day. Want me to open her profile?";
    if (/jaipur|rajasthan|heritage/.test(ql)) return "🏰 Jaipur heritage: <b>Arjun Sharma</b> ⭐4.9 (540+ tours). Avg trip cost ₹8,900 for 4 days.";
    if (/kerala|backwater/.test(ql)) return "🌴 Kerala backwaters with <b>Priya Nair</b> — Ayurveda + houseboat combo, ₹1,799/day.";
    if (/group|family|kids/.test(ql)) return "👨‍👩‍👧 Group of 5+ unlocks <b>10% discount</b>. Goa, Kerala & Shimla are top family picks.";
    if (/itinerary|plan|days/.test(ql)) return "🗺️ Sure! Share <b>destination</b>, <b>days</b>, and <b>group size</b> and I'll draft a day-by-day plan.";
    return "✨ Got it! Browse our <a href='destinations.html' style='color:var(--primary);font-weight:600'>destinations</a> or <a href='guides.html' style='color:var(--primary);font-weight:600'>verified guides</a>. Need a personalized plan?";
  }
  function handleSend(){
    const v = input.value.trim(); if (!v) return;
    pushMsg(v,'me'); input.value='';
    const t = typing();
    setTimeout(()=>{ t.remove(); pushMsg(reply(v)); }, 900);
  }
  send.onclick = handleSend;
  input.addEventListener('keydown', e => { if (e.key==='Enter') handleSend(); });
  if (window.lucide) lucide.createIcons();
};
