import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import type { SiteSettings } from "@/lib/api";

interface SettingsEditorProps {
  content: SiteSettings;
  onSave: (data: SiteSettings) => void;
  onChange: () => void;
  saving: boolean;
}

export function SettingsEditor({ content, onSave, onChange, saving }: SettingsEditorProps) {
  const [formData, setFormData] = useState<SiteSettings>(content);

  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleChange = (field: keyof SiteSettings, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    onChange();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="siteName">Site Name</Label>
          <Input
            id="siteName"
            value={formData.siteName}
            onChange={(e) => handleChange("siteName", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Displayed in the header and footer</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="copyright">Copyright Text</Label>
          <Input
            id="copyright"
            value={formData.copyright}
            onChange={(e) => handleChange("copyright", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Displayed in the footer</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="metaDescription">Meta Description</Label>
        <Textarea
          id="metaDescription"
          value={formData.metaDescription}
          onChange={(e) => handleChange("metaDescription", e.target.value)}
          rows={3}
        />
        <p className="text-xs text-muted-foreground">
          Used for SEO - describes your website to search engines
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="logo">Logo URL</Label>
          <Input
            id="logo"
            value={formData.logo}
            onChange={(e) => handleChange("logo", e.target.value)}
            placeholder="/images/logo.png"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="favicon">Favicon URL</Label>
          <Input
            id="favicon"
            value={formData.favicon}
            onChange={(e) => handleChange("favicon", e.target.value)}
            placeholder="/images/favicon.ico"
          />
        </div>
      </div>

      <Button type="submit" disabled={saving}>
        <Save className="w-4 h-4 mr-2" />
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
