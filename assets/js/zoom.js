["gesturestart", "gesturechange", "gestureend"].forEach(function (g) {
  document.addEventListener(g, function (e) { e.preventDefault(); }, { passive: false });
});
