import delivery from "../content/production-delivery.json";
import resume from "../content/resume.json";

export const productionDelivery = delivery;
export const productionDeliveryUrl = "/work#production-delivery";

// Reuse the published career record rather than maintaining a second set of metrics.
export const earlierDeliveryOutcomes = resume.experience
  .filter((role) => role.period === "May 2022 - May 2025")
  .flatMap((role) => role.bullets)
  .filter((text) => /120\+|80%|200 engineering hours/.test(text));

export function productionDeliveryContent() {
  return [
    delivery.summary,
    ...delivery.sections.map((section) => `${section.label}: ${section.text.replace(/\bI\b/g, "Ravikanth").replace(/\bMy\b/g, "Ravikanth's")} Published record: ${section.source}.`),
    delivery.outcomeBoundary,
    "Earlier identity and automation outcomes, May 2022 - May 2025:",
    ...earlierDeliveryOutcomes,
    "These are published resume claims; measurement methods and a detailed baseline period are not provided.",
    delivery.demonstrationBoundary
  ].join(" ");
}

export function isProductionDeliveryQuestion(question: string) {
  const lower = question.toLowerCase();
  const person = /\bravikanth\b|\bravi\b|\bhe\b|\bhis\b|your (work|experience)/.test(lower);
  const delivery = /\bproduction\b|\bship(?:ped)?\b|\bdeployed\b|\brollout\b|\badopt(?:ion|ed)\b|measured (outcomes|results|impact)|\bmttr\b/.test(lower);
  const career = /\bexperience\b|\bdelivered\b|\bship(?:ped)?\b|\bbuilt\b|\bdeployed\b|\boutcomes\b|\bresults\b|\bimpact\b|\badopt(?:ion|ed)\b|\bmttr\b|\bcustomer\b/.test(lower);
  return person && delivery && career && !/public code.*review|review.*public code|architecture to production|delivery chain|production judgment/.test(lower);
}
