$(function() {

    /***********
     * Buttons *
     ***********/

    // Add a registration button back in at the top of the page
    // and this will click it
    $('a[href="#register"]').click(function(e) {
        e.preventDefault();
        $('nav').removeClass('open');
        $('html, body').animate({'scrollTop': 0}, 500, function() {
            $('#register-button')[0].click();
        });
    });

    var $headerMeasure = $('#measure-header'),
        mobileRespond = function() {
            /* mobile only */
            $('.page:first-child').css({'min-height': $(window).height() * 2});
            $('.header.fixed').removeClass('fixed');
        };

    $('.scroll').click(function(e) {
        e.preventDefault();
        $('nav').removeClass('open');
        var $dest = $($(this).attr('href')),
            scrollTop;
        if ($dest.data('offset') === "header") {
            scrollTop = $dest.offset().top - $headerMeasure.outerHeight();
        } else {
            scrollTop = $dest.offset().top;
        }
        $('html, body').animate({'scrollTop': scrollTop}, 500);
    });

    $('.ham').click(function() {
        $('nav').toggleClass('open');
    });

    $('nav').click(function(e) {
        e.stopPropagation();
    });

    $(document).click(function() {
        $('nav').removeClass('open');
    })

    /**************
     * First Page *
     **************/

    setTimeout(function() {
        $('.registration').addClass('fade-in-up');
    }, 500);
    setTimeout(function() {
        $('.scroll-down').addClass('fade-in-up');
    }, 1000);

    setTimeout(setKey, 3000);
    function setKey() {
        var $oldWord = $('.adjective.active'),
            $newWord = $('.adjective[data-no="' + ($oldWord.data('no') + 1) + '"]');
        if ($newWord.length == 0) {
            $newWord = $('.adjective[data-no="1"]');
        }
        $newWord.css({"opacity": 0});
        $oldWord.stop().animate({"opacity": 0}, 200)
        .promise().done(function() {
            $oldWord.removeClass('active');
            $newWord.addClass('active');
            $newWord.stop().animate({"opacity": 1}, 200)
            .promise().done(function() {
                setTimeout(setKey, 3000);
            });
        });
    }

    /*************
     * Scrolling *
     *************/
var md = new MobileDetect(window.navigator.userAgent);
if (md.mobile() == null) {
    $(window).scroll(function() {

        /* Fadeout elements as they approach the top of the screen*/

        var fadeoutPercent = function($elem) {
            var offset = 100,
                $navbar = $('.page[data-page="1"] .header'),
                // How far the bottom of the element is from the top of the viewport.
                distanceToOffscreen = $elem.offset().top + $elem.outerHeight() - $(window).scrollTop(),
                // The total distance the element will travel while fading.
                totalTravelDistance = $elem.height() + $navbar.outerHeight() + offset,
                linear = Math.min(Math.max(0, distanceToOffscreen)/totalTravelDistance, 1);
            return linear*linear
        }
        $.each($('.fade-out'), function(_, elem) {
            var $elem = $(elem),
                opacity = fadeoutPercent($elem);
            $elem.css({'opacity': opacity});
            // $elem.find('*').each(function(_, el) {
            //     $(el).css({'opacity': opacity});
            // });
        });


        /* Fade to blue on the first page */

        var percentComplete = function(pageNo) {
            var $page = $('.page[data-page="' + pageNo + '"]'),
                difference = $(window).scrollTop() - $page.offset().top;
            return Math.min(Math.max(-1 * $page.height(), difference)/$page.height(), 1);
        };
        var a = Math.max(0, percentComplete(1)),
            $bluelayer = $('.page[data-page="1"] > .inner'),
            rgba = "rgba(50,67,122," + (0.5 + a) + ")";
        $bluelayer.css({"background-color": rgba});

        var $page = $('#kickoff'),
            start = $page.offset().top - $(window).height(),
            total = $page.height() + $('#contact').height(),
            diff = $(window).scrollTop() - start,
            op = Math.min(Math.max(0,diff)/total, 1),
            op = 0.5 + op * op / 2;
            scale = Math.min(1, 0.5 + op/2);
        $('.fading-logo').css({
            'opacity': op,
            'transform': 'scale(' + scale + ')'
        });


        /* Hide the hero image after the first page */

        var $nav = $('nav'),
            $firstPage = $('.page[data-page="1"]'),
            $heroImg = $firstPage.find('.background'),
            $shortformSidebar = $('.shortform-sidebar'),
            bottomOfViewport = $(window).scrollTop() + $(window).outerHeight(),
            pageToBottom = $firstPage.offset().top + $firstPage.height() - bottomOfViewport;

        if (pageToBottom < 0) {
            /* Set a header to fixed as it hits the top of the screen */
            $heroImg.addClass('bottom');
        } else {
            /* Unfix the header when we start to see the page above it */
            $heroImg.removeClass('bottom');
        }


        /* Show the with-image image */

        $.each($('.page.with-image'), function(_, page) {
            var $page = $(page),
                pageNo = $page.data('page'),
                $image = $('.background[data-page="' + pageNo + '"]'),
                topOfViewport = $(window).scrollTop(),
                bottomOfViewport = topOfViewport + $(window).outerHeight(),
                pageToBottom = $page.offset().top - bottomOfViewport,
                pageToTop = $page.offset().top + $page.height() - topOfViewport;

            if (pageToBottom < 0 && pageToTop > 0) {
                $image.removeClass('hidden');
            } else {
                $image.addClass('hidden');
            }
        });

        /* Transition headers between pages */
        $.each($('.page'), function(_, page) {
            var $page = $(page),
                pageNo = parseInt($page.data('page'));

            if (pageNo == 1) { return; }

            var $prevPage = $('.page[data-page="' + (pageNo - 1) + '"]'),
                $header = $page.find('.header'),
                $prevHeader = $prevPage.find('.header'),
                topOfViewport = $(window).scrollTop();
                headerToTop = $header.offset().top - topOfViewport;
                pageToTop = $page.offset().top - topOfViewport;
                topOfPrevHeader = $prevHeader.offset().top,
                bottomOfPrevHeader = $prevHeader.offset().top + $prevHeader.outerHeight(),
                bottomOfPrevPage = $prevPage.offset().top + $prevPage.outerHeight();

            if (headerToTop < 0) {
                /* Set a header to fixed as it hits the top of the screen */
                $header.addClass('fixed');
                if (pageNo == 2) {
                    $nav.addClass('fixed');
                    $shortformSidebar.addClass('fixed');
                }
            } else if (pageToTop > 0) {
                /* Unfix the header when we start to see the page above it */
                $header.removeClass('fixed');
                if (pageNo == 2) {
                    $nav.removeClass('fixed');
                    $shortformSidebar.removeClass('fixed');
                }
            }

            if ($prevHeader.hasClass('fixed') && !$prevHeader.hasClass('bottom') && bottomOfPrevHeader > bottomOfPrevPage) {
                /* Unfix the previous header as the current one hits it */
                $prevHeader.addClass('bottom');
            } else if ($prevHeader.hasClass('bottom') && topOfPrevHeader > topOfViewport) {
                /* Fix the previous header as we scroll it into view */
                $prevHeader.removeClass('bottom');
            }
        });

        /* Make sure the shortform sidebar looks good as it's leaving */
        var shortformToTop = $shortformSidebar.offset().top,
            $shortformInner = $('.shortform-sidebar > .inner'),
            $shortformWrapper = $shortformSidebar.parent(),
            shortformInnerToTop = $shortformInner.offset().top,
            bottomOfShortformInner = shortformInnerToTop + $shortformInner.outerHeight(),
            bottomOfShortformWrapper = $shortformWrapper.offset().top + $shortformWrapper.outerHeight(),
            topOfViewport = $(window).scrollTop();

        if ($shortformSidebar.hasClass('bottom') &&  shortformInnerToTop > topOfViewport) {
            $shortformSidebar.removeClass('bottom');
        } else if (bottomOfShortformInner > bottomOfShortformWrapper) {
            $shortformSidebar.addClass('bottom');
        }



    });
} else {
    window.addEventListener("resize", mobileRespond, false);
    window.addEventListener("orientationchange", mobileRespond, false);
    mobileRespond();
    $('.page:first-child').css({'height': $('.page:first-child').height()})
}
});

