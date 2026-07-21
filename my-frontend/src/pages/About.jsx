import DynamicSection from "../components/DynamicSection";
import SupportMissionForm from "../components/SupportMissionForm";

export default function About() {
  return (
    <div className="font-sans text-gray-800">

      {/* HERO */}
      <DynamicSection
        page="about"
        section="hero"
      />

      {/* WHO WE ARE */}
      <DynamicSection
        page="about"
        section="who-we-are"
      />

      {/* MISSION */}
      <DynamicSection
        page="about"
        section="mission"
      />

      {/* VISION */}
      <DynamicSection
        page="about"
        section="vision"
      />

      {/* CORE VALUES */}
      <DynamicSection
        page="about"
        section="core-values"
      />

      {/* IMPACT */}
      <DynamicSection
        page="about"
        section="impact"
      />

      {/* CALL TO ACTION */}
      <DynamicSection
        page="about"
        section="cta"
      />

      {/* SUPPORT FORM */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <SupportMissionForm />
        </div>
      </section>

    </div>
  );
}