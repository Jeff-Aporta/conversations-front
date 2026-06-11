(function () {
  "use strict";
  async function api<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(window.CONV.Config.apiUrl(path), {
      ...init,
      headers: { "Content-Type": "application/json", ...window.CONV.Auth.authHeader(), ...(init?.headers || {}) },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || res.statusText);
    return data as T;
  }

  window.CONV = window.CONV || ({} as ConvNs);
  window.CONV.Api = {
    list: (itercero?: string, icontacto?: string) =>
      api("/conversaciones?itercero=" + encodeURIComponent(itercero || "lab") + "&icontacto=" + encodeURIComponent(icontacto || "lab")),
    get: (id: number) => api("/conversacion/" + id),
    create: () => api("/conversaciones", { method: "POST", body: "{}" }),
    instrucciones: () => api("/instrucciones"),
    tipos: () => api("/tipos-consulta"),
  };
})();
