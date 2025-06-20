export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};
// Erreur de numérotation, la fonction getMonth commence à 0. C'est pourquoi le mois de janvier n'était pas affiché et les autres mois sont décalés. Ajout de +1.
export const getMonth = (date) => MONTHS[date.getMonth() + 1];
