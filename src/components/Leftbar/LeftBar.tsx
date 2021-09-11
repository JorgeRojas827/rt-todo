import imgProfile from '../../assets/profile.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiClipboard, FiPlus, FiLogOut } from 'react-icons/fi';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../Modal/Modal';

export const LeftBar = () => {

    const { modal, toggleModal } = useModal();

    return (
        <div className="bg-primary md:w-leftBar w-full md:h-full h-3/24 flex md:flex-col items-center justify-between md:px-0 md:py-8 px-4">
            <GiHamburgerMenu className = "text-white md:hidden transform scale-125"  />
            {/* <h3 className="text-white font-semibold text-4xl">Casa</h3> */}

            <div id = "profile" className = "flex flex-col items-center">
                <img className = "rounded-full w-12" src = { imgProfile } alt = "Profile icon" />
                <div className="w-14 border-b hidden md:block mt-6 border-white opacity-50"></div>
                <div id="enviroments" className="mt-16 hidden md:block">
                    <FiClipboard className = "text-white w-8 h-8" />
                    <ul className = "text-white flex self-center flex-col space-y-10 mt-10">
                        <li className = "ml-7 list-disc"></li>
                        <li className = "ml-7 list-disc"></li>
                        <li className = "ml-7 list-disc"></li>
                    </ul>
                </div>
                <button onClick = { toggleModal } className = "mt-60 bg-secondary text-white p-3 rounded-md">
                    <FiPlus className = "w-5 h-5" />
                </button>
                <div className="w-10 border-b hidden md:block mt-6 border-white opacity-50"></div>
                <FiLogOut className = "w-5 h-5 mt-8 text-white cursor-pointer" />
                {
                    modal && <Modal title = "Nuevo Entorno" />
                }
            </div>
        </div>
    )
}
