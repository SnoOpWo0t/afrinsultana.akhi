"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence, type Variants } from "framer-motion";
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Download,
  Sparkles,
  Layers,
  CircleDot,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { PROJECTS, type ProjectStatusKey } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  getCopy,
  translateDynamicText,
  type Locale,
} from "@/lib/i18n/translations";

const ease = [0.22, 1, 0.36, 1] as const;

type ProjectItem = (typeof PROJECTS)[number];

type ProjectStats = {
  stars: number;
  forks: number;
  language: string;
  downloads?: number;
};

const getFilterConfig = (
  locale: Locale,
): Record<"featured" | "all", { label: string; icon: LucideIcon }> => {
  const copy = getCopy(locale);

  return {
    featured: {
      label: copy.projects.featuredTab,
      icon: Sparkles,
    },
    all: {
      label: copy.projects.allTab,
      icon: Layers,
    },
  };
};

const getStatusConfig = (
  locale: Locale,
): Record<
  ProjectStatusKey,
  {
    label: string;
    badge: string;
    dot: string;
    text: string;
    rail: string;
    glow: string;
  }
> => {
  const copy = getCopy(locale);

  return {
    active: {
      label: copy.projects.active,
      badge: "bg-ctp-green/12",
      dot: "bg-ctp-green",
      text: "text-ctp-green",
      rail: "bg-ctp-green/70",
      glow: "bg-ctp-green/12",
    },
    stable: {
      label: copy.projects.stable,
      badge: "bg-ctp-blue/12",
      dot: "bg-ctp-blue",
      text: "text-ctp-blue",
      rail: "bg-ctp-blue/70",
      glow: "bg-ctp-blue/12",
    },
    prototype: {
      label: copy.projects.prototype,
      badge: "bg-ctp-mauve/12",
      dot: "bg-ctp-mauve",
      text: "text-ctp-mauve",
      rail: "bg-ctp-mauve/70",
      glow: "bg-ctp-mauve/12",
    },
    research: {
      label: copy.projects.research,
      badge: "bg-ctp-peach/14",
      dot: "bg-ctp-peach",
      text: "text-ctp-peach",
      rail: "bg-ctp-peach/70",
      glow: "bg-ctp-peach/14",
    },
  };
};

const fallbackStatus: ProjectStatusKey = "active";

const getGridVariants = (reducedMotion: boolean): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: reducedMotion ? 0 : 0.06,
      staggerChildren: reducedMotion ? 0.04 : 0.08,
    },
  },
});

const getCardVariants = (reducedMotion: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 24,
    filter: reducedMotion ? "none" : "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: reducedMotion ? 0.3 : 0.5,
      ease,
    },
  },
});

const getMetaVariants = (reducedMotion: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reducedMotion ? 0.2 : 0.35,
      ease,
    },
  },
});

const getCardLayout = (project: ProjectItem, index: number) => {
  const prominent = Boolean(
    project.featured && (project.wide ?? index % 3 === 0),
  );

  return {
    prominent,
    spanClass: prominent ? "md:col-span-2 lg:col-span-4" : "lg:col-span-2",
    imageClass: "h-52 sm:h-56",
    descClampClass: prominent ? "line-clamp-3" : "line-clamp-2",
  };
};


const ProjectModal = ({ project, onClose }: { project: ProjectItem | null, onClose: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && project?.images) {
        setCurrentIndex((prev) => (prev + 1) % project.images!.length);
      }
      if (e.key === 'ArrowLeft' && project?.images) {
        setCurrentIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  // Reset index when project changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ctp-crust/80 backdrop-blur-sm p-4 sm:p-8"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[110] rounded-full bg-ctp-surface0/50 p-2 text-ctp-text hover:bg-ctp-surface1 backdrop-blur-md transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <motion.div
            layoutId={`project-media-${project.title}`}
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-ctp-mantle shadow-2xl ring-1 ring-ctp-surface1"
            onClick={(e) => e.stopPropagation()}
          >
            {project.images && project.images.length > 0 ? (
              <>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={project.images[currentIndex]}
                      alt={`${project.title} screenshot ${currentIndex + 1}`}
                      fill
                      className="object-contain bg-black/20"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] rounded-full bg-ctp-surface0/50 p-3 text-ctp-text hover:bg-ctp-surface1 backdrop-blur-md transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex((prev) => (prev + 1) % project.images!.length);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] rounded-full bg-ctp-surface0/50 p-3 text-ctp-text hover:bg-ctp-surface1 backdrop-blur-md transition-colors"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-[110]">
                      {project.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex(i);
                          }}
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            i === currentIndex ? "bg-ctp-blue" : "bg-ctp-surface1 hover:bg-ctp-surface2"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : project.video ? (
              <video
                src={project.video}
                autoPlay
                controls
                className="w-full h-full object-contain bg-black/20"
              />
            ) : project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain bg-black/20"
              />
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const { locale } = useLanguage();
  const copy = getCopy(locale);
  const filterConfig = getFilterConfig(locale);
  const statusConfig = getStatusConfig(locale);
  const [filter, setFilter] = useState<"all" | "featured">("featured");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [projectStats, setProjectStats] = useState<
    Record<string, ProjectStats>
  >(() =>
    PROJECTS.reduce<Record<string, ProjectStats>>((acc, project) => {
      acc[project.title] = { stars: 0, forks: 0, language: "" };
      return acc;
    }, {}),
  );

  const filteredProjects =
    filter === "featured" ? PROJECTS.filter((p) => p.featured) : PROJECTS;
  const formatNumber = (value: number) =>
    locale === "bn" ? value.toLocaleString("bn-BD") : value.toLocaleString();

  const gridVariants = getGridVariants(reducedMotion);
  const cardVariants = getCardVariants(reducedMotion);
  const metaVariants = getMetaVariants(reducedMotion);

  useEffect(() => {
    const controller = new AbortController();

    const fetchStats = async () => {
      try {
        const response = await fetch("/api/projects-stats", {
          signal: controller.signal,
          cache: "force-cache",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch project stats: ${response.status}`);
        }

        const data = (await response.json()) as Record<string, ProjectStats>;
        setProjectStats((prev) => ({ ...prev, ...data }));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        console.error("Error fetching project stats:", error);
      }
    };

    void fetchStats();

    return () => controller.abort();
  }, []);

  return (
    <Section id="projects" className="relative overflow-hidden">
      <SectionTitle
        badge={copy.projects.badge}
        title={copy.projects.title}
        highlightWord={locale === "bn" ? "প্রজেক্টস" : "Projects"}
        subtitle={copy.projects.subtitle}
      />

      {/* Filter */}
      <div className="flex justify-center gap-2 mb-10">
        {(["featured", "all"] as const).map((f) => {
          const config = filterConfig[f];
          const Icon = config.icon;

          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ctp-blue focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base ${
                filter === f
                  ? "bg-ctp-blue text-ctp-crust"
                  : "text-ctp-subtext0 hover:text-ctp-text bg-ctp-surface0/30"
              }`}
            >
              <Icon className="w-4 h-4" />
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={gridVariants}
        key={filter}
      >
        {filteredProjects.map((project, index) => {
          const stats = projectStats[project.title];
          const layout = getCardLayout(project, index);
          const resolvedStatus: ProjectStatusKey =
            project.status ?? (project.featured ? "active" : fallbackStatus);
          const status = statusConfig[resolvedStatus];
          const renderedTags =
            project.tags && project.tags.length > 0
              ? project.tags
              : project.techStack.slice(0, 3);

          return (
            <motion.article
              key={project.title}
              variants={cardVariants}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      y: -4,
                      scale: 1.006,
                      rotateX: layout.prominent ? 1.1 : 0.8,
                      rotateY: layout.prominent ? -1.1 : -0.8,
                    }
              }
              transition={{ duration: reducedMotion ? 0.22 : 0.26, ease }}
              style={{ transformPerspective: 1200 }}
              className={`group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-ctp-surface0/70 bg-ctp-surface0/35 backdrop-blur-sm transition-[border-color,background-color] duration-300 hover:border-ctp-surface1 hover:bg-ctp-surface0/45 ${layout.spanClass}`}
            >
              <div className={`absolute inset-x-0 top-0 h-px ${status.rail}`} />
              <div
                className={`pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full ${status.glow} opacity-0 blur-3xl transition-opacity duration-300 ${
                  reducedMotion ? "" : "group-hover:opacity-100"
                }`}
              />

              {/* Image */}
              <motion.div
                layoutId={`project-media-${project.title}`}
                onClick={() => setSelectedProject(project)}
                className={`relative overflow-hidden bg-ctp-mantle cursor-pointer ${layout.imageClass}`}
              >
                {project.video ? (
                  <>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      className={`object-cover transition-opacity duration-500 absolute inset-0 z-10 ${
                        reducedMotion ? "" : "group-hover:opacity-0"
                      }`}
                    />
                    <video
                      src={project.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={`object-cover w-full h-full transition-opacity duration-500 absolute inset-0 opacity-0 z-0 ${
                        reducedMotion ? "" : "group-hover:opacity-100"
                      }`}
                    />
                  </>
                ) : project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    className={`object-cover transition-transform duration-500 ${
                      reducedMotion
                        ? ""
                        : "group-hover:scale-105 group-hover:-translate-y-0.5"
                    }`}
                  />
                ) : project.liveUrl ? (
                  <div className="absolute inset-0 w-[200%] h-[200%] origin-top-left scale-50">
                    <iframe
                      src={project.liveUrl}
                      title={`${project.title} preview`}
                      className={`w-full h-full border-0 pointer-events-none transition-transform duration-500 ${
                        reducedMotion
                          ? ""
                          : "group-hover:scale-105 group-hover:-translate-y-0.5"
                      }`}
                      sandbox="allow-scripts allow-same-origin"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-ctp-surface0/50">
                    <span className="text-ctp-overlay0 font-medium">{project.title}</span>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-ctp-crust/75 via-ctp-crust/15 to-transparent" />
                {project.featured && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-ctp-yellow/90 px-2 py-0.5 text-xs font-medium text-ctp-crust">
                    <Star className="w-3 h-3 fill-current" />
                    {copy.projects.featuredBadge}
                  </span>
                )}
                {project.highlight && (
                  <span className="absolute bottom-3 left-3 rounded-full border border-ctp-surface1/60 bg-ctp-base/70 px-2.5 py-1 text-[11px] font-medium text-ctp-subtext1 backdrop-blur-sm">
                    {translateDynamicText(locale, project.highlight)}
                  </span>
                )}
              </motion.div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-2.5 flex items-center justify-between gap-2">
                  <span className="text-xs text-ctp-overlay0 font-mono">
                    {translateDynamicText(locale, project.category)}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${status.badge} ${status.text}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                    />
                    {status.label}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-display font-bold text-ctp-text transition-colors group-hover:text-ctp-blue sm:text-[1.2rem] cursor-pointer" onClick={() => setSelectedProject(project)}>
                  {project.title}
                  <span className="mt-1 block h-px origin-left scale-x-0 bg-linear-to-r from-ctp-blue via-ctp-mauve to-ctp-pink transition-transform duration-300 group-hover:scale-x-100" />
                </h3>

                <p
                  className={`mb-4 flex-1 text-sm leading-relaxed text-ctp-subtext0 ${layout.descClampClass}`}
                >
                  {translateDynamicText(locale, project.description)}
                </p>

                {/* Stats */}
                {stats && (
                  <motion.div
                    variants={metaVariants}
                    className="mb-3 flex items-center gap-3 rounded-lg border border-ctp-surface1/50 bg-ctp-surface0/35 px-3 py-2 text-xs text-ctp-subtext0"
                  >
                    {stats.stars > 0 ? (
                      <span className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 text-ctp-yellow" />
                        {formatNumber(stats.stars)}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <CircleDot className="h-3.5 w-3.5 text-ctp-overlay1" />
                        {copy.projects.liveRepo}
                      </span>
                    )}
                    {stats.forks > 0 && (
                      <span className="flex items-center gap-1.5">
                        <GitFork className="h-3.5 w-3.5 text-ctp-blue" />
                        {formatNumber(stats.forks)}
                      </span>
                    )}
                    {stats.downloads != null && stats.downloads > 0 && (
                      <span className="flex items-center gap-1.5">
                        <Download className="h-3.5 w-3.5 text-ctp-green" />
                        {formatNumber(stats.downloads)}
                      </span>
                    )}
                    {stats.language && (
                      <span className="ml-auto flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-ctp-mauve" />
                        {stats.language}
                      </span>
                    )}
                  </motion.div>
                )}

                {/* Tags */}
                <motion.div
                  variants={metaVariants}
                  className="mb-4 flex flex-wrap gap-1.5"
                >
                  {renderedTags
                    .slice(0, layout.prominent ? 4 : 3)
                    .map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-ctp-surface1/30 bg-ctp-surface0/60 px-2 py-0.5 text-xs text-ctp-subtext0"
                      >
                        {tag}
                      </span>
                    ))}
                  {project.techStack.length > (layout.prominent ? 4 : 3) && (
                    <span className="text-xs text-ctp-overlay0">
                      +
                      {formatNumber(
                        project.techStack.length - (layout.prominent ? 4 : 3),
                      )}
                    </span>
                  )}
                </motion.div>

                {/* Links */}
                <div className="flex gap-2 mt-auto">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex flex-1 items-center justify-center gap-2 rounded-lg border border-ctp-surface1/50 bg-ctp-surface0/50 px-3 py-2 text-sm font-medium text-ctp-text transition-colors hover:bg-ctp-surface0 focus-visible:ring-2 focus-visible:ring-ctp-blue focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base"
                  >
                    <Github className="h-4 w-4 transition-transform duration-200 group-hover/link:scale-110" />
                    {copy.projects.code}
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/live flex flex-1 items-center justify-center gap-2 rounded-lg bg-ctp-blue px-3 py-2 text-sm font-medium text-ctp-crust transition-colors hover:bg-ctp-sapphire focus-visible:ring-2 focus-visible:ring-ctp-blue focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base"
                    >
                      <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover/live:-translate-y-0.5 group-hover/live:scale-105" />
                      {copy.projects.live}
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      {/* GitHub CTA */}
      <motion.div
        className="mt-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <a
          href="https://github.com/SnoOpWo0t"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-ctp-surface0/60 bg-ctp-surface0/30 px-6 py-2.5 text-sm font-medium text-ctp-text transition-colors hover:border-ctp-surface1 focus-visible:ring-2 focus-visible:ring-ctp-blue focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base"
        >
          <Github className="h-4 w-4" />
          {copy.projects.viewAllRepos}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </motion.div>

      {/* Shared Element Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </Section>

  );
}
