function injectUI(){
// 1. Create a container element for your extension UI
const container = document.createElement('div');
container.id = 'ai-filter-root';

// Style the outer container to float on the screen
container.style.position = 'fixed';
container.style.top = '20px';
container.style.right = '20px';
container.style.zIndex = '999999';

// 2. Attach a Shadow DOM to isolate your styles from the website
const shadowRoot = container.attachShadow({ mode: 'open' });

// 3. Add your custom CSS inside the Shadow DOM
const style = document.createElement('style');
style.textContent = `
.ui-screen {
  width: 320px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #1e293b;
}

.card {
  background-color: #ffffff;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.header h2 {
  font-size: 18px;
  margin: 0;
  font-weight: 600;
}

/* Modern Toggle Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #cbd5e1;
  transition: .3s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2563eb;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

/* Status and Stats layout */
.status-box {
  background-color: #f1f5f9;
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.status-active {
  color: #16a34a;
  font-weight: 600;
}

.status-disabled {
  color: #64748b;
  font-weight: 600;
}

.stats-container {
  display: flex;
  gap: 12px;
}

.stat-card {
  flex: 1;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.stat-card.alert {
  background: #fef2f2;
  border-color: #fee2e2;
}

.stat-num {
  display: block;
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
}

.stat-card.alert .stat-num {
  color: #dc2626;
}

.stat-label {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
  display: block;
}`;

// 4. Create your actual UI layout (Cleaned of standalone HTML tags)
const uiScreen = document.createElement('div');
uiScreen.className = 'ui-screen';
uiScreen.innerHTML = `
  <div class="card">
    <div class="header">
      <h2>No Ga*li Galoch</h2>
      <label class="switch">
        <input type="checkbox" id="toggle-filter" checked />
        <span class="slider"></span>
      </label>
    </div>

    <div class="status-box">
      <span class="status-label">Status:</span>
      <span id="status-text" class="status-active">Active</span>
    </div>

    <div class="stats-container">
      <div class="stat-card">
        <span class="stat-num" id="stat-scanned">0</span>
        <span class="stat-label">Scanned</span>
      </div>
      <div class="stat-card alert">
        <span class="stat-num" id="stat-blocked">0</span>
        <span class="stat-label">Blocked</span>
      </div>
    </div>
  </div>
`;

// 5. Assemble and inject it into the website
shadowRoot.appendChild(style);
shadowRoot.appendChild(uiScreen);
document.body.appendChild(container);
document.addEventListener('click', (event) => {
  const container = document.getElementById('ai-filter-root');
  
  if (container) {
    // Check if the click path went through your extension container
    const clickedInside = event.composedPath().includes(container);
    
    // If they clicked anywhere else on the screen, hide the UI box
    if (!clickedInside) {
      container.style.display = 'none';
    }
  }
});
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectUI);
} else {
  injectUI();
}

