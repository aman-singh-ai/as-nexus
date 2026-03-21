'use client'
import { Search } from 'lucide-react'

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search..."
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="search-bar-container">
      <Search size={20} className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
