(function ($) {
    "use strict";

    $.fn.btComboBox = function(arg) {
        var selectedOption = function(g) {
            var o = $(".active a", g);

            if (o.length) {
                return [o.attr("href"),o.text(),o]
            }

            // ---

            var f = $("li:first-child a", g);

            return (f.length) ? [f.attr("href"),f.text(),f] : null
        };

        if (arg == "selectedOption") {
            return selectedOption($(this))
        }

        var value = function(e) {
            var o = selectedOption(e);
            return (o) ? o[0] : null
        };
            
        if (arg == "value") {
            return value($(this))
        }

        var removeAll = function(e) { 
            $("li", e).remove();
            return e
        };
        var selectValue = function(id, g, b, a) {
            var v = (a) ? a.attr("href") : null, 
            l = (a) ? a.text() : "";

            $("#"+id+"-hid").val(v);
            $(".label", b).text(l);

            $(".active", g).removeClass("active");

            if (a) a.parent().addClass("active");

            return false
        };

        if (arg && arg['action'] == "select") {
            var v = arg['value'];

            if (!v) return;

            var cb = $(this);

            cb.each(function(i,e) {
                var g = $(e), id = g.attr("id"), b = $(".btn", g),
                a = $("li a[href='"+v+"']", g);

                if (a.length == 0) return;

                selectValue(id, g, b, a)
            });

            return cb;
        } // end of select

        if (arg == "clear") {
            return $(this).each(function(i,e) { 
                var g = $(e), id = g.attr("id"), b = $(".btn", g);
                removeAll(g);
                selectValue(id, g, b, null)
            })
        } // end of clear

        // ---
        
        var options = function(pairs, extractor) {
            var l;
            if (!pairs || !(l = pairs['length'])) { 
                // No pair
                return;
            } 

            // ---

            var f = (extractor && (typeof extractor) == "function")
                 ? extractor : function(p) { return p };

            var ps = [];
            for (var i = 0; i < l; i++) {
                ps.push(f(pairs[i]))
            }

            return ps
        };

        var load = function(g, ps) {
            var p, id = g.attr("id"), b = $(".btn", g), l = ps.length;
            for (var u = $("ul", g), i = 0; i < l; i++) {
                p = ps[i];
                
                $('<a href="' +p[0]+ '" title="' +p[1]+ '">' +p[1]+ '</a>').
                    appendTo($('<li></li>').appendTo(u)).click(function() { 
                        var ret = selectValue(id, g, b, $(this));
                        b.dropdown('toggle');
                        return ret
                    })
                
            }
        };

        if (arg && arg['action'] == "load") {
            var cb = $(this);

            if (cb.length == 0) {
                return cb;
            }

            // ---

            var pairs = options(arg['pairs'], arg['extractor']);

            cb.each(function(i,c) { load($(c), pairs) })

            return cb
        }

        if (arg && arg['action'] == "reset") {
            var cb = $(this);

            if (cb.length == 0) {
                return cb;
            }

            // ---

            var pairs = options(arg['pairs'], arg['extractor']);

            cb.each(function(i,c) { 
                var g = $(c), id = g.attr("id"), b = $(".btn", g), v = value(g);

                removeAll(g);
                load(g, pairs);

                var o = $("li a[href='"+v+"']", g);
                selectValue(id, g, b, (o.length == 1) ? o : null)
            })

            return cb
        }

        // ---

        // Setup
        $(this).each(function(i,e) {
            var s = $(e), id = s.attr("id"),
            bc = s.attr("data-btn-class"), 
            xbc = (bc && bc != "") ? ' '+bc : "",
            b = $('<button type="button" class="btn'+xbc+' dropdown-toggle" data-toggle="dropdown"><span class="label"></span><span class="caret"></span></button>').attr("name", s.attr("name")).attr("id", id+"-tog"), lb= $(".label", b),
            l = $('<ul class="dropdown-menu" role="menu"></ul>');

            $("option", s).each(function(j,f) {
                var o = $(f);
                $('<li><a href="' +o.val()+ '">' +o.text()+ '</a></li>').appendTo(l)
            });

            $('<input type="hidden" name="' +s.attr("name")+ 
              '" id="' +id+ '-hid" value="" />').insertAfter(s);

            var sc = s.attr("class"), xc = (sc && sc != "") ? ' '+sc : "", 
            g = $('<div class="btn-group '+xc+'"></div>').attr("id", id).append(b).append(l), so = selectedOption(g);

            selectValue(id, g, b, so[2]);

            $("li > a", g).click(function() { 
                var a = $(this), ret = selectValue(id, g, b, a);
                b.dropdown('toggle');
                return ret
            });
            
            b.click(function() { $("ul", g).width(g.width()) });

            s.replaceWith(g)
        })
    };
})(jQuery);
