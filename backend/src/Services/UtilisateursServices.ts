import UtilisateursDao from "../Dao/UtilisateursDao";
import { Utilisateurs } from "../Models/UtilisateursModels";
import RolesDao from "../Dao/RolesDao";
import ClassesDao from "../Dao/ClassesDao";
import { RoleEnum } from "../Enums/RoleEnum";
import bcrypt from "bcrypt";
import { Client } from "ssh2";
const { exec } = require("child_process");

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
    const idRoles = (await RolesDao.findIdByRoles(role)) || 0;
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
    const utilisateur = await UtilisateursDao.findByMail(mail);
    if (!utilisateur) {
      throw new Error("L'utilisateur n'existe pas");
    }

    const mdpCorrect = await bcrypt.compare(mdp, utilisateur.mdp);
    if (!mdpCorrect) {
      throw new Error("Mot de passe incorrect");
    }

    return utilisateur;
  }

  async verifMail(mail: string): Promise<Utilisateurs | null> {
    const utilisateur = UtilisateursDao.findByMail(mail);
    if (!utilisateur) {
      throw new Error("L'adresse mail n'existe pas");
    }
    return utilisateur;
  }

  async generateCode(mail: string): Promise<string> {
    const code = Math.random().toString(36).substring(2, 8);
    await UtilisateursDao.updateCode(mail, code);
    const commande = `echo "${code}" | mail -s "Code de réinitialisation" ${mail}`;
    // exec(commande);
    const ssh = new Client();
    ssh.connect({
      host: "10.40.150.2",
      port: 2222,
      username: "paj",
      password: "Junia_AP5",
    });
    ssh.on("ready", () => {
      ssh.exec(commande, (err, stream) => {
        if (err) throw err;
        stream
          .on("close", (code: number, signal: string | null) => {
            ssh.end(); // Fermez la connexion SSH
          })
          .on("data", (data: Buffer) => {
            console.log("Sortie stdout :", data.toString());
          })
          .stderr.on("data", (data: Buffer) => {
            console.error("Sortie stderr :", data.toString());
          });
      });
    });
    return code;
  }

  async verifyCode(mail: string, code: string): Promise<Utilisateurs> {
    return await UtilisateursDao.verifyCode(mail, code);
  }

  async resetCode(mail: string): Promise<Utilisateurs> {
    return await UtilisateursDao.resetCode(mail);
  }

  async updateMdp(mail: string, mdp: string): Promise<Utilisateurs> {
    const mdpHash = await bcrypt.hash(mdp, 10);
    return await UtilisateursDao.updateMdp(mail, mdpHash);
  }
}

export default new UtilisateursServices();
