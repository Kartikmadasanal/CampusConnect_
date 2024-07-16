import { Footer } from "flowbite-react";
import { Link } from 'react-router-dom';
import { GiFeather } from "react-icons/gi";
import { useSelector } from 'react-redux'

function FooterBar() {

    const { currentUser } = useSelector((state) => state.user);
    const d = new Date();
    let year = d.getFullYear();
    return (
        <Footer container className="dark:bg-[#121212]">
            <div className="w-full text-center mt-1 ">
                <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
                    <Link
                        to='/'
                        className='self-center flex  whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
                    >
                        <GiFeather /><span className='py-1  rounded-lg text-red font-sans '>
                            CampusConnect
                        </span>
                    </Link>
                    {currentUser && <Footer.LinkGroup>
                        <Footer.Link href="/aboutus">About</Footer.Link>
                        <Footer.Link href="/">Home</Footer.Link>
                        <Footer.Link href="/contact">Contact</Footer.Link>
                    </Footer.LinkGroup>}

                </div>
                <Footer.Divider />
                <Footer.Copyright href="#" by="Campusconnect" year={year} />
            </div>
        </Footer>
    );
}
export default FooterBar
