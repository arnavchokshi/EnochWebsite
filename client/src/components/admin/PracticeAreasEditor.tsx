import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";
import type { PracticeAreasContent, PracticeArea } from "@/lib/api";

interface PracticeAreasEditorProps {
  content: PracticeAreasContent;
  onSave: (data: PracticeAreasContent) => void;
  onChange: () => void;
  saving: boolean;
}

export function PracticeAreasEditor({ content, onSave, onChange, saving }: PracticeAreasEditorProps) {
  const [formData, setFormData] = useState<PracticeAreasContent>(content);

  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleTitleChange = (field: "sectionTitle" | "sectionDescription", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    onChange();
  };

  const handleAreaChange = (id: string, field: keyof PracticeArea, value: string) => {
    setFormData((prev) => ({
      ...prev,
      areas: prev.areas.map((area) =>
        area.id === id ? { ...area, [field]: value } : area
      ),
    }));
    onChange();
  };

  const addArea = () => {
    const newArea: PracticeArea = {
      id: Date.now().toString(),
      title: "New Practice Area",
      description: "Description of this practice area...",
      icon: "briefcase",
      link: "/practice/new",
    };
    setFormData((prev) => ({
      ...prev,
      areas: [...prev.areas, newArea],
    }));
    onChange();
  };

  const removeArea = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      areas: prev.areas.filter((area) => area.id !== id),
    }));
    onChange();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const iconOptions = ["briefcase", "shield", "file-text"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="sectionTitle">Section Title</Label>
          <Input
            id="sectionTitle"
            value={formData.sectionTitle}
            onChange={(e) => handleTitleChange("sectionTitle", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sectionDescription">Section Description</Label>
          <Input
            id="sectionDescription"
            value={formData.sectionDescription}
            onChange={(e) => handleTitleChange("sectionDescription", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Practice Areas</h3>
          <Button type="button" variant="outline" size="sm" onClick={addArea}>
            <Plus className="w-4 h-4 mr-2" />
            Add Area
          </Button>
        </div>

        {formData.areas.map((area, index) => (
          <div
            key={area.id}
            className="border rounded-lg p-4 space-y-4 bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-700">Area {index + 1}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeArea(area.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={area.title}
                  onChange={(e) => handleAreaChange(area.id, "title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Icon</Label>
                <select
                  value={area.icon}
                  onChange={(e) => handleAreaChange(area.id, "icon", e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={area.description}
                onChange={(e) => handleAreaChange(area.id, "description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Link</Label>
              <Input
                value={area.link}
                onChange={(e) => handleAreaChange(area.id, "link", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <Button type="submit" disabled={saving}>
        <Save className="w-4 h-4 mr-2" />
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
