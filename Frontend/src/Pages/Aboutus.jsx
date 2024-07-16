import React from 'react'
import Header from '../Components/Header'
import FooterBar from '../Components/Footer'

function Aboutus() {
  return (
    <div>

    <Header/>
   
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-'>
            Campus Connect
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?
            </p>

            <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?
            </p>

            <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?
            </p>
          </div>
          <h1 className='text-3xl font font-semibold text-center my-'>
            terms and conditions
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <ul>
              <li>conditions</li>
              <li>conditions</li>
              <li>conditions</li>
              <li>conditions</li>
              <li>conditions</li>
              <li>conditions</li>
              <li>conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <FooterBar/>
    </div>
  )
}

export default Aboutus
