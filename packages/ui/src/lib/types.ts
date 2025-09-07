export type IconType = React.ComponentType<{ className?: string }>;

export type NavItem = {
  title: string;
  href: string;
  icon?: IconType;
  badge?: string | number;
  section?: string;
  children?: NavItem[];
};
