import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Save, Plus, Trash2, GripVertical, Briefcase } from "lucide-react";
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
          <Label htmlFor="sectionTitle" className="font-medium">Section Title</Label>
          <Input
            id="sectionTitle"
            value={formData.sectionTitle}
            onChange={(e) => handleTitleChange("sectionTitle", e.target.value)}
            placeholder="Our Practice Areas"
            className="font-medium"
          />
          <p className="text-xs text-gray-500">Main heading for this section</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sectionDescription" className="font-medium">Section Description</Label>
          <Input
            id="sectionDescription"
            value={formData.sectionDescription}
            onChange={(e) => handleTitleChange("sectionDescription", e.target.value)}
            placeholder="We provide expert legal services"
            className="font-medium"
          />
          <p className="text-xs text-gray-500">Brief subtitle or description</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-lg">Practice Areas ({formData.areas.length})</h3>
          <Button type="button" variant="default" size="sm" onClick={addArea} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Area
          </Button>
        </div>

        {formData.areas.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg bg-gray-50">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No practice areas yet. Add your first practice area!</p>
          </div>
        ) : (
          formData.areas.map((area, index) => (
            <div
              key={area.id}
              className="border-2 rounded-xl p-6 space-y-5 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block">
                      {area.title || `Practice Area ${index + 1}`}
                    </span>
                    <span className="text-xs text-gray-500">Area {index + 1}</span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeArea(area.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  title="Delete area"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-medium">Title</Label>
                  <Input
                    value={area.title}
                    onChange={(e) => handleAreaChange(area.id, "title", e.target.value)}
                    placeholder="e.g., Business Law"
                    className="font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Icon</Label>
                  <select
                    value={area.icon}
                    onChange={(e) => handleAreaChange(area.id, "icon", e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
                <Label className="font-medium">Description</Label>
                <RichTextEditor
                  value={area.description}
                  onChange={(value) => handleAreaChange(area.id, "description", value)}
                  placeholder="Describe this practice area and the services you offer..."
                  rows={3}
                />
                <p className="text-xs text-gray-500">Rich text formatting supported</p>
              </div>

              <div className="space-y-2">
                <Label className="font-medium">Link/URL</Label>
                <Input
                  value={area.link}
                  onChange={(e) => handleAreaChange(area.id, "link", e.target.value)}
                  placeholder="/practice/business-law"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500">URL path for this practice area page</p>
              </div>
            </div>
          ))
        )}
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
