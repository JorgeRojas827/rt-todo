import { BsThreeDotsVertical } from "react-icons/bs";

interface IProps {
  contenido: string;
}

export const Task = ({ contenido }: IProps) => {
  return (
    <div className="rounded-xl shadow-default mb-7 px-5 py-4 w-64 flex justify-between">
      <div className="w-5/8">
        <h2 className="font-semibold text-left">{contenido}</h2>
      </div>
      <div className="w-3/8">
        <BsThreeDotsVertical className="cursor-pointer" size={20} />
      </div>
    </div>
  );
};
