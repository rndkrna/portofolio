import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { 
  User, Folder, Calendar, Mail, LogOut, 
  Plus, Trash, Upload, Check, AlertCircle, Eye, Edit
} from "lucide-react";
import { toast } from "sonner";

interface ProfileData {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  quote: string;
}

interface ProjectData {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
  link: string | null;
}

interface ExperienceData {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  type: string;
}

interface MessageData {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("admin_token")
  );
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "experiences" | "messages">("profile");

  // State lists
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [messages, setMessages] = useState<MessageData[]>([]);

  // Form states
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Editing states
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const [editingExperience, setEditingExperience] = useState<ExperienceData | null>(null);

  // Project form
  const [newProject, setNewProject] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    year: new Date().getFullYear().toString(),
    link: ""
  });

  // Experience form
  const [newExperience, setNewExperience] = useState({
    role: "",
    company: "",
    period: "",
    description: "",
    type: "professional"
  });

  // Fetch all dashboard data
  const fetchData = async () => {
    try {
      const pRes = await fetch("/api/profile");
      if (pRes.ok) setProfile(await pRes.json());

      const prRes = await fetch("/api/projects");
      if (prRes.ok) setProjects(await prRes.json());

      const eRes = await fetch("/api/experiences");
      if (eRes.ok) setExperiences(await eRes.json());

      const mRes = await fetch("/api/messages");
      if (mRes.ok) setMessages(await mRes.json());
    } catch (e) {
      console.error("Gagal memuat data admin:", e);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("admin_token", data.token);
        setToken(data.token);
        toast.success("Login berhasil!");
      } else {
        toast.error(data.error || "Password salah!");
      }
    } catch (e) {
      toast.error("Gagal menghubungi server API");
    } finally {
      setLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    toast.success("Berhasil logout");
  };

  // File Upload Helper
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            base64: reader.result as string
          })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          callback(data.url);
          toast.success("File berhasil diunggah!");
        } else {
          toast.error("Gagal mengunggah file.");
        }
      } catch (err) {
        toast.error("Error saat mengunggah file");
      } finally {
        setUploading(false);
      }
    };
  };

  // Save Profile Changes
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });
      if (res.ok) {
        toast.success("Profil berhasil diperbarui!");
      } else {
        toast.error("Gagal menyimpan profil.");
      }
    } catch (err) {
      toast.error("Error menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  // Save or Edit Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.category || !newProject.image) {
      toast.error("Harap isi Judul, Kategori, dan Gambar.");
      return;
    }

    setLoading(true);
    try {
      const isEdit = editingProject !== null;
      const url = isEdit ? `/api/projects/${editingProject.id}` : "/api/projects";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProject,
          link: newProject.link || null
        })
      });

      if (res.ok) {
        toast.success(isEdit ? "Proyek berhasil diperbarui!" : "Proyek berhasil ditambahkan!");
        setNewProject({
          title: "",
          category: "",
          description: "",
          image: "",
          year: new Date().getFullYear().toString(),
          link: ""
        });
        setEditingProject(null);
        fetchData();
      } else {
        toast.error(isEdit ? "Gagal memperbarui proyek." : "Gagal menambahkan proyek.");
      }
    } catch (err) {
      toast.error("Error server.");
    } finally {
      setLoading(false);
    }
  };

  const startEditProject = (project: ProjectData) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image,
      year: project.year,
      link: project.link || ""
    });
  };

  const cancelEditProject = () => {
    setEditingProject(null);
    setNewProject({
      title: "",
      category: "",
      description: "",
      image: "",
      year: new Date().getFullYear().toString(),
      link: ""
    });
  };

  // Delete Project
  const handleDeleteProject = async (id: number) => {
    if (!confirm("Hapus proyek ini?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Proyek berhasil dihapus.");
        fetchData();
      } else {
        toast.error("Gagal menghapus proyek.");
      }
    } catch (err) {
      toast.error("Error server.");
    }
  };

  // Save or Edit Experience
  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExperience.role || !newExperience.company || !newExperience.period) {
      toast.error("Harap isi Peran, Instansi, dan Periode.");
      return;
    }

    setLoading(true);
    try {
      const isEdit = editingExperience !== null;
      const url = isEdit ? `/api/experiences/${editingExperience.id}` : "/api/experiences";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExperience)
      });

      if (res.ok) {
        toast.success(isEdit ? "Pengalaman berhasil diperbarui!" : "Pengalaman berhasil ditambahkan!");
        setNewExperience({
          role: "",
          company: "",
          period: "",
          description: "",
          type: "professional"
        });
        setEditingExperience(null);
        fetchData();
      } else {
        toast.error(isEdit ? "Gagal memperbarui pengalaman." : "Gagal menambahkan pengalaman.");
      }
    } catch (err) {
      toast.error("Error server.");
    } finally {
      setLoading(false);
    }
  };

  const startEditExperience = (exp: ExperienceData) => {
    setEditingExperience(exp);
    setNewExperience({
      role: exp.role,
      company: exp.company,
      period: exp.period,
      description: exp.description,
      type: exp.type
    });
  };

  const cancelEditExperience = () => {
    setEditingExperience(null);
    setNewExperience({
      role: "",
      company: "",
      period: "",
      description: "",
      type: "professional"
    });
  };

  // Delete Experience
  const handleDeleteExperience = async (id: number) => {
    if (!confirm("Hapus pengalaman ini?")) return;

    try {
      const res = await fetch(`/api/experiences/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Pengalaman berhasil dihapus.");
        fetchData();
      } else {
        toast.error("Gagal menghapus pengalaman.");
      }
    } catch (err) {
      toast.error("Error server.");
    }
  };

  // Delete Message
  const handleDeleteMessage = async (id: number) => {
    if (!confirm("Hapus pesan ini dari inbox?")) return;

    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Pesan berhasil dihapus.");
        fetchData();
      } else {
        toast.error("Gagal menghapus pesan.");
      }
    } catch (err) {
      toast.error("Error server.");
    }
  };

  // Login View
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12 relative overflow-hidden select-none">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-md w-full bg-card/30 backdrop-blur-md border border-border/60 p-8 rounded-lg shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display uppercase tracking-widest text-foreground">Admin Portal</h2>
            <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mt-2">Personal Control Panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-background/50 border border-border/80 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm font-sans tracking-widest"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-sans uppercase tracking-[0.2em] text-xs py-4 px-6 rounded-sm transition-colors cursor-pointer"
            >
              {loading ? "Verifying..." : "Access Control"}
            </button>
          </form>
          
          <div className="text-center mt-8">
            <button 
              onClick={() => setLocation("/")}
              className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row text-foreground">
      {/* Sidebar navigation */}
      <aside className="lg:w-64 bg-card/25 backdrop-blur-sm border-r border-border/50 p-6 flex flex-col justify-between">
        <div>
          {/* Logo/Identity */}
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-lg font-display uppercase tracking-widest font-bold">Renda K. M.</h2>
            <p className="text-[10px] text-primary uppercase tracking-[0.25em]">Admin Dashboard</p>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm uppercase tracking-wider transition-colors hover-target ${
                activeTab === "profile" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-card/45 hover:text-foreground"
              }`}
            >
              <User size={16} /> Profile Settings
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm uppercase tracking-wider transition-colors hover-target ${
                activeTab === "projects" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-card/45 hover:text-foreground"
              }`}
            >
              <Folder size={16} /> Manage Projects
            </button>

            <button
              onClick={() => setActiveTab("experiences")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm uppercase tracking-wider transition-colors hover-target ${
                activeTab === "experiences" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-card/45 hover:text-foreground"
              }`}
            >
              <Calendar size={16} /> Chronology
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm uppercase tracking-wider transition-colors hover-target relative ${
                activeTab === "messages" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-card/45 hover:text-foreground"
              }`}
            >
              <Mail size={16} /> Inbox
              {messages.length > 0 && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-destructive text-destructive-foreground text-[10px] font-mono px-2 py-0.5 rounded-full">
                  {messages.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Bottom controls */}
        <div className="pt-6 border-t border-border/40 mt-8 lg:mt-0">
          <button
            onClick={() => setLocation("/")}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider hover-target mb-2"
          >
            <Eye size={16} /> View Website
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-destructive transition-colors uppercase tracking-wider hover-target"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-8 lg:p-12 overflow-y-auto max-w-5xl">
        
        {/* Profile Settings Tab */}
        {activeTab === "profile" && profile && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-display uppercase tracking-widest">Profile Configuration</h2>
              <p className="text-sm text-muted-foreground">Perbarui informasi utama biodata Anda yang tampil di halaman depan.</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6 bg-card/20 border border-border/40 p-8 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-background/40 border border-border/80 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Peran / Tagline Utama</label>
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="w-full bg-background/40 border border-border/80 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Mini Bio (Hero)</label>
                <textarea
                  value={profile.bio}
                  rows={2}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-background/40 border border-border/80 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm resize-none font-light leading-relaxed"
                />
              </div>

              {/* Avatar Upload */}
              <div className="border border-border/30 bg-background/10 p-6 rounded-sm flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-border/80 bg-card">
                  <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-semibold uppercase tracking-wider mb-1">Foto Profil</h4>
                  <p className="text-xs text-muted-foreground mb-4">Unggah file foto baru Anda (.png, .jpg) untuk ganti di splash & homepage.</p>
                  
                  <div className="flex items-center gap-3">
                    <label className="bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-sm text-xs font-sans uppercase tracking-widest cursor-pointer flex items-center gap-2 hover-target">
                      <Upload size={14} />
                      {uploading ? "Uploading..." : "Pilih File"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => setProfile({ ...profile, avatar: url }))}
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-muted-foreground font-mono">{profile.avatar}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-4 border-t border-border/40">
                <h3 className="text-lg font-display uppercase tracking-widest text-primary">Tentang Saya (Narrative)</h3>
                
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Paragraf 1</label>
                  <textarea
                    value={profile.aboutParagraph1}
                    rows={4}
                    onChange={(e) => setProfile({ ...profile, aboutParagraph1: e.target.value })}
                    className="w-full bg-background/40 border border-border/80 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm font-light leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Paragraf 2</label>
                  <textarea
                    value={profile.aboutParagraph2}
                    rows={4}
                    onChange={(e) => setProfile({ ...profile, aboutParagraph2: e.target.value })}
                    className="w-full bg-background/40 border border-border/80 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm font-light leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Quote (Kutipan Utama)</label>
                  <input
                    type="text"
                    value={profile.quote}
                    onChange={(e) => setProfile({ ...profile, quote: e.target.value })}
                    className="w-full bg-background/40 border border-border/80 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm font-light"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary/95 text-primary-foreground px-8 py-3 rounded-sm text-xs font-sans uppercase tracking-[0.2em] font-semibold cursor-pointer hover-target"
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </form>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-display uppercase tracking-widest">Manage Projects</h2>
              <p className="text-sm text-muted-foreground">Tambah dan hapus proyek yang tampil di bagian "Selected Works".</p>
            </div>

            {/* Add New Project Form */}
            <form onSubmit={handleSaveProject} className="bg-card/20 border border-border/40 p-8 rounded-md space-y-6">
              <h3 className="text-lg font-display uppercase tracking-widest text-primary mb-2">
                {editingProject ? "Edit Proyek" : "Tambah Proyek Baru"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Judul Proyek</label>
                  <input
                    type="text"
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="Contoh: Detik1Aceh"
                    className="w-full bg-background/40 border border-border/80 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Kategori / Metode</label>
                  <input
                    type="text"
                    required
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    placeholder="Contoh: Media News Platform / Fullstack"
                    className="w-full bg-background/40 border border-border/80 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Tahun</label>
                  <input
                    type="text"
                    required
                    value={newProject.year}
                    onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                    className="w-full bg-background/40 border border-border/80 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Link Proyek (Opsional)</label>
                  <input
                    type="url"
                    value={newProject.link}
                    onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full bg-background/40 border border-border/80 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm"
                  />
                </div>
              </div>

              {/* Image Upload for Project */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Gambar Proyek</label>
                <div className="border border-border/30 bg-background/10 p-5 rounded-sm flex flex-col sm:flex-row items-center gap-6">
                  {newProject.image && (
                    <div className="w-24 h-18 overflow-hidden rounded border border-border bg-card">
                      <img src={newProject.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-grow">
                    <div className="flex items-center gap-3">
                      <label className="bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-sm text-xs font-sans uppercase tracking-widest cursor-pointer flex items-center gap-2 hover-target">
                        <Upload size={14} />
                        {uploading ? "Uploading..." : "Unggah Gambar"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (url) => setNewProject({ ...newProject, image: url }))}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-muted-foreground font-mono">{newProject.image || "Belum ada gambar"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Deskripsi Proyek</label>
                <textarea
                  value={newProject.description}
                  rows={3}
                  required
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Ceritakan kontribusi dan teknologi yang digunakan..."
                  className="w-full bg-background/40 border border-border/80 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm font-light resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-primary/95 text-primary-foreground px-8 py-3 rounded-sm text-xs font-sans uppercase tracking-[0.2em] font-semibold cursor-pointer hover-target"
                >
                  {loading ? "Menyimpan..." : (editingProject ? "Simpan Perubahan" : "Tambah Proyek")}
                </button>
                {editingProject && (
                  <button
                    type="button"
                    onClick={cancelEditProject}
                    className="bg-secondary hover:bg-secondary/80 text-foreground px-8 py-3 rounded-sm text-xs font-sans uppercase tracking-[0.2em] font-semibold cursor-pointer hover-target"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>

            {/* List of existing projects */}
            <div className="space-y-4">
              <h3 className="text-lg font-display uppercase tracking-widest text-foreground">Daftar Proyek Aktif</h3>
              <div className="border border-border/40 rounded-md overflow-hidden bg-card/10">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/40 bg-card/30 text-xs uppercase tracking-widest text-muted-foreground">
                      <th className="p-4 w-20">Gambar</th>
                      <th className="p-4">Proyek</th>
                      <th className="p-4">Kategori</th>
                      <th className="p-4">Tahun</th>
                      <th className="p-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30 text-sm">
                    {projects.map((proj) => (
                      <tr key={proj.id} className="hover:bg-card/20 transition-colors">
                        <td className="p-4">
                          <img src={proj.image} alt={proj.title} className="w-12 h-9 object-cover rounded border" />
                        </td>
                        <td className="p-4 font-semibold text-foreground">{proj.title}</td>
                        <td className="p-4 text-muted-foreground">{proj.category}</td>
                        <td className="p-4 text-muted-foreground font-mono">{proj.year}</td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          <button
                            onClick={() => startEditProject(proj)}
                            className="text-primary hover:bg-primary/10 p-2 rounded transition-all cursor-pointer hover-target"
                            title="Edit Proyek"
                            type="button"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="text-destructive hover:bg-destructive/10 p-2 rounded transition-all cursor-pointer hover-target"
                            title="Hapus Proyek"
                          >
                            <Trash size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {projects.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                          Belum ada proyek di database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Experiences Tab */}
        {activeTab === "experiences" && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-display uppercase tracking-widest">Manage Chronology</h2>
              <p className="text-sm text-muted-foreground">Kelola linimasa karir dan kepemimpinan Anda.</p>
            </div>

            {/* Add New Experience Form */}
            <form onSubmit={handleSaveExperience} className="bg-card/20 border border-border/40 p-8 rounded-md space-y-6">
              <h3 className="text-lg font-display uppercase tracking-widest text-primary mb-2">
                {editingExperience ? "Edit Linimasa" : "Tambah Milestones Baru"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Jabatan / Peran</label>
                  <input
                    type="text"
                    required
                    value={newExperience.role}
                    onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                    placeholder="Contoh: Freelance Web Developer"
                    className="w-full bg-background/40 border border-border/80 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Nama Instansi / Organisasi</label>
                  <input
                    type="text"
                    required
                    value={newExperience.company}
                    onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                    placeholder="Contoh: PMII / BEM FTTK"
                    className="w-full bg-background/40 border border-border/80 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Periode</label>
                  <input
                    type="text"
                    required
                    value={newExperience.period}
                    onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                    placeholder="Contoh: Apr 2026 — Present"
                    className="w-full bg-background/40 border border-border/80 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Tipe Milestones</label>
                  <select
                    value={newExperience.type}
                    onChange={(e) => setNewExperience({ ...newExperience, type: e.target.value })}
                    className="w-full bg-background/40 border border-border/80 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm h-[46px]"
                  >
                    <option value="professional">Professional / Technical</option>
                    <option value="leadership">Leadership & Organizational</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Deskripsi Tanggung Jawab</label>
                <textarea
                  value={newExperience.description}
                  rows={3}
                  required
                  onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                  placeholder="Rincikan kontribusi atau metodologi kepemimpinan Anda..."
                  className="w-full bg-background/40 border border-border/80 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm font-light resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-primary/95 text-primary-foreground px-8 py-3 rounded-sm text-xs font-sans uppercase tracking-[0.2em] font-semibold cursor-pointer hover-target"
                >
                  {loading ? "Menyimpan..." : (editingExperience ? "Simpan Perubahan" : "Tambah Linimasa")}
                </button>
                {editingExperience && (
                  <button
                    type="button"
                    onClick={cancelEditExperience}
                    className="bg-secondary hover:bg-secondary/80 text-foreground px-8 py-3 rounded-sm text-xs font-sans uppercase tracking-[0.2em] font-semibold cursor-pointer hover-target"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>

            {/* List of existing experiences */}
            <div className="space-y-4">
              <h3 className="text-lg font-display uppercase tracking-widest text-foreground">Daftar Linimasa Aktif</h3>
              <div className="border border-border/40 rounded-md overflow-hidden bg-card/10">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/40 bg-card/30 text-xs uppercase tracking-widest text-muted-foreground">
                      <th className="p-4">Peran</th>
                      <th className="p-4">Instansi</th>
                      <th className="p-4">Periode</th>
                      <th className="p-4">Tipe</th>
                      <th className="p-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30 text-sm">
                    {experiences.map((exp) => (
                      <tr key={exp.id} className="hover:bg-card/20 transition-colors">
                        <td className="p-4 font-semibold text-foreground">{exp.role}</td>
                        <td className="p-4 text-muted-foreground">{exp.company}</td>
                        <td className="p-4 text-muted-foreground font-mono">{exp.period}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 text-[10px] rounded-full uppercase tracking-wider ${
                            exp.type === "professional" ? "bg-primary/10 text-primary border border-primary/20" : "bg-accent/10 text-accent-foreground border border-accent/20"
                          }`}>
                            {exp.type}
                          </span>
                        </td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          <button
                            onClick={() => startEditExperience(exp)}
                            className="text-primary hover:bg-primary/10 p-2 rounded transition-all cursor-pointer hover-target"
                            title="Edit Linimasa"
                            type="button"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteExperience(exp.id)}
                            className="text-destructive hover:bg-destructive/10 p-2 rounded transition-all cursor-pointer hover-target"
                            title="Hapus Linimasa"
                          >
                            <Trash size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {experiences.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                          Belum ada linimasa di database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Messages Inbox Tab */}
        {activeTab === "messages" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-display uppercase tracking-widest font-semibold">Inbox Submission</h2>
              <p className="text-sm text-muted-foreground">Lihat pesan kontak masuk dari pengunjung portofolio Anda.</p>
            </div>

            <div className="space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-card/25 backdrop-blur-sm border border-border/40 p-6 rounded-md shadow flex flex-col gap-4 relative group">
                  <button
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="absolute right-4 top-4 text-muted-foreground hover:text-destructive p-2 rounded transition-all cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 hover-target"
                    title="Hapus Pesan"
                  >
                    <Trash size={16} />
                  </button>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        {msg.name}
                      </h4>
                      <a href={`mailto:${msg.email}`} className="text-xs text-primary hover:underline">{msg.email}</a>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">
                      {new Date(msg.createdAt).toLocaleString("id-ID")}
                    </span>
                  </div>

                  <p className="text-muted-foreground font-light leading-relaxed whitespace-pre-line text-sm">
                    {msg.message}
                  </p>
                </div>
              ))}

              {messages.length === 0 && (
                <div className="border border-border/40 p-12 rounded-md text-center bg-card/5">
                  <Mail size={32} className="text-muted-foreground mx-auto mb-4 opacity-40" />
                  <p className="text-muted-foreground font-light">Kotak masuk kosong. Belum ada pesan dari pengunjung.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
