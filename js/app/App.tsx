(function () {
  "use strict";
  const React = (window as any).React;
  const MUI = (window as any).MaterialUI;
  const w = window as any;

  function App() {
    const tm = w.CONV.UI.useThemeMode();
    const [rows, setRows] = React.useState<any[]>([]);
    const [selected, setSelected] = React.useState<any>(null);
    const [err, setErr] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const reload = React.useCallback(async () => {
      if (!w.CONV.Auth.isLoggedIn()) return;
      setLoading(true); setErr("");
      try {
        const data = await w.CONV.Api.list();
        setRows(data.rows || []);
      } catch (e: any) { setErr(e.message); }
      finally { setLoading(false); }
    }, []);

    React.useEffect(() => { reload(); }, [reload]);

    async function openConv(id: number) {
      try { setSelected(await w.CONV.Api.get(id)); } catch (e: any) { setErr(e.message); }
    }

    return React.createElement(MUI.ThemeProvider, { theme: tm.theme },
      React.createElement(MUI.CssBaseline, null),
      React.createElement(MUI.Box, { sx: { height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" } },
        React.createElement(MUI.AppBar, { position: "static", color: "default", elevation: 0, sx: { borderBottom: 1, borderColor: "divider", flexShrink: 0 } },
          React.createElement(MUI.Toolbar, { sx: { gap: 1 } },
            React.createElement(MUI.Typography, { variant: "h6", sx: { flexGrow: 1 } }, "Conversaciones"),
            w.CONV.Auth.isLoggedIn() && React.createElement(MUI.Chip, { size: "small", label: w.CONV.Auth.username() }),
            React.createElement(w.CONV.UI.TargetSwitch, null),
            React.createElement(MUI.Button, { size: "small", onClick: reload }, "Recargar"))),
        React.createElement(MUI.Box, { sx: { flex: 1, minHeight: 0, overflow: "hidden" } },
          React.createElement(w.CONV.UI.LoginGate, null,
            React.createElement(MUI.Grid, { container: true, sx: { height: "100%" } },
              React.createElement(MUI.Grid, { item: true, xs: 12, md: 4, sx: { height: "100%", borderRight: 1, borderColor: "divider", overflow: "auto" } },
                err ? React.createElement(MUI.Alert, { severity: "error", sx: { m: 1 } }, err) : null,
                loading ? React.createElement(MUI.Box, { sx: { p: 2, textAlign: "center" } }, React.createElement(MUI.CircularProgress, { size: 24 })) : null,
                React.createElement(MUI.List, { dense: true },
                  rows.map((r: any) =>
                    React.createElement(MUI.ListItemButton, {
                      key: r.ICONVERSACION, selected: selected?.conversacion?.ICONVERSACION === r.ICONVERSACION,
                      onClick: () => openConv(Number(r.ICONVERSACION)),
                    },
                      React.createElement(MUI.ListItemText, {
                        primary: r.TITULO || ("Conv #" + r.ICONVERSACION),
                        secondary: String(r.FHULTACT).slice(0, 16) + " · " + r.QMENSAJES + " msgs",
                      }))))),
              React.createElement(MUI.Grid, { item: true, xs: 12, md: 8, sx: { height: "100%", overflow: "auto", p: 2 } },
                !selected && React.createElement(MUI.Typography, { color: "text.secondary" }, "Selecciona una conversación"),
                selected && React.createElement(MUI.Stack, { spacing: 2 },
                  React.createElement(MUI.Typography, { variant: "h6" },
                    selected.conversacion.TITULO || ("#" + selected.conversacion.ICONVERSACION)),
                  (selected.turnos || []).map((t: any) =>
                    React.createElement(MUI.Paper, { key: t.ITURNO, sx: { p: 2 } },
                      React.createElement(MUI.Typography, { variant: "caption", color: "text.secondary" },
                        "Turno " + (t.ITURNINDEX ?? "—") + " · " + String(t.TS).slice(0, 19)),
                      React.createElement(MUI.Typography, { variant: "body2", sx: { mt: 1, fontWeight: 600 } }, "Prompt"),
                      React.createElement(MUI.Typography, { variant: "body2", sx: { whiteSpace: "pre-wrap" } }, t.PROMPTTEXT),
                      React.createElement(MUI.Typography, { variant: "body2", sx: { mt: 1, fontWeight: 600 } }, "Respuesta"),
                      React.createElement(MUI.Typography, { variant: "body2", sx: { whiteSpace: "pre-wrap" } }, t.RESPONSETEXT))))))))));
  }

  w.CONV = w.CONV || {};
  w.CONV.mount = function () {
    (window as any).ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
  };
  w.CONV.mount();
})();
