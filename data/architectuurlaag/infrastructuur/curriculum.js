import requirements from "./ssdlc/requirements.js";
import design from "./ssdlc/design.js";
import deployment from "./ssdlc/deployment.js";
import testing from "./ssdlc/testing.js";
import development from "./ssdlc/development.js";

const infrastructureCurriculum = [
  {
    naam: "SSDLC Requirements",
    kleur: "#1ABFA1",
    activiteiten: requirements,
  },
  {
    naam: "SSDLC Design",
    kleur: "#388DCD",
    activiteiten: design,
  },
  {
    naam: "SSDLC Development",
    kleur: "#E14398",
    activiteiten: development,
  },
  {
    naam: "SSDLC Testing",
    kleur: "#ECA54B",
    activiteiten: testing,
  },
  {
    naam: "SSDLC Deployment",
    kleur: "#EF733F",
    activiteiten: deployment,
  },
];

export default infrastructureCurriculum;
