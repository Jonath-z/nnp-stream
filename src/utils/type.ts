export type Category = "podcast" | "film" | "freestyle" | "whatupnnp";
export type SavedVideo = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  wistia_id: string;
  cover_url: string;
  categories: string;
  type: Category;
};
