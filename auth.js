// Auth handlers
window.GG_handleLogin = function(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  const email = fd.get('email'); const role = fd.get('role') || 'traveler';
  if (!email) return GG.toast('Enter your email','info');
  GG.signIn({ name: email.split('@')[0].replace(/\b\w/g,c=>c.toUpperCase()), email, role });
  GG.toast('Welcome back!');
  setTimeout(()=> location.href = role==='guide' ? 'guide-dashboard.html' : 'dashboard.html', 600);
};
window.GG_handleSignup = function(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  const name = fd.get('name'); const email = fd.get('email'); const role = fd.get('role') || 'traveler';
  if (!name || !email) return GG.toast('Fill all fields','info');
  GG.signIn({ name, email, role });
  GG.toast('Account created 🎉');
  setTimeout(()=> location.href = role==='guide' ? 'guide-dashboard.html' : 'dashboard.html', 600);
};
window.GG_googleAuth = function(role='traveler'){
  GG.signIn({ name:'Demo User', email:'demo@guidego.in', role });
  GG.toast('Signed in with Google');
  setTimeout(()=> location.href = role==='guide' ? 'guide-dashboard.html' : 'dashboard.html', 600);
};
window.GG_pwStrength = function(v){
  let s = 0; if (v.length>=8) s++; if (/[A-Z]/.test(v)) s++; if (/[0-9]/.test(v)) s++; if (/[^A-Za-z0-9]/.test(v)) s++;
  const bar = document.getElementById('ggPwBar'); const lbl = document.getElementById('ggPwLbl');
  if (!bar) return;
  const pct = (s/4)*100; bar.style.width = pct+'%';
  bar.style.background = ['#ef4444','#f59e0b','#eab308','#22c55e','#10b981'][s];
  lbl.textContent = ['Too weak','Weak','Fair','Strong','Excellent'][s];
};
