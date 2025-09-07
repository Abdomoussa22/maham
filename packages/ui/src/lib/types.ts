export type IconType = React.ComponentType<{ className?: string }>;

export type NavItem = {
  title: string;
  href: string;
  icon?: IconType;
  badge?: string;
  section?: string;
  children?: NavItem[];
};
