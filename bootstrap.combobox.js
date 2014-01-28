(function ($) {
    "use strict";

    $.fn.btComboBox = function(arg) {
        if (arg == "disable") {
            var cb = $(this);

            if (cb.length == 0) {
                return cb;
            }

            // ---

            cb.each(function(i,e) { 
                $(".btn", e).attr("disabled", "disabled") 
            });

            return cb
        } // end of disable

        if (arg == "enable") {
            var cb = $(this);

            if (cb.length == 0) {
                return cb;
            }

            // ---

            cb.each(function(i,e) { 
                $(".btn", e).removeAttr("disabled")
            });

            return cb
        } // end of enable

        if (arg == "values") {
            var vs = [];

            $("li a", $(this)).each(function(i,a){vs.push($(a).attr("href")) });

            return vs
        } // end of values

        //  ---

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
            l = (a) ? a.text() : "",
            h = $("#"+id+"-hid"), o = h.val(),
            p = (a) ? a.parent() : null;

            h.val(v);

            if (v == o && p && p.hasClass("active")) return false; // No change

            $(".label", b).text(l);

            $(".active", g).removeClass("active");

            if (a) a.parent().addClass("active");

            $("#"+id).trigger('change');

            return false
        };

        var select = function(g, v) {
            var id = g.attr("id"), b = $(".btn", g),
            a = $("li a[href='"+v+"']", g);

            if (a.length == 0) return false;
            
            selectValue(id, g, b, a);

            return true
        };

        if (arg && arg['action'] == "select") {
            var v = arg['value'];

            if (!v) return;

            var cb = $(this);

            cb.each(function(i,e) { select($(e), v) });

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

                if (p[0] == '_' && !p[1]) {
                    $('<li class="divider"></li>').appendTo(u);
                    continue;
                }

                // ---
                
                $('<a href="' +p[0]+ '" title="' +p[1]+ '">' +p[1]+ '</a>').
                    appendTo($('<li></li>').appendTo(u)).click(function() { 
                        var ret = selectValue(id, g, b, $(this));
                        b.dropdown('toggle');
                        return ret
                    })
                
            }

            select(g, $("#"+id+"-hid").val())
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
        var sel = "";
        $(this).each(function(i,e) {
            var s = $(e);
            
            if (s.hasClass("btn-group")) return; // Already enhanced

            var id = s.attr("id"), v = s.attr("value"),
            bc = s.attr("data-btn-class"), 
            xbc = (bc && bc != "") ? ' '+bc : "",
            b = $('<button type="button" class="btn'+xbc+' dropdown-toggle" data-toggle="dropdown"><span class="label"></span><span class="caret"></span></button>').attr("name", s.attr("name")).attr("id", id+"-tog"), lb= $(".label", b),
            l = $('<ul class="dropdown-menu" role="menu"></ul>');

            $("option", s).each(function(j,f) {
                var o = $(f);
                $('<li><a href="'+o.val()+'">'+o.text()+'</a></li>').appendTo(l)
            });

            $('<input type="hidden" name="' +s.attr("name")+ 
              '" id="' +id+ '-hid" value="' + ((v)?v:"") + '" />').
                insertAfter(s);

            var sc = s.attr("class"), xc = (sc && sc != "") ? ' '+sc : "", 
            g = $('<div class="btn-group '+xc+'"></div>').
                attr("id", id).append(b).append(l);

            if (!select(g, v) && !v) {
                var so = selectedOption(g);
                if (so) selectValue(id, g, b, so[2]);
            }

            $("li > a", g).click(function() { 
                var a = $(this), ret = selectValue(id, g, b, a);
                b.dropdown('toggle');
                return ret
            });
            
            b.click(function() { 
                var w = g.width();

                $("ul", g).css({'min-width':w}).width(w)
            });

            s.replaceWith(g);

            if (sel == "") sel = "#" + id;
            else sel += ",#" + id;
        });

        return $(sel)
    };
})(jQuery);
