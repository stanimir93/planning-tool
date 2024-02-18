import useCurrentProject from "./useCurrentProject.ts";
import {useParams} from "react-router-dom";

const useGoal = () => {
    const {goalName: temp} = useParams();
    const goal = decodeURIComponent(String(temp));

    const {project, update} = useCurrentProject();

    const currentGoal = project?.goals.find(o => o.name === goal);

    const updateName = (name: string) => {
        const newGoal = project?.goals.map(o => o.name === goal ? {...o, name} : o);
        newGoal && update.goals(newGoal);
    }

    const removeGoal = () => {
        const newGoal = project?.goals.filter(o => o.name !== goal);
        newGoal && update.goals(newGoal);
    }

    const updateDescription = (description: string) => {
        const newGoal = project?.goals.map(o => o.name === goal ? {...o, description} : o);
        newGoal && update.goals(newGoal);
    }
    const updateTasks = (tasks: string) => {
        const newGoal = project?.goals.map(o => o.name === goal ? {...o, tasks} : o);
        newGoal && update.goals(newGoal);
    }

    const updateSaveTimeNote = (save_time_note: string) => {
        const newGoal = project?.goals.map(x => x.name === goal ? {...x, save_time_note} : x);
        newGoal && update.goals(newGoal);
    }

    const toggleCheckboxRemove = () => {
        const newGoal = project?.goals.map(x => x.name === goal ? {...x, checkbox_remove: !x.checkbox_remove} : x);
        newGoal && update.goals(newGoal);
    }

    const toggleCheckboxAvoid = () => {
        const newGoal = project?.goals.map(x => x.name === goal ? {...x, checkbox_avoid: !x.checkbox_avoid} : x);
        newGoal && update.goals(newGoal);
    }

    const toggleCheckboxSpeed = () => {
        const newGoal = project?.goals.map(x => x.name === goal ? {...x, checkbox_speed: !x.checkbox_speed} : x);
        newGoal && update.goals(newGoal);
    }

    const toggleCheckboxAddedToDo = () => {
        const newGoal = project?.goals.map(x => x.name === goal ? {...x, checkbox_added_to_do: !x.checkbox_added_to_do} : x);
        newGoal && update.goals(newGoal);
    }

    const toggleCheckboxSchedules = () => {
        const newGoal = project?.goals.map(x => x.name === goal ? {...x, checkbox_schedules: !x.checkbox_schedules} : x);
        newGoal && update.goals(newGoal);
    }

    const toggleDone = () => {
        const newGoal = project?.goals.map(x => x.name === goal ? {...x, done: !x.done} : x);
        newGoal && update.goals(newGoal);
    }

    return {
        goal: currentGoal,
        update: {
            name: updateName,
            description: updateDescription,
            tasks: updateTasks,
            save_time_note: updateSaveTimeNote,
            checkbox_remove: toggleCheckboxRemove,
            checkbox_avoid: toggleCheckboxAvoid,
            checkbox_speed: toggleCheckboxSpeed,
            checkbox_added_to_do: toggleCheckboxAddedToDo,
            checkbox_schedules: toggleCheckboxSchedules,
            done: toggleDone
        },
        remove: removeGoal
    }

}

export default useGoal