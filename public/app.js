const $=id=>document.getElementById(id),api='/.netlify/functions/calendar';let next=null,offset=0,unlocked=-1;const opened=new Set(JSON.parse(localStorage.getItem('julie-opened')||'[]'));const dialog=$('letter');$('close').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});async function get(url){const r=await fetch(url,{cache:'no-store'});const data=await r.json();if(!r.ok)throw Error(data.error||'Kunne ikke hente kalenderen');return data}
const doorOrder = [
  7, 19, 3, 14, 22, 5,
  12, 1, 17, 24, 9, 15,
  4, 21, 11, 6, 18, 2,
  23, 13, 16, 8, 20, 10
];

function render() {
  const doors = $('doors');
  doors.replaceChildren();

  for (const day of doorOrder) {
    const button = document.createElement('button');
    button.className = opened.has(day) ? 'door opened' : 'door';
    button.dataset.day = day;
    button.disabled = day > unlocked;
    button.setAttribute('aria-label', day + '. december' + (button.disabled ? ', låst' : ''));

    const status = document.createElement('small');
    status.textContent = button.disabled ? '🔒' : opened.has(day) ? '♥' : 'Åbn ♡';
    button.append(String(day), status);
    button.onclick = () => openDoor(day, button);
    doors.append(button);
  }
}

async function openDoor(day, button) {
  try {
    const { title, message, media, gift } = await get(api + '?day=' + day);
    $('date').textContent = day + '. DECEMBER';
    $('title').textContent = title;
    $('message').textContent = message;

    $('gift').hidden = !gift;
    $('gift-title').textContent = gift?.title ?? '';
    $('gift-description').textContent = gift?.description ?? '';

    const mediaContainer = $('media');
    mediaContainer.replaceChildren();
    if (media) {
      const tag = { image: 'img', video: 'video', audio: 'audio', link: 'a' }[media.type];
      if (tag) {
        const element = document.createElement(tag);
        if (media.type === 'link') {
          element.href = media.url;
          element.textContent = 'Åbn sangen ♡';
          element.target = '_blank';
          element.rel = 'noopener noreferrer';
        } else {
          element.src = media.url;
          element.controls = true;
          element.alt = 'Et minde om os';
        }
        mediaContainer.append(element);
      }
    }

    opened.add(day);
    localStorage.setItem('julie-opened', JSON.stringify([...opened]));
    button.classList.add('opened');
    button.querySelector('small').textContent = '♥';
    dialog.showModal();
  } catch (error) {
    alert(error.message);
  }
}

async function refresh(){try{const d=await get(api);offset=Date.parse(d.now)-Date.now();next=d.next?Date.parse(d.next):null;if(unlocked!==d.unlocked){unlocked=d.unlocked;render()}$('status').textContent=next?'Tid til næste låge':'Glædelig jul, min Mulle ♥';tick()}catch(e){$('status').textContent='Kunne ikke hente kalenderen. Prøv igen om lidt.'}}function tick(){if(next===null){$('timer').textContent=unlocked===24?'Alle låger er åbne':'–';return}let s=Math.max(0,Math.ceil((next-Date.now()-offset)/1000));const d=Math.floor(s/86400);s%=86400;const h=Math.floor(s/3600),m=Math.floor(s%3600/60);$('timer').textContent=`${d}d ${String(h).padStart(2,'0')}t ${String(m).padStart(2,'0')}m ${String(s%60).padStart(2,'0')}s`;}for(let i=0;i<45;i++){const p=document.createElement('span');p.className='particle'+(i%4===0?' heart':'');p.textContent=i%4===0?'♥':'❄';p.style.left=Math.random()*100+'%';p.style.fontSize=8+Math.random()*15+'px';p.style.animationDuration=8+Math.random()*16+'s';p.style.animationDelay=-Math.random()*20+'s';$('particles').append(p)}render();refresh();setInterval(tick,1000);setInterval(refresh,15000);
