 const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let width, height, cx, cy;
    let time = 0;
    const strands = 22; 

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        cx = width / 2;
        cy = height / 2;
    }

    window.addEventListener("resize", resize);
    resize();

    function drawInfinityStrand(index, total) {
        const offset = index * 0.15;
        const hueShift = index * 2;
        const spread = index * 12; 
        const baseScale = Math.min(width, height) / 2.4; 
        
        ctx.beginPath();
        for (let t = 0; t <= Math.PI * 2; t += 0.03) {
            let x = Math.sin(t);
            let y = Math.sin(t) * Math.cos(t);
            let z = Math.cos(t); 

            const rotSpeed = time * 0.4;
            const rotX = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
            const rotZ = x * Math.sin(rotSpeed) + z * Math.cos(rotSpeed);
            
            const perspective = 1 / (1.8 - (rotZ * 0.6)); 
            const finalScale = (baseScale + spread);

            const screenX = cx + (rotX * finalScale * perspective);
            const screenY = cy + (y * finalScale * perspective);

            if (t === 0) ctx.moveTo(screenX, screenY);
            else ctx.lineTo(screenX, screenY);
        }

        const alpha = (0.1 + (index / total) * 0.5) * (Math.sin(time + index * 0.5) * 0.2 + 0.6);
        const gradient = ctx.createLinearGradient(cx - baseScale, cy, cx + baseScale, cy);
        gradient.addColorStop(0, `hsla(${200 + hueShift}, 100%, 50%, ${alpha})`);
        gradient.addColorStop(0.5, `hsla(${185 + hueShift}, 100%, 60%, ${alpha * 1.5})`);
        gradient.addColorStop(1, `hsla(${215 + hueShift}, 100%, 45%, ${alpha})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.6 + (index * 0.3);
        ctx.lineCap = "round";
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(0, 150, 255, ${alpha * 0.4})`;
        ctx.stroke();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);
        ctx.shadowBlur = 0;

        for (let i = 0; i < strands; i++) {
            drawInfinityStrand(i, strands);
        }

        time += 0.012;
        requestAnimationFrame(animate);
    }

    animate();