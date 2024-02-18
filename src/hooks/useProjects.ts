import {useLocalStorage} from "@uidotdev/usehooks";
import {IProject} from "../utils/definitions.ts";

const useProjects = (): IProject[] => {
    return useLocalStorage<IProject[]>("projects", [])[0]
}

export default useProjects
