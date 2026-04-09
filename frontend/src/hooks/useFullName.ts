import { useMemo } from "react";
import { UserType } from "@/types/user.type";

export const useFullName = (user?: UserType) => {
  return useMemo(() => user ? `${user.name} ${user.firstname}` : "Utilisateur inconnu", [user?.name, user?.firstname]);
  // On pourrait simplement faire : 
  //  return `${user.name} ${user.firstname}` 
  // mais le useMemo évite de recalculer la valeur si l'utilisateur n'a pas changé depuis le dernier calcul
  // on gagne donc en performance dans des cas plus complexes
}