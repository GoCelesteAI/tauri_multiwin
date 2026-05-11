import {
  WebviewWindow,
  getCurrentWebviewWindow,
} from "@tauri-apps/api/webviewWindow";
import "./App.css";

const isSettings = window.location.hash === "#settings";

function MainWindow() {
  const openSettings = async () => {
    const existing = await WebviewWindow.getByLabel("settings");
    if (existing) {
      existing.setFocus();
      return;
    }
    new WebviewWindow("settings", {
      url: "index.html#settings",
      title: "Settings",
      width: 500,
      height: 360,
      x: 900,
      y: 90,
      resizable: false,
    });
  };

  const closeSettings = async () => {
    (await WebviewWindow.getByLabel("settings"))?.close();
  };

  return (
    <main className="container">
      <h1>MultiWin</h1>
      <p className="muted">The main window.</p>
      <div className="row">
        <button onClick={openSettings}>Open Settings</button>
        <button onClick={closeSettings}>Close Settings</button>
      </div>
    </main>
  );
}

function SettingsWindow() {
  const closeSelf = () => getCurrentWebviewWindow().close();

  return (
    <main className="container">
      <h1>Settings</h1>
      <p className="muted">The second window.</p>
      <button onClick={closeSelf}>Close</button>
    </main>
  );
}

export default function App() {
  return isSettings ? <SettingsWindow /> : <MainWindow />;
}
