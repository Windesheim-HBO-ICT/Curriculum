import requirements from "./ssdlc/requirements.js";
import design from "./ssdlc/design.js";
import deployment from "./ssdlc/deployment.js";
import testing from "./ssdlc/testing.js";
import development from "./ssdlc/development.js";

const organisatieprocessenCurriculum = [
  {
    naam: "SSDLC Requirements1",
    labels: requirements,
    backgroundColor: "rgba(26, 191, 161, 0.75)"
  },
  {
    naam: "SSDLC Design",
    labels: design,
    backgroundColor: "rgba(56, 141, 205, 0.75)"
  },
  {
    naam: "SSDLC Development",
    labels: development,
    backgroundColor: "rgba(236, 165, 75, 0.75)"
  },
  {
    naam: "SSDLC Testing",
    labels: testing,
    backgroundColor: "rgba(225, 67, 152, 0.75)"
  },
  {
    naam: "SSDLC Deployment",
    labels: deployment,
    backgroundColor: "rgba(239, 115, 63, 0.75)"
  },
];

export default organisatieprocessenCurriculum;
