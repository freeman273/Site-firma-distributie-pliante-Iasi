document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       HAMBURGER MENU
       - click toggle clasa .open pe icon (animatie X in CSS)
       - click toggle clasa .active pe meniu (arata/ascunde)
       - meniul se inchide si la click in afara lui
       - meniul se inchide si la click pe un link din el
       ============================================================ */
    const hamburger = document.getElementById('hamburger');
    const menuOptions = document.getElementById('menuOptions');

    if (hamburger && menuOptions) {

        /* Toggle la click pe hamburger */
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');     /* declanseaza animatia X */
            menuOptions.classList.toggle('active'); /* arata sau ascunde meniul */
        });

        /* Inchide meniul daca se face click in alta parte a paginii */
        document.addEventListener('click', (event) => {
            const clickInAfara =
                !hamburger.contains(event.target) &&
                !menuOptions.contains(event.target);

            if (clickInAfara) {
                hamburger.classList.remove('open');
                menuOptions.classList.remove('active');
            }
        });

        /* Inchide meniul dupa ce utilizatorul apasa pe un link */
        menuOptions.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                menuOptions.classList.remove('active');
            });
        });

        /* Accesibilitate: permite deschiderea cu tastele Enter sau Spatiu */
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
            }
        });
    }


    /* ============================================================
       TYPING EFFECT - efect de scriere automata in sectiunea hero
       FIX: scroll-arrow este readaugat dupa resetarea innerHTML,
            altfel era sters odata cu continutul hero-ului.
       ============================================================ */
    const hero = document.querySelector('.hero');

    if (hero) {
        const lines = [
            "Vrei să îți promovezi afacerea?",
            "Noi îți oferim soluția!"
        ];

        hero.innerHTML = ''; /* goleste hero-ul inainte de a rescrie textul */

        lines.forEach((text, index) => {
            const h2 = document.createElement('h2');
            h2.classList.add('blue-text');
            hero.appendChild(h2);

            /* Fiecare linie incepe dupa ce linia anterioara s-a terminat */
            setTimeout(() => {
                const cursor = document.createElement('span');
                cursor.classList.add('cursor');
                cursor.textContent = '|';
                h2.appendChild(cursor);

                let i = 0;
                const interval = setInterval(() => {
                    h2.insertBefore(document.createTextNode(text[i]), cursor);
                    i++;

                    /* Opreste intervalul si sterge cursorul la final */
                    if (i >= text.length) {
                        clearInterval(interval);
                        cursor.remove();
                    }
                }, 60); /* viteza de scriere: 60ms per litera */

            }, index * 2200); /* intarziere intre linii: 2200ms */
        });

        /* FIX: readauga sageata animata dupa ce hero-ul a fost resetat */
        const scrollArrow = document.createElement('div');
        scrollArrow.classList.add('scroll-arrow');
        scrollArrow.setAttribute('aria-hidden', 'true');
        scrollArrow.innerHTML = '<span></span><span></span><span></span>';
        hero.appendChild(scrollArrow);

        /* Click pe sageata duce la prima sectiune */
        scrollArrow.addEventListener('click', () => {
            const primasectiune = document.querySelector('.despre-section');
            if (primasectiune) primasectiune.scrollIntoView({ behavior: 'smooth' });
        });
    }


    
    const ascunseLaScroll = document.querySelectorAll('.hidden-scroll');

    const observator = new IntersectionObserver((elemente) => {
        elemente.forEach((element) => {
            if (element.isIntersecting) {
                element.target.classList.add('show'); 
            }
        });
    }, {
        threshold: 0.05 
    });

    ascunseLaScroll.forEach((sectiune) => observator.observe(sectiune));

});