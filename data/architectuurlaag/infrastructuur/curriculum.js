import requirements from "./ssdlc/requirements.js";
import design from "./ssdlc/design.js";
import deployment from "./ssdlc/deployment.js";
import testing from "./ssdlc/testing.js";
import development from "./ssdlc/development.js";

const infrastructureCurriculum = [
  {
    naam: "SSDLC Requirements",
    activiteiten: requirements,
  },
  {
    naam: "SSDLC Design",
    activiteiten: design,
  },
  {
    naam: "SSDLC Development",
    activiteiten: development,
  },
  {
    naam: "SSDLC Testing",
    activiteiten: testing,
  },
  {
    naam: "SSDLC Deployment",
    activiteiten: deployment,
  },
];

export default infrastructureCurriculum;
