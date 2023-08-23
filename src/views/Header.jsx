import Logo from '../assets/img/icon_nobg.png';

export default function Header() {
    return (
        <header className="bg-white shadow dark:bg-gray-900 ">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://www.projectideagenerator.com/" className="flex items-center mb-4 sm:mb-0">
                        <img src={Logo} alt="Project Idea Generator Logo" className='h-10 pr-6' />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Project Idea Generator</span>
                    </a>
                    <div className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <p>Created by&nbsp;<a href="https://www.cjdautor.io" className="mr-5 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">CJ DAutorio</a></p>
                        <p></p>
                    </div>
                </div>
            </div>
        </header>
    )
}
