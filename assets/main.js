(function () {
  var EMAIL = "contact@rodrigoalvarez.me";
  var MAILTO = "mailto:" + EMAIL + "?subject=Validation%20%26%20Compliance%20Inquiry";
  var COPIED_LABEL = "Email address copied to clipboard";

  // Old hash-router links (e.g. /#/legal) -> real pages
  if (location.hash === "#/legal") { location.replace(location.pathname.replace(/\/?$/, "/") + "legal/"); return; }
  if (location.hash === "#/") { history.replaceState(null, "", location.pathname); }

  function legacyCopy() {
    var ta = document.createElement("textarea");
    ta.value = EMAIL;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, EMAIL.length);
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function copyEmail() {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(EMAIL).then(
        function () { return true; },
        function () { return legacyCopy(); }
      );
    }
    return Promise.resolve(legacyCopy());
  }

  document.querySelectorAll("[data-email-cta]").forEach(function (btn) {
    var label = btn.textContent;
    var timer;
    btn.setAttribute("aria-live", "polite");
    btn.setAttribute("title", "Copy " + EMAIL);
    btn.addEventListener("click", function () {
      copyEmail().then(function (ok) {
        if (!ok) { location.href = MAILTO; return; }
        btn.textContent = COPIED_LABEL;
        clearTimeout(timer);
        timer = setTimeout(function () { btn.textContent = label; }, 2400);
      });
    });
  });
})();
