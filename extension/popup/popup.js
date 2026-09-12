const toggleFilter = document.getElementById("toggle-filter");
const statusText = document.getElementById("status-text");

const scannedCount = document.getElementById("stat-scanned");
const blockedCount = document.getElementById("stat-blocked");

// Load saved data when popup opens
chrome.storage.local.get(
  ["filterEnabled", "scannedCount", "blockedCount"],
  (data) => {
    // Filter status
    const enabled = data.filterEnabled !== false;

    toggleFilter.checked = enabled;

    if (enabled) {
      statusText.textContent = "Active";
      statusText.className = "status-active";
    } else {
      statusText.textContent = "Disabled";
      statusText.className = "status-disabled";
    }

    // Statistics
    scannedCount.textContent = data.scannedCount || 0;
    blockedCount.textContent = data.blockedCount || 0;
  },
);

// Toggle filter
toggleFilter.addEventListener("change", (e) => {
  const enabled = e.target.checked;

  chrome.storage.local.set({
    filterEnabled: enabled,
  });

  if (enabled) {
    statusText.textContent = "Active";
    statusText.className = "status-active";
  } else {
    statusText.textContent = "Disabled";
    statusText.className = "status-disabled";
  }
});
