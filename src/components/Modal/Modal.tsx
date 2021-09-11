interface IProps {
    title: string;
    children: JSX.Element[];
}

export const Modal = ({ title, children }: IProps) => {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50 absolute left-0 top-0">
            <div className="bg-white w-72 h-36 flex flex-col justify-start items-center p-4">
                <h2 className = "text-primary font-semibold text-lg">{ title }</h2>
                { children }
            </div>
        </div>
    )
}