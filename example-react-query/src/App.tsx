import React from "react";
import { useQuery } from "react-query";
import { BlogPost, Comment } from "./types";
import * as api from "./api";
import LoadingIndicator from "./LoadingIndicator";

export default function App() {
  const [postId, setPostId] = React.useState<string | null>(null);

  function handlePostClick(newPostId: string) {
    setPostId(newPostId);
  }

  return (
    <div className="QueryExample">
      <h1>Blog App</h1>
      {postId === null ? (
        <HomePage onPostClick={handlePostClick} />
      ) : (
        <PostPage postId={postId} onHomeClick={() => setPostId(null)} />
      )}
    </div>
  );
}

type BlogListProps = {
  onPostClick(newPostId: string): void;
};

function BlogList({ onPostClick }: BlogListProps) {
  const { data: posts } = useQuery("posts", api.getPosts);

  return (
    <div>
      <h3>Newest Blog Posts</h3>

      <BlogTeaserList posts={posts!} onPostClick={onPostClick} />
    </div>
  );
}

type BlogTeaserListProps = {
  posts: BlogPost[];
  onPostClick(newPostId: string): void;
};
function BlogTeaserList({ posts, onPostClick }: BlogTeaserListProps) {
  const [pendingPostId, setPendingPostId] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  function handleShowPostClick(postId: string) {
    setPendingPostId(postId);

    startTransition(() => {
      onPostClick(postId);
    });
  }

  return (
    <>
      {posts!.map((p) => (
        <article key={p.id} className="Container">
          <p className="Date">
            <PostDate date={p.date} />
          </p>
          <h1>{p.title}</h1>

          <button
            className={"PendingButton"}
            disabled={isPending}
            onClick={() => handleShowPostClick(p.id)}
          >
            {isPending && p.id === pendingPostId ? (
              <LoadingIndicator secondary />
            ) : (
              `Read post ${p.id}`
            )}
          </button>
        </article>
      ))}
    </>
  );
}

type PostPageProps = {
  postId: string;
  onHomeClick(): void;
};

/* Show a Single Blog Posts including its comments
 *
 * Move React.Suspense component around to see different
 *   loading behaviours
 *
 */
function PostPage({ postId, onHomeClick }: PostPageProps) {
  return (
    <div>
      <button onClick={onHomeClick}>Home</button>

      <React.Suspense
        fallback={<LoadingIndicator>Loading Post</LoadingIndicator>}
      >
        <SinglePost postId={postId} />
      </React.Suspense>

      {/* -------------------------------------------------------------------- */}

      <React.Suspense
        fallback={<LoadingIndicator>Loading Comments</LoadingIndicator>}
      >
        <Comments postId={postId} />
      </React.Suspense>
    </div>
  );
}

function SinglePost({ postId }: { postId: string }) {
  const { data: post } = useQuery(["post", postId], () => api.getPost(postId));

  if (!post) {
    return <h2>Article not found</h2>;
  }

  return (
    <article key={post.id} className="Container">
      <p className="Date">
        <PostDate date={post.date} />
      </p>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}

function Comments({ postId }: { postId: string }) {
  const { data: comments } = useQuery(["comments", postId], () =>
    api.getComments(postId)
  );

  return (
    <div className="Container">
      {comments && comments.length > 0 ? (
        <>
          <h2>{comments.length} comments</h2>
          {comments!.map((comment) => (
            <CommentView key={comment.id} comment={comment} />
          ))}
        </>
      ) : (
        <h2>No comments</h2>
      )}
    </div>
  );
}

type HomePageProps = {
  onPostClick(newPostId: string): void;
};
function HomePage({ onPostClick }: HomePageProps) {
  return (
    <React.Suspense
      fallback={<LoadingIndicator>Loading Blog Posts</LoadingIndicator>}
    >
      <BlogList onPostClick={onPostClick} />
    </React.Suspense>
  );
}

function CommentView({ comment }: { comment: Comment }) {
  return <div className="Container">{comment.comment}</div>;
}

function PostDate({ date }: { date: string }) {
  return <>{new Date(Date.parse(date)).toLocaleDateString()}</>;
}
