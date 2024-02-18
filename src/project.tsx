import React, {FC, useEffect} from "react";
import useCurrentProject from "./hooks/useCurrentProject.ts";
import {Outlet, useNavigate} from "react-router-dom";
import cn from "classnames";
import {DemoGoal, Goal, IProject} from "./definitions.ts";
import Card from "./card.tsx";
import useGoal from "./hooks/useGoal.ts";
import {FiCheck} from "react-icons/fi";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css';


const Project: FC = () => {
    const {project, create, update} = useCurrentProject();
    const {goal} = useGoal();
    const navigation = useNavigate();
    const [mainObjective, setMainObjective] = React.useState<string>(project?.main_objectives || '');

    useEffect(() => {
        if (!project) return
        if (!goal) {
            const fistObjective = project?.goals[0]
            if (fistObjective) {
                navigation(`/${encodeURI(project.name)}/${encodeURI(fistObjective.name)}`, {replace: true})
            }
        }
    }, [goal, project, navigation])

    const isActive = (goalName: string) => {
        return goalName === goal?.name
    }

    if (!project) return null;

    return (<>
            <Card className='flex flex-col items-start gap-1'>
                <div className='w-full'>
                    <p className='block pl-2 mb-4 text-lg font-semibold'>

                        Main objectives?</p>
                    <div className='w-full border rounded'>
                        <ReactQuill className='w-full'
                                    theme="bubble" value={mainObjective} onChange={e => setMainObjective(e)}
                                    onBlur={() => update.main_objective(mainObjective)}/>
                    </div>
                </div>
            </Card>
            <nav className='flex items-center gap-5 overflow-visible'>
                {project.goals.map((o, i) => (
                    <Card key={i}
                          className={cn('flex flex-1 items-center flex-col gap-1', isActive(o.name) ?
                              ''
                              : 'bg-gray-100 text-gray-500 opacity-40')}
                          onClick={() => navigation(`/${encodeURI(project.name)}/${encodeURI(o.name)}`)}
                    >

                        <div className='flex items-center gap-1 w-full'>
                            {o.done && <FiCheck className='text-green-500' size={26} strokeWidth={3}/>}
                            <GoalName goal={o} active={isActive(o.name)}/>
                        </div>
                        <Description g={o} p={project}/>
                    </Card>
                ))}
                {!project.goals.length && <button
                    onClick={() => create.goal(new DemoGoal(`Goal (${project.goals.length + 1})`)
                    )}
                    className='text-blue-400 text-sm border-2 border-blue-400 rounded-full px-2 py-1 hover:bg-blue-400 hover:text-white text-nowrap'>
                    Add a goal
                </button>}

            </nav>
            <Outlet/>
        </>
    )
}

export default Project

type InputProps = {
    goal: Goal
    active?: boolean
}

const GoalName: FC<InputProps> = ({goal}) => {
    const {project, update} = useCurrentProject();
    const {goal: current} = useGoal();
    const createName = () => `Goal ${Number(project?.goals?.length) + 1}`

    const [goalName, setGoalName] = React.useState<string>(goal?.name);
    const navigation = useNavigate();

    useEffect(() => {
        if (!goal.name) setGoalName(goal.name)
    }, [goal.name])

    const handleNameBlur = (g: Goal) => {
        const name = goalName.trim() ? goalName.trim() : createName()
        if (!project) return
        const isNameExist = project?.goals?.some(p => p.name === name)
        const isDifferent = name !== g.name
        const finalName = isNameExist && isDifferent ? `${name} (${project.goals.length + 1})` : name
        update?.goals(project.goals.map(w => w.name === g.name ? {...w, name: finalName} : w))
        navigation(`/${encodeURI(project.name)}/${encodeURI(finalName)}`, {replace: true})
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGoalName(e.target.value)
    }


    return goal?.name === current?.name ? <input value={goalName}
                                                 className={cn('bg-inherit text-lg font-semibold border-dashed focus:outline-none focus:border focus:border-blue-400 py-1 px-2')}
                                                 placeholder='Goal'
                                                 onBlur={() => handleNameBlur(goal)}
                                                 onChange={handleNameChange}/> : <div
        className='bg-inherit text-lg font-semibold border-dashed focus:outline-none focus:border focus:border-blue-400 py-1 px-2'>{goal.name}</div>
}

type DescriptionInputProps = {
    g: Goal
    p: IProject

}

const Description: FC<DescriptionInputProps> = ({g, p}) => {
    const {update, goal: current} = useGoal();
    const [description, setDescription] = React.useState<string>(g?.description || '');

    const handleDescriptionBlur = () => {
        update.description(description)
    }

    useEffect(() => {
        setDescription(g?.description || '')
    }, [g?.name, p.name]);

    return current?.name === g.name ? <div className='w-full border rounded'>
        <ReactQuill className='w-full'
                    theme="bubble" value={description} onChange={e => setDescription(e)}
                    onBlur={handleDescriptionBlur}/>
    </div> : <div className='w-full border rounded h-[46px]'>{description}</div>

}