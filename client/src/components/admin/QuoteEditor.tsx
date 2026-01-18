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
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          value={formData.author}
          onChange={(e) => handleChange("author", e.target.value)}
          placeholder="Enoch P. Hicks"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="quote">Quote</Label>
        <Textarea
          id="quote"
          value={formData.quote}
          onChange={(e) => handleChange("quote", e.target.value)}
          rows={4}
          placeholder="Your inspirational quote..."
        />
        <p className="text-xs text-muted-foreground">
          This quote will be displayed prominently on the homepage
        </p>
      </div>

      {/* Preview */}
      <div className="border rounded-lg p-6 bg-primary text-white">
        <p className="text-xs text-white/50 mb-4">PREVIEW</p>
        <blockquote className="text-xl italic mb-4">"{formData.quote}"</blockquote>
        <cite className="not-italic font-semibold">— {formData.author}</cite>
      </div>

      <Button type="submit" disabled={saving}>
        <Save className="w-4 h-4 mr-2" />
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
