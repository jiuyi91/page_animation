/**
 * 移动端横版
 */
!function(win) {
    var win_doc = win.document,
        win_doc_doc = win_doc.documentElement || win_doc.body,
        psd_w = 1280 / 100,
        evt_fn = "orientationchange" in win ? "orientationchange" : "resize",
        set_size = function() {
            var page_w = win_doc_doc.clientWidth || 568;
            page_w > 1280 && (page_w = 1280), win_doc_doc.style.fontSize = page_w / psd_w + "px";
        },
        yi_public = win.yi_public = win.yi_public || {};
    set_size();
    yi_public.iphone_rem = set_size;
    win_doc.addEventListener && (win.addEventListener(evt_fn, set_size, !1), win_doc.addEventListener("DOMContentLoaded", set_size, !1));
}(window);
