import Image from "next/image";

import {
  cardBodyClass,
  cardMediaClass,
} from "@/portfolio/components/card-shell";
import { LitCard } from "@/portfolio/components/lit-card.client";
import { PostMeta } from "@/post/components/post-meta";
import type { Post } from "@/post/utils/post-source";
import { postPath } from "@/post/utils/slug";

/**
 * One post. Keeps the wide OG image the square logo card cannot carry.
 */
export const PostCard = ({ post }: { post: Post }) => (
  <LitCard href={postPath(post.slug)}>
    <div className={cardBodyClass}>
      <div className={cardMediaClass}>
        <Image
          src={post.ogImageSrc}
          alt={post.ogImageAlt}
          width={160}
          height={84}
          className="size-full object-cover"
          data-lit-print
          unoptimized
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-fg font-display text-base/6 font-semibold text-pretty">
          {post.title}
        </h3>
        <p className="text-muted-fg mt-1 text-base/6 text-pretty sm:text-sm/6">
          {post.summary}
        </p>
        <PostMeta post={post} className="mt-2" />
      </div>
    </div>
  </LitCard>
);
