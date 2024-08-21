'use client';

import React, { ReactNode } from 'react';
import DOMPurify from 'dompurify';
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import he from 'he';
import styles from '@/assets/styles/PostContent.module.css';
import Linkify from 'react-linkify';

const DecodeAndSanitize = ({ children }: { children?: ReactNode }) => {
  const sanitizeContent = (content: string): string => {
    // Remove WordPress comments
    const withoutComments = content.replace(/<!--[\s\S]*?-->/g, '');

    // Decode HTML entities
    const decoded = he.decode(withoutComments);

    // Sanitize the content
    return DOMPurify.sanitize(decoded, {
      ALLOWED_TAGS: [
        'p',
        'a',
        'ul',
        'ol',
        'li',
        'strong',
        'em',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'img',
      ],
      ALLOWED_ATTR: ['href', 'target', 'src', 'alt'],
    });
  };

  const processContent = (content: ReactNode): string => {
    if (Array.isArray(content)) {
      return content.map((item) => processContent(item)).join('');
    } else if (React.isValidElement(content) && 'text' in content.props) {
      return sanitizeContent(content.props.text);
    } else if (typeof content === 'string') {
      return sanitizeContent(content);
    }
    return '';
  };

  const customReplace: HTMLReactParserOptions['replace'] = (node) => {
    if (node.type === 'tag') {
      if (node.name === 'img') {
        return (
          <LazyLoadImage
            src={node.attribs.src}
            alt={node.attribs.alt}
            className={styles.responsiveImage}
          />
        );
      }
      if (node.name === 'p') {
        return (
          <p className={styles.paragraph}>{domToReact(node.children as any)}</p>
        );
      }
      if (node.name === 'a') {
        const href = node.attribs.href;

        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {domToReact(node.children as any)}
          </a>
        );
      }
    }
  };

  const groupAdjacentImages = (nodes: React.ReactNode[]): React.ReactNode[] => {
    const result: React.ReactNode[] = [];
    let currentGroup: React.ReactElement[] = [];

    React.Children.forEach(nodes, (node, index) => {
      if (React.isValidElement(node) && node.type === LazyLoadImage) {
        currentGroup.push(node);
      } else {
        if (currentGroup.length > 0) {
          result.push(
            <div
              key={`img-group-${index}`}
              className={styles.imageGrid}
              style={{
                gridTemplateColumns: `repeat(${Math.min(
                  currentGroup.length,
                  3
                )}, 1fr)`,
              }}
            >
              {currentGroup}
            </div>
          );
          currentGroup = [];
        }
        result.push(node);
      }
    });

    if (currentGroup.length > 0) {
      result.push(
        <div
          key="img-group-last"
          className={styles.imageGrid}
          style={{
            gridTemplateColumns: `repeat(${Math.min(
              currentGroup.length,
              3
            )}, 1fr)`,
          }}
        >
          {currentGroup}
        </div>
      );
    }

    return result;
  };

  const sanitizedContent = processContent(children);
  const parsedContent = parse(sanitizedContent, { replace: customReplace });
  const groupedContent = groupAdjacentImages(parsedContent as any[]);

  const componentDecorator = (href: string, type: string, key: number) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {href}
      </a>
    );
  };

  return (
    <Linkify componentDecorator={componentDecorator}>
      <div className={styles.enhancedHtmlContent}>{groupedContent}</div>
    </Linkify>
  );
};

export default DecodeAndSanitize;
