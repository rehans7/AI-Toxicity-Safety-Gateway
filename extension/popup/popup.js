document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle-filter");
  const statusText = document.getElementById("status-text");
  const scannedEl = document.getElementById("stat-scanned");
  const blockedEl = document.getElementById("stat-blocked");

  chrome.storage.local.get(
    ["filterEnabled", "scannedCount", "blockedCount"],
    (data) => {
      const isEnabled = data.filterEnabled !== false;
      toggle.checked = isEnabled;
      updateStatusUI(isEnabled);

      scannedEl.textContent = data.scannedCount || 0;
      blockedEl.textContent = data.blockedCount || 0;
    },
  );

  // Toggle changed
  toggle.addEventListener("change", () => {
    const isEnabled = toggle.checked;

    console.log("Toggle:", isEnabled);
    //this is running in the console of the browser.
    updateStatusUI(isEnabled);

    chrome.storage.local.set({
      filterEnabled: isEnabled,
    });
  });

  function updateStatusUI(isEnabled) {
    if (isEnabled) {
      statusText.textContent = "Active";

      statusText.classList.remove("status-disabled");
      statusText.classList.add("status-active");
    } else {
      statusText.textContent = "Disabled";

      statusText.classList.remove("status-active");
      statusText.classList.add("status-disabled");
    }
  }
});
