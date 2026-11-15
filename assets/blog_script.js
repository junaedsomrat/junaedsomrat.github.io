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

document.getElementById('year').textContent = new Date().getFullYear();
