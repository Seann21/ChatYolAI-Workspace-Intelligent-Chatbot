import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const defaultProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Check: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const Copy: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

export const Terminal: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" x2="20" y1="19" y2="19" />
  </svg>
);

export const Code2: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />
  </svg>
);

export const Sparkles: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
);

export const FileText: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);

export const Cpu: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <rect width="16" height="16" x="4" y="4" rx="2" />
    <rect width="6" height="6" x="9" y="9" rx="1" />
    <path d="M15 2v2" />
    <path d="M15 20v2" />
    <path d="M2 15h2" />
    <path d="M2 9h2" />
    <path d="M20 15h2" />
    <path d="M20 9h2" />
    <path d="M9 2v2" />
    <path d="M9 20v2" />
  </svg>
);

export const ArrowUpRight: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

export const RotateCw: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);

export const User: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const ArrowUp: React.FC<IconProps> = ({ size = 18, className = '', strokeWidth = 2, ...props }) => (
  <svg {...defaultProps} width={size} height={size} strokeWidth={strokeWidth} className={className} {...props}>
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

export const Square: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
  </svg>
);

export const Menu: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

export const ChevronDown: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const Download: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

export const Trash2: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);

export const Plus: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

export const MessageSquare: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const X: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const Search: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const AlertCircle: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

export const PanelLeftClose: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M9 3v18" />
    <path d="m14 9-3 3 3 3" />
  </svg>
);

export const PanelLeftOpen: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M9 3v18" />
    <path d="m13 15 3-3-3-3" />
  </svg>
);

export const ArrowLeft: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

