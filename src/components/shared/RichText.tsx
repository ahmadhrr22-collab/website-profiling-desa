import React from 'react'
import { cn } from '@/lib/utils'

interface RichTextProps {
  content: any
  className?: string
}

// Rekursif parser sederhana untuk merender node Lexical ke HTML/React
function renderLexicalNode(node: any, index: number): React.ReactNode {
  if (!node) return null

  // Jika node berupa text
  if (node.type === 'text') {
    const text = node.text
    
    // Terapkan format (bold, italic, underline, strikethrough, dll)
    // Di Lexical format adalah bitwise mask: 1=bold, 2=italic, 4=underline, 8=strikethrough, 16=code
    const format = node.format || 0
    let element: React.ReactNode = text
    
    if (format & 1) element = <strong key={index}>{element}</strong>
    if (format & 2) element = <em key={index}>{element}</em>
    if (format & 4) element = <u key={index}>{element}</u>
    if (format & 8) element = <span className="line-through" key={index}>{element}</span>
    if (format & 16) element = <code className="bg-gray-100 px-1 py-0.5 rounded text-red-600 text-sm" key={index}>{element}</code>
    
    return <React.Fragment key={index}>{element}</React.Fragment>
  }

  // Jika node bertipe element/parent
  const children = node.children ? node.children.map((child: any, i: number) => renderLexicalNode(child, i)) : null

  switch (node.type) {
    case 'root':
      return <div className="space-y-4" key={index}>{children}</div>
    case 'paragraph':
      // Jika paragraf kosong, render line break
      if (!node.children || node.children.length === 0) {
        return <br key={index} />
      }
      return <p className="leading-relaxed text-gray-700 my-2" key={index}>{children}</p>
    case 'heading':
      const Tag = (node.tag || 'h2') as keyof React.JSX.IntrinsicElements
      const headingClasses = cn(
        'font-bold text-primary my-4',
        node.tag === 'h1' && 'text-3xl sm:text-4xl mt-6 mb-4',
        node.tag === 'h2' && 'text-2xl sm:text-3xl mt-5 mb-3',
        node.tag === 'h3' && 'text-xl sm:text-2xl mt-4 mb-2',
        node.tag === 'h4' && 'text-lg sm:text-xl mt-3 mb-1'
      )
      return <Tag className={headingClasses} key={index}>{children}</Tag>
    case 'list':
      if (node.listType === 'ordered') {
        return <ol className="list-decimal pl-6 space-y-1 text-gray-700 my-2" key={index}>{children}</ol>
      }
      return <ul className="list-disc pl-6 space-y-1 text-gray-700 my-2" key={index}>{children}</ul>
    case 'listitem':
      return <li className="leading-relaxed" key={index}>{children}</li>
    case 'link':
      return (
        <a
          href={node.fields?.url}
          target={node.fields?.newTab ? '_blank' : undefined}
          rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
          className="text-emerald-600 hover:text-emerald-700 underline font-medium"
          key={index}
        >
          {children}
        </a>
      )
    case 'horizontalrule':
      return <hr className="my-6 border-gray-200" key={index} />
    case 'quote':
      return (
        <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 my-4 bg-emerald-50/50 rounded-r text-gray-600 italic" key={index}>
          {children}
        </blockquote>
      )
    default:
      // Fallback jika tipe tidak dikenal, cukup render anak-anaknya
      return <React.Fragment key={index}>{children}</React.Fragment>
  }
}

export function RichText({ content, className }: RichTextProps) {
  if (!content) return null

  // Jika konten adalah string HTML biasa
  if (typeof content === 'string') {
    return <div className={cn('prose max-w-none', className)} dangerouslySetInnerHTML={{ __html: content }} />
  }

  // Jika konten adalah objek Lexical JSON
  if (content.root) {
    return (
      <div className={cn('prose max-w-none text-gray-800', className)}>
        {renderLexicalNode(content.root, 0)}
      </div>
    )
  }

  return null
}

export default RichText
