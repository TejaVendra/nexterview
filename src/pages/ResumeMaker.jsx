import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ArrowLeft,
  Download,
  LayoutTemplate,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import ResumeEditor from "../components/sections/ResumeBuilders/ResumeEditor.jsx";
import ResumePreview from "../components/sections/ResumeBuilders/ResumePreview.jsx";
import TemplateSelector from "../components/sections/ResumeBuilders/TemplateSelector.jsx";
import {toast} from 'react-toastify'
import axiosInstance from "../axios/axiosInstance.js";

/* =========================================================
   INITIAL RESUME
   ========================================================= */

const initialResume = {
  id: null,

  // Template is FRONTEND ONLY.
  // It is NOT sent to backend.
  template: "TEMPLATE_ONE",

  title: "My Resume",

  name: "",
  headline: "",
  email: "",
  summary: "",

  phone: "",
  location: "",
  linkedin: "",
  github: "",
  portfolio: "",

  skills: [],
  experiences: [],
  educations: [],
  projects: [],
  certifications: [],
};

/* =========================================================
   NORMALIZE RESUME
   ========================================================= */

const normalizeResume = (resume) => {
  if (!resume) {
    return {
      ...initialResume,
    };
  }

  return {
    ...initialResume,

    ...resume,

    // Backend no longer owns template.
    // Keep existing frontend template if available.
    template:
      resume.template ||
      initialResume.template,

    skills: Array.isArray(resume.skills)
      ? resume.skills
      : [],

    experiences: Array.isArray(
      resume.experiences
    )
      ? resume.experiences
      : [],

    educations: Array.isArray(
      resume.educations
    )
      ? resume.educations
      : [],

    projects: Array.isArray(
      resume.projects
    )
      ? resume.projects.map((project) => ({
          ...project,

          technologies: Array.isArray(
            project.technologies
          )
            ? project.technologies
            : [],
        }))
      : [],

    certifications: Array.isArray(
      resume.certifications
    )
      ? resume.certifications
      : [],
  };
};

/* =========================================================
   PREPARE DATA FOR BACKEND
   ========================================================= */

const prepareResumeForSave = (resume) => {
  return {
    /*
     * IMPORTANT:
     * template is intentionally NOT included.
     */

    title: resume.title || null,

    name: resume.name || null,

    headline: resume.headline || null,

    email: resume.email || null,

    summary: resume.summary || null,

    phone: resume.phone || null,

    location: resume.location || null,

    linkedin: resume.linkedin || null,

    github: resume.github || null,

    portfolio: resume.portfolio || null,

    skills: (resume.skills || []).map(
      (skill) => ({
        name:
          typeof skill === "string"
            ? skill
            : skill?.name || "",
      })
    ),

    experiences: (
      resume.experiences || []
    ).map((experience) => ({
      company:
        experience.company || "",

      position:
        experience.position || "",

      location:
        experience.location || null,

      startDate:
        experience.startDate || null,

      endDate:
        experience.endDate || null,

      description:
        experience.description || null,
    })),

    educations: (
      resume.educations || []
    ).map((education) => ({
      institution:
        education.institution || "",

      degree:
        education.degree || "",

      field:
        education.field || null,

      startDate:
        education.startDate || null,

      endDate:
        education.endDate || null,

      grade:
        education.grade || null,
    })),

    projects: (
      resume.projects || []
    ).map((project) => ({
      name:
        project.name || "",

      description:
        project.description || null,

      githubUrl:
        project.githubUrl || null,

      liveUrl:
        project.liveUrl || null,

      technologies: (
        project.technologies || []
      ).map((technology) => ({
        name:
          typeof technology === "string"
            ? technology
            : technology?.name || "",
      })),
    })),

    certifications: (
      resume.certifications || []
    ).map((certification) => ({
      name:
        certification.name || "",

      issuer:
        certification.issuer || null,

      issueDate:
        certification.issueDate || null,

      credentialUrl:
        certification.credentialUrl || null,
    })),
  };
};

/* =========================================================
   COMPONENT
   ========================================================= */

export default function ResumeMaker() {
  const navigate = useNavigate();

  /* -------------------------------------------------------
     RESUME STATE
     ------------------------------------------------------- */

  const [resume, setResume] = useState(
    initialResume
  );

  /*
   * Always keep the latest resume available
   * without depending on React's render cycle.
   */
  const resumeRef = useRef(initialResume);

  /* -------------------------------------------------------
     UI STATE
     ------------------------------------------------------- */

  const [activeSection, setActiveSection] =
    useState("personal");

  const [mobilePreview, setMobilePreview] =
    useState(false);

  const [templateOpen, setTemplateOpen] =
    useState(false);

  /* -------------------------------------------------------
     STATUS
     ------------------------------------------------------- */

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [saved, setSaved] =
    useState(true);

  const [error, setError] =
    useState("");

  /* -------------------------------------------------------
     SAVE REFS
     ------------------------------------------------------- */

  const saveTimerRef =
    useRef(null);

  const isInitialLoadRef =
    useRef(true);

  /*
   * Used to identify whether a save response
   * belongs to the latest data.
   */
  const changeVersionRef =
    useRef(0);

  /* =========================================================
     LOAD RESUME
     ========================================================= */

  useEffect(() => {
    let mounted = true;

     toast.info("We recommend using this section on a larger screen for the best experience.")

    const loadResume = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await axiosInstance.get(
            "/resume-maker"
          );

        if (!mounted) {
          return;
        }

        const backendResume =
          response.data?.resume;

        const normalized =
          backendResume
            ? normalizeResume(
                backendResume
              )
            : {
                ...initialResume,
              };

        /*
         * IMPORTANT:
         * Update both state and ref.
         */

        resumeRef.current =
          normalized;

        setResume(normalized);

        setSaved(true);
      } catch (error) {
        console.error(
          "Failed to load resume:",
          error
        );

        if (mounted) {
          setError(
            error?.response?.data
              ?.message ||
              "Failed to load resume."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);

          /*
           * Do not immediately allow autosave
           * during initial loading.
           */
          setTimeout(() => {
            isInitialLoadRef.current =
              false;
          }, 100);
        }
      }
    };

    loadResume();

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================================================
     UPDATE RESUME
     ========================================================= */

  const updateResume = (patch) => {
    setResume((previous) => {
      const updated = {
        ...previous,
        ...patch,
      };

      /*
       * Keep ref synchronized immediately.
       */
      resumeRef.current =
        updated;

      return updated;
    });

    /*
     * Every user change creates a new version.
     */
    changeVersionRef.current += 1;

    setSaved(false);

    setError("");
  };

  /* =========================================================
     AUTO SAVE
     ========================================================= */

  useEffect(() => {
    /*
     * Don't autosave while loading.
     */
    if (isInitialLoadRef.current) {
      return;
    }

    /*
     * Don't do anything if there are
     * no unsaved changes.
     */
    if (saved) {
      return;
    }

    /*
     * Clear previous debounce timer.
     */
    if (saveTimerRef.current) {
      clearTimeout(
        saveTimerRef.current
      );
    }

    /*
     * Capture the version that caused this save.
     */
    const versionAtSchedule =
      changeVersionRef.current;

    saveTimerRef.current =
      setTimeout(async () => {
        /*
         * Always read the LATEST resume
         * from the ref.
         */
        const resumeToSave =
          resumeRef.current;

        try {
          setSaving(true);
          setError("");

          const payload =
            prepareResumeForSave(
              resumeToSave
            );

          await axiosInstance.put(
            "/resume-maker",
            payload
          );

          /*
           * IMPORTANT:
           *
           * DO NOT DO THIS:
           *
           * setResume(response.data.resume)
           *
           * because that can overwrite
           * the user's current typing.
           */

          /*
           * Only mark as saved if the user
           * hasn't changed anything since
           * this save started.
           */
          if (
            changeVersionRef.current ===
            versionAtSchedule
          ) {
            setSaved(true);
          }
        } catch (error) {
          console.error(
            "Failed to save resume:",
            error
          );

          /*
           * Only show error if component
           * is still dealing with the same
           * change version.
           */
          if (
            changeVersionRef.current ===
            versionAtSchedule
          ) {
            setError(
              error?.response?.data
                ?.message ||
                "Failed to save resume."
            );
          }
        } finally {
          setSaving(false);
        }
      }, 2000);

    /*
     * Cleanup previous timer.
     */
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(
          saveTimerRef.current
        );
      }
    };
  }, [resume, saved]);

  /* =========================================================
     CLEANUP
     ========================================================= */

  useEffect(() => {
    
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(
          saveTimerRef.current
        );
      }
    };
  }, []);

  /* =========================================================
     DOWNLOAD PDF
     ========================================================= */

  const handleDownload = async () => {
    const element =
      document.getElementById(
        "resume-preview"
      );

    if (!element) {
      return;
    }

    try {
      const html2canvas =
        (
          await import(
            "html2canvas"
          )
        ).default;

      const jsPDF =
        (
          await import("jspdf")
        ).default;

      const canvas =
        await html2canvas(
          element,
          {
            scale: 2,
            useCORS: true,
            backgroundColor:
              "#ffffff",
          }
        );

      const imageData =
        canvas.toDataURL(
          "image/png"
        );

      const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );

      const pdfWidth = 210;
      const pdfHeight = 297;

      pdf.addImage(
        imageData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      );

      pdf.save(
        `${
          resume.name || "resume"
        }.pdf`
      );
    } catch (error) {
      console.error(
        "PDF generation failed:",
        error
      );
    }
  };

  /* =========================================================
     STATUS
     ========================================================= */

  const status = loading
    ? "Loading"
    : saving
    ? "Saving"
    : saved
    ? "All changes saved"
    : "Unsaved changes";

  /* =========================================================
     LOADING UI
     ========================================================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fdfcf9]">
        <div className="text-center">
          <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-[#e7e1d5] border-t-[#c2410c]" />

          <p className="mt-3 text-sm text-[#78716c]">
            Loading resume...
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     MAIN UI
     ========================================================= */

  return (
    <div className="min-h-screen bg-white/60 font-rubik text-[#1c1917]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-[#ece7dc] bg-[#fdfcf9]/85 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 md:px-7">

          {/* LEFT */}

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                navigate(-1)
              }
              className="rounded-lg p-2 text-[#57534e] transition-colors hover:bg-[#f5f0e6]"
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="hidden h-7 w-px bg-[#ece7dc] sm:block" />

            <div>
              <p className="text-[13px] font-semibold tracking-tight text-[#1c1917]">
                Resume Maker
              </p>

              <p className="text-[11px] text-[#a8a29e]">
                {resume.title ||
                  "Untitled resume"}
              </p>
            </div>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-2 md:gap-3">

            {/* SAVE STATUS */}

            <div className="hidden items-center gap-2 text-[11px] text-[#78716c] sm:flex">

              <motion.span
                className={`h-1.5 w-1.5 rounded-full ${
                  saving
                    ? "bg-[#c2410c]"
                    : saved
                    ? "bg-[#596b54]"
                    : "bg-[#c2410c]"
                }`}
                animate={
                  saving
                    ? {
                        opacity: [
                          1,
                          0.3,
                          1,
                        ],
                      }
                    : {}
                }
                transition={
                  saving
                    ? {
                        repeat:
                          Infinity,
                        duration: 1.2,
                      }
                    : {}
                }
              />

              {status}
            </div>

            {/* TEMPLATE */}

            <button
              onClick={() =>
                setTemplateOpen(true)
              }
              className="hidden items-center gap-2 rounded-xl border border-[#ece7dc] bg-white px-3.5 py-2 text-[11.5px] font-semibold text-[#44403c] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#c2410c]/40 hover:text-[#c2410c] sm:flex"
            >
              <LayoutTemplate
                size={15}
              />

              Template
            </button>

            {/* DOWNLOAD */}

            <button
              onClick={
                handleDownload
              }
              className="flex items-center gap-2 rounded-xl bg-[#1c1917] px-3.5 py-2.5 text-[11.5px] font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#c2410c] hover:shadow-lg"
            >
              <Download
                size={15}
              />

              <span className="hidden sm:inline">
                Download PDF
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="border-b border-red-200 bg-red-50 px-4 py-3 text-center text-xs text-red-600">
          {error}
        </div>
      )}

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-[1600px] px-3 py-3 md:px-6 md:py-6">

        {/* MOBILE TOGGLE */}

        <div className="mb-3 flex items-center gap-2 rounded-xl border border-[#ece7dc] bg-white p-1 lg:hidden">

          {[
            "Edit",
            "Preview",
          ].map(
            (text, index) => {

              const active =
                index === 0
                  ? !mobilePreview
                  : mobilePreview;

              return (
                <button
                  key={text}
                  onClick={() =>
                    setMobilePreview(
                      index === 1
                    )
                  }
                  className={`relative flex-1 rounded-lg px-4 py-2 text-[12px] font-semibold ${
                    active
                      ? "text-white"
                      : "text-[#78716c]"
                  }`}
                >

                  {active && (
                    <motion.span
                      layoutId="mobile-toggle"
                      className="absolute inset-0 rounded-lg bg-[#1c1917]"
                    />
                  )}

                  <span className="relative z-10">
                    {text}
                  </span>

                </button>
              );
            }
          )}

        </div>

        {/* EDITOR + PREVIEW */}

        <div className="grid min-h-[calc(100vh-7rem)] gap-4 lg:grid-cols-[minmax(400px,520px)_1fr]">

          {/* EDITOR */}

          <AnimatePresence mode="wait">

            {!mobilePreview && (
              <motion.aside
                key="editor"
                initial={{
                  opacity: 0,
                  x: -12,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -12,
                }}
                className="min-h-0 overflow-hidden rounded-[24px] border border-[#ece7dc] bg-[#fdfcf9] shadow-[0_20px_60px_-30px_rgba(28,25,23,0.15)]"
              >

                <ResumeEditor
                  resume={resume}
                  updateResume={
                    updateResume
                  }
                  activeSection={
                    activeSection
                  }
                  setActiveSection={
                    setActiveSection
                  }
                />

              </motion.aside>
            )}

          </AnimatePresence>

          {/* PREVIEW */}

          <motion.main
            className={`${
              mobilePreview
                ? "block"
                : "hidden lg:block"
            } min-w-0 overflow-auto rounded-[24px] border border-[#ece7dc] bg-[#e7e1d5]`}
          >

            <ResumePreview
              resume={resume}
            />

          </motion.main>

        </div>
      </div>

      {/* =====================================================
          TEMPLATE SELECTOR
      ===================================================== */}

      <AnimatePresence>

        {templateOpen && (
          <TemplateSelector
            selected={
              resume.template
            }

            onClose={() =>
              setTemplateOpen(false)
            }

            onSelect={(template) => {

              /*
               * Template is frontend-only.
               *
               * It changes the preview but
               * is NOT sent to backend.
               */

              updateResume({
                template,
              });

              setTemplateOpen(false);
            }}
          />
        )}

      </AnimatePresence>

    </div>
  );
}