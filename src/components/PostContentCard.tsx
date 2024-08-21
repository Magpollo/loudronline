'use client';

import {
  BlocksRenderer,
  type BlocksContent,
} from '@strapi/blocks-react-renderer';
import dynamic from 'next/dynamic';

const DecodeAndSanitize = dynamic(() => import('./DecodeAndSanitize'), {
  ssr: false,
});

export default function PostContentCard({
  postContent,
  className,
}: {
  postContent: BlocksContent;
  className?: string;
}) {
  return (
    <section className={className}>
      <BlocksRenderer
        content={postContent}
        blocks={{
          paragraph: ({ children }) => (
            <DecodeAndSanitize>{children}</DecodeAndSanitize>
          ),
        }}
      />
    </section>
  );
}
