/**
 * Type Definitions Index
 * 
 * This file exports all type definitions used throughout the application.
 * Import types from this file to maintain consistency and avoid circular dependencies.
 */

// Re-export all types from individual modules
export * from './sanity';
export * from './forms';
export * from './analytics';

// Common utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

// Layout types
export interface LayoutProps extends BaseComponentProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

// Section component props
export interface SectionProps extends BaseComponentProps {
  id?: string;
  variant?: 'default' | 'dark' | 'light' | 'gradient';
  padding?: 'none' | 'small' | 'medium' | 'large';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

// Button variants and sizes
export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'outline' 
  | 'ghost' 
  | 'link' 
  | 'destructive';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
  icon?: React.ReactNode;
  badge?: string;
  disabled?: boolean;
}

export interface NavigationProps extends BaseComponentProps {
  items: NavItem[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'mobile' | 'footer';
  showIcons?: boolean;
  collapsible?: boolean;
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  fontFamily: 'inter' | 'system' | 'mono';
}

// API response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T = any> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
}

export type ErrorBoundaryFallback = React.ComponentType<{
  error: Error;
  resetError: () => void;
}>;

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = any> {
  data?: T;
  loading: boolean;
  error?: string | Error;
  lastFetch?: Date;
}

// Search and filter types
export interface SearchParams {
  query?: string;
  category?: string;
  tags?: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

export interface SearchResult<T = any> {
  items: T[];
  total: number;
  query: string;
  filters: Record<string, any>;
  suggestions?: string[];
}

// Media types
export interface MediaFile {
  id: string;
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  size?: number;
  type: 'image' | 'video' | 'audio' | 'document';
  format?: string;
}

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

// Animation types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  repeat?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

export interface MotionProps {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: AnimationConfig;
  variants?: Record<string, any>;
  whileHover?: any;
  whileTap?: any;
  whileInView?: any;
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number | 'some' | 'all';
  };
}

// Accessibility types
export interface A11yProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-atomic'?: boolean;
  role?: string;
  tabIndex?: number;
}

// Event handler types
export type EventHandler<T = Event> = (event: T) => void;
export type ChangeHandler<T = any> = (value: T) => void;
export type SubmitHandler<T = any> = (data: T) => void | Promise<void>;

// Utility types for React components
export type PropsWithChildren<P = {}> = P & { children?: React.ReactNode };
export type ComponentWithChildren<P = {}> = React.FC<PropsWithChildren<P>>;

// Hook return types
export interface UseToggleReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  removeValue: () => void;
}

export interface UseDebounceReturn<T> {
  debouncedValue: T;
  isDebouncing: boolean;
}

// Configuration types
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
    linkedin: string;
  };
  creator: string;
  keywords: string[];
}

export interface FeatureFlag {
  name: string;
  enabled: boolean;
  description?: string;
  rolloutPercentage?: number;
  conditions?: Record<string, any>;
}

// Development types
export interface DevToolsConfig {
  enabled: boolean;
  showGrid?: boolean;
  showBreakpoints?: boolean;
  showComponentBounds?: boolean;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
}
