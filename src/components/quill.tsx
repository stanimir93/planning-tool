import ReactQuill from "react-quill";
import cn from "classnames";
import {FC} from "react";

type Props = {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    quillClassName?: string;
    className?: string;
    module?: any;
}

const QuillComponent: FC<Props> = (props) => {
    return <div className={cn('w-full border rounded dark:border-zinc-800', props.className)}>
        <ReactQuill className={cn('w-full', props.quillClassName)}
                    modules={props.module}
                    theme="bubble" value={props.value} onChange={props.onChange}
                    onBlur={props.onBlur}/>
    </div>
}

export default QuillComponent;