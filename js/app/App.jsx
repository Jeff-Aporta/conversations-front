(function () {
  "use strict";
  const MUI = MaterialUI;

  function App() {
    const Shell = window.ISAFront.Layout.AppShell;
    const [rows, setRows] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const [err, setErr] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const reload = React.useCallback(async () => {
      if (!window.CONV.Auth.isLoggedIn()) return;
      setLoading(true); setErr("");
      try {
        const data = await window.CONV.Api.list();
        setRows(data.rows || []);
      } catch (e) {
        setErr(e instanceof Error ? e.message : String(e));
      } finally { setLoading(false); }
    }, []);

    React.useEffect(() => { reload(); }, [reload]);

    async function openConv(id) {
      try { setSelected(await window.CONV.Api.get(id)); } catch (e) {
        setErr(e instanceof Error ? e.message : String(e));
      }
    }

    const panel = (
      <MUI.Grid container sx={{ height: "100%" }}>
        <MUI.Grid size={{ xs: 12, md: 4 }} sx={{ height: "100%", borderRight: 1, borderColor: "divider", overflow: "auto" }}>
          {err ? <MUI.Alert severity="error" sx={{ m: 1 }}>{err}</MUI.Alert> : null}
          {loading ? (
            <MUI.Box sx={{ p: 2, textAlign: "center" }}><MUI.CircularProgress size={24} /></MUI.Box>
          ) : null}
          <MUI.List dense>
            {rows.map((r) => (
              <MUI.ListItemButton
                key={r.ICONVERSACION}
                selected={selected?.conversacion?.ICONVERSACION === r.ICONVERSACION}
                onClick={() => openConv(Number(r.ICONVERSACION))}
              >
                <MUI.ListItemText
                  primary={r.TITULO || ("Conv #" + r.ICONVERSACION)}
                  secondary={String(r.FHULTACT).slice(0, 16) + " · " + r.QMENSAJES + " msgs"}
                />
              </MUI.ListItemButton>
            ))}
          </MUI.List>
        </MUI.Grid>
        <MUI.Grid size={{ xs: 12, md: 8 }} sx={{ height: "100%", overflow: "auto", p: 2 }}>
          {!selected && <MUI.Typography color="text.secondary">Selecciona una conversación</MUI.Typography>}
          {selected && (
            <MUI.Stack spacing={2}>
              <MUI.Typography variant="h6">
                {selected.conversacion.TITULO || ("#" + selected.conversacion.ICONVERSACION)}
              </MUI.Typography>
              {(selected.turnos || []).map((t) => (
                <MUI.Paper key={t.ITURNO} sx={{ p: 2 }}>
                  <MUI.Typography variant="caption" color="text.secondary">
                    {"Turno " + (t.ITURNINDEX ?? "—") + " · " + String(t.TS).slice(0, 19)}
                  </MUI.Typography>
                  <MUI.Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>Prompt</MUI.Typography>
                  <MUI.Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{t.PROMPTTEXT}</MUI.Typography>
                  <MUI.Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>Respuesta</MUI.Typography>
                  <MUI.Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{t.RESPONSETEXT}</MUI.Typography>
                </MUI.Paper>
              ))}
            </MUI.Stack>
          )}
        </MUI.Grid>
      </MUI.Grid>
    );

    return (
      <Shell ns="CONV" title="Conversaciones" icon="mdi:forum-outline" loginGate toolbarExtra={<MUI.Button size="small" onClick={reload}>Recargar</MUI.Button>}>
        {panel}
      </Shell>
    );
  }

  window.CONV = window.CONV || {};
  window.CONV.mount = function () {
    const root = document.getElementById("root");
    if (!root) throw new Error("No se encontró #root");
    ReactDOM.createRoot(root).render(<App />);
  };
  window.CONV.mount();
})();
