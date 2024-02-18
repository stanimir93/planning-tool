import {useParams} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";
import {Goal, IProject} from "../definitions.ts";

const useCurrentProject = () => {
    const {projectName: temp} = useParams();
    const [projects, updateProjects] = useLocalStorage<IProject[]>("projects");
    const name = decodeURIComponent(String(temp));

    const project = projects?.find(p => p.name === name)

    const removeProject = (name: string) => {
        const newProjects = projects?.filter(p => p.name !== name);
        updateProjects(newProjects);
    }

    const removeAllProjects = () => {
        updateProjects([]);
    }

    const createProject = (project: IProject) => {
        const newProjects = projects ? [...projects, project] : [project];
        updateProjects(newProjects);
    }

    const updateProjectName = (name: string) => {
        const newProjects = projects?.map(p => p.name === project?.name ? {...p, name} : p);
        updateProjects(newProjects);
    }

    const updateMainObjective = (main_objectives: string) => {
        const newProjects = projects?.map(p => p.name === project?.name ? {...p, main_objectives} : p);
        updateProjects(newProjects);
    }

    const updateGoal = (goal: Goal[]) => {
        const newProjects = projects?.map(p => p.name === project?.name ? {...p, goals: goal} : p);
        updateProjects(newProjects);
    }

    const addGoal = (objective: Goal) => {
        const newProjects = projects?.map(p => p.name === project?.name ? {...p, goals: [...p.goals, objective]} : p);
        updateProjects(newProjects);
    }

    const removeGoal = (name: string) => {
        const newProjects = projects?.map(p => p.name === project?.name ? {...p, goals: p.goals.filter(g => g.name !== name)} : p);

        const newProject = project?.goals.filter(g => {
            console.log(g.name, name)
            console.log(g.name === name)
            return g.name !== name
        });
        console.log(newProject)
        updateProjects(newProjects);
    }

    return {
        project,
        update: {
            name: updateProjectName,
            main_objective: updateMainObjective,
            goals: updateGoal
        },
        remove: {
            project: removeProject,
            goal: removeGoal,
            all_projects: removeAllProjects,
        },
        create: {
            project: createProject,
            goal: addGoal
        }
    }
}

export default useCurrentProject