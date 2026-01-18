import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { fetchAllContent, updateSection, uploadImage, type AllContent } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  Home, 
  Eye, 
  Sparkles, 
  Briefcase, 
  Workflow, 
  FileText, 
  Quote, 
  Users, 
  Mail, 
  Settings,
  CheckCircle2,
  AlertCircle,
  Save
} from "lucide-react";
import { HeroEditor } from "@/components/admin/HeroEditor";
import { PracticeAreasEditor } from "@/components/admin/PracticeAreasEditor";
import { HowItWorksEditor } from "@/components/admin/HowItWorksEditor";
import { TeamEditor } from "@/components/admin/TeamEditor";
import { ContactEditor } from "@/components/admin/ContactEditor";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { QuoteEditor } from "@/components/admin/QuoteEditor";
import { SettingsEditor } from "@/components/admin/SettingsEditor";

export function Admin() {
  const { user, token, logout, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState<AllContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/admin/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchAllContent();
        setContent(data);
      } catch (error) {
        console.error("Failed to load content:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadContent();
    }
  }, [user]);

  const handleSave = async (section: string, data: unknown) => {
    if (!token) return;

    setSaving(true);
    setSaveMessage(null);

    try {
      await updateSection(section, data, token);
      setSaveMessage({ type: "success", text: `${section} saved successfully!` });
      setHasChanges(false);
      
      // Refresh content
      const newContent = await fetchAllContent();
      setContent(newContent);

      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage({ type: "error", text: `Failed to save ${section}` });
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    // Image upload via Supabase Storage would need to be implemented
    // For now, users can use image URLs directly
    throw new Error("Image upload not yet implemented. Please use image URLs directly.");
  };

  const handleContentChange = () => {
    setHasChanges(true);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S to save (if there are changes)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (hasChanges && content) {
          // Find the active tab and trigger save
          const activeTab = document.querySelector('[role="tab"][data-state="active"]');
          if (activeTab) {
            const tabValue = activeTab.getAttribute('data-value');
            if (tabValue) {
              // Trigger save for the active section
              const form = document.querySelector(`[data-section="${tabValue}"] form`);
              if (form) {
                (form as HTMLFormElement).requestSubmit();
              }
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasChanges, content]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">Failed to load content</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveMessage && (
              <div
                className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg font-medium transition-all ${
                  saveMessage.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {saveMessage.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {saveMessage.text}
              </div>
            )}
            {hasChanges && !saveMessage && (
              <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg font-medium">
                <AlertCircle className="w-4 h-4" />
                Unsaved changes
                <span className="text-xs text-amber-600/70 ml-2">(Ctrl+S to save)</span>
              </div>
            )}
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="w-4 h-4" />
                View Site
              </Button>
            </a>
            <a href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </a>
            <Button variant="outline" size="sm" onClick={logout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="bg-white border-2 p-1.5 flex-wrap h-auto gap-1 shadow-sm">
            <TabsTrigger value="hero" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Sparkles className="w-4 h-4" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="practiceAreas" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Briefcase className="w-4 h-4" />
              Practice Areas
            </TabsTrigger>
            <TabsTrigger value="howItWorks" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Workflow className="w-4 h-4" />
              How It Works
            </TabsTrigger>
            <TabsTrigger value="blog" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <FileText className="w-4 h-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="quote" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Quote className="w-4 h-4" />
              Quote
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Users className="w-4 h-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Mail className="w-4 h-4" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <div data-section="hero">
              <EditorCard
                title="Hero Section"
                description="Edit the main banner that visitors see first"
              >
                <HeroEditor
                  content={content.hero}
                  onSave={(data) => handleSave("hero", data)}
                  onChange={handleContentChange}
                  saving={saving}
                />
              </EditorCard>
            </div>
          </TabsContent>

          <TabsContent value="practiceAreas">
            <div data-section="practiceAreas">
              <EditorCard
                title="Practice Areas"
                description="Manage your legal practice areas and services"
              >
                <PracticeAreasEditor
                  content={content.practiceAreas}
                  onSave={(data) => handleSave("practiceAreas", data)}
                  onChange={handleContentChange}
                  saving={saving}
                />
              </EditorCard>
            </div>
          </TabsContent>

          <TabsContent value="howItWorks">
            <div data-section="howItWorks">
              <EditorCard
                title="How It Works"
                description="Edit the process steps shown to clients"
              >
                <HowItWorksEditor
                  content={content.howItWorks}
                  onSave={(data) => handleSave("howItWorks", data)}
                  onChange={handleContentChange}
                  saving={saving}
                />
              </EditorCard>
            </div>
          </TabsContent>

          <TabsContent value="blog">
            <div data-section="blog">
              <EditorCard
                title="Blog Posts"
                description="Manage your blog articles and case studies"
              >
                <BlogEditor
                  content={content.blog}
                  onSave={(data) => handleSave("blog", data)}
                  onChange={handleContentChange}
                  onImageUpload={handleImageUpload}
                  saving={saving}
                />
              </EditorCard>
            </div>
          </TabsContent>

          <TabsContent value="quote">
            <div data-section="quote">
              <EditorCard
                title="Attorney Quote"
                description="Edit the featured quote displayed on the website"
              >
                <QuoteEditor
                  content={content.quote}
                  onSave={(data) => handleSave("quote", data)}
                  onChange={handleContentChange}
                  saving={saving}
                />
              </EditorCard>
            </div>
          </TabsContent>

          <TabsContent value="team">
            <div data-section="team">
              <EditorCard
                title="Team Members"
                description="Manage your team profiles"
              >
                <TeamEditor
                  content={content.team}
                  onSave={(data) => handleSave("team", data)}
                  onChange={handleContentChange}
                  onImageUpload={handleImageUpload}
                  saving={saving}
                />
              </EditorCard>
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <div data-section="contact">
              <EditorCard
                title="Contact Information"
                description="Update your contact details and office hours"
              >
                <ContactEditor
                  content={content.contact}
                  onSave={(data) => handleSave("contact", data)}
                  onChange={handleContentChange}
                  saving={saving}
                />
              </EditorCard>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div data-section="settings">
              <EditorCard
                title="Site Settings"
                description="General website configuration"
              >
                <SettingsEditor
                  content={content.siteSettings}
                  onSave={(data) => handleSave("siteSettings", data)}
                  onChange={handleContentChange}
                  saving={saving}
                />
              </EditorCard>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function EditorCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border-2 shadow-lg overflow-hidden">
      <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
      </div>
      <div className="p-6 bg-gray-50/50">{children}</div>
    </div>
  );
}
