(() => {
    const themeClasses = ['theme-1', 'theme-2', 'theme-3', 'theme-4', 'theme-5'];
    const themePalette = [
        { square: '#303E8C', arc: 'rgba(48, 62, 140, 0.92)', particleHue: 228 },
        { square: '#3F61A6', arc: 'rgba(63, 97, 166, 0.92)', particleHue: 215 },
        { square: '#D5E7F2', arc: 'rgba(33, 86, 122, 0.92)', particleHue: 200 },
        { square: '#8AB5BF', arc: 'rgba(28, 98, 112, 0.92)', particleHue: 185 },
        { square: '#F2E5BD', arc: 'rgba(161, 123, 37, 0.92)', particleHue: 42 }
    ];
    let themeIndex = 0;
    const canvas = document.getElementById("miCanvas");
    const ctx = canvas.getContext("2d");
    const hud = document.createElement('div');
    hud.className = 'fps-hud';
    hud.textContent = 'FPS: 0';
    document.body.appendChild(hud);
    //estado privado (closuer)
    let x = 100;
    let y = 100;
    let velocidad = 3;
    let animacionActiva = false;
    let lastFrameTime = 0;
    let fps = 0;
    let fpsAccumulator = 0;
    let fpsFrames = 0;
    // partículas y arco giratorio
    const particles = [];
    const PARTICLE_COUNT = 60;
    let arcAngle = 0;
    const TAU = Math.PI * 2;
    let lastThemeAngle = 0;
    let squareColor = themePalette[themeIndex].square;
    let arcColor = themePalette[themeIndex].arc;
    // ajuste para pantalla completa y alta resolución
    const resizeCanvas = () => {
        const dpr = window.devicePixelRatio || 1;
        // tamaño en pixeles reales
        canvas.width = Math.max(1, Math.floor(window.innerWidth * dpr));
        canvas.height = Math.max(1, Math.floor(window.innerHeight * dpr));
        // tamaño CSS (lo que ve el usuario)
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        // escalar el contexto para tener en cuenta devicePixelRatio
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        // si la posición estaba fuera de la nueva área, limitarla
        x = Math.min(x, window.innerWidth - 50);
        y = Math.min(y, window.innerHeight - 50);
    };

    //funcion de cambio de fondo por click en pantalla 
    //funcion canva tome toda la pantalla 

    // ===== HANDLERS (arrow functions) =====
    const applyTheme = (index) => {
        const body = document.body;
        body.classList.remove(...themeClasses);
        themeIndex = index % themeClasses.length;
        body.classList.add(themeClasses[themeIndex]);

        const currentTheme = themePalette[themeIndex];
        squareColor = currentTheme.square;
        arcColor = currentTheme.arc;

        particles.forEach((particle, particleIndex) => {
            particle.h = currentTheme.particleHue + ((particleIndex % 7) * 3);
        });
    };

    const handleMouseClick = (e) => {
        const body = document.body;
        body.classList.remove(...themeClasses);
        themeIndex = (themeIndex + 1) % themeClasses.length;
        applyTheme(themeIndex);
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        // actualizar estado privado (closure) y redibujar
        x = clickX;
        y = clickY;
        dibujar();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') y -= velocidad;
        if (e.key === 'ArrowDown') y += velocidad;
    };

    // ===== FUNCIONES PRIVADAS =====
    function dibujar() {
        // limpiar en coordenadas CSS (ctx está escalado por DPR)
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // fondo sutil con gradiente radial
        const g = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);
        g.addColorStop(0, 'rgba(255,255,255,0.03)');
        g.addColorStop(1, 'rgba(0,0,0,0.03)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        // dibujar partículas
        particles.forEach(p => {
            ctx.beginPath();
            ctx.fillStyle = `hsla(${p.h},70%,60%,${p.a})`;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        });

        // arco giratorio en el centro
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.22;
        ctx.lineWidth = 6;
        ctx.strokeStyle = 'rgba(63,96,165,0.9)';
        ctx.beginPath();
        ctx.arc(cx, cy, radius, arcAngle, arcAngle + Math.PI * 1.25);
        ctx.stroke();
        ctx.closePath();

        // dibujar el cuadrado principal
        ctx.fillStyle = squareColor;
        ctx.fillRect(x, y, 50, 50);
    }
    function animar(now = 0) {
        const dt = Math.min((now - lastFrameTime) / 1000, 0.05);
        lastFrameTime = now;

        // actualizar partículas
        particles.forEach(p => {
            p.x += p.vx * (dt * 60);
            p.y += p.vy * (dt * 60);
            // rebote en bordes
            if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
            if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
            // ligera oscilación en tamaño
            p.r = Math.max(0.8, p.baseR + Math.sin((now * 0.002) + p.phase) * 0.6);
        });
        // avanzar ángulo del arco
        arcAngle += 0.01 * (dt * 60);
        while (arcAngle >= TAU) {
            arcAngle -= TAU;
            applyTheme(themeIndex + 1);
        }

        if (lastThemeAngle !== themeIndex) {
            lastThemeAngle = themeIndex;
        }

        fpsAccumulator += dt;
        fpsFrames += 1;
        if (fpsAccumulator >= 0.5) {
            fps = Math.round(fpsFrames / fpsAccumulator);
            hud.textContent = `FPS: ${fps}`;
            fpsAccumulator = 0;
            fpsFrames = 0;
        }

        dibujar();
        if (animacionActiva) {
            requestAnimationFrame(animar);
        }
    }
    // iniciarlizador 
    canvas.addEventListener("click", handleMouseClick);
    document.addEventListener("keydown", handleKeyDown);
    // redimensionar al cambiar tamaño de ventana
    const handleResize = () => {
        resizeCanvas();
        dibujar();
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('beforeunload', () => {
        window.removeEventListener('resize', handleResize);
        canvas.removeEventListener('click', handleMouseClick);
        document.removeEventListener('keydown', handleKeyDown);
    });
    // tamaño inicial: ajustar canvas al viewport y centrar el cuadrado
    resizeCanvas();
    applyTheme(themeIndex);
    x = Math.floor(window.innerWidth / 2 - 25);
    y = Math.floor(window.innerHeight / 2 - 25);
    // inicializar partículas
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const px = Math.random() * window.innerWidth;
        const py = Math.random() * window.innerHeight;
        const speed = 0.2 + Math.random() * 1.2;
        const angle = Math.random() * Math.PI * 2;
        particles.push({
            x: px,
            y: py,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            r: 1 + Math.random() * 3,
            baseR: 1 + Math.random() * 3,
            phase: Math.random() * Math.PI * 2,
            h: Math.floor(themePalette[themeIndex].particleHue + Math.random() * 25),
            a: 0.7
        });
    }
    animacionActiva = true;
    animar();
})()