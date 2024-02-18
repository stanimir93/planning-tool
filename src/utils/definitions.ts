export interface IProject {
    name: string;
    main_objectives: string;
    goals: Goal[]
}

export type Goal = {
    name: string;
    description: string;
    tasks: string

    save_time_note: string;
    checkbox_remove: boolean
    checkbox_avoid: boolean
    checkbox_speed: boolean
    checkbox_added_to_do: boolean

    checkbox_schedules: boolean
    done: boolean
}

export class DemoProject implements IProject {
    name: string;
    main_objectives: string;
    goals: Goal[]


    constructor(name: string) {
        this.name = name;
        this.main_objectives = "";
        this.goals = []
    }
}

export class DemoGoal implements Goal {
    name: string;
    description: string;
    tasks: string;

    save_time_note: string;
    checkbox_remove: boolean;
    checkbox_avoid: boolean;
    checkbox_speed: boolean;
    checkbox_added_to_do: boolean;
    checkbox_schedules: boolean;
    done: boolean;

    constructor(name: string) {
        this.name = name;
        this.description = "";
        this.tasks = "";

        this.save_time_note = "";
        this.checkbox_remove = false;
        this.checkbox_avoid = false;
        this.checkbox_speed = false;

        this.checkbox_added_to_do = false;
        this.checkbox_schedules = false;
        this.done = false
    }
}