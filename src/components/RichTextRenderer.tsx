import React from 'react';

export function RichTextRenderer({ content }: { content: any }) {
  if (!content || !content.root || !content.root.children) {
    return null;
  }

  const renderNode = (node: any, index: number) => {
    switch (node.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg">
            {node.children?.map((child: any, idx: number) => renderNode(child, idx))}
          </p>
        );
      case 'heading':
        const Tag = (`h${node.tag?.replace('h', '') || '2'}`) as any;
        const className = 
          node.tag === 'h1' ? 'text-4xl font-extrabold mb-6 mt-10 text-neutral-900 dark:text-white' :
          node.tag === 'h2' ? 'text-3xl font-bold mb-5 mt-8 text-neutral-900 dark:text-white' :
          node.tag === 'h3' ? 'text-2xl font-bold mb-4 mt-6 text-neutral-900 dark:text-white' :
          'text-xl font-bold mb-3 mt-4 text-neutral-900 dark:text-white';
        return (
          <Tag key={index} className={className}>
            {node.children?.map((child: any, idx: number) => renderNode(child, idx))}
          </Tag>
        );
      case 'text':
        let TextElement: React.ReactNode = node.text;
        if (node.format & 1) TextElement = <strong key={index} className="font-semibold text-neutral-900 dark:text-white">{TextElement}</strong>;
        if (node.format & 2) TextElement = <em key={index}>{TextElement}</em>;
        if (node.format & 4) TextElement = <s key={index}>{TextElement}</s>;
        if (node.format & 8) TextElement = <code key={index} className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sm text-indigo-600 dark:text-indigo-400 font-mono">{TextElement}</code>;
        return <React.Fragment key={index}>{TextElement}</React.Fragment>;
      case 'list':
        const ListTag = node.listType === 'number' ? 'ol' : 'ul';
        const listClassName = node.listType === 'number' 
          ? 'list-decimal list-outside ml-6 mb-4 space-y-2 text-neutral-700 dark:text-neutral-300 text-lg' 
          : 'list-disc list-outside ml-6 mb-4 space-y-2 text-neutral-700 dark:text-neutral-300 text-lg';
        return (
          <ListTag key={index} className={listClassName}>
            {node.children?.map((child: any, idx: number) => renderNode(child, idx))}
          </ListTag>
        );
      case 'listitem':
        return (
          <li key={index} className="pl-1">
            {node.children?.map((child: any, idx: number) => renderNode(child, idx))}
          </li>
        );
      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-indigo-500 pl-4 py-1 italic mb-6 mt-6 text-neutral-600 dark:text-neutral-400 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-r-lg text-lg">
            {node.children?.map((child: any, idx: number) => renderNode(child, idx))}
          </blockquote>
        );
      default:
        // fallback for unknowns (like inline blocks or other lexical nodes)
        if (node.children) {
          return (
            <div key={index} className="mb-4">
              {node.children?.map((child: any, idx: number) => renderNode(child, idx))}
            </div>
          );
        }
        return null;
    }
  };

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none w-full">
      {content.root.children.map((node: any, index: number) => renderNode(node, index))}
    </div>
  );
}
