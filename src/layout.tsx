import {Outlet, useNavigate} from "react-router-dom";
import React, {FC, useEffect} from "react";
import useProjects from "./hooks/useProjects.ts";
import cn from "classnames";
import useProject from "./hooks/useCurrentProject.ts";
import {FiPlus} from "react-icons/fi";
import {DemoGoal, DemoProject, IProject} from "./definitions.ts";
import useGoal from "./hooks/useGoal.ts";
import Card from "./card.tsx";

const Layout: FC = () => {
    const projects = useProjects()
    const {project, create, remove, update} = useProject();
    const {goal} = useGoal();
    const navigation = useNavigate();

    const isActive = (projectName: string) => {
        return projectName === project?.name
    }

    const navigate = (name: string) => {
        navigation(`${encodeURI(name)}`)
    }

    useEffect(() => {
        if (!project) {
            const firstProject = projects[0]
            if (firstProject) {
                navigation(`${encodeURI(firstProject.name)}`)
            }
        }
    }, [project, projects, navigation])

    return <div className='min-h-screen'>
        <Card className='border-gray-200 pb-4 pt-6 mb-1'>
            <menu
                className='flex gap-4 justify-center overflow-x-auto top-0 left-0 right-0 z-10 mx-w-full w-fit mx-auto m-auto items-start'>
                {projects?.map(p => (
                    <li key={p.name}
                        className={(cn('text-center flex pb-2 items-center justify-center border-b-2 ', {
                            'border-blue-400 opacity': isActive(p.name),
                            'opacity-40': !isActive(p.name)
                        }))}
                        onClick={() => navigate(p.name)}>
                        <NameInput p={p}/>
                    </li>
                ))}
                <li className='text-center p-2 flex items-center justify-center border-b-4 border-transparent'>
                    <button onClick={() => create.project(new DemoProject(
                        `Project (${projects.length + 1})`))}
                            className='text-xl text-blue-400 border-2 border-blue-400 rounded-full px-2 py-1'>
                        <FiPlus/>
                    </button>
                </li>
            </menu>
        </Card>
        <main className='flex flex-col items-stretch gap-5 max-w-5xl mx-auto px-4 py-5  min-h-screen'>
            <Outlet/>
        </main>
        <footer className='flex gap-4 justify-center pb-4'>

            <button onClick={() => {
                if (window.confirm('Are you sure you want to remove this project')) {
                    project?.name && remove.project(project.name)
                }

            }}
                    className='text-red-400 text-sm border-2 border-red-400 rounded-full px-2 py-1 hover:bg-red-400 hover:text-white'>
                Delete Current Project
            </button>
            <button onClick={() => {
                if (window.confirm('Are you sure you want to clear all projects?')) {
                    remove.all_projects()
                }
            }}
                    className='text-red-400 text-sm border-2 border-red-400 rounded-full px-2 py-1 hover:bg-red-400 hover:text-white'>
                Delete All Projects
            </button>

            <button onClick={() => {
                if (window.confirm('Are you sure you want to remove this objective')) {
                    goal?.name && remove.goal(goal.name)
                }
            }}
                    className='text-orange-400 text-sm border-2 border-orange-400 rounded-full px-2 py-1 hover:bg-orange-400 hover:text-white'>
                Delete Goal
            </button>
            <button onClick={() => {
                if (window.confirm('Are you sure you want to clear all objectives?')) {
                    update.goals([])
                }
            }}
                    className='text-orange-400 text-sm border-2 border-orange-400 rounded-full px-2 py-1 hover:bg-orange-400 hover:text-white'>
                Delete All Goals
            </button>
            <button
                onClick={() => create.goal(new DemoGoal(`Goal (${Number(project?.goals?.length) + 1})`))}
                className='text-blue-400 text-sm border-2 border-blue-400 rounded-full px-2 py-1 hover:bg-blue-400 hover:text-white text-nowrap'>
                Add Goal
            </button>
        </footer>
    </div>
}

export default Layout

type InputProps = {
    p: IProject
}
const NameInput: FC<InputProps> = ({p}) => {
    const projects = useProjects()
    const {update, project: current} = useProject();
    const createName = () => `Project Name (${projects.length + 1})`
    const [projectName, setProjectName] = React.useState<string>(p?.name ? p.name : createName)
    const navigation = useNavigate();

    const handleNameBlur = () => {
        const name = projectName.trim() ? projectName.trim() : createName()
        const isNameExist = projects.some(p => p.name === name)
        const isDifferent = name !== p.name
        const finalName = isNameExist && isDifferent ? `${name} (${projects.length + 1})` : name
        setProjectName(finalName)
        update.name(finalName)
        navigation(`/${encodeURI(finalName)}`, {replace: true})
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(e.target.value)
    }


    return current?.name === p.name ? <input value={projectName}
                                             className={cn('bg-inherit text-lg font-bold focus:outline-none focus:border border-dashed focus:border-blue-400 py-1 w-48 text-center uppercase')}
                                             placeholder='Project Name'
                                             onBlur={handleNameBlur}
                                             onChange={handleNameChange}/> :
        <div
            className='bg-inherit text-lg font-bold focus:outline-none focus:border border-dashed focus:border-blue-400 py-1 w-48 text-center uppercase'>
            {projectName}
        </div>
}