import React from 'react';

const Title = () => {
  return (
    <>
      <div className='pt-20    group '>
        <div className='flex  justify-center '>
        <span className='text-center flex m-4 bg-primary2 h-[5px] w-16 sm:w-24 transition-all duration-300 ease-in-out transform sm:group-hover:w-32 group-hover:bg-yellow-700'></span>
        <p className='font-bold text-3xl text-center relative flex flex-col sm:flex-row'>
          Latest Auction <span className='flex  sm:flex-row sm:pl-2 text-[#fbb81a]'> Near You <span className='text-center flex m-4 bg-primary2 h-[5px] w-16 sm:w-24 transition-all duration-300 ease-in-out transform group-hover:w-32 group-hover:bg-yellow-700'></span></span>
        </p>
        
        </div>
      
        <p className='text-center font-semibold'>
          Unlock elite experiences with Siddharth Bank's exclusive auction.
        </p>
        {/* <span className="block h-1 w-20 bg-red-500 mx-auto mt-2 transition-all duration-300 ease-in-out transform group-hover:w-32 group-hover:bg-red-700"></span> */}
      </div>
    </>
  );
}

export default Title;
