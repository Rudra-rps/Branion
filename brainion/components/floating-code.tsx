'use client'

import { useEffect, useState } from 'react'

const codeElements = [
  '{ }',
  '( )',
  '[ ]',
  '< >',
  'const',
  'async',
  'await',
  'import',
  '&&',
  '||',
  '=>',
  '...',
  'if',
  'else',
  'return',
  'function',
  'class',
  'export',
  'null',
  'undefined',
  'true',
  'false',
  '++',
  '--',
  '===',
  '!==',
  '+=',
  '-=',
  '*=',
  '/=',
]

interface FloatingElement {
  id: number
  text: string
  left: number
  top: number
  duration: number
  delay: number
  opacity: number
  size: 'sm' | 'md' | 'lg'
}

export function FloatingCode() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const newElements: FloatingElement[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      text: codeElements[Math.floor(Math.random() * codeElements.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 20 + Math.random() * 30,
      delay: Math.random() * 5,
      opacity: 0.03 + Math.random() * 0.07,
      size: (['sm', 'md', 'lg'] as const)[Math.floor(Math.random() * 3)],
    }))
    setElements(newElements)
  }, [])

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute font-mono font-bold text-primary animate-float"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            opacity: element.opacity,
            animation: `float ${element.duration}s linear ${element.delay}s infinite`,
            fontSize: element.size === 'sm' ? '12px' : element.size === 'md' ? '16px' : '20px',
          }}
        >
          {element.text}
        </div>
      ))}

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: ${elements[0]?.opacity || 0.05};
          }
          50% {
            transform: translateY(-100px) translateX(50px) rotate(180deg);
            opacity: ${elements[0]?.opacity || 0.05};
          }
          100% {
            transform: translateY(-200px) translateX(0px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
