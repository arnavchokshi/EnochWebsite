import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Save, Plus, Trash2, Copy, Upload, Image as ImageIcon, Search, FileText, ChevronDown, ChevronUp, Edit } from "lucide-react";
import type { BlogContent, BlogPost } from "@/lib/api";

interface BlogEditorProps {
  content: BlogContent;
  onSave: (data: BlogContent) => void;
  onChange: () => void;
  saving: boolean;
  onImageUpload?: (file: File) => Promise<string>;
}

export function BlogEditor({ content, onSave, onChange, saving, onImageUpload }: BlogEditorProps) {
  const [formData, setFormData] = useState<BlogContent>(content);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

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
      content: "",
    };
    setFormData((prev) => ({
      ...prev,
      posts: [...prev.posts, newPost],
    }));
    // Auto-expand the new post to edit content
    setExpandedPostId(newPost.id);
    onChange();
  };

  const removePost = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setFormData((prev) => ({
        ...prev,
        posts: prev.posts.filter((post) => post.id !== id),
      }));
      onChange();
    }
  };

  const duplicatePost = (id: string) => {
    const post = formData.posts.find((p) => p.id === id);
    if (post) {
      const newPost: BlogPost = {
        ...post,
        id: Date.now().toString(),
        title: `${post.title} (Copy)`,
        date: new Date().toISOString().split("T")[0],
        link: `${post.link}-copy`,
      };
      setFormData((prev) => ({
        ...prev,
        posts: [...prev.posts, newPost],
      }));
      onChange();
    }
  };

  const handleImageUpload = async (id: string, file: File) => {
    if (!onImageUpload) return;
    setUploadingImage(id);
    try {
      const url = await onImageUpload(file);
      handlePostChange(id, "image", url);
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(null);
    }
  };

  const filteredPosts = formData.posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            placeholder="Latest News & Insights"
            className="font-medium"
          />
          <p className="text-xs text-gray-500">Main heading for the blog section</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sectionDescription">Section Description</Label>
          <Input
            id="sectionDescription"
            value={formData.sectionDescription}
            onChange={(e) => handleTitleChange("sectionDescription", e.target.value)}
            placeholder="Stay informed with our latest articles"
            className="font-medium"
          />
          <p className="text-xs text-gray-500">Subtitle or brief description</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-3">Blog Posts ({formData.posts.length})</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search posts by title, category, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button type="button" variant="default" size="sm" onClick={addPost} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Post
          </Button>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg bg-gray-50">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">
              {searchQuery ? "No posts match your search." : "No blog posts yet. Add your first post!"}
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="border-2 rounded-xl p-6 space-y-5 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900 block">
                      {post.title || "Untitled Post"}
                    </span>
                    <span className="text-xs text-gray-500">{post.category} • {post.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                    className="gap-2"
                    title={expandedPostId === post.id ? "Collapse full content editor" : "Edit full content"}
                  >
                    <Edit className="w-4 h-4" />
                    {expandedPostId === post.id ? (
                      <>
                        Hide Content
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Edit Content
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => duplicatePost(post.id)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    title="Duplicate post"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removePost(post.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    title="Delete post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-medium">Post Title</Label>
                  <Input
                    value={post.title}
                    onChange={(e) => handlePostChange(post.id, "title", e.target.value)}
                    placeholder="Enter post title..."
                    className="font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Category</Label>
                  <select
                    value={post.category}
                    onChange={(e) => handlePostChange(post.id, "category", e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
                <Label className="font-medium">Excerpt / Summary</Label>
                <RichTextEditor
                  value={post.excerpt}
                  onChange={(value) => handlePostChange(post.id, "excerpt", value)}
                  placeholder="Write a brief summary or excerpt for this post..."
                  rows={3}
                />
                <p className="text-xs text-gray-500">This appears in blog listings and previews</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-medium">Publish Date</Label>
                  <Input
                    type="date"
                    value={post.date}
                    onChange={(e) => handlePostChange(post.id, "date", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Post Link/URL</Label>
                  <Input
                    value={post.link}
                    onChange={(e) => handlePostChange(post.id, "link", e.target.value)}
                    placeholder="/blog/my-post"
                  />
                  <p className="text-xs text-gray-500">URL path for this post</p>
                </div>
              </div>

              {onImageUpload && (
                <div className="space-y-2">
                  <Label className="font-medium">Featured Image</Label>
                  <div className="flex items-center gap-4">
                    {post.image ? (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        ref={(el) => { fileInputRefs.current[post.id] = el; }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(post.id, file);
                        }}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRefs.current[post.id]?.click()}
                        disabled={uploadingImage === post.id}
                        className="gap-2"
                      >
                        {uploadingImage === post.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            {post.image ? "Change Image" : "Upload Image"}
                          </>
                        )}
                      </Button>
                      {post.image && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePostChange(post.id, "image", "")}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-2"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Full Content Editor - Expanded View */}
              {expandedPostId === post.id && (
                <div className="pt-4 border-t space-y-2">
                  <Label className="font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Full Blog Post Content
                  </Label>
                  <p className="text-xs text-gray-500 mb-2">
                    This is the detailed content shown when customers click on the blog post. Use rich text formatting for headings, lists, and paragraphs.
                  </p>
                  <RichTextEditor
                    value={post.content || ''}
                    onChange={(value) => handlePostChange(post.id, "content", value)}
                    placeholder="Write the full blog post content here... This content will be displayed on the detailed blog post page when customers click on the post."
                    rows={15}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    This content appears on the detailed blog post page ({post.link || '/blog/post'})
                  </p>
                </div>
              )}
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
