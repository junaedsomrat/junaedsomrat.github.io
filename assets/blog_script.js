document.addEventListener('DOMContentLoaded', function(){
 const bar=document.getElementById('progress');
 const upd=()=>{ const h=document.documentElement; bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100+'%'; };
 window.addEventListener('scroll', upd, {passive:true}); upd();
 document.getElementById('printBtn').onclick=function(){ window.print(); };
 document.querySelectorAll('#postContent img').forEach(img=>{
   if(img.parentElement.classList.contains('pa-img-wrap')) return;
   if(img.closest('.thumb-wrap')) return;
   const credit=img.getAttribute('data-credit')||''; const wrap=document.createElement('div'); wrap.className='pa-img-wrap';
   img.parentNode.insertBefore(wrap, img); wrap.appendChild(img);
   if(credit){ const c=document.createElement('div'); c.className='pa-img-credit'; c.textContent=credit; wrap.appendChild(c); }
 });
});
fetch('https://junaedsomrat.github.io/assets/footer-about.json')
    .then(response => response.json())
    .then(data => {
      document.querySelector('.footer-about').textContent = data.footerAbout;
    });
      // NOTICE LOGIC - OVER NAV + LINE
      const noticeBar = document.getElementById('noticeBar');
      const noticeText = document.getElementById('noticeText');
      const noticeLine = document.getElementById('noticeLine');

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
    });

document.getElementById('year').textContent = new Date().getFullYear();
