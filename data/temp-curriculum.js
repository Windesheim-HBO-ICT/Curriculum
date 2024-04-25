export const menu = [
  {
    name: "SSDLC Requirements",
    children: [
      {
        name: "HBO-Analyseren",
        children: [
          {
            name: "Probleemanalyse",
            children: [
              { name: "Requirements verzamelen" },
              { name: "Huidige systeemanalyse" },
              { name: "Probleemidentificatie" },
              { name: "Stakeholderanalyse" },
            ],
          },
          {
            name: "Data-analyse",
            children: [
              { name: "Data verzamelen en evalueren" },
              { name: "Data modelleren" },
              { name: "Data interpretatie" },
            ],
          },
          {
            name: "Documentatieanalyse",
            children: [
              { name: "Documentatie review" },
              { name: "Documentatie kritisch evalueren" },
              { name: "Verbanden leggen tussen documenten" },
            ],
          },
        ],
      },

      {
        name: "HBO-I Adviseren",
        children: [
          {
            name: "Adviesrapporten",
            children: [
              { name: "Analyseren van bevindingen" },
              { name: "Advies formuleren" },
              { name: "Rapporteren van advies" },
            ],
          },
          {
            name: "Stakeholdercommunicatie",
            children: [
              { name: "Effectief communiceren met stakeholders" },
              { name: "Behoeften van stakeholders identificeren" },
              { name: "Strategisch adviseren" },
            ],
          },
          {
            name: "Veranderingsmanagement",
            children: [
              { name: "Veranderingsbehoeften identificeren" },
              { name: "Implementatieplannen opstellen" },
              { name: "Risico's van veranderingen beoordelen" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "SSDLC Design",
    children: [
      {
        name: "HBO-I Ontwerpen",
        children: [
          {
            name: "Functioneel Ontwerp",
            children: [
              {
                name: "User Stories",
                children: [
                  { name: "Opstellen van gebruikersverhalen" },
                  { name: "Functionele vereisten specificeren" },
                  { name: "Acceptatiecriteria definiëren" },
                ],
              },
              {
                name: "Use Case Modellering",
                children: [
                  { name: "Use Case diagrammen maken" },
                  { name: "Actors identificeren" },
                  { name: "Use Case scenarios opstellen" },
                ],
              },
              {
                name: "Wireframing",
                children: [
                  { name: "Schetsen van gebruikersinterfaces" },
                  { name: "Interactieontwerp" },
                  { name: "Prototype-ontwikkeling" },
                ],
              },
            ],
          },
          {
            name: "Technisch Ontwerp",
            children: [
              {
                name: "C4 Model",
                children: [
                  { name: "Context diagrammen maken" },
                  { name: "Container diagrammen opstellen" },
                  { name: "Component- en klassendiagrammen ontwerpen" },
                ],
              },
              {
                name: "UML Modellering",
                children: [
                  { name: "Klassendiagrammen maken" },
                  { name: "Sequentiediagrammen opstellen" },
                  { name: "Activiteitendiagrammen ontwikkelen" },
                ],
              },
              {
                name: "Threat Modeling",
                children: [
                  { name: "Identificeren van bedreigingen" },
                  { name: "Risicoanalyse uitvoeren" },
                  { name: "Beveiligingsmaatregelen ontwerpen" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "SSDLC Development",
    children: [
      {
        name: "HBO-I Realiseren",
        children: [
          {
            name: "Softwareontwikkeling",
            children: [
              { name: "Programmeren" },
              { name: "Code review" },
              { name: "Implementeren van ontwerppatronen" },
            ],
          },
          {
            name: "Testgedreven ontwikkeling",
            children: [
              { name: "Schrijven van unit tests" },
              { name: "Testautomatisering" },
              { name: "Continuous Integration (CI)" },
            ],
          },
          {
            name: "Versiebeheer",
            children: [
              { name: "Git gebruiken" },
              { name: "Branchingstrategieën" },
              { name: "Merge conflict resolution" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "SSDLC Testing",
    children: [
      {
        name: "HBO-I Realiseren",
        children: [
          {
            name: "Applicatie testen",
            children: [
              {
                name: "Test voorbereiden",
                children: [
                  { name: "Test applicatie opzetten" },
                  { name: "Test packages installeren" },
                  { name: "Testen in CI opzetten" },
                  { name: "Test strategie bepalen" },
                ],
              },
              {
                name: "Testbewijs ontwikkelen",
                children: [
                  { name: "Test cases bepalen" },
                  { name: "Test anatomie opzetten" },
                  { name: "Testbaarheid functionaliteit bepalen" },
                ],
              },
              {
                name: "Test evaluren",
                children: [
                  { name: "Test resultaat analyseren" },
                  { name: "Resterend risico bepalen" },
                  { name: "Code review" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "SSDLC Deployment",
    children: [
      {
        name: "HBO-I Manage en Control",
        children: [
          {
            name: "Release Management",
            children: [
              { name: "Releaseplanning opstellen" },
              { name: "Versiebeheer" },
              { name: "Deployment coördineren" },
            ],
          },
          {
            name: "Change Management",
            children: [
              { name: "Veranderingen beheren en controleren" },
              { name: "Impactanalyses uitvoeren" },
              { name: "Communicatie en stakeholdermanagement" },
            ],
          },
          {
            name: "Kwaliteitsborging",
            children: [
              { name: "Testplanning en coördinatie" },
              { name: "Kwaliteitscontroles uitvoeren" },
              { name: "Rapportage en opvolging van kwaliteitsissues" },
            ],
          },
        ],
      },
      {
        name: "HBO-I Realiseren",
        children: [
          {
            name: "Deployment Automatisering",
            children: [
              { name: "Scripting voor deployment" },
              { name: "Gebruik van deploymenttools" },
              { name: "Continuous Deployment (CD)" },
            ],
          },
          {
            name: "Omgevingsbeheer",
            children: [
              { name: "Configuratiebeheer" },
              { name: "Omgevingsmonitoring" },
              { name: "Troubleshooting en probleemoplossing" },
            ],
          },
          {
            name: "Beveiliging en Compliance",
            children: [
              { name: "Security Best Practices implementeren" },
              { name: "Compliance controles uitvoeren" },
              { name: "Data Privacy Management" },
            ],
          },
        ],
      },
    ],
  },
];
