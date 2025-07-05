import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';
// import { urlFor } from '../lib/sanity';

// Types for Portable Text blocks
interface PortableTextBlock {
  _type: string;
  _key: string;
  children?: PortableTextSpan[];
  style?: string;
  level?: number;
  listItem?: string;
  markDefs?: MarkDef[];
}

interface PortableTextSpan {
  _type: 'span';
  _key: string;
  text: string;
  marks?: string[];
}

interface MarkDef {
  _type: string;
  _key: string;
  href?: string;
}

interface ImageBlock {
  _type: 'image';
  _key: string;
  asset: {
    _ref: string;
  };
  alt?: string;
  caption?: string;
}

type PortableTextContent = PortableTextBlock | ImageBlock;

interface PortableTextProps {
  content: PortableTextContent[];
  className?: string;
}

const PortableText: React.FC<PortableTextProps> = ({ content, className = '' }) => {
  const renderBlock = (block: PortableTextContent, index: number) => {
    if (block._type === 'image') {
      const imageBlock = block as ImageBlock;
      return (
        <div key={block._key || index} className="my-8">
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">
              {imageBlock.alt || 'Blog image'}
            </span>
          </div>
          {imageBlock.caption && (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2 italic">
              {imageBlock.caption}
            </p>
          )}
        </div>
      );
    }

    const textBlock = block as PortableTextBlock;
    
    if (!textBlock.children) return null;

    const renderSpan = (span: PortableTextSpan, spanIndex: number) => {
      const text = span.text;
      
      if (!span.marks || span.marks.length === 0) {
        return text;
      }

      let element = <span key={spanIndex}>{text}</span>;

      span.marks.forEach((mark) => {
        if (mark === 'strong') {
          element = <strong key={`${spanIndex}-strong`} className="font-semibold">{element}</strong>;
        } else if (mark === 'em') {
          element = <em key={`${spanIndex}-em`} className="italic">{element}</em>;
        } else if (mark === 'code') {
          element = <code key={`${spanIndex}-code`} className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{element}</code>;
        } else {
          // Handle link marks
          const linkMark = textBlock.markDefs?.find(def => def._key === mark);
          if (linkMark && linkMark._type === 'link' && linkMark.href) {
            const isExternal = linkMark.href.startsWith('http');
            if (isExternal) {
              element = (
                <a
                  key={`${spanIndex}-link`}
                  href={linkMark.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric-blue hover:underline"
                >
                  {element}
                </a>
              );
            } else {
              element = (
                <Link
                  key={`${spanIndex}-link`}
                  href={linkMark.href}
                  className="text-electric-blue hover:underline"
                >
                  {element}
                </Link>
              );
            }
          }
        }
      });

      return element;
    };

    const children = textBlock.children.map(renderSpan);

    switch (textBlock.style) {
      case 'h1':
        return (
          <h1 key={textBlock._key || index} className="text-3xl md:text-4xl font-bold text-dark-charcoal mb-6 mt-8">
            {children}
          </h1>
        );
      case 'h2':
        return (
          <h2 key={textBlock._key || index} className="text-2xl md:text-3xl font-bold text-dark-charcoal mb-4 mt-8">
            {children}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={textBlock._key || index} className="text-xl md:text-2xl font-semibold text-dark-charcoal mb-3 mt-6">
            {children}
          </h3>
        );
      case 'h4':
        return (
          <h4 key={textBlock._key || index} className="text-lg md:text-xl font-semibold text-dark-charcoal mb-2 mt-4">
            {children}
          </h4>
        );
      case 'blockquote':
        return (
          <blockquote key={textBlock._key || index} className="border-l-4 border-electric-blue pl-4 py-2 my-6 italic text-gray-700 bg-gray-50 rounded-r">
            {children}
          </blockquote>
        );
      default:
        if (textBlock.listItem === 'bullet') {
          return (
            <li key={textBlock._key || index} className="mb-2">
              {children}
            </li>
          );
        }
        if (textBlock.listItem === 'number') {
          return (
            <li key={textBlock._key || index} className="mb-2">
              {children}
            </li>
          );
        }
        return (
          <p key={textBlock._key || index} className="mb-4 leading-relaxed text-gray-700">
            {children}
          </p>
        );
    }
  };

  // Group list items
  const groupedContent: (PortableTextContent | PortableTextContent[])[] = [];
  let currentList: PortableTextContent[] = [];
  let currentListType: string | null = null;

  content.forEach((block) => {
    if (block._type === 'block' && (block as PortableTextBlock).listItem) {
      const listType = (block as PortableTextBlock).listItem;
      if (listType === currentListType) {
        currentList.push(block);
      } else {
        if (currentList.length > 0) {
          groupedContent.push([...currentList]);
        }
        currentList = [block];
        currentListType = listType;
      }
    } else {
      if (currentList.length > 0) {
        groupedContent.push([...currentList]);
        currentList = [];
        currentListType = null;
      }
      groupedContent.push(block);
    }
  });

  if (currentList.length > 0) {
    groupedContent.push([...currentList]);
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      {groupedContent.map((item, index) => {
        if (Array.isArray(item)) {
          const listType = (item[0] as PortableTextBlock).listItem;
          const ListComponent = listType === 'bullet' ? 'ul' : 'ol';
          return (
            <ListComponent key={index} className={listType === 'bullet' ? 'list-disc pl-6 mb-4' : 'list-decimal pl-6 mb-4'}>
              {item.map((listItem, listIndex) => renderBlock(listItem, listIndex))}
            </ListComponent>
          );
        }
        return renderBlock(item, index);
      })}
    </div>
  );
};

export default PortableText;
