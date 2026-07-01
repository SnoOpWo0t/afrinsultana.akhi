"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  BookOpen,
  Calendar,
  ChevronDown,
  ExternalLink,
  FileImage,
  GraduationCap,
  Heart,
  Medal,
  Star,
  Trophy,
  X,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  ACHIEVEMENTS,
  type Achievement,
  type AchievementType,
} from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  getCopy,
  translateDynamicText,
  type Locale,
} from "@/lib/i18n/translations";

const ease = [0.22, 1, 0.36, 1] as const;

const getTypeStyles = (
  locale: Locale,
): Record<
  AchievementType,
  {
    icon: LucideIcon;
    color: string;
    hexColor: string;
    bg: string;
    accent: string;
    glow: string;
    label: string;
  }
> => {
  const copy = getCopy(locale);

  return {
    competition: {
      icon: Trophy,
      color: "text-ctp-yellow",
      hexColor: "#f9e2af",
      bg: "bg-ctp-yellow/10",
      accent: "bg-ctp-yellow/70",
      glow: "bg-ctp-yellow/15",
      label: copy.achievements.competition,
    },
    scholarship: {
      icon: Medal,
      color: "text-ctp-blue",
      hexColor: "#8caaee",
      bg: "bg-ctp-blue/10",
      accent: "bg-ctp-blue/70",
      glow: "bg-ctp-blue/15",
      label: copy.achievements.scholarship,
    },
    academic: {
      icon: GraduationCap,
      color: "text-ctp-mauve",
      hexColor: "#ca9ee6",
      bg: "bg-ctp-mauve/10",
      accent: "bg-ctp-mauve/70",
      glow: "bg-ctp-mauve/15",
      label: copy.achievements.academic,
    },
    rating: {
      icon: Star,
      color: "text-ctp-green",
      hexColor: "#a6d189",
      bg: "bg-ctp-green/10",
      accent: "bg-ctp-green/70",
      glow: "bg-ctp-green/15",
      label: copy.achievements.rating,
    },
    certification: {
      icon: BadgeCheck,
      color: "text-ctp-teal",
      hexColor: "#81c8be",
      bg: "bg-ctp-teal/10",
      accent: "bg-ctp-teal/70",
      glow: "bg-ctp-teal/15",
      label: copy.achievements.certification,
    },
    training: {
      icon: BookOpen,
      color: "text-ctp-sapphire",
      hexColor: "#85c1dc",
      bg: "bg-ctp-sapphire/10",
      accent: "bg-ctp-sapphire/70",
      glow: "bg-ctp-sapphire/15",
      label: copy.achievements.training,
    },
    volunteer: {
      icon: Heart,
      color: "text-ctp-pink",
      hexColor: "#f4b8e4",
      bg: "bg-ctp-pink/10",
      accent: "bg-ctp-pink/70",
      glow: "bg-ctp-pink/15",
      label: copy.achievements.volunteer,
    },
  };
};

const INITIAL_VISIBLE_ACHIEVEMENTS = 9;

const getContainerVariants = (reducedMotion: boolean) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: reducedMotion ? 0 : 0.04,
      staggerChildren: reducedMotion ? 0.03 : 0.06,
    },
  },
});

const getCardVariants = (reducedMotion: boolean) => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 22,
    filter: reducedMotion ? "none" : "blur(6px)",
  },
  visible: (custom: { featured: boolean; index: number }) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: reducedMotion ? 0.28 : custom.featured ? 0.48 : 0.4,
      ease,
      delay: reducedMotion
        ? 0
        : custom.featured
          ? custom.index * 0.015
          : custom.index * 0.008,
    },
  }),
});

interface AchievementCardProps {
  achievement: Achievement;
  reducedMotion: boolean;
  index: number;
  locale: Locale;
  onOpenCertificate: (achievement: Achievement) => void;
}

function AchievementCard({
  achievement,
  reducedMotion,
  index,
  locale,
  onOpenCertificate,
}: AchievementCardProps) {
  const copy = getCopy(locale);
  const style = getTypeStyles(locale)[achievement.type];
  const Icon = style.icon;
  const isFeatured = Boolean(achievement.featured);

  const iconHoverClasses = reducedMotion
    ? ""
    : "group-hover:-translate-y-0.5 group-hover:scale-105";
  const iconRotateClasses =
    reducedMotion ||
    achievement.type === "volunteer" ||
    achievement.type === "training"
      ? ""
      : "group-hover:rotate-6";

  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      custom={{ featured: isFeatured, index }}
      variants={getCardVariants(reducedMotion)}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease }}
      className={`group relative h-full w-full [perspective:2000px] ${
        isFeatured ? "min-h-[228px]" : "min-h-[204px]"
      }`}
      onMouseEnter={() => !reducedMotion && setIsFlipped(true)}
      onMouseLeave={() => !reducedMotion && setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700 cursor-pointer ${
          isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        }`}
      >
        {/* Front face */}
        <article
          className={`relative h-full w-full overflow-hidden rounded-2xl border p-5 backdrop-blur-sm transition-[border-color,background-color] duration-300 [backface-visibility:hidden] ${
            isFeatured
              ? "border-ctp-surface1/70 bg-ctp-surface0/45"
              : "border-ctp-surface0/60 bg-ctp-surface0/30 group-hover:border-ctp-surface1 group-hover:bg-ctp-surface0/45"
          }`}
        >
          <div
            className={`pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full ${style.glow} blur-3xl transition-opacity duration-300 ${
              reducedMotion
                ? isFeatured
                  ? "opacity-45"
                  : "opacity-0"
                : isFeatured
                  ? "opacity-55 group-hover:opacity-70"
                  : "opacity-0 group-hover:opacity-85"
            }`}
          />

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${style.bg} ${style.color}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${style.accent}`} />
              {style.label}
            </span>

            {isFeatured && (
              <span className="inline-flex items-center rounded-full border border-ctp-surface1/60 bg-ctp-surface0/50 px-2.5 py-1 text-[11px] font-medium text-ctp-subtext0">
                {copy.achievements.featured}
              </span>
            )}
          </div>

          <div className="flex h-full items-start gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ${style.bg} ${iconHoverClasses}`}
            >
              <Icon
                className={`h-4 w-4 transition-transform duration-300 ${style.color} ${iconRotateClasses}`}
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <h3 className="text-sm font-semibold leading-snug text-ctp-text line-clamp-2">
                {achievement.title}
              </h3>
              <p className="mt-1 text-xs text-ctp-subtext0">
                {translateDynamicText(locale, achievement.organization)}
              </p>
              <span className="mt-1 flex items-center gap-1 text-xs text-ctp-overlay0">
                <Calendar className="h-3 w-3" />
                {translateDynamicText(locale, achievement.date)}
              </span>

              {isFeatured && (
                <p className="mt-2 text-xs leading-relaxed text-ctp-subtext1 line-clamp-2">
                  {translateDynamicText(locale, achievement.description)}
                </p>
              )}
            </div>
          </div>
        </article>

        {/* Back face */}
        <article
          className={`absolute inset-0 h-full w-full overflow-hidden rounded-2xl border p-4 backdrop-blur-sm [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col ${
            isFeatured
              ? "border-ctp-surface1/70 bg-ctp-surface0/45"
              : "border-ctp-surface0/60 bg-ctp-surface0/30 group-hover:border-ctp-surface1 group-hover:bg-ctp-surface0/45"
          }`}
        >
          <div className="relative flex-1 w-full overflow-hidden rounded-lg border border-ctp-surface0/50 mb-3 bg-ctp-crust/50">
            {achievement.certificateImage ? (
              <Image
                src={achievement.certificateImage}
                alt={achievement.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-ctp-overlay0 text-xs p-4 text-center">
                No Preview Available
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 shrink-0">
            {achievement.viewType === "link" && achievement.link && (
              <a
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-xs text-ctp-blue transition-colors hover:text-ctp-sapphire focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base rounded bg-ctp-surface0/50 px-2 py-1"
              >
                {copy.achievements.view}
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {achievement.viewType === "image" && achievement.certificateImage && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCertificate(achievement);
                }}
                className="inline-flex items-center gap-1 text-xs text-ctp-blue transition-colors hover:text-ctp-sapphire focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base rounded bg-ctp-surface0/50 px-2 py-1"
                aria-label={`${copy.achievements.viewCertificateFor} ${achievement.title}`}
              >
                {copy.achievements.certificate}
                <FileImage className="h-3 w-3" />
              </button>
            )}
          </div>
        </article>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const { locale } = useLanguage();
  const copy = getCopy(locale);

  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const [showMoreAchievements, setShowMoreAchievements] = useState(false);

  const orderedAchievements = useMemo(
    () =>
      [...ACHIEVEMENTS].sort(
        (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
      ),
    [],
  );

  const primaryAchievements = orderedAchievements.slice(
    0,
    INITIAL_VISIBLE_ACHIEVEMENTS,
  );
  const additionalAchievements = orderedAchievements.slice(
    INITIAL_VISIBLE_ACHIEVEMENTS,
  );

  useEffect(() => {
    if (!selectedAchievement) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedAchievement(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedAchievement]);

  return (
    <Section id="achievements" className="relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 right-0 h-52 w-52 rounded-full bg-ctp-yellow/10 blur-3xl" />
        <div className="absolute -bottom-12 left-6 h-56 w-56 rounded-full bg-ctp-blue/10 blur-3xl" />
      </div>

      <SectionTitle
        badge={copy.achievements.badge}
        title={copy.achievements.title}
        highlightWord={locale === "bn" ? "অর্জন" : "Achievements"}
        subtitle={copy.achievements.subtitle}
      />

      <motion.div
        className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={getContainerVariants(reducedMotion)}
      >
        {primaryAchievements.map((achievement, index) => (
          <AchievementCard
            key={achievement.title}
            achievement={achievement}
            reducedMotion={reducedMotion}
            index={index}
            locale={locale}
            onOpenCertificate={setSelectedAchievement}
          />
        ))}
      </motion.div>

      {additionalAchievements.length > 0 && (
        <div className="max-w-6xl mx-auto mt-8">
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowMoreAchievements((value) => !value)}
              className="group mx-auto inline-flex items-center gap-2 rounded-full border border-ctp-surface0/60 bg-ctp-surface0/25 px-4 py-2 text-sm font-medium text-ctp-subtext0 transition-[color,border-color,background-color] duration-200 hover:border-ctp-surface1 hover:bg-ctp-surface0/40 hover:text-ctp-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base"
              aria-expanded={showMoreAchievements}
              aria-controls="more-achievements-panel"
            >
              {copy.achievements.moreAchievements} (
              {locale === "bn"
                ? additionalAchievements.length.toLocaleString("bn-BD")
                : additionalAchievements.length}
              )
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${showMoreAchievements ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          <AnimatePresence>
            {showMoreAchievements && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reducedMotion ? 0.24 : 0.36, ease }}
                className="overflow-hidden"
                id="more-achievements-panel"
              >
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {additionalAchievements.map((achievement, index) => {
                    return (
                      <motion.div
                        key={achievement.title}
                        initial={{
                          opacity: 0,
                          y: reducedMotion ? 0 : 16,
                          filter: reducedMotion ? "none" : "blur(4px)",
                        }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                          delay: reducedMotion ? 0 : index * 0.03,
                          duration: reducedMotion ? 0.26 : 0.34,
                          ease,
                        }}
                      >
                        <AchievementCard
                          achievement={achievement}
                          reducedMotion={reducedMotion}
                          index={index}
                          locale={locale}
                          onOpenCertificate={setSelectedAchievement}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedAchievement?.certificateImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ctp-crust/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.24, ease }}
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-ctp-surface0 bg-ctp-base shadow-2xl"
              initial={{
                opacity: 0,
                scale: reducedMotion ? 1 : 0.97,
                y: reducedMotion ? 0 : 12,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: reducedMotion ? 1 : 0.98,
                y: reducedMotion ? 0 : 8,
              }}
              transition={{ duration: reducedMotion ? 0.2 : 0.28, ease }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${copy.achievements.certificateFor} ${selectedAchievement.title}`}
            >
              <button
                type="button"
                onClick={() => setSelectedAchievement(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-ctp-surface0 p-2 text-ctp-text transition-colors hover:bg-ctp-surface1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base"
                aria-label={copy.achievements.closeCertificate}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="border-b border-ctp-surface0/70 bg-ctp-surface0/30 px-6 py-4 pr-14">
                <p className="text-sm font-semibold text-ctp-text line-clamp-1">
                  {selectedAchievement.title}
                </p>
                <p className="mt-1 text-xs text-ctp-subtext0">
                  {translateDynamicText(
                    locale,
                    selectedAchievement.organization,
                  )}{" "}
                  · {translateDynamicText(locale, selectedAchievement.date)}
                </p>
              </div>

              <div className="p-8">
                <Image
                  src={selectedAchievement.certificateImage}
                  alt={`${selectedAchievement.title} certificate`}
                  width={1200}
                  height={800}
                  className="mx-auto max-h-[calc(90vh-10rem)] max-w-full rounded-lg object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
