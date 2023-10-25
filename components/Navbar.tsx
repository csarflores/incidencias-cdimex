import Image from "next/image"

const Navbar = () => {
  return (
    <>
      <header className="w-full fixed z-10 p-2 bg-blend-color-burn backdrop-blur-sm bg-pink-100/80 dark:text-gray-100">
        <div className="container z-10 flex justify-between h-16 mx-auto bg-transparent ">
          <div className="h-4/5">
            <Image
              src="/logo_cdimex.png"
              alt="Cdimex SA"
              width={200}
              height={30}
              className="flex items-center p-2"
            />
          </div>
          {/*
          <ul className="items-stretch hidden space-x-3 md:flex">
            <li className="flex">
              <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Link</a>
            </li>
            <li className="flex">
              <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Link</a>
            </li>
            <li className="flex">
              <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400">Link</a>
            </li>
            <li className="flex">
              <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Link</a>
            </li>
          </ul>
          <button className="flex justify-end p-4 md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          */}
        </div>
      </header>
    </>
  )
}

export default Navbar