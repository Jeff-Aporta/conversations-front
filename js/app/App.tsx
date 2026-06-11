(function () {
  "use strict";
  const MUI = MaterialUI;

  interface ConvRow {
    ICONVERSACION: number;
    TITULO?: string;
    FHULTACT?: string;
    QMENSAJES?: number;
  }

  interface TurnoRow {
    ITURNO: number;
    ITURNINDEX?: number;
    TS?: string;
    PROMPTTEXT?: string;
    RESPONSETEXT?: string;
  }

  interface ConvDetail {
    conversacion: ConvRow;
    turnos?: TurnoRow[];
  }

  function App() {
    const Shell = window.ISAFront.Layout.AppShell;
    const [rows, setRows] = React.useState<ConvRow[]>([]);
    const [selected, setSelected] = React.useState<ConvDetail | null>(null);
    const [err, setErr] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const reload = React.useCallback(async () => {
      if (!window.CONV.Auth.isLoggedIn()) return;
      setLoading(true); setErr("");
      try {
        const data = await window.CONV.Api.list();
        setRows((data.rows || []) as ConvRow[]);
      } catch (e) {
        setErr(e instanceof Error ? e.message : String(e));
      } finally { setLoading(false); }
    }, []);

    React.useEffect(() => { reload(); }, [reload]);

    async function openConv(id: number) {
      try { setSelected(await window.CONV.Api.get(id) as unknown as ConvDetail); } catch (e) {
        setErr(e instanceof Error ? e.message : String(e));
      }
    }

    const panel = React.createElement(MUI.Grid, { container: true, sx: { height: "100%" } },
      React.createElement(MUI.Grid, { size: { xs: 12, md: 4 }, sx: { height: "100%", borderRight: 1, borderColor: "divider", overflow: "auto" } },
        err ? React.createElement(MUI.Alert, { severity: "error", sx: { m: 1 } }, err) : null,
        loading ? React.createElement(MUI.Box, { sx: { p: 2, textAlign: "center" } }, React.createElement(MUI.CircularProgress, { size: 24 })) : null,
        React.createElement(MUI.List, { dense: true },
          rows.map((r) =>
            React.createElement(MUI.ListItemButton, {
              key: r.ICONVERSACION, selected: selected?.conversacion?.ICONVERSACION === r.ICONVERSACION,
              onClick: () => openConv(Number(r.ICONVERSACION)),
            },
              React.createElement(MUI.ListItemText, {
                primary: r.TITULO || ("Conv #" + r.ICONVERSACION),
                secondary: String(r.FHULTACT).slice(0, 16) + " · " + r.QMENSAJES + " msgs",
              }))))),
      React.createElement(MUI.Grid, { size: { xs: 12, md: 8 }, sx: { height: "100%", overflow: "auto", p: 2 } },
        !selected && React.createElement(MUI.Typography, { color: "text.secondary" }, "Selecciona una conversación"),
        selected && React.createElement(MUI.Stack, { spacing: 2 },
          React.createElement(MUI.Typography, { variant: "h6" },
            selected.conversacion.TITULO || ("#" + selected.conversacion.ICONVERSACION)),
          (selected.turnos || []).map((t) =>
            React.createElement(MUI.Paper, { key: t.ITURNO, sx: { p: 2 } },
              React.createElement(MUI.Typography, { variant: "caption", color: "text.secondary" },
                "Turno " + (t.ITURNINDEX ?? "—") + " · " + String(t.TS).slice(0, 19)),
              React.createElement(MUI.Typography, { variant: "body2", sx: { mt: 1, fontWeight: 600 } }, "Prompt"),
              React.createElement(MUI.Typography, { variant: "body2", sx: { whiteSpace: "pre-wrap" } }, t.PROMPTTEXT),
              React.createElement(MUI.Typography, { variant: "body2", sx: { mt: 1, fontWeight: 600 } }, "Respuesta"),
              React.createElement(MUI.Typography, { variant: "body2", sx: { whiteSpace: "pre-wrap" } }, t.RESPONSETEXT))))));

    return React.createElement(Shell, {
      ns: "CONV",
      title: "Conversaciones",
      icon: "mdi:forum-outline",
      loginGate: true,
      toolbarExtra: React.createElement(MUI.Button, { size: "small", onClick: reload }, "Recargar"),
    }, panel);
  }

  window.CONV = window.CONV || ({} as ConvNs);
  window.CONV.mount = function () {
    const root = document.getElementById("root");
    if (!root) throw new Error("No se encontró #root");
    ReactDOM.createRoot(root).render(React.createElement(App));
  };
  window.CONV.mount();
})();
