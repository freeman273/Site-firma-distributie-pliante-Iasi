document.addEventListener('DOMContentLoaded', () => {
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

      
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
            }
        });
    }
    const hero = document.querySelector('.hero');

    if (hero) {
        const lines = [
            "Vrei să îți promovezi afacerea?",
            "Noi îți oferim soluția!"
        ];

        hero.innerHTML = ''; 

        lines.forEach((text, index) => {
            const h2 = document.createElement('h2');
            h2.classList.add('blue-text');
            hero.appendChild(h2);
            setTimeout(() => {
                const cursor = document.createElement('span');
                cursor.classList.add('cursor');
                cursor.textContent = '|';
                h2.appendChild(cursor);

                let i = 0;
                const interval = setInterval(() => {
                    h2.insertBefore(document.createTextNode(text[i]), cursor);
                    i++;
                    if (i >= text.length) {
                        clearInterval(interval);
                        cursor.remove();
                    }
                }, 60); 

            }, index * 2200); 
        });
        const scrollArrow = document.createElement('div');
        scrollArrow.classList.add('scroll-arrow');
        scrollArrow.setAttribute('aria-hidden', 'true');
        scrollArrow.innerHTML = '<span></span><span></span><span></span>';
        hero.appendChild(scrollArrow);
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
