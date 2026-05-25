(function () {
  "use strict";

  var STORAGE_KEY = "astraldex-last-seen-patch";
  var modal = document.getElementById("patchNotesModal");
  var content = document.getElementById("patchNotesContent");
  var openButton = document.getElementById("patchNotesOpen");
  var closeButton = document.getElementById("patchNotesClose");
  var patches = getPatches();
  var latestPatch = patches.length ? patches[0] : null;
  var latestPatchVersion = latestPatch && latestPatch.version ? String(latestPatch.version) : "";
  var hasShownUpdatePrompt = false;
  var updateCheckTimer = null;
  var UPDATE_CHECK_INITIAL_DELAY_MS = 45000;
  var UPDATE_CHECK_INTERVAL_MS = 120000;

  if (!modal || !content || !openButton || !closeButton) return;

  if (patches.length) {
    renderPatchList(patches);
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

  if (window.fetch && latestPatchVersion) {
    window.setTimeout(function () {
      checkForRemoteUpdate();
      updateCheckTimer = window.setInterval(checkForRemoteUpdate, UPDATE_CHECK_INTERVAL_MS);
    }, UPDATE_CHECK_INITIAL_DELAY_MS);
  }

  function getPatches() {
    var notes = window.AstralDexPatchNotes;
    if (!notes || !notes.length) return [];
    return notes;
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

  function renderPatchList(list) {
    var buf = '';
    for (var patchIndex = 0; patchIndex < list.length; patchIndex++) {
      var patch = list[patchIndex];
      if (!patch) continue;

      buf += '<details class="patchnotes-entry"' + (patchIndex === 0 ? ' open' : '') + '>';
      buf += '<summary class="patchnotes-summary">';
      buf += '<span class="patchnotes-summary-main">';
      buf += '<span class="patchnotes-version">' + escapeHTML(patch.version || "Unversioned Patch") + '</span>';
      if (patch.title) {
        buf += '<span class="patchnotes-title">' + escapeHTML(patch.title) + '</span>';
      }
      buf += '</span>';
      if (patch.date) {
        buf += '<span class="patchnotes-date">' + escapeHTML(patch.date) + '</span>';
      }
      buf += '</summary>';
      buf += '<div class="patchnotes-meta">';

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

      buf += "</div>";
      buf += "</details>";
    }

    content.innerHTML = buf;
  }

  function checkForRemoteUpdate() {
    if (hasShownUpdatePrompt) return;
    fetch("/js/patch-notes-data.js?updateCheck=" + Date.now(), {cache: "no-store"})
      .then(function (response) {
        if (!response.ok) return "";
        return response.text();
      })
      .then(function (sourceText) {
        if (!sourceText) return;
        var remoteVersion = extractLatestPatchVersion(sourceText);
        if (!remoteVersion || remoteVersion === latestPatchVersion) return;
        hasShownUpdatePrompt = true;
        if (updateCheckTimer) {
          window.clearInterval(updateCheckTimer);
          updateCheckTimer = null;
        }
        showUpdatePrompt();
      })
      .catch(function () {});
  }

  function extractLatestPatchVersion(sourceText) {
    var match = /version\s*:\s*["']([^"']+)["']/.exec(String(sourceText || ""));
    return match && match[1] ? match[1] : "";
  }

  function showUpdatePrompt() {
    var shouldReload = window.confirm("There is an update available. Please refresh to get the latest version.\n\nRefresh now?");
    if (shouldReload) {
      window.location.reload();
    }
  }

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
