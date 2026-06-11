(function () {
  "use strict";
  const React = (window as any).React;
  const MUI = (window as any).MaterialUI;
  const w = window as any;

  function useThemeMode() {
    const [mode, setMode] = React.useState<"light" | "dark">("dark");
    const toggle = () => setMode((m) => m === "dark" ? "light" : "dark");
    const theme = React.useMemo(() => MUI.createTheme({ palette: { mode } }), [mode]);
    return { mode, toggle, theme };
  }

  function TargetSwitch() {
    const cfg = w.CONV.Config;
    const [local, setLocal] = React.useState(cfg.isLocal());
    React.useEffect(() => {
      const h = () => setLocal(cfg.isLocal());
      window.addEventListener(cfg.EVENT, h);
      return () => window.removeEventListener(cfg.EVENT, h);
    }, []);
    return React.createElement(MUI.FormControlLabel, {
      control: React.createElement(MUI.Switch, { size: "small", checked: local, onChange: (_e: any, v: boolean) => cfg.setLocal(v) }),
      label: "API " + cfg.label(),
    });
  }

  function LoginGate(props: { children: any }) {
    const [ok, setOk] = React.useState(w.CONV.Auth.isLoggedIn());
    const [user, setUser] = React.useState("");
    const [pass, setPass] = React.useState("");
    const [err, setErr] = React.useState("");

    React.useEffect(() => {
      const sync = () => setOk(w.CONV.Auth.isLoggedIn());
      window.addEventListener(w.CONV.Auth.EVENT, sync);
      window.addEventListener("storage", sync);
      return () => { window.removeEventListener(w.CONV.Auth.EVENT, sync); window.removeEventListener("storage", sync); };
    }, []);

    if (ok) return props.children;

    return React.createElement(MUI.Paper, { sx: { p: 4, maxWidth: 420, mx: "auto", mt: 4 } },
      React.createElement(MUI.Typography, { variant: "h6", gutterBottom: true }, "Iniciar sesión"),
      React.createElement(MUI.Typography, { variant: "body2", color: "text.secondary", sx: { mb: 2 } },
        "Auth centralizado vía system-login (sesión compartida)."),
      err ? React.createElement(MUI.Alert, { severity: "error", sx: { mb: 2 } }, err) : null,
      React.createElement(MUI.TextField, { label: "Usuario", fullWidth: true, size: "small", sx: { mb: 2 }, value: user, onChange: (e: any) => setUser(e.target.value) }),
      React.createElement(MUI.TextField, { label: "Clave", type: "password", fullWidth: true, size: "small", sx: { mb: 2 }, value: pass, onChange: (e: any) => setPass(e.target.value) }),
      React.createElement(MUI.Stack, { direction: "row", spacing: 1 },
        React.createElement(MUI.Button, { variant: "contained", onClick: async () => {
          setErr("");
          try { await w.CONV.Auth.login(user, pass); setOk(true); } catch (e: any) { setErr(e.message); }
        }}, "Entrar"),
        React.createElement(MUI.Button, { href: w.CONV.Auth.LOGIN_URL, target: "_blank", rel: "noreferrer" }, "System Login")));
  }

  w.CONV = w.CONV || {};
  w.CONV.UI = { useThemeMode, TargetSwitch, LoginGate };
})();
