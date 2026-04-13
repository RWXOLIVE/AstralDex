(function () {
  "use strict";

  var STORAGE_KEY = "astraldex-last-seen-patch";
  var modal = document.getElementById("patchNotesModal");
  var content = document.getElementById("patchNotesContent");
  var openButton = document.getElementById("patchNotesOpen");
  var closeButton = document.getElementById("patchNotesClose");
  var latestPatch = getLatestPatch();

  if (!modal || !content || !openButton || !closeButton) return;

  if (latestPatch) {
    renderPatch(latestPatch);
  } else {
    content.innerHTML = '<p class="patchnotes-empty">No patch notes yet.</p>';
  }

  openButton.addEventListener("click", function () {
    openModal();
  });

  closeButton.addEventListener("click", function () {
    closeModal(true);
  });

  var closeTargets = modal.querySelectorAll("[data-patchnotes-close]");
  for (var i = 0; i < closeTargets.length; i++) {
    closeTargets[i].addEventListener("click", function () {
      closeModal(true);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen()) {
      closeModal(true);
    }
  });

  if (latestPatch && getSeenPatchVersion() !== latestPatch.version) {
    openModal();
  }

  function getLatestPatch() {
    var notes = window.AstralDexPatchNotes;
    if (!notes || !notes.length) return null;
    return notes[0];
  }

  function getSeenPatchVersion() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      return "";
    }
  }

  function markPatchAsSeen(version) {
    if (!version) return;
    try {
      localStorage.setItem(STORAGE_KEY, version);
    } catch (err) {}
  }

  function isOpen() {
    return !modal.hasAttribute("hidden");
  }

  function openModal() {
    modal.removeAttribute("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("patchnotes-open");
    closeButton.focus();
  }

  function closeModal(markSeen) {
    if (!isOpen()) return;
    modal.setAttribute("hidden", "hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("patchnotes-open");

    if (markSeen && latestPatch) {
      markPatchAsSeen(latestPatch.version);
    }
  }

  function renderPatch(patch) {
    var buf = '';
    buf += '<div class="patchnotes-meta">';
    buf += '<p class="patchnotes-version">' + escapeHTML(patch.version || "Unversioned Patch") + '</p>';
    if (patch.date) {
      buf += '<p class="patchnotes-date">' + escapeHTML(patch.date) + '</p>';
    }
    if (patch.title) {
      buf += '<p class="patchnotes-title">' + escapeHTML(patch.title) + '</p>';
    }
    buf += '</div>';

    var sections = patch.sections || [];
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      if (!section) continue;
      var items = section.items || [];
      buf += '<section class="patchnotes-section">';
      buf += '<h3>' + escapeHTML(section.heading || "Changes") + '</h3>';
      if (!items.length) {
        buf += '<p class="patchnotes-empty">No items listed yet.</p>';
      } else {
        buf += "<ul>";
        for (var j = 0; j < items.length; j++) {
          buf += '<li>' + escapeHTML(items[j]) + '</li>';
        }
        buf += "</ul>";
      }
      buf += "</section>";
    }

    content.innerHTML = buf;
  }

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
