import {
  Backpack,
  BadgeCheck,
  Compass,
  HandHeart,
  Headphones,
  Map,
  MessageCircle,
  Route,
  ShieldCheck,
  Sparkles,
  Sunrise,
  Ticket,
  Users,
  Wallet,
  Zap,
  Camera,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/content/types";

/** Registry icon: konten (CMS) cukup menyimpan nama string, bukan komponen. */
const ICONS: Record<IconName, LucideIcon> = {
  "shield-check": ShieldCheck,
  wallet: Wallet,
  users: Users,
  camera: Camera,
  "badge-check": BadgeCheck,
  "hand-heart": HandHeart,
  map: Map,
  "message-circle": MessageCircle,
  ticket: Ticket,
  backpack: Backpack,
  sunrise: Sunrise,
  compass: Compass,
  headphones: Headphones,
  sparkles: Sparkles,
  route: Route,
  zap: Zap,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = ICONS[name] ?? Sparkles;
  return <Component aria-hidden="true" {...props} />;
}
