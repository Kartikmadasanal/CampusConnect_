import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashSidebar from '../Components/DashSidebar';
import { Navbar } from 'flowbite-react';
import { GiFeather } from "react-icons/gi";
import DashUsers from '../Components/DashUsers';
import DashPosts from '../Components/DashPosts';
import DashboardComp from '../Components/DashboardComp';
import DashComments from '../Components/DashComments';

// import DashProfile from '../components/DashProfile';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div>

   
      <Navbar className='border-b-2 dark:bg-[#121212] '>

             <Link
        to='/'
        className='self-center flex  whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >

        <GiFeather />
        <span className='py-1  rounded-lg text-red font-sans '>
          CampusConnect
        </span>
      </Link>
        


        <Navbar.Collapse>

            <Navbar.Link as={'div'}>
              <Link to='/'>Home</Link>
            </Navbar.Link>

          </Navbar.Collapse>
      </Navbar>
    <div className='min-h-screen flex flex-col md:flex-row '>
      <div className='md:w-56 '>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {/* posts... */}
      {tab === 'posts' && <DashPosts />}
      {/* users */}
      {tab === 'users' && <DashUsers />}
      {/* comments  */}
      {tab === 'comments' && <DashComments />}
      {/* dashboard comp */}
      {tab === 'dash' && <DashboardComp />}
    </div>
    </div>
  );
}

