import React from "react";

import ModernTemplate from "../../../templates/ModernTemplate.jsx";
import ClassicTemplate from "../../../templates/ClassicTemplate.jsx";
import MinimalTemplate from "../../../templates/MinimalTemplate.jsx";
import ProfessionalTemplate from "../../../templates/ProfessionalTemplate.jsx";

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  professional: ProfessionalTemplate,
};

export default function ResumePreview({ resume }) {
  const Template = templates[resume?.template] || ModernTemplate;

  return (
    <div className="flex min-h-full justify-center p-5 md:p-10">
      <div
        id="resume-preview"
        className="
          h-fit
          min-h-[297mm]
          w-[210mm]
          origin-top
          bg-white
          shadow-[0_20px_70px_rgba(40,36,28,0.18)]
        "
      >
        <Template resume={resume} />
      </div>
    </div>
  );
}