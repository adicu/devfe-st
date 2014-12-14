$(function() {
    setTimeout(function() {
        $('.registration').addClass('fade-in-up');
    }, 500);
    setTimeout(function() {
        $('.scroll-down').addClass('fade-in-up');
    }, 1000);

    $(window).scroll(function() {
        var percentComplete = function(pageNo) {
            var $page = $('.page[data-page="' + pageNo + '"]'),
                difference = $(window).scrollTop() - $page.offset().top;
            return Math.min(Math.max(0, difference)/$page.height(), 1);
        };
        $('.page[data-page="1"]').each(function() {
            var a = percentComplete(1),
                rgba = "rgba(50,67,122," + (0.5 + a) + ")",
                opacity = 1 - 2*a;
            $(this).css({"background-color": rgba});
            $(".first-page").css({"opacity": opacity});
        });
    });

    $('a[href="#register"]').click(function(e) {
        e.preventDefault();
        $('html, body').animate({'scrollTop': 0}, 500, function() {
            $('#email').focus();
        });
    });
    $('a[href="#down"]').click(function(e) {
        e.preventDefault();
        var dest = $("#down").offset().top;
        $('html, body').animate({'scrollTop': dest}, 500);
    });

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
});

