import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import type { HeroContent } from "@/lib/api";

interface HeroEditorProps {
  content: HeroContent;
  onSave: (data: HeroContent) => void;
  onChange: () => void;
  saving: boolean;
}

export function HeroEditor({ content, onSave, onChange, saving }: HeroEditorProps) {
  const [formData, setFormData] = useState<HeroContent>(content);

  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleChange = (field: keyof HeroContent, value: string) => {
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
          <Label htmlFor="heading">Main Heading</Label>
          <Input
            id="heading"
            value={formData.heading}
            onChange={(e) => handleChange("heading", e.target.value)}
            placeholder="Schedule a Free Consultation"
          />
          <p className="text-xs text-muted-foreground">The big title visitors see first</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subheading">Subheading</Label>
          <Input
            id="subheading"
            value={formData.subheading}
            onChange={(e) => handleChange("subheading", e.target.value)}
            placeholder="Attorney Enoch P. Hicks"
          />
          <p className="text-xs text-muted-foreground">Appears above the main heading</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tagline">Tagline</Label>
        <Textarea
          id="tagline"
          value={formData.tagline}
          onChange={(e) => handleChange("tagline", e.target.value)}
          placeholder="Simplifying the complexities of the legal system."
          rows={2}
        />
        <p className="text-xs text-muted-foreground">A brief description that appears below the heading</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="ctaText">Button Text</Label>
          <Input
            id="ctaText"
            value={formData.ctaText}
            onChange={(e) => handleChange("ctaText", e.target.value)}
            placeholder="Schedule a Free Consultation"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ctaLink">Button Link</Label>
          <Input
            id="ctaLink"
            value={formData.ctaLink}
            onChange={(e) => handleChange("ctaLink", e.target.value)}
            placeholder="#contact"
          />
          <p className="text-xs text-muted-foreground">Use #contact to scroll to contact section</p>
        </div>
      </div>

      {/* Preview */}
      <div className="border rounded-lg p-6 bg-slate-900 text-white">
        <p className="text-xs text-slate-400 mb-4">PREVIEW</p>
        <span className="inline-block px-3 py-1 text-sm bg-yellow-500/20 text-yellow-400 rounded-full mb-3">
          {formData.subheading}
        </span>
        <h2 className="text-2xl font-bold mb-2">{formData.heading}</h2>
        <p className="text-slate-300 mb-4">{formData.tagline}</p>
        <span className="inline-block px-4 py-2 bg-primary text-white rounded-lg text-sm">
          {formData.ctaText}
        </span>
      </div>

      <Button type="submit" disabled={saving}>
        <Save className="w-4 h-4 mr-2" />
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
