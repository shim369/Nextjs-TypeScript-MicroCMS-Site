type Props = {
  text: string
  as?: 'span' | 'h1' | 'h2'
  className?: string
}

/** 1文字ずつ span に分割（アニメーション用）。読み上げは親の aria-label で行う */
export default function SplitText({ text, as: Tag = 'span', className }: Props) {
  return (
    <Tag className={className} aria-label={text}>
      {[...text].map((c, i) => (
        <span className="char" aria-hidden="true" key={i}>
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </Tag>
  )
}
