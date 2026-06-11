(function () {
  "use strict";
  const w = window as any;

  async function api<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(w.CONV.Config.apiUrl(path), {
      ...init,
      headers: { "Content-Type": "application/json", ...w.CONV.Auth.authHeader(), ...(init?.headers || {}) },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || res.statusText);
    return data as T;
  }

  w.CONV = w.CONV || {};
  w.CONV.Api = {
    list: (itercero?: string, icontacto?: string) =>
      api("/conversaciones?itercero=" + encodeURIComponent(itercero || "lab") + "&icontacto=" + encodeURIComponent(icontacto || "lab")),
    get: (id: number) => api("/conversacion/" + id),
    create: () => api("/conversaciones", { method: "POST", body: "{}" }),
    instrucciones: () => api("/instrucciones"),
    tipos: () => api("/tipos-consulta"),
  };
})();
