Select sta_ges."statusGestions",
eve."commentaire",
eve."dateDebut",
eve."dateFin",
eve."duree",
typ_eve."typesEvenements"

From public."Gestions" ges
LEFT JOIN public."StatusGestions" sta_ges ON sta_ges."idStatusGestions" = ges."idStatusGestions"
LEFT JOIN public."Utilisateurs" uti ON uti."idUtilisateurs" = ges."idUtilisateurs"
LEFT JOIN public."Evenements" eve ON eve."idEvenements" = ges."idEvenements"
LEFT JOIN public."TypesEvenements" typ_eve ON typ_eve."idTypesEvenements" = eve."idTypesEvenements"

WHERE uti."mail" = 'jonathan.roy@student.junia.com'