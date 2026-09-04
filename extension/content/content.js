
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

// 3. Add your custom CSS with rounded corners inside the Shadow DOM
const style = document.createElement('style');
style.textContent = `
  .ui-screen {
    width: 320px;
    background-color: #ffffff;
    border-radius: 16px; /* This makes your UI screen rounded */
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    padding: 16px;
    font-family: system-ui, sans-serif;
    color: #1e293b;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }
  .header h2 {
    margin: 0;
    font-size: 18px;
  }
`;

// 4. Create your actual UI layout
const uiScreen = document.createElement('div');
uiScreen.className = 'ui-screen';
uiScreen.innerHTML = `
  <div class="header">
    <h2>AI Comment Filter</h2>
    <p>Status: Active</p>
  </div>
`;

// 5. Assemble and inject it into the website
shadowRoot.appendChild(style);
shadowRoot.appendChild(uiScreen);
document.body.appendChild(container);
