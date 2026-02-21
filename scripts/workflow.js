 // --- DOT NAVIGATION LOGIC ---
        const sections = document.querySelectorAll('.card-wrapper');
        const navDots = document.querySelectorAll('.dot-nav a');
        const slider = document.getElementById('cardSlider');

        const observerOptions = {
            root: slider,
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navDots.forEach((dot) => {
                        dot.classList.toggle('active', dot.getAttribute('href') === `#${entry.target.id}`);
                    });
                }
            });
        }, observerOptions);

        sections.forEach((section) => observer.observe(section));

        // Smooth click-to-scroll for dots
        navDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = dot.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            });
        });

        // --- EXISTING FLOW LINE LOGIC ---
        function drawFlowLine() {
            const path = document.getElementById('flow-path');
            const svg = document.getElementById('flow-svg');
            const nodes = document.querySelectorAll('.node');
            const svgRect = svg.getBoundingClientRect();

            if (nodes.length < 2) return;

            let d = "";
            nodes.forEach((node, index) => {
                const rect = node.getBoundingClientRect();
                const x = rect.left - svgRect.left + rect.width / 2;
                const y = rect.top - svgRect.top + rect.height / 2;

                if (index === 0) {
                    d += `M ${x} ${y}`;
                } else {
                    const prevRect = nodes[index - 1].getBoundingClientRect();
                    const prevX = prevRect.left - svgRect.left + prevRect.width / 2;
                    const prevY = prevRect.top - svgRect.top + prevRect.height / 2;
                    const isVertical = Math.abs(x - prevX) < 50; 
                    
                    if (isVertical) {
                        const cpY = prevY + (y - prevY) / 2;
                        d += ` C ${prevX} ${cpY}, ${x} ${cpY}, ${x} ${y}`;
                    } else {
                        const cpX = prevX + (x - prevX) / 2;
                        d += ` C ${cpX} ${prevY}, ${cpX} ${y}, ${x} ${y}`;
                    }
                }
            });
            path.setAttribute('d', d);
        }

        window.addEventListener('resize', drawFlowLine);
        window.addEventListener('load', drawFlowLine);
        drawFlowLine();