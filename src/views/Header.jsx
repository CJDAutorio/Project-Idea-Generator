import Logo from '../assets/img/icon_nobg.png';

export default function Header() {
    return (
        <header className="shadow bg-gray-900 ">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <a href="https://www.projectideagenerator.com/" className="flex items-center mb-4 md:mb-0">
                        <img src={Logo} alt="Project Idea Generator Logo" className='h-10 pr-6' />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white pr-6">Project Idea Generator</span>
                    </a>
                        <p className='text-gray-400'>GPT-3 generated practice projects.</p>
                </div>
            </div>
        </header>
    )
}
