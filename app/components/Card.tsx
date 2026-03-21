import { LucideIcon } from 'lucide-react'

interface CardProps {
  icon?: LucideIcon
  imgSrc?: string
  title: string
  desc: string
  link?: string
  iconClass?: string
}

export default function Card({ icon: Icon, imgSrc, title, desc, link, iconClass = 'icon-cyan' }: CardProps) {
  const content = (
    <div className="glass-card tool-card">
      <div className={`tool-card-icon ${iconClass}`}>
        {imgSrc ? (
          <img src={imgSrc} alt={title} style={{ width: 24, height: 24, objectFit: 'contain' }} />
        ) : Icon ? (
          <Icon size={24} />
        ) : null}
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
      {link && (
        <span className="tool-card-link">
          Visit Now <span>→</span>
        </span>
      )}
    </div>
  )

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
        {content}
      </a>
    )
  }

  return content
}