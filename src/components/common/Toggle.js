import { FaRegListAlt } from 'react-icons/fa';
import { TbMap2 } from 'react-icons/tb';

function Toggle({ toggle, setToggle }) {
    return (
        <div className="block md:hidden">
            {toggle ? (
                <span onClick={() => setToggle(!toggle)} className="flex items-center justify-center text-blue-main">
                    {' '}
                    <FaRegListAlt /> <span className="ml-2 cursor-pointer py-2.5 text-xs font-semibold">LIST VIEW</span>
                </span>
            ) : (
                <span onClick={() => setToggle(!toggle)} className="flex items-center justify-center text-blue-main">
                    {' '}
                    <TbMap2 /> <span className="ml-2 cursor-pointer py-2.5 text-xs font-semibold">VIEW IN MAP</span>
                </span>
            )}
        </div>
    );
}
export default Toggle;
