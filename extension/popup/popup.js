document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle-filter");
  const statusText = document.getElementById("status-text");
  const scannedEl = document.getElementById("stat-scanned");
  const blockedEl = document.getElementById("stat-blocked");

  chrome.storage.local.get(["filterEnabled", "scannedCount", "blockedCount"], (data) => {
  
    const isEnabled = data.filterEnabled !== false; 
    toggle.checked = isEnabled;
    updateStatusUI(isEnabled);

    scannedEl.textContent = data.scannedCount || 0;
    blockedEl.textContent = data.blockedCount || 0;
  });

  
  toggle.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    updateStatusUI(isChecked);

 
    chrome.storage.local.set({ filterEnabled: isChecked });
  });

  function updateStatusUI(isEnabled) {
    if (isEnabled) {
      statusText.textContent = "Active";
      statusText.className = "status-active";
    } else {
      statusText.textContent = "Disabled";
      statusText.className = "status-disabled";
    }
  }
});
