import UtilisateursDao from "../Dao/UtilisateursDao";
import { Utilisateurs } from "../Models/UtilisateursModels";
import RolesDao from "../Dao/RolesDao";
import ClassesDao from "../Dao/ClassesDao";
import { RoleEnum } from "../Enums/RoleEnum";
import bcrypt from "bcrypt";

class UtilisateursServices {
  async createUtilisateurs(
    utilisateurs: Utilisateurs,
    classes: string
  ): Promise<Utilisateurs | null> {
    const { mail, mdp } = utilisateurs;

    if (!mdp) {
      throw new Error("Le mot de passe est obligatoire");
    }

    const juniaMail = /^[a-z]+\.[a-z]+@(junia\.com|student\.junia\.com)$/;
    if (!juniaMail.test(mail)) {
      throw new Error(
        "L'email doit se terminer par @junia.com ou @student.junia.com"
      );
    }

    const utilisateurExistant = await UtilisateursDao.findByMail(mail);
    if (utilisateurExistant) {
      throw new Error("L'utilisateur existe déjà");
    }

    const role: RoleEnum = mail.endsWith("@student.junia.com")
      ? RoleEnum.Etudiant
      : RoleEnum.Admin;
    console.log(role);
    const idRoles = (await RolesDao.findIdByRoles(role)) || 0;
    console.log(idRoles);
    const idClasses = (await ClassesDao.findIdByClasses(classes)) || 0;

    const mdpHash = await bcrypt.hash(mdp, 10);

    const utilisateur: Utilisateurs = {
      ...utilisateurs,
      idRoles,
      idClasses,
      mdp: mdpHash,
      resetMdp: false,
      codeUnique: "",
      nbRetards: 0,
      nbAbsences: 0,
      tempsTotRetards: 0,
      tempsTotAbsences: 0,
      semestreRetardsAbsenses: "",
      nbEssais: 0,
    };
    return await UtilisateursDao.createUtilisateurs(utilisateur);
  }

  async loginUtilisateurs({
    mail,
    mdp,
  }: {
    mail: string;
    mdp: string;
  }): Promise<Utilisateurs | null> {
    console.log(mail, mdp);
    const utilisateur = await UtilisateursDao.findByMail(mail);
    console.log(utilisateur);
    if (!utilisateur) {
      throw new Error("L'utilisateur n'existe pas");
    }

    const mdpCorrect = await bcrypt.compare(mdp, utilisateur.mdp);
    if (!mdpCorrect) {
      throw new Error("Mot de passe incorrect");
    }

    return utilisateur;
  }
}

export default new UtilisateursServices();
