import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { fetchAllContent, updateSection, uploadImage, type AllContent } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Home, Eye } from "lucide-react";
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
    if (!token) throw new Error("Not authenticated");
    const result = await uploadImage(file, token);
    return `http://localhost:3001${result.url}`;
  };

  const handleContentChange = () => {
    setHasChanges(true);
  };

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
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">EPH</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveMessage && (
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  saveMessage.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {saveMessage.text}
              </span>
            )}
            {hasChanges && (
              <span className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                Unsaved changes
              </span>
            )}
            <a href="/" target="_blank">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Site
              </Button>
            </a>
            <a href="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </a>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="bg-white border p-1 flex-wrap h-auto">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="practiceAreas">Practice Areas</TabsTrigger>
            <TabsTrigger value="howItWorks">How It Works</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="quote">Quote</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
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
          </TabsContent>

          <TabsContent value="practiceAreas">
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
          </TabsContent>

          <TabsContent value="howItWorks">
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
          </TabsContent>

          <TabsContent value="blog">
            <EditorCard
              title="Blog Posts"
              description="Manage your blog articles and case studies"
            >
              <BlogEditor
                content={content.blog}
                onSave={(data) => handleSave("blog", data)}
                onChange={handleContentChange}
                saving={saving}
              />
            </EditorCard>
          </TabsContent>

          <TabsContent value="quote">
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
          </TabsContent>

          <TabsContent value="team">
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
          </TabsContent>

          <TabsContent value="contact">
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
          </TabsContent>

          <TabsContent value="settings">
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
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-500 text-sm mt-1">{description}</p>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
