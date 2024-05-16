import requirements from "./ssdlc/requirements.js";
import design from "./ssdlc/design.js";
import deployment from "./ssdlc/deployment.js";
import testing from "./ssdlc/testing.js";
import development from "./ssdlc/development.js";

const gebruikersinteractieCurriculum = [
  {
    naam: "SSDLC Requirements1",
    labels: requirements,
  },
  {
    naam: "SSDLC Design",
    labels: design,
  },
  {
    naam: "SSDLC Development",
    labels: development,
  },
  {
    naam: "SSDLC Testing",
    labels: testing,
  },
  {
    naam: "SSDLC Deployment",
    labels: deployment,
  },
];

export default gebruikersinteractieCurriculum;
