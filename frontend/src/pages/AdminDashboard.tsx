import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { apiRequest, setToken } from "@/lib/api";

const ease = [0.19, 1, 0.22, 1] as const;

type UserQuery = {
  _id: string;
  name: string;
  email: string;
  contact: string;
  description: string;
  createdAt?: string;
};

type ClientCompany = {
  _id: string;
  name: string;
  logo: string;
  createdAt?: string;
};

const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [queries, setQueries] = useState<UserQuery[]>([]);
  const [clients, setClients] = useState<ClientCompany[]>([]);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [clientForm, setClientForm] = useState<{ name: string; logo: File | null }>({
    name: "",
    logo: null,
  });
  const [busyAction, setBusyAction] = useState("");

  useEffect(() => {
    async function checkSession() {
      try {
        await apiRequest("/admin/me");
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    }

    checkSession();
  }, []);

  useEffect(() => {
    if (!authenticated) {
      return;
    }

    void loadDashboardData();
  }, [authenticated]);

  async function loadDashboardData() {
    try {
      const [queryData, companyData] = await Promise.all([
        apiRequest("/admin/getquery"),
        apiRequest("/company/getcompany"),
      ]);

      setQueries(Array.isArray(queryData) ? (queryData as UserQuery[]) : []);
      setClients(Array.isArray(companyData) ? (companyData as ClientCompany[]) : []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load dashboard data");
    }
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    try {
      setBusyAction("login");
      const response = await apiRequest("/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });
      
      // Save the token from response
      if (response && typeof response === 'object' && 'token' in response) {
        setToken((response as { token: string }).token);
      }
      
      setAuthenticated(true);
      setLoginForm({ email: "", password: "" });
      toast.success("Admin login successful.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusyAction("");
    }
  }

  async function handleAddCompany(event: React.FormEvent) {
    event.preventDefault();

    if (!clientForm.logo) {
      toast.error("Company logo is required.");
      return;
    }

    try {
      setBusyAction("add-company");
      const formData = new FormData();
      formData.append("name", clientForm.name.trim());
      formData.append("logo", clientForm.logo);

      await apiRequest("/admin/addcompany", {
        method: "POST",
        body: formData,
      });

      setClientForm({ name: "", logo: null });
      await loadDashboardData();
      toast.success("Company added successfully.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add company");
    } finally {
      setBusyAction("");
    }
  }

  async function handleDeleteQuery(id: string) {
    try {
      setBusyAction(`delete-query-${id}`);
      await apiRequest(`/admin/deletequery/${id}`, {
        method: "DELETE",
      });
      setQueries((current) => current.filter((query) => query._id !== id));
      toast.success("Query deleted successfully.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete query");
    } finally {
      setBusyAction("");
    }
  }

  async function handleDeleteCompany(id: string) {
    try {
      setBusyAction(`delete-company-${id}`);
      await apiRequest(`/admin/deletecompany/${id}`, {
        method: "DELETE",
      });
      setClients((current) => current.filter((client) => client._id !== id));
      toast.success("Company deleted successfully.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete company");
    } finally {
      setBusyAction("");
    }
  }

  if (checkingAuth) {
    return (
      <section className="px-6 pb-24 pt-28 md:pt-32">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-card p-8 text-center text-muted-foreground">
          Checking admin session...
        </div>
      </section>
    );
  }

  if (!authenticated) {
    return (
      <section className="px-6 pb-24 pt-28 md:pt-32">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="rounded-[2rem] border border-border bg-card p-7 md:p-10"
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Admin Access</p>
            <h1 className="mt-4 text-4xl font-display tracking-tight md:text-6xl">
              Sign in to manage queries and companies.
            </h1>

            <form onSubmit={handleLogin} className="mt-10 space-y-6">
              <div className="border-b border-border pb-3 focus-within:border-primary transition-colors">
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="spark-input"
                  placeholder="admin@example.com"
                />
              </div>
              <div className="border-b border-border pb-3 focus-within:border-primary transition-colors">
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="spark-input"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                disabled={busyAction === "login"}
                className="w-full rounded-xl bg-primary py-3 font-medium text-primary-foreground disabled:opacity-70"
              >
                {busyAction === "login" ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 pb-24 pt-28 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="rounded-[2rem] border border-border bg-card p-7 md:p-10"
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Admin Dashboard</p>
          <h1 className="mt-4 text-4xl font-display tracking-tight md:text-6xl">
            Manage user queries and client companies.
          </h1>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background p-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">User Queries</p>
              <p className="mt-2 text-3xl font-display">{queries.length}</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Companies</p>
              <p className="mt-2 text-3xl font-display">{clients.length}</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-border bg-background p-6 md:p-8">
            <h2 className="text-3xl font-display">User Details and Queries</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Contact form submissions from the live backend appear here.
            </p>

            <div className="mt-6 space-y-4 max-h-[34rem] overflow-auto pr-1">
              {queries.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-5 text-sm text-muted-foreground">
                  No user queries yet.
                </div>
              ) : (
                queries.map((query) => (
                  <article key={query._id} className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-medium">{query.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {query.createdAt ? new Date(query.createdAt).toLocaleString() : "No timestamp"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{query.email}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{query.contact}</p>
                    <p className="mt-4 leading-relaxed">{query.description}</p>
                    <button
                      type="button"
                      onClick={() => handleDeleteQuery(query._id)}
                      disabled={busyAction === `delete-query-${query._id}`}
                      className="mt-5 rounded-xl bg-spark-charcoal px-4 py-2 text-sm font-medium text-white disabled:opacity-70"
                    >
                      {busyAction === `delete-query-${query._id}` ? "Deleting..." : "Delete Query"}
                    </button>
                  </article>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-border bg-background p-6 md:p-8">
            <h2 className="text-3xl font-display">Add Client Company</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Add companies with a logo, then remove them directly from the same dashboard.
            </p>

            <form onSubmit={handleAddCompany} className="mt-6 space-y-5">
              <div className="border-b border-border pb-3 focus-within:border-primary transition-colors">
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  className="spark-input"
                  placeholder="Example: Tata Motors"
                />
              </div>
              <div className="border-b border-border pb-3 focus-within:border-primary transition-colors">
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Company Logo
                </label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) =>
                    setClientForm({ ...clientForm, logo: e.target.files?.[0] || null })
                  }
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-foreground"
                />
              </div>
              <button
                type="submit"
                disabled={busyAction === "add-company"}
                className="w-full rounded-xl bg-primary py-3 font-medium text-primary-foreground disabled:opacity-70"
              >
                {busyAction === "add-company" ? "Adding Company..." : "Add Company"}
              </button>
            </form>

            <div className="mt-6 space-y-3 max-h-[22rem] overflow-auto pr-1">
              {clients.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-5 text-sm text-muted-foreground">
                  No companies added yet.
                </div>
              ) : (
                clients.map((client) => (
                  <div key={client._id} className="rounded-xl border border-border px-4 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-white p-2">
                        <img src={client.logo} alt={client.name} className="max-h-10 w-full object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client._id}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteCompany(client._id)}
                        disabled={busyAction === `delete-company-${client._id}`}
                        className="rounded-xl bg-spark-charcoal px-4 py-2 text-sm font-medium text-white disabled:opacity-70"
                      >
                        {busyAction === `delete-company-${client._id}` ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
