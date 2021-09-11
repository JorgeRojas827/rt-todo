import imgProfile from '../../assets/profile.png';
import { GiHamburgerMenu } from 'react-icons/gi';

export const LeftBar = () => {
    return (
        <div className="bg-primary w-full h-3/24 flex items-center justify-between px-4">
            <GiHamburgerMenu className = "text-white transform scale-125"  />
            {/* <h3 className="text-white font-semibold text-4xl">Casa</h3> */}
            <img className = "rounded-full w-14" src = { imgProfile } alt = "Profile icon" />
        </div>
    )
}
