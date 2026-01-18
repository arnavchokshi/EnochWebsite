import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2 } from "lucide-react";
import type { BlogContent, BlogPost } from "@/lib/api";

interface BlogEditorProps {
  content: BlogContent;
  onSave: (data: BlogContent) => void;
  onChange: () => void;
  saving: boolean;
}

export function BlogEditor({ content, onSave, onChange, saving }: BlogEditorProps) {
  const [formData, setFormData] = useState<BlogContent>(content);

  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleTitleChange = (field: "sectionTitle" | "sectionDescription", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    onChange();
  };

  const handlePostChange = (id: string, field: keyof BlogPost, value: string) => {
    setFormData((prev) => ({
      ...prev,
      posts: prev.posts.map((post) =>
        post.id === id ? { ...post, [field]: value } : post
      ),
    }));
    onChange();
  };

  const addPost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: "New Blog Post",
      category: "General",
      excerpt: "Brief description of this post...",
      date: new Date().toISOString().split("T")[0],
      image: "",
      link: "/blog/new-post",
    };
    setFormData((prev) => ({
      ...prev,
      posts: [...prev.posts, newPost],
    }));
    onChange();
  };

  const removePost = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      posts: prev.posts.filter((post) => post.id !== id),
    }));
    onChange();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const categoryOptions = [
    "Business Law",
    "Personal Injury",
    "Estate Planning",
    "General",
  ];

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
          <h3 className="font-semibold text-gray-900">Blog Posts</h3>
          <Button type="button" variant="outline" size="sm" onClick={addPost}>
            <Plus className="w-4 h-4 mr-2" />
            Add Post
          </Button>
        </div>

        {formData.posts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 space-y-4 bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700 truncate max-w-xs">
                {post.title}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removePost(post.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={post.title}
                  onChange={(e) => handlePostChange(post.id, "title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <select
                  value={post.category}
                  onChange={(e) => handlePostChange(post.id, "category", e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Excerpt</Label>
              <Textarea
                value={post.excerpt}
                onChange={(e) => handlePostChange(post.id, "excerpt", e.target.value)}
                rows={2}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={post.date}
                  onChange={(e) => handlePostChange(post.id, "date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Link</Label>
                <Input
                  value={post.link}
                  onChange={(e) => handlePostChange(post.id, "link", e.target.value)}
                />
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
