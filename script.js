// GuideGo — shared data & UI helpers
const GG = window.GG || {};
window.GG = GG;

GG.INR = (n) => '₹' + Number(n).toLocaleString('en-IN');

GG.destinations = [
  { id:'goa', name:'Goa', state:'Goa', img:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&q=70', rating:4.8, cost:8500, season:'Nov–Feb', tags:['Beach','Nightlife','Family'], category:'Family' },
  { id:'manali', name:'Manali', state:'Himachal Pradesh', img:'https://tse2.mm.bing.net/th/id/OIP.3Ny_QRxBlwbg1Sy6oW6ZiAHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', rating:4.7, cost:9500, season:'Mar–Jun', tags:['Adventure','Trekking'], category:'Adventure' },
  { id:'shimla', name:'Shimla', state:'Himachal Pradesh', img:'https://img.freepik.com/premium-photo/christ-church-shimla-image-hd-during-winter_181020-5763.jpg', rating:4.6, cost:7800, season:'Apr–Jun', tags:['Hills','Family'], category:'Family' },
  { id:'udaipur', name:'Udaipur', state:'Rajasthan', img:'https://www.tourmyindia.com/blog/wp-content/uploads/2020/11/Feature-City-Palace-Udaipur-Rajasthan.jpg', rating:4.9, cost:11200, season:'Oct–Mar', tags:['Heritage','Luxury'], category:'Heritage' },
  { id:'jaipur', name:'Jaipur', state:'Rajasthan', img:'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=900&q=70', rating:4.7, cost:8900, season:'Oct–Mar', tags:['Heritage','Culture'], category:'Heritage' },
  { id:'leh', name:'Leh-Ladakh', state:'Ladakh', img:'https://claudiosieberphotography.com/wp-content/uploads/2016/02/india-jammu-and-kashmir-leh-ladakh-111.jpg', rating:4.9, cost:18500, season:'Jun–Sep', tags:['Adventure','Trekking'], category:'Adventure' },
  { id:'rishikesh', name:'Rishikesh', state:'Uttarakhand', img:'https://media01.stockfood.com/largepreviews/MjE4MTcwNzE1MA==/70377650-Hindu-temple-at-Ganges-river-Rishikesh-Uttarakhand-India.jpg', rating:4.8, cost:6500, season:'Sep–Apr', tags:['Adventure','Spiritual'], category:'Religious' },
  { id:'varanasi', name:'Varanasi', state:'Uttar Pradesh', img:'https://wallpapercave.com/wp/wp6612913.jpg', rating:4.7, cost:5800, season:'Oct–Mar', tags:['Religious','Heritage'], category:'Religious' },
  { id:'kerala', name:'Kerala', state:'Kerala', img:'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&q=70', rating:4.9, cost:13500, season:'Sep–Mar', tags:['Backwaters','Nature'], category:'Family' },
  { id:'kashmir', name:'Kashmir', state:'J&K', img:'https://s.wsj.net/public/resources/images/BN-KJ524_1015KA_1000V_20150918152638.jpg', rating:4.9, cost:15500, season:'Apr–Oct', tags:['Nature','Luxury'], category:'Luxury' },
  { id:'andaman', name:'Andaman Islands', state:'Andaman', img:'https://wallpapercave.com/wp/wp5296535.jpg', rating:4.8, cost:21500, season:'Oct–May', tags:['Beach','Adventure'], category:'Adventure' },
  { id:'hampi', name:'Hampi', state:'Karnataka', img:'https://www.gosahin.com/upload/destinations/1517599466_hampi5.jpg', rating:4.6, cost:6900, season:'Oct–Feb', tags:['Heritage','Culture'], category:'Heritage' },
];

GG.guides = [
  { id:'g1', name:'Arjun Sharma', city:'Jaipur', img:'https://i.pravatar.cc/200?img=12', rating:4.9, reviews:312, exp:8, languages:['Hindi','English','Marathi'], specialty:'Heritage Tours', tours:540, price:1499, verified:true, capacity:25, booked:18, category:'Heritage' },
  { id:'g2', name:'Priya Nair', city:'Kerala', img:'https://i.pravatar.cc/200?img=47', rating:4.8, reviews:228, exp:6, languages:['English','Malayalam','Tamil'], specialty:'Backwater & Ayurveda', tours:380, price:1799, verified:true, capacity:20, booked:9, category:'Family' },
  { id:'g3', name:'Tenzin Norbu', city:'Leh', img:'https://i.pravatar.cc/200?img=15', rating:5.0, reviews:189, exp:10, languages:['English','Hindi','Ladakhi'], specialty:'High-Altitude Trekking', tours:295, price:2499, verified:true, capacity:12, booked:11, category:'Adventure' },
  { id:'g4', name:'Riya Kapoor', city:'Manali', img:'https://i.pravatar.cc/200?img=44', rating:4.7, reviews:265, exp:5, languages:['Hindi','English','Punjabi'], specialty:'Adventure Sports', tours:410, price:1299, verified:true, capacity:18, booked:6, category:'Adventure' },
  { id:'g5', name:'Vikram Singh', city:'Udaipur', img:'https://i.pravatar.cc/200?img=33', rating:4.9, reviews:402, exp:12, languages:['Hindi','English','Rajasthani'], specialty:'Royal Palaces & History', tours:670, price:1899, verified:true, capacity:22, booked:20, category:'Heritage' },
  { id:'g6', name:'Aanya Iyer', city:'Hampi', img:'https://i.pravatar.cc/200?img=49', rating:4.8, reviews:174, exp:7, languages:['English','Kannada','Tamil','Telugu'], specialty:'Photography & Ruins', tours:312, price:1199, verified:true, capacity:15, booked:4, category:'Heritage' },
  { id:'g7', name:'Rohan Das', city:'Varanasi', img:'https://i.pravatar.cc/200?img=11', rating:4.9, reviews:298, exp:9, languages:['Hindi','English','Bengali'], specialty:'Ghats & Spirituality', tours:520, price:999, verified:true, capacity:30, booked:24, category:'Religious' },
  { id:'g8', name:'Meera Joshi', city:'Rishikesh', img:'https://i.pravatar.cc/200?img=45', rating:4.8, reviews:201, exp:6, languages:['Hindi','English','Gujarati'], specialty:'Yoga & River Rafting', tours:330, price:1099, verified:true, capacity:20, booked:13, category:'Adventure' },
];

GG.indianLanguages = ['Hindi','English','Marathi','Gujarati','Punjabi','Bengali','Tamil','Telugu','Kannada','Malayalam'];
GG.categories = ['Adventure','Religious','Heritage','Wildlife','Luxury','Budget','Trekking','Family'];

// Auth helpers
GG.session = () => JSON.parse(localStorage.getItem('gg-user') || 'null');
GG.signIn = (user) => localStorage.setItem('gg-user', JSON.stringify(user));
GG.signOut = () => { localStorage.removeItem('gg-user'); location.href='index.html'; };

// Toast
GG.toast = (msg, type='success') => {
  const t = document.createElement('div');
  t.className = 'glass';
  t.style.cssText = 'position:fixed;top:24px;left:50%;transform:translateX(-50%) translateY(-20px);padding:.8rem 1.1rem;z-index:200;font-weight:600;font-size:.9rem;opacity:0;transition:all .3s;display:flex;align-items:center;gap:.6rem';
  t.innerHTML = `<i data-lucide="${type==='success'?'check-circle':'info'}" style="width:18px;height:18px;color:var(--${type==='success'?'accent':'primary'})"></i> ${msg}`;
  document.body.appendChild(t);
  requestAnimationFrame(()=>{ t.style.opacity='1'; t.style.transform='translateX(-50%) translateY(0)' });
  if (window.lucide) lucide.createIcons();
  setTimeout(()=>{ t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(-20px)'; setTimeout(()=>t.remove(),300) }, 2600);
};

// Navbar render
GG.renderNav = (active='') => {
  const links = [
    ['index.html','Home','home'],
    ['destinations.html','Destinations','destinations'],
    ['guides.html','Guides','guides'],
    ['destinations.html#groups','Group Tours','groups'],
    ['index.html#about','About','about'],
    ['index.html#contact','Contact','contact'],
  ];
  const user = GG.session();
  const userBtn = user
    ? `<a href="${user.role==='guide'?'guide-dashboard.html':'dashboard.html'}" class="btn btn-ghost btn-sm"><i data-lucide="user-circle" style="width:16px;height:16px"></i>${user.name.split(' ')[0]}</a>`
    : `<a href="login.html" class="btn btn-ghost btn-sm">Login</a><a href="signup.html" class="btn btn-primary btn-sm">Sign up</a>`;
  return `
  <header class="glass" style="position:sticky;top:12px;z-index:50;margin:12px auto 0;max-width:1240px;width:calc(100% - 24px);padding:.6rem .9rem;display:flex;align-items:center;gap:1rem">
    <a href="index.html" style="display:flex;align-items:center;gap:.55rem;font-weight:800;letter-spacing:-.01em">
      <span style="width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--primary),var(--primary-2));display:grid;place-items:center;color:#fff;box-shadow:var(--shadow-pop)"><i data-lucide="compass" style="width:18px;height:18px"></i></span>
      <span style="font-size:1.15rem">GuideGo</span>
    </a>
    <nav class="hidden md:flex" style="gap:1.25rem;margin-left:1rem">
      ${links.map(([h,t,k])=>`<a href="${h}" class="nav-link ${active===k?'active':''}">${t}</a>`).join('')}
    </nav>
    <div style="flex:1"></div>
    <div class="theme-toggle" title="Toggle theme" onclick="GG_toggleTheme()"><div class="dot"></div></div>
    <div class="hidden md:flex" style="gap:.4rem;align-items:center">${userBtn}</div>
    <button class="md:hidden btn btn-ghost btn-sm" onclick="GG.openMobileNav()" aria-label="Menu"><i data-lucide="menu" style="width:18px;height:18px"></i></button>
  </header>
  <div class="mobile-nav" id="ggMobileNav" onclick="if(event.target.id==='ggMobileNav')GG.closeMobileNav()">
    <div class="sheet">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <strong>Menu</strong>
        <button class="btn btn-ghost btn-sm" onclick="GG.closeMobileNav()"><i data-lucide="x" style="width:16px;height:16px"></i></button>
      </div>
      ${links.map(([h,t])=>`<a href="${h}" class="btn btn-ghost" style="justify-content:flex-start">${t}</a>`).join('')}
      <div class="divider"></div>
      ${user
        ? `<a class="btn btn-primary" href="${user.role==='guide'?'guide-dashboard.html':'dashboard.html'}">Dashboard</a><button class="btn btn-ghost" onclick="GG.signOut()">Sign out</button>`
        : `<a class="btn btn-ghost" href="login.html">Login</a><a class="btn btn-primary" href="signup.html">Sign up</a>`}
    </div>
  </div>`;
};
GG.openMobileNav = () => document.getElementById('ggMobileNav')?.classList.add('open');
GG.closeMobileNav = () => document.getElementById('ggMobileNav')?.classList.remove('open');

GG.renderFooter = () => `
<footer style="margin-top:80px;padding:60px 0 30px;border-top:1px solid var(--border);background:var(--bg-2)">
  <div class="container-x" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:30px">
    <div>
      <div style="display:flex;align-items:center;gap:.5rem;font-weight:800;font-size:1.1rem;margin-bottom:.6rem">
        <span style="width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,var(--primary),var(--primary-2));display:grid;place-items:center;color:#fff"><i data-lucide="compass" style="width:16px;height:16px"></i></span> GuideGo
      </div>
      <p style="color:var(--text-soft);font-size:.88rem;line-height:1.55">India's trusted marketplace for verified local travel guides. Explore. Discover. Belong.</p>
    </div>
    <div><h4 style="font-weight:700;margin-bottom:.7rem">Explore</h4>
      <a href="destinations.html" class="nav-link" style="display:block">Destinations</a>
      <a href="guides.html" class="nav-link" style="display:block">Guides</a>
      <a href="destinations.html#groups" class="nav-link" style="display:block">Group Tours</a>
    </div>
    <div><h4 style="font-weight:700;margin-bottom:.7rem">Company</h4>
      <a href="#" class="nav-link" style="display:block">About</a>
      <a href="#" class="nav-link" style="display:block">Careers</a>
      <a href="#" class="nav-link" style="display:block">Press</a>
    </div>
    <div><h4 style="font-weight:700;margin-bottom:.7rem">Support</h4>
      <a href="#" class="nav-link" style="display:block">Help Center</a>
      <a href="#" class="nav-link" style="display:block">Safety</a>
      <a href="#" class="nav-link" style="display:block">Cancellation</a>
    </div>
    <div><h4 style="font-weight:700;margin-bottom:.7rem">Get the app</h4>
      <div style="display:flex;flex-direction:column;gap:.5rem">
        <button class="btn btn-neo btn-sm"><i data-lucide="apple" style="width:14px;height:14px"></i> App Store</button>
        <button class="btn btn-neo btn-sm"><i data-lucide="play" style="width:14px;height:14px"></i> Google Play</button>
      </div>
    </div>
  </div>
  <div class="container-x" style="margin-top:30px;padding-top:20px;border-top:1px solid var(--border);display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;color:var(--text-soft);font-size:.82rem">
    <div>© 2026 GuideGo Travel Pvt. Ltd. Made in India 🇮🇳</div>
    <div style="display:flex;gap:14px"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></div>
  </div>
</footer>`;

// Boot
GG.boot = (active) => {
  document.body.insertAdjacentHTML('afterbegin', GG.renderNav(active));
  document.body.insertAdjacentHTML('beforeend', GG.renderFooter());
  // Chatbot
  if (window.GG_initChatbot) GG_initChatbot();
  // Icons
  if (window.lucide) lucide.createIcons();
  // AOS
  if (window.AOS) AOS.init({ once:true, duration:700, easing:'ease-out-cubic' });
  // GSAP reveals
  if (window.gsap){
    gsap.utils.toArray('[data-reveal]').forEach((el,i)=>{
      gsap.to(el,{ opacity:1, y:0, duration:.8, delay:(i%6)*0.04, ease:'power3.out', scrollTrigger: el.dataset.revealOnce ? null : { trigger: el, start:'top 88%' } });
    });
  }
};
