import {FC, PropsWithChildren} from "react";
import cn from "classnames";

type Props = {
    className?: string
    onClick?: () => void
}

const Card: FC<PropsWithChildren<Props>> = (props) => {

    return <section className={cn('shadow rounded-md border p-5 bg-slate-100', props.className)}
                    onClick={props.onClick}>
        {props.children}
    </section>
}

export default Card