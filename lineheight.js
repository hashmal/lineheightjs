/* Copyright (c) 2013, Jeremy Pinat. */

(function () {
    OPACITY = 0x0F;

    // Create a picture based on a given line height.
    function createBg64 (lh) {
        var p = new PNGlib(10, lh*2, 256);
        var background = p.color(0, 0, 0, 0);

        for (var i = 0; i < lh; i++) {
            for (var j = 0; j < 10; j++) {
                p.buffer[p.index(j, i)] = p.color(0xFF, 0xFF, 0xFF, OPACITY);
            }
        }

        for (var i = lh; i < lh*2; i++) {
            for (var j = 0; j < 10; j++) {
                p.buffer[p.index(j, i)] = p.color(0x00, 0x00, 0x00, OPACITY);
            }
        }

        return p.getBase64();
    }

    // Get the line-height (in pixels) currently applied to the page.
    function getLh () {
        var probe = document.createElement('div');
        probe.id = 'lineheightjs-probe';
        probe.innerHTML = "Probing...";
        body = document.getElementsByTagName('body')[0];
        body.appendChild(probe);
        var probe = document.getElementById('lineheightjs-probe');
        var height = probe.offsetHeight;
        probe.parentNode.removeChild(probe);
        return height;
    }

    // Get the document height, cross-browser. If the document height is less
    // than the viewport height, get the viewport height instead.
    function getDocumentHeight() {
        return Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight
        );
    }

    // Generate overlay
    function overlay () {
        return '<div id="lineheightjs-overlay"></div>';
    }

    // Generate styling
    function styles () {
        return '<style type="text/css">#lineheightjs-overlay {background-image: url(\'data:image/png;base64,' + createBg64(getLh()) + '\');height: ' + getDocumentHeight() + 'px;left: 0;position:absolute;pointer-events:none;top:0;width:100%;z-index:9999;}</style>';
    }

    document.lineheightjs = {
        shown: false,

        hide: function (argument) {
            var grid = document.getElementById('lineheightjs');
            grid.parentNode.removeChild(grid);

            document.lineheightjs.shown = false;
        },

        show: function (argument) {
            var lho = document.createElement('div');
            lho.id = 'lineheightjs';
            lho.innerHTML = overlay() + styles();

            body = document.getElementsByTagName('body')[0];
            body.appendChild(lho);

            document.lineheightjs.shown = true;
        },

        toggle: function (argument) {
            if (document.lineheightjs.shown == true)
                document.lineheightjs.hide();
            else
                document.lineheightjs.show();
        }
    };

    document.lineheightjs.show();
})();
