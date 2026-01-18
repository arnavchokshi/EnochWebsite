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
          <Label htmlFor="siteName" className="font-medium">Site Name</Label>
          <Input
            id="siteName"
            value={formData.siteName}
            onChange={(e) => handleChange("siteName", e.target.value)}
            placeholder="Law Office of Enoch P. Hicks"
            className="font-medium"
          />
          <p className="text-xs text-gray-500">Displayed in the header and footer</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="copyright" className="font-medium">Copyright Text</Label>
          <Input
            id="copyright"
            value={formData.copyright}
            onChange={(e) => handleChange("copyright", e.target.value)}
            placeholder="© 2024 Law Office of Enoch P. Hicks"
            className="font-medium"
          />
          <p className="text-xs text-gray-500">Displayed in the footer</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="metaDescription" className="font-medium">Meta Description</Label>
          <span className="text-xs text-gray-500">{formData.metaDescription.length} characters</span>
        </div>
        <Textarea
          id="metaDescription"
          value={formData.metaDescription}
          onChange={(e) => handleChange("metaDescription", e.target.value)}
          rows={3}
          placeholder="Expert legal services in business law, personal injury, and estate planning..."
          className="resize-none"
        />
        <p className="text-xs text-gray-500">
          Used for SEO - describes your website to search engines (recommended: 150-160 characters)
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="logo" className="font-medium">Logo URL</Label>
          <Input
            id="logo"
            value={formData.logo}
            onChange={(e) => handleChange("logo", e.target.value)}
            placeholder="/images/logo.png"
            className="font-mono text-sm"
          />
          <p className="text-xs text-gray-500">Path or URL to your logo image</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="favicon" className="font-medium">Favicon URL</Label>
          <Input
            id="favicon"
            value={formData.favicon}
            onChange={(e) => handleChange("favicon", e.target.value)}
            placeholder="/images/favicon.ico"
            className="font-mono text-sm"
          />
          <p className="text-xs text-gray-500">Path or URL to your favicon</p>
        </div>
      </div>

      <div className="pt-4 border-t">
        <Button type="submit" disabled={saving} size="lg" className="gap-2">
          <Save className="w-5 h-5" />
          {saving ? "Saving Changes..." : "Save All Changes"}
        </Button>
      </div>
    </form>
  );
}
