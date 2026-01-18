import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Save, Plus, Trash2, Upload, User, Users } from "lucide-react";
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
          <Label htmlFor="sectionTitle" className="font-medium">Section Title</Label>
          <Input
            id="sectionTitle"
            value={formData.sectionTitle}
            onChange={(e) => handleTitleChange("sectionTitle", e.target.value)}
            placeholder="Our Team"
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
            placeholder="Meet our experienced legal team"
            className="font-medium"
          />
          <p className="text-xs text-gray-500">Brief subtitle or description</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-lg">Team Members ({formData.members.length})</h3>
          <Button type="button" variant="default" size="sm" onClick={addMember} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Member
          </Button>
        </div>

        {formData.members.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg bg-gray-50">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No team members yet. Add your first team member!</p>
          </div>
        ) : (
          formData.members.map((member) => (
            <div
              key={member.id}
              className="border-2 rounded-xl p-6 space-y-5 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block">
                      {member.name || "New Team Member"}
                    </span>
                    <span className="text-xs text-gray-500">{member.role || "Role"}</span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMember(member.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  title="Delete member"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-6">
                {/* Photo */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-200 border-2 border-gray-300 flex items-center justify-center shadow-sm">
                    {member.image ? (
                      <img
                        src={member.image.startsWith("http") || member.image.startsWith("/uploads")
                          ? member.image
                          : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}`}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-gray-400" />
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
                    className="mt-3 w-full gap-2"
                    onClick={() => fileInputRefs.current[member.id]?.click()}
                    disabled={uploading === member.id}
                  >
                    {uploading === member.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        {member.image ? "Change Photo" : "Upload Photo"}
                      </>
                    )}
                  </Button>
                </div>

                {/* Details */}
                <div className="flex-grow space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-medium">Full Name</Label>
                      <Input
                        value={member.name}
                        onChange={(e) => handleMemberChange(member.id, "name", e.target.value)}
                        placeholder="John Doe"
                        className="font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium">Role/Title</Label>
                      <Input
                        value={member.role}
                        onChange={(e) => handleMemberChange(member.id, "role", e.target.value)}
                        placeholder="Senior Attorney"
                        className="font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium">Bio</Label>
                    <RichTextEditor
                      value={member.bio}
                      onChange={(value) => handleMemberChange(member.id, "bio", value)}
                      placeholder="Write a brief bio about this team member..."
                      rows={4}
                    />
                    <p className="text-xs text-gray-500">Rich text formatting supported</p>
                  </div>
                </div>
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
