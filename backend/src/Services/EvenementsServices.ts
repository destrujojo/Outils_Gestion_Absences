import EvenementsDao from "../Dao/EvenementsDao";
import TypesEvenementsDao from "../Dao/TypesEvenementsDao";

class EvenementsServices {
  async createEvenement(
    commentaire: string,
    date: Date,
    duree: string,
    typesEvenements: string
  ) {
    const TypesEvenements = await TypesEvenementsDao.findIdTypesEvenements(
      typesEvenements
    );
    if (!TypesEvenements) {
      throw new Error("Le type d'événement n'existe pas");
    }

    return await EvenementsDao.createEvenements(
      TypesEvenements.idTypesEvenements,
      commentaire,
      date,
      duree
    );
  }
}

export default new EvenementsServices();
