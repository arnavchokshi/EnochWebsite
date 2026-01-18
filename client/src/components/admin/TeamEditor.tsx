import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, Upload, User } from "lucide-react";
import type { TeamContent, TeamMember } from "@/lib/api";

interface TeamEditorProps {
  content: TeamContent;
  onSave: (data: TeamContent) => void;
  onChange: () => void;
  onImageUpload: (file: File) => Promise<string>;
  saving: boolean;
}

export function TeamEditor({ content, onSave, onChange, onImageUpload, saving }: TeamEditorProps) {
  const [formData, setFormData] = useState<TeamContent>(content);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleTitleChange = (field: "sectionTitle" | "sectionDescription", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    onChange();
  };

  const handleMemberChange = (id: string, field: keyof TeamMember, value: string) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      ),
    }));
    onChange();
  };

  const handleImageChange = async (id: string, file: File) => {
    setUploading(id);
    try {
      const url = await onImageUpload(file);
      handleMemberChange(id, "image", url);
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      setUploading(null);
    }
  };

  const addMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: "New Team Member",
      role: "Role",
      bio: "Bio description...",
      image: "",
    };
    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, newMember],
    }));
    onChange();
  };

  const removeMember = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((member) => member.id !== id),
    }));
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
          <h3 className="font-semibold text-gray-900">Team Members</h3>
          <Button type="button" variant="outline" size="sm" onClick={addMember}>
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>

        {formData.members.map((member) => (
          <div
            key={member.id}
            className="border rounded-lg p-4 space-y-4 bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">{member.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeMember(member.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-6">
              {/* Photo */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                  {member.image ? (
                    <img
                      src={member.image.startsWith("http") || member.image.startsWith("/uploads")
                        ? member.image
                        : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => { fileInputRefs.current[member.id] = el; }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageChange(member.id, file);
                  }}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={() => fileInputRefs.current[member.id]?.click()}
                  disabled={uploading === member.id}
                >
                  {uploading === member.id ? (
                    "Uploading..."
                  ) : (
                    <>
                      <Upload className="w-3 h-3 mr-1" />
                      Photo
                    </>
                  )}
                </Button>
              </div>

              {/* Details */}
              <div className="flex-grow space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={member.name}
                      onChange={(e) => handleMemberChange(member.id, "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input
                      value={member.role}
                      onChange={(e) => handleMemberChange(member.id, "role", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea
                    value={member.bio}
                    onChange={(e) => handleMemberChange(member.id, "bio", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
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
