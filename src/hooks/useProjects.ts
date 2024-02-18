import {useLocalStorage} from "@uidotdev/usehooks";
import {IProject} from "../definitions.ts";

const useProjects = (): IProject[] => {
    return useLocalStorage<IProject[]>("projects", [])[0]
}

export default useProjects
