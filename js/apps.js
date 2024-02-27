$(document).ready(function() {
    // Ripples Effect
    $('#profile_ripple').ripples({
        resolution: 512,
        dropRadius: 10
    });

    // Progress Bars
    const bars = document.querySelectorAll('.progress_bar');
    bars.forEach(function(bar) {
        let percentage = bar.dataset.percentage;
        let tooltip = bar.children[0];
        tooltip.innerText = percentage + '%';
        bar.style.width = percentage + '%';
    });

    // Counters
    const counters = document.querySelectorAll('.counter');
    function runCounter() {
        counters.forEach(counter => {
            counter.innerText = 0;
            let target = +counter.dataset.count;
            let step = target / 100;
            let countIt = function() {
                let displayedCount = +counter.innerText;
                if (displayedCount < target) {
                    counter.innerText = Math.ceil(displayedCount + step);
                    setTimeout(countIt, 90);
                } else {
                    counter.innerText = target;
                }
            };
            countIt();
        });
    }
    runCounter();

    // Intersection Observer for Counters
    let done = 0;
    const sectionObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && done !== 1) {
            done = 1;
            runCounter();
        }
    }, { rootMargin: '0px 0px -200px 0px' });

    // Isotope Filtering
    var $wrapper = $('.portfolio_wrapper');
    $wrapper.isotope({
        filter: '*',
        layoutMode: 'masonry',
        animationOptions: {
            duration: 750,
            easing: 'linear'
        }
    });

    let links = document.querySelectorAll('.tabs a');
    links.forEach(link => {
        let selector = link.dataset.filter;
        link.addEventListener('click', function(e) {
            e.preventDefault();
            $wrapper.isotope({
                filter: selector,
                layoutMode: 'masonry',
                animationOptions: {
                    duration: 750,
                    easing: 'linear'
                }
            });
            links.forEach(link => {
                link.classList.remove('active')
            });
            e.target.classList.add('active');
        });
    });

    // Magnify Popup for Images
    $('.magnify').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enable: true
        }
    });

    // Slick Slider
    $('.slider').slick({
        arrows: false,
        autoplay: true
    });
});
