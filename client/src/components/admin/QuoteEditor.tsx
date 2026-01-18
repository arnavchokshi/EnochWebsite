import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import type { QuoteContent } from "@/lib/api";

interface QuoteEditorProps {
  content: QuoteContent;
  onSave: (data: QuoteContent) => void;
  onChange: () => void;
  saving: boolean;
}

export function QuoteEditor({ content, onSave, onChange, saving }: QuoteEditorProps) {
  const [formData, setFormData] = useState<QuoteContent>(content);

  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleChange = (field: keyof QuoteContent, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    onChange();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="author" className="font-medium">Author Name</Label>
          <span className="text-xs text-gray-500">{formData.author.length} characters</span>
        </div>
        <Input
          id="author"
          value={formData.author}
          onChange={(e) => handleChange("author", e.target.value)}
          placeholder="Enoch P. Hicks"
          className="font-medium"
        />
        <p className="text-xs text-gray-500">Name of the person quoted</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="quote" className="font-medium">Quote Text</Label>
          <span className="text-xs text-gray-500">{formData.quote.length} characters</span>
        </div>
        <Textarea
          id="quote"
          value={formData.quote}
          onChange={(e) => handleChange("quote", e.target.value)}
          rows={5}
          placeholder="Your inspirational quote..."
          className="resize-none text-base"
        />
        <p className="text-xs text-gray-500">
          This quote will be displayed prominently on the homepage
        </p>
      </div>

      {/* Preview */}
      <div className="border-2 rounded-xl p-8 bg-gradient-to-br from-primary via-primary/95 to-primary text-white shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse" />
          <p className="text-xs text-white/70 font-medium uppercase tracking-wide">Live Preview</p>
        </div>
        <div className="space-y-4">
          {formData.quote && (
            <blockquote className="text-2xl md:text-3xl italic leading-relaxed font-light">
              "{formData.quote}"
            </blockquote>
          )}
          {formData.author && (
            <cite className="not-italic font-semibold text-lg block mt-4">
              — {formData.author}
            </cite>
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
