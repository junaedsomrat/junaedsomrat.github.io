document.addEventListener('DOMContentLoaded', function(){ 
  const bar = document.getElementById('progress'); 
  const upd = () => { 
    const h = document.documentElement; 
    bar.style.width = (h.scrollTop/(h.scrollHeight-h.clientHeight))*100+'%'; 
  }; 
  window.addEventListener('scroll', upd, {passive:true}); 
  upd(); 

  document.getElementById('printBtn').onclick = function(){ 
    window.print(); 
  }; 

  document.querySelectorAll('#postContent img').forEach(img => { 
    if(img.parentElement.classList.contains('pa-img-wrap')) return; 
    if(img.closest('.thumb-wrap')) return; 
    const credit = img.getAttribute('data-credit')||''; 
    const wrap = document.createElement('div'); 
    wrap.className = 'pa-img-wrap'; 
    img.parentNode.insertBefore(wrap, img); 
    wrap.appendChild(img); 
    if(credit){ 
      const c = document.createElement('div'); 
      c.className = 'pa-img-credit'; 
      c.textContent = credit; 
      wrap.appendChild(c); 
    } 
  }); 

  // footer about
  fetch('https://junaedsomrat.github.io/assets/footer-about.json') 
    .then(response => response.json()) 
    .then(data => { 
      const el = document.querySelector('.footer-about'); 
      if(el && data.footerAbout) el.textContent = data.footerAbout; 
    }) 
    .catch(()=>{});

  // footer links - NEW ADDED
  fetch('https://junaedsomrat.github.io/assets/footer-links.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(data => {
      const container = document.querySelector('.footer-links');
      if(!container || !data.links) return;
      container.innerHTML = '';
      data.links.forEach(item => {
        if(!item.label || !item.href) return;
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.label;
        container.appendChild(a);
      });
    }).catch(()=>{});

  // NOTICE LOGIC - OVER NAV + LINE 
  const noticeBar = document.getElementById('noticeBar'); 
  const noticeText = document.getElementById('noticeText'); 
  const noticeLine = document.getElementById('noticeLine'); 
  if(noticeBar && noticeText && noticeLine){ 
    fetch('https://junaedsomrat.github.io/assets/notice.json', { cache: 'no-store' }) 
      .then(r => r.json()) 
      .then(data => { 
        if(!data || (data.enabled !== 1 && data.enabled !== '1' && data.enabled !== true)) return; 
        const text = (data.text || '').trim(); 
        if(!text) return; 
        noticeText.textContent = text; 
        noticeBar.classList.add('show'); 
        noticeLine.classList.add('run'); 
        setTimeout(() => { 
          noticeBar.classList.remove('show'); 
          noticeBar.classList.add('hide'); 
          setTimeout(() => { 
            noticeBar.classList.remove('hide'); 
            noticeLine.classList.remove('run'); 
          }, 400); 
        }, 5000); 
      }) 
      .catch(()=>{}); 
  } 

  document.getElementById('year').textContent = new Date().getFullYear(); 
});


// Cloudflare Web Analytics
if (!document.querySelector('script[src="https://static.cloudflareinsights.com/beacon.min.js"]')) {
    const cfScript = document.createElement('script');

    cfScript.type = 'module';
    cfScript.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    cfScript.setAttribute('data-cf-beacon', JSON.stringify({
        token: '540a7ffdd5cc446b900995856b82b95d'
    }));

    document.head.appendChild(cfScript);
}
// End Cloudflare Web Analytics
