(function() {
    const megaMenuToggles = document.querySelectorAll('.nav-item.dropdown') || [];
    const cssVarBreakPoint = getComputedStyle(document.documentElement).getPropertyValue('--theme-breakpoint-lg') || '992px';
    const breakpointLG = parseInt(cssVarBreakPoint, 10);
    

    function showMenu(event) {
        const dropdown = event.target.querySelector('.dropdown-menu');
        const menuToggle = event.target.querySelector('.dropdown-toggle');

        if (window.innerWidth < breakpointLG) {
            return;
        }

        if (dropdown && menuToggle) {
            dropdown.classList.add('show');
            menuToggle.setAttribute('aria-expanded', 'true');
            menuToggle.classList.add('show');
        }
    }

    function hideMenu(event) {
        const dropdown = event.target.querySelector('.dropdown-menu');
        const menuToggle = event.target.querySelector('.dropdown-toggle');

        if (window.innerWidth < breakpointLG) {
            return;
        }        

        if (dropdown && menuToggle) {
            dropdown.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.classList.remove('show');
        }
    }

    megaMenuToggles.forEach((toggle) => {
        toggle.addEventListener('mouseenter', (event) => {
            showMenu(event);
        });
        toggle.addEventListener('mouseleave', (event) => {
            hideMenu(event);
        });
    });

})();