// Leadership team shown on the About page. Names, titles, phones and emails are taken from
// the team directory the WDF team provided (WDF Team Wallpapers, Oct 2026); titles are kept
// in English as published. Keep business facts here only once they are verified.

export type TeamMember = {
  name: string;
  title: string;
  phone: string;
  email: string;
};

export const LEADERSHIP_TEAM: readonly TeamMember[] = [
  {
    name: "Cesar Ponce",
    title: "CEO and President",
    phone: "+52 686 119 0391",
    email: "cesar.ponce@wdfservices.com",
  },
  {
    name: "Fernando Gallego",
    title: "Vice President, Business Development",
    phone: "+1 (858) 947-8486",
    email: "fernando.gallego@wdfservices.com",
  },
  {
    name: "José Luis Ríos",
    title: "Engineering Director",
    phone: "+52 686 186 6996",
    email: "joseluis.rios@wdfservices.com",
  },
  {
    name: "Francisco Morales",
    title: "Operation Manager",
    phone: "+52 686 387 7857",
    email: "francisco.morales@wdfservices.com",
  },
  {
    name: "Gabriel Cabrales",
    title: "Project & Field Services Manager",
    phone: "+52 686 430 3758",
    email: "gcabrales@wdfintegrators.com",
  },
  {
    name: "Gerardo Aguirre",
    title: "Technical Support — Electrical Equipment, Substations & Lines",
    phone: "+52 55 3500 1047",
    email: "gerardo.aguirre@wdfintegrators.com",
  },
  {
    name: "Julio Alcaraz",
    title: "Technical Support — Electrical Equipment, Protection & Control",
    phone: "+52 686 234 4305",
    email: "jalcaraz@wdfintegrators.com",
  },
  {
    name: "Alonso Garcia",
    title: "Sales & Customer Support",
    phone: "+52 664 322 4269",
    email: "agarcia@wdfintegrators.com",
  },
  {
    name: "Sarayd Rios",
    title: "Customer Support",
    phone: "+52 686 212 6962",
    email: "srios@wdfintegrators.com",
  },
  {
    name: "Mildred Orozco",
    title: "Customer Support",
    phone: "+52 686 357 1003",
    email: "mildred.orozco@wdfservices.com",
  },
  {
    name: "Miguel Bustos",
    title: "Accounting & Administrative Support — WDF Services",
    phone: "+52 686 415 0105",
    email: "miguel.bustos@wdf.services",
  },
  {
    name: "Mariana Aguirre",
    title: "Bilingual Marketing & Growth Coordinator",
    phone: "+52 686 355 5581",
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
