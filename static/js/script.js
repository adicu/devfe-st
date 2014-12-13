$(function() {
    setTimeout(function() {
        $('.registration').addClass('fade-in-up');
    }, 500);

    $(window).scroll(function() {
        var percentComplete = function(pageNo) {
            var $page = $('.page[data-page="' + pageNo + '"]'),
                difference = $(window).scrollTop() - $page.offset().top;
            return Math.min(Math.max(0, difference)/$page.height(), 1);
        };
        $('.page[data-page="1"]').each(function() {
            var a = percentComplete(1),
                rgba = "rgba(50,67,122," + (0.5  + a) + ")";
            $(this).css({"background-color": rgba});
        });

        var $menu = $('nav .menu'),
            $nav = $('nav'),
            $header = $('.page[data-page="2"] .header'),
            difference = $(window).scrollTop() - $nav.offset().top;
        if (difference >= 0) {
            $menu.addClass('fixed');
            $header.addClass('fixed');
        } else {
            $menu.removeClass('fixed');
            $header.removeClass('fixed');
        }

        var $header = $('.page[data-page="1"] .header'),
            $firstPage = $('.page[data-page="1"]'),
            topOfHeader = $header.offset().top,
            bottomOfHeader = $header.offset().top + $header.outerHeight(),
            bottomOfFirstPage = $firstPage.offset().top + $firstPage.outerHeight(),
            topOfVisibleWindow = $(window).scrollTop();
        console.log(bottomOfHeader, bottomOfFirstPage, topOfVisibleWindow);
        if ($header.hasClass('fixed') && bottomOfHeader > bottomOfFirstPage) {
            $header.removeClass('fixed');
            $header.addClass('bottom');
        } else if (topOfHeader > topOfVisibleWindow) {
            $header.addClass('fixed');
            $header.removeClass('bottom');
        }

    });
});