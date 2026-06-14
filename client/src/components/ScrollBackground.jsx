import { useEffect, useRef } from 'react';

export default function ScrollBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    let animId;
    let mouse = { x: -9999, y: -9999 };

    const setSize = () => {
      W = window.innerWidth;
      H = document.documentElement.scrollHeight;
      canvas.width  = W;
      canvas.height = H;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
    };
    setSize();

    // Re-measure after content settles (images, accordions, animations
    // can change document height after the initial mount).
    const resizeObserver = new ResizeObserver(() => {
      const newH = document.documentElement.scrollHeight;
      const newW = window.innerWidth;
      if (newH !== H || newW !== W) {
        setSize();
        clusterCentres.forEach(c => { c.x = Math.random()*W; c.y = Math.random()*H; });
        [...distantStars, ...midStars, ...closeStars].forEach(p => {
          const pos = clusteredPos(0.3);
          p.x = pos.x; p.y = pos.y;
        });
      }
    });
    resizeObserver.observe(document.body);

    const ATMOSPHERES = [
      { bg:[8,4,28]  }, { bg:[3,8,28]  }, { bg:[14,4,28] }, { bg:[2,14,10] },
      { bg:[2,6,28]  }, { bg:[2,18,20] }, { bg:[3,3,20]  }, { bg:[18,3,16] },
      { bg:[2,16,14] }, { bg:[8,4,28]  },
    ];
    const ambient = { r:8, g:4, b:28 };

    const clusterCentres = Array.from({ length: 12 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
    }));
    const clusteredPos = (str=0.4) => {
      if (Math.random() < str) {
        const c = clusterCentres[Math.floor(Math.random()*clusterCentres.length)];
        const sp = Math.min(W,H)*0.12;
        return {
          x: Math.max(0,Math.min(W, c.x+(Math.random()-0.5)*sp*2)),
          y: Math.max(0,Math.min(H, c.y+(Math.random()-0.5)*sp*2)),
        };
      }
      return { x:Math.random()*W, y:Math.random()*H };
    };
    const makeStars = (count,rMin,rMax,opMin,opMax,sMin,sMax,drift,cluster) =>
      Array.from({ length:count }, () => {
        const p = clusteredPos(cluster);
        return { x:p.x, y:p.y,
          vx:(Math.random()-0.5)*drift, vy:(Math.random()-0.5)*drift,
          r:Math.random()*(rMax-rMin)+rMin,
          opacity:Math.random()*(opMax-opMin)+opMin,
          phase:Math.random()*Math.PI*2,
          speed:Math.random()*(sMax-sMin)+sMin,
        };
      });

    const distantStars = makeStars(600,0.3,0.7, 0.15,0.55, 0.15,0.4,  0.0,  0.45);
    const midStars     = makeStars(180,0.5,1.1, 0.30,0.65, 0.12,0.35, 0.04, 0.3);
    const closeStars   = makeStars(60, 0.9,1.6, 0.50,0.85, 0.10,0.28, 0.08, 0.2);
    const MOUSE_DIST=160, MOUSE_FORCE=0.05, SPEED_CAP=1.5;

    const onMouse = e => { mouse.x=e.clientX; mouse.y=e.clientY+window.scrollY; };
    window.addEventListener('mousemove', onMouse);
    const onResize = () => {
      setSize();
      clusterCentres.forEach(c=>{c.x=Math.random()*W;c.y=Math.random()*H;});
      [...distantStars,...midStars,...closeStars].forEach(p=>{const pos=clusteredPos(0.3);p.x=pos.x;p.y=pos.y;});
    };
    window.addEventListener('resize', onResize);

    let t = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      const pageH = document.documentElement.scrollHeight - window.innerHeight;
      const sp = pageH > 0 ? Math.min(window.scrollY/pageH,1) : 0;
      const raw = sp*(ATMOSPHERES.length-1);
      const ai = Math.min(Math.floor(raw), ATMOSPHERES.length-2);
      const af = raw-ai;
      const atA=ATMOSPHERES[ai], atB=ATMOSPHERES[ai+1];
      ambient.r += (atA.bg[0]+(atB.bg[0]-atA.bg[0])*af - ambient.r)*0.03;
      ambient.g += (atA.bg[1]+(atB.bg[1]-atA.bg[1])*af - ambient.g)*0.03;
      ambient.b += (atA.bg[2]+(atB.bg[2]-atA.bg[2])*af - ambient.b)*0.03;

      const vig = ctx.createRadialGradient(W/2,H*0.4,0, W/2,H*0.4, Math.max(W,H)*0.75);
      vig.addColorStop(0,'rgba(0,0,0,0)');
      vig.addColorStop(1,'rgba(0,0,0,0.55)');
      ctx.fillStyle=vig; ctx.fillRect(0,0,W,H);

      const drawStar = (s,col) => {
        const tw = 0.85+0.15*Math.abs(Math.sin(t*s.speed+s.phase));
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(${col},${s.opacity*tw})`; ctx.fill();
      };

      distantStars.forEach(s=>drawStar(s,'220,225,255'));
      midStars.forEach(s=>{
        s.x+=s.vx; s.y+=s.vy;
        if(s.x<0)s.x=W; if(s.x>W)s.x=0;
        if(s.y<0)s.y=H; if(s.y>H)s.y=0;
        drawStar(s,'230,235,255');
      });
      closeStars.forEach(s=>{
        const dx=mouse.x-s.x, dy=mouse.y-s.y, dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<MOUSE_DIST&&dist>0){const str=(1-dist/MOUSE_DIST)*MOUSE_FORCE;s.vx+=(dx/dist)*str;s.vy+=(dy/dist)*str;}
        const spd=Math.sqrt(s.vx*s.vx+s.vy*s.vy);
        if(spd>SPEED_CAP){s.vx=(s.vx/spd)*SPEED_CAP;s.vy=(s.vy/spd)*SPEED_CAP;}
        s.vx*=0.97; s.vy*=0.97;
        s.x+=s.vx; s.y+=s.vy;
        if(s.x<0)s.x=W; if(s.x>W)s.x=0;
        if(s.y<0)s.y=H; if(s.y>H)s.y=0;
        drawStar(s,'245,248,255');
      });
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}