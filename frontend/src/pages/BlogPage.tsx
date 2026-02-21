import { PostCard } from "@/components/PostCard";

export function BlogPage() {
  return (
    <section className="content-page">
      <h1>Blog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <PostCard id="1"/>
        <PostCard id="2"/>
        <PostCard id="3"/>
        <PostCard id="4"/>
        <PostCard id="5"/>
        <PostCard id="6"/>
        <PostCard id="7"/>
        <PostCard id="8"/>
        <PostCard id="9"/>
        <PostCard id="10"/>
      </div>
    </section>
  )
}
