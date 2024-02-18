import {FC, useEffect, useId, useState} from "react";
import useGoal from "./hooks/useGoal.ts";
import Card from "./card.tsx";
import cn from "classnames";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';


const Goal: FC = () => {
    const {goal, update} = useGoal();
    const [saveTimeNote, setSaveTimeNote] = useState<string>(goal?.save_time_note || '');
    const [actionableTasks, setActionableTasks] = useState<string>(goal?.tasks || '');

    useEffect(() => {
        setSaveTimeNote(goal?.save_time_note || '');
        setActionableTasks(goal?.tasks || '');
    }, [goal?.name]);

    const id2 = useId();
    const id3 = useId();
    const id4 = useId();
    const id5 = useId();
    const id6 = useId();

    if (!goal) return null;

    return (<>
            <Card className='flex flex-col items-start gap-4 border'>
                <label className='flex gap-2 items-center pl-2 text-lg font-semibold'>What tasks I need to
                    do?</label>
                <div className='w-full border rounded dark:border-zinc-800'>
                    <ReactQuill className='w-full taller'
                                theme="bubble" value={actionableTasks} onChange={e => setActionableTasks(e)}
                                onBlur={() => update.tasks(actionableTasks)}/>
                </div>
            </Card>
            <Card className='flex flex-col items-stretch gap-4 border'>
                <p className='flex gap-2 items-center pl-2 text-lg font-semibold'>
                    How can I get it done faster?</p>


                <div className='mb-4'>
                    <div className='w-full border rounded dark:border-zinc-800'>
                        <ReactQuill className='w-full taller'
                                    theme="bubble" value={saveTimeNote} onChange={e => setSaveTimeNote(e)}
                                    onBlur={() => update.save_time_note(saveTimeNote)}/>
                    </div>
                </div>

                <p className='flex gap-2 items-center'>
                    <input className='cursor-pointer' id={id2} type='checkbox' checked={goal.checkbox_remove}
                           onChange={update.checkbox_remove}/>
                    <label className={cn('cursor-pointer',
                        {'line-through': goal.checkbox_remove}
                    )} htmlFor={id2}>Can I remove some tasks and still achieve the my goal?</label>
                </p>
                <p className='flex gap-2 items-center'>
                    <input className='cursor-pointer' id={id4} type='checkbox' checked={goal.checkbox_speed}
                           onChange={update.checkbox_speed}/>
                    <label className={cn('cursor-pointer',
                        {'line-through': goal.checkbox_speed}
                    )} htmlFor={id4}>How can I complete the tasks faster?</label>
                </p>
                <p className='flex gap-2 items-center'>
                    <input className='cursor-pointer' id={id3} type='checkbox' checked={goal.checkbox_avoid}
                           onChange={update.checkbox_avoid}/>
                    <label className={cn('cursor-pointer',
                        {'line-through': goal.checkbox_avoid}
                    )} htmlFor={id3}>What to avoid?</label>
                </p>
            </Card>
            <Card className='flex justify-between items-end gap-4 border'>
                <section className='flex flex-col items-start gap-4'>
                    <p className='flex gap-2 items-center'>
                        <input className='cursor-pointer' id={id5} type='checkbox'
                               checked={goal.checkbox_added_to_do}
                               onChange={update.checkbox_added_to_do}/>
                        <label className={cn('cursor-pointer',
                            {'line-through': goal.checkbox_added_to_do}
                        )} htmlFor={id5}>Add to do list</label>
                    </p>
                    <p className='flex gap-2 items-center'>
                        <input className='cursor-pointer' id={id6} type='checkbox'
                               checked={goal.checkbox_schedules}
                               onChange={update.checkbox_schedules}/>
                        <label className={cn('cursor-pointer',
                            {'line-through': goal.checkbox_schedules}
                        )} htmlFor={id6}>Schedule in calendar</label>
                    </p>
                </section>
                <button onClick={update.done}
                        className={cn('px-4 py-2 rounded-md shadow-sm hover:shadow-md text-md font-semibold dark:text-white dark:opacity-80',
                            goal.done ? 'bg-green-300 dark:bg-green-500' : 'bg-slate-300 : dark:bg-slate-500'
                        )}>
                    {goal.done ? 'Done' : 'Mark as done'}
                </button>
            </Card>
        </>
    )
}

export default Goal