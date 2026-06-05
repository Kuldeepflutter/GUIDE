// Theme management
(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem('gg-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (saved === 'dark') root.classList.add('dark');
  window.GG_setTheme = function(mode){
    if (mode === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
    localStorage.setItem('gg-theme', mode);
  };
  window.GG_toggleTheme = function(){
    const isDark = root.classList.contains('dark');
    GG_setTheme(isDark ? 'light' : 'dark');
  };
})();
