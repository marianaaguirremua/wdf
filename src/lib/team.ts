// Leadership team shown on the About page. Names, titles and emails are taken from the team
// directory the WDF team provided (WDF Team Wallpapers, Oct 2026); titles are kept in English
// as published. Only Mildred Orozco's Yuma line is published as a phone (WDF request, Oct 2026).

export type TeamMember = {
  name: string;
  title: string;
  /** Published for a few contacts only; most cards show email alone. */
  phone?: string;
  email: string;
};

export const LEADERSHIP_TEAM: readonly TeamMember[] = [
  {
    name: "Cesar Ponce",
    title: "CEO and President",
    email: "cesar.ponce@wdfservices.com",
  },
  {
    name: "Fernando Gallego",
    title: "Vice President, Business Development",
    email: "fernando.gallego@wdfservices.com",
  },
  {
    name: "José Luis Ríos",
    title: "Engineering Director",
    email: "joseluis.rios@wdfservices.com",
  },
  {
    name: "Francisco Morales",
    title: "Operation Manager",
    email: "francisco.morales@wdfservices.com",
  },
  {
    name: "Gabriel Cabrales",
    title: "Project & Field Services Manager",
    email: "gcabrales@wdfintegrators.com",
  },
  {
    name: "Gerardo Aguirre",
    title: "Technical Support — Electrical Equipment, Substations & Lines",
    email: "gerardo.aguirre@wdfintegrators.com",
  },
  {
    name: "Julio Alcaraz",
    title: "Technical Support — Electrical Equipment, Protection & Control",
    email: "jalcaraz@wdfintegrators.com",
  },
  {
    name: "Alonso Garcia",
    title: "Sales & Customer Support",
    email: "agarcia@wdfintegrators.com",
  },
  {
    name: "Sarayd Rios",
    title: "Customer Support",
    email: "srios@wdfintegrators.com",
  },
  {
    name: "Mildred Orozco",
    title: "Customer Support",
    phone: "+1 (928) 246-4860",
    email: "mildred.orozco@wdfservices.com",
  },
  {
    name: "Mariana Aguirre",
    title: "Bilingual Marketing & Growth Coordinator",
    email: "mariana.aguirre@wdfintegrators.com",
  },
];

/** "+52 686 119 0391" -> "+526861190391" for tel: links. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/** "José Luis Ríos" -> "JR": first letter of the first and last words. */
export function initials(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  return (
    (words[0]?.[0] ?? "") + (words.length > 1 ? (words.at(-1)?.[0] ?? "") : "")
  ).toUpperCase();
}
