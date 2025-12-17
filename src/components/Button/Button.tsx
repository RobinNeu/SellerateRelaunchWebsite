import { ReactNode, MouseEvent } from 'react'
import './Button.css'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'default' | 'large'
  magnetic?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'default',
  magnetic = false,
  onClick,
  className = '',
  type = 'button'
}: ButtonProps) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    size === 'large' ? 'btn-large' : '',
    magnetic ? 'btn-magnetic' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <button 
      type={type}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

