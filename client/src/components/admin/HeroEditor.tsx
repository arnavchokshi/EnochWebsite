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
          <div className="flex items-center justify-between">
            <Label htmlFor="heading" className="font-medium">Main Heading</Label>
            <span className="text-xs text-gray-500">{formData.heading.length} characters</span>
          </div>
          <Input
            id="heading"
            value={formData.heading}
            onChange={(e) => handleChange("heading", e.target.value)}
            placeholder="Schedule a Free Consultation"
            className="text-lg font-semibold"
          />
          <p className="text-xs text-gray-500">The big title visitors see first</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="subheading" className="font-medium">Subheading</Label>
            <span className="text-xs text-gray-500">{formData.subheading.length} characters</span>
          </div>
          <Input
            id="subheading"
            value={formData.subheading}
            onChange={(e) => handleChange("subheading", e.target.value)}
            placeholder="Attorney Enoch P. Hicks"
            className="font-medium"
          />
          <p className="text-xs text-gray-500">Appears above the main heading</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="tagline" className="font-medium">Tagline</Label>
          <span className="text-xs text-gray-500">{formData.tagline.length} characters</span>
        </div>
        <Textarea
          id="tagline"
          value={formData.tagline}
          onChange={(e) => handleChange("tagline", e.target.value)}
          placeholder="Simplifying the complexities of the legal system."
          rows={3}
          className="resize-none"
        />
        <p className="text-xs text-gray-500">A brief description that appears below the heading</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="ctaText" className="font-medium">Button Text</Label>
            <span className="text-xs text-gray-500">{formData.ctaText.length} characters</span>
          </div>
          <Input
            id="ctaText"
            value={formData.ctaText}
            onChange={(e) => handleChange("ctaText", e.target.value)}
            placeholder="Schedule a Free Consultation"
            className="font-medium"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ctaLink" className="font-medium">Button Link</Label>
          <Input
            id="ctaLink"
            value={formData.ctaLink}
            onChange={(e) => handleChange("ctaLink", e.target.value)}
            placeholder="#contact"
            className="font-mono text-sm"
          />
          <p className="text-xs text-gray-500">Use #contact to scroll to contact section</p>
        </div>
      </div>

      {/* Preview */}
      <div className="border-2 rounded-xl p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Live Preview</p>
        </div>
        <div className="space-y-4">
          {formData.subheading && (
            <span className="inline-block px-4 py-1.5 text-sm bg-yellow-500/20 text-yellow-400 rounded-full font-medium">
              {formData.subheading}
            </span>
          )}
          {formData.heading && (
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              {formData.heading}
            </h2>
          )}
          {formData.tagline && (
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
              {formData.tagline}
            </p>
          )}
          {formData.ctaText && (
            <div className="pt-2">
              <span className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg text-base font-semibold transition-colors cursor-pointer">
                {formData.ctaText}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t">
        <Button type="submit" disabled={saving} size="lg" className="gap-2">
          <Save className="w-5 h-5" />
          {saving ? "Saving Changes..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
