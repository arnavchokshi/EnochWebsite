import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Plus, X } from "lucide-react";
import type { ContactContent } from "@/lib/api";

interface ContactEditorProps {
  content: ContactContent;
  onSave: (data: ContactContent) => void;
  onChange: () => void;
  saving: boolean;
}

export function ContactEditor({ content, onSave, onChange, saving }: ContactEditorProps) {
  const [formData, setFormData] = useState<ContactContent>(content);

  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleChange = (field: keyof ContactContent, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    onChange();
  };

  const handleAddressChange = (field: keyof ContactContent["address"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
    onChange();
  };

  const handleHoursChange = (field: keyof ContactContent["hours"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      hours: { ...prev.hours, [field]: value },
    }));
    onChange();
  };

  const handleSocialChange = (field: keyof ContactContent["social"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      social: { ...prev.social, [field]: value },
    }));
    onChange();
  };

  const addServiceArea = () => {
    setFormData((prev) => ({
      ...prev,
      serviceAreas: [...prev.serviceAreas, "New Area"],
    }));
    onChange();
  };

  const removeServiceArea = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      serviceAreas: prev.serviceAreas.filter((_, i) => i !== index),
    }));
    onChange();
  };

  const updateServiceArea = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceAreas: prev.serviceAreas.map((area, i) => (i === index ? value : area)),
    }));
    onChange();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Contact */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Basic Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Address</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label>Street</Label>
            <Input
              value={formData.address.street}
              onChange={(e) => handleAddressChange("street", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              value={formData.address.city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>State</Label>
              <Input
                value={formData.address.state}
                onChange={(e) => handleAddressChange("state", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>ZIP</Label>
              <Input
                value={formData.address.zip}
                onChange={(e) => handleAddressChange("zip", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Office Hours */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Office Hours</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Monday - Friday</Label>
            <Input
              value={formData.hours.weekdays}
              onChange={(e) => handleHoursChange("weekdays", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Saturday</Label>
            <Input
              value={formData.hours.saturday}
              onChange={(e) => handleHoursChange("saturday", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Sunday</Label>
            <Input
              value={formData.hours.sunday}
              onChange={(e) => handleHoursChange("sunday", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Service Areas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Service Areas</h3>
          <Button type="button" variant="outline" size="sm" onClick={addServiceArea}>
            <Plus className="w-4 h-4 mr-2" />
            Add Area
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.serviceAreas.map((area, index) => (
            <div key={index} className="flex items-center gap-1 bg-gray-100 rounded-lg px-3 py-1">
              <input
                value={area}
                onChange={(e) => updateServiceArea(index, e.target.value)}
                className="bg-transparent border-none text-sm w-24 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeServiceArea(index)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Social Media</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Facebook</Label>
            <Input
              value={formData.social.facebook}
              onChange={(e) => handleSocialChange("facebook", e.target.value)}
              placeholder="https://facebook.com/..."
            />
          </div>
          <div className="space-y-2">
            <Label>LinkedIn</Label>
            <Input
              value={formData.social.linkedin}
              onChange={(e) => handleSocialChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/..."
            />
          </div>
          <div className="space-y-2">
            <Label>Twitter</Label>
            <Input
              value={formData.social.twitter}
              onChange={(e) => handleSocialChange("twitter", e.target.value)}
              placeholder="https://twitter.com/..."
            />
          </div>
        </div>
      </div>

      <Button type="submit" disabled={saving}>
        <Save className="w-4 h-4 mr-2" />
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
