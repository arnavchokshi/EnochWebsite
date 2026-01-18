import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Save, Plus, Trash2, Workflow, ListOrdered } from "lucide-react";
import type { HowItWorksContent, Step } from "@/lib/api";

interface HowItWorksEditorProps {
  content: HowItWorksContent;
  onSave: (data: HowItWorksContent) => void;
  onChange: () => void;
  saving: boolean;
}

export function HowItWorksEditor({ content, onSave, onChange, saving }: HowItWorksEditorProps) {
  const [formData, setFormData] = useState<HowItWorksContent>(content);

  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleTitleChange = (field: "sectionTitle" | "sectionDescription", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    onChange();
  };

  const handleStepChange = (id: string, field: keyof Step, value: string) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === id ? { ...step, [field]: value } : step
      ),
    }));
    onChange();
  };

  const addStep = () => {
    const newStep: Step = {
      id: Date.now().toString(),
      title: "New Step",
      description: "Description of this step...",
      icon: "send",
    };
    setFormData((prev) => ({
      ...prev,
      steps: [...prev.steps, newStep],
    }));
    onChange();
  };

  const removeStep = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.filter((step) => step.id !== id),
    }));
    onChange();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const iconOptions = ["send", "search", "gavel"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="sectionTitle" className="font-medium">Section Title</Label>
          <Input
            id="sectionTitle"
            value={formData.sectionTitle}
            onChange={(e) => handleTitleChange("sectionTitle", e.target.value)}
            placeholder="How It Works"
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
            placeholder="Our simple process"
            className="font-medium"
          />
          <p className="text-xs text-gray-500">Brief subtitle or description</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-lg">Process Steps ({formData.steps.length})</h3>
          <Button type="button" variant="default" size="sm" onClick={addStep} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Step
          </Button>
        </div>

        {formData.steps.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg bg-gray-50">
            <ListOrdered className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No steps yet. Add your first process step!</p>
          </div>
        ) : (
          formData.steps.map((step, index) => (
            <div
              key={step.id}
              className="border-2 rounded-xl p-6 space-y-5 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block">
                      {step.title || `Step ${index + 1}`}
                    </span>
                    <span className="text-xs text-gray-500">Step {index + 1} of {formData.steps.length}</span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeStep(step.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  title="Delete step"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-medium">Step Title</Label>
                  <Input
                    value={step.title}
                    onChange={(e) => handleStepChange(step.id, "title", e.target.value)}
                    placeholder="e.g., Initial Consultation"
                    className="font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Icon</Label>
                  <select
                    value={step.icon}
                    onChange={(e) => handleStepChange(step.id, "icon", e.target.value)}
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
                  value={step.description}
                  onChange={(value) => handleStepChange(step.id, "description", value)}
                  placeholder="Describe what happens in this step..."
                  rows={3}
                />
                <p className="text-xs text-gray-500">Rich text formatting supported</p>
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
