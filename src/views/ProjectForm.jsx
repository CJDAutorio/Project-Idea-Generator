import { useState } from 'react';
import { API } from 'aws-amplify';

export default function ProjectForm() {
    const [alert, setAlert] = useState(false);
    const [project, setProject] = useState({
        proj_name: 'Project Name',
        proj_company: 'Company Name',
        proj_desc: 'Project Description',
        proj_features: [
            'Feature 1',
            'Feature 2',
            'Feature 3',
        ],
        proj_platform: [
            'Platform 1',
            'Platform 2',
            'Platform 3',
        ],
        proj_theme: 'Project Theme',
        proj_colors: [
            '#A288E3',
            '#BBD5ED',
            '#CCFFCB',
        ],
        proj_add_info: 'Additional Information',
    });
    const [loading, setLoading] = useState(false);

    const userRoleOptions = [
        { value: 'none', label: 'Select an option...' },
        { value: 'fullstack', label: 'Full-Stack Developer' },
        { value: 'frontend', label: 'Front-End Developer' },
        { value: 'backend', label: 'Back-End Developer' },
        { value: 'android', label: 'Android Developer' },
        { value: 'ios', label: 'iOS Developer' },
        { value: '2dgamedev', label: '2D Game Developer' },
        { value: '3dgamedev', label: '3D Game Developer' },
        { value: 'graphic', label: 'Graphic Designer' },
        { value: 'uiux', label: 'UI/UX Designer' },
        { value: '2danimator', label: '2D Animator' },
        { value: '3danimator', label: '3D Animator' },
    ];

    const userSkillOptions = [
        { value: 'none', label: 'Select an option...' },
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'expert', label: 'Expert' },
        { value: 'nopref', label: 'No Preference' },
    ];

    const industryTypeOptions = [
        { value: 'none', label: 'Select an option...' },
        { value: 'software', label: 'Software Solutions' },
        { value: 'cybersec', label: 'Cyber Security' },
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'finance', label: 'Finance' },
        { value: 'education', label: 'Education' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'travel', label: 'Travel and Hospitality' },
        { value: 'realestate', label: 'Real Estate' },
        { value: 'food', label: 'Food' },
        { value: 'fashion', label: 'Fashion and Apparel' },
        { value: 'automotive', label: 'Automotive' },
        { value: 'energy', label: 'Energy' },
        { value: 'industrial', label: 'Manufacturing and Industrial' },
        { value: 'nonprofit', label: 'Nonprofits' },
        { value: 'fitness', label: 'Sports and Fitness' },
        { value: 'beauty', label: 'Beauty and Wellness' },
        { value: 'marketing', label: 'Marketing and Advertising' },
        { value: 'home', label: 'Home and Lifestyle' },
        { value: 'esports', label: 'Esports' },
        { value: 'videogame', label: 'Video Game' },
        { value: 'art', label: 'Art and Creative Industries' },
        { value: 'nopref', label: 'No Preference' },
    ];

    const projectScopeOptions = [
        { value: 'none', label: 'Select an option...' },
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
        { value: 'nopref', label: 'No Preference' },
    ];

    const handleSubmit = event => {
        event.preventDefault();
        const userRoleLabel = userRoleOptions.find(option => option.value === event.target.role.value).label;
        const userSkillLabel = userSkillOptions.find(option => option.value === event.target.skill.value).label;
        const industryLabel = industryTypeOptions.find(option => option.value === event.target.industry.value).label;
        const scopeLabel = projectScopeOptions.find(option => option.value === event.target.scope.value).label;

        if (verifyInputs(userRoleLabel, userSkillLabel, industryLabel, scopeLabel)) {
            const apiInit = {
                body: {
                    userRole: userRoleLabel,
                    userSkill: userSkillLabel,
                    industryType: industryLabel,
                    projectScope: scopeLabel,
                },
            };
            setLoading(true);

            API.post('openai', '/openai', apiInit)
                .then(response => {
                    setProject(response.body);
                    setLoading(false);
                }).catch(error => {
                    setLoading(false);
                });
        } else {
            setAlert(true);
        }
    };

    function verifyInputs(role, skill, industry, scope) {
        if (role === 'Select an option...' || skill === 'Select an option...' || industry === 'Select an option...' || scope === 'Select an option...') {
            return false;
        }
        return true;
    }

    function hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function setTextColor(color) {
        const rgb = hexToRgb(color);
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

        if (brightness > 125) {
            return 'black';
        } else {
            return 'white';
        }
    }

    return (
        <>
            <div className='absolute top-8 flex flex-row gap-x-8' id='message-container'>
                {alert && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-12 py-2 rounded relative cursor-pointer' role='alert' onClick={() => setAlert(false)}>
                        <div className=''>
                            <strong className='font-bold'>Error!&nbsp;</strong>
                            <span className='block sm:inline'>Please select an option for each field.</span>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className='container-sm md:container-xl flex flex-col gap-y-8 items-center mt-8' id='project-form'>
                <div className='flex flex-col md:flex-row gap-x-8 gap-y-6 md:gap-y-0 items-end'>
                    <div className='w-56' id='role-select-container'>
                        <label htmlFor='role' className='block text-sm font-medium text-gray-700'>
                            What is your role?
                        </label>
                        <select
                            id='role'
                            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        >
                            {userRoleOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='w-56' id='skill-select-container'>
                        <label htmlFor='skill' className='block text-sm font-medium text-gray-700'>
                            What is your skill level?
                        </label>
                        <select
                            id='skill'
                            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        >
                            {userSkillOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='w-56' id='industry-select-container'>
                        <label htmlFor='industry' className='block text-sm font-medium text-gray-700'>
                            What industry should the project be generated for?
                        </label>
                        <select
                            id='industry'
                            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        >
                            {industryTypeOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='w-56' id='scope-select-container'>
                        <label htmlFor='scope' className='block text-sm font-medium text-gray-700'>
                            What size should the project's scope be?
                        </label>
                        <select
                            id='scope'
                            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        >
                            {projectScopeOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {!loading ? (
                    <button
                        type='submit'
                        className='bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75'
                        disabled={loading}
                    >
                        Generate
                    </button>
                ) : (
                    <button type="submit" className="bg-indigo-400 text-white py-2 px-4 rounded-md flex justify-center items-center cursor-not-allowed" disabled>
                        <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-100 animate-spin fill-indigo-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        Generating...
                    </button>
                )}
            </form>

            <div className='flex flex-col gap-y-8 items-center mt-8 w-10/12 ' id='project-container'>
                <div className='w-full bg-gray-100 rounded-md shadow-md' id='project-card'>
                    <div className='flex flex-col gap-y-4 p-4'>
                        {!loading ? (
                            <>
                                <div className='flex flex-row justify-center' id='project-headers'>
                                    <div className='flex flex-col gap-y-2'>
                                        <h1 className='text-2xl font-bold'>{project.proj_name}</h1>
                                        <h2 className='text-lg font-medium'>{project.proj_company}</h2>
                                    </div>
                                </div>
                                <hr className='h-px my-1 bg-gray-300 border-0'></hr>
                                <div className='px-4 flex flex-col items-start' id='project-details'>
                                    <div className='flex flex-col items-start pb-4'>
                                        <p className='text-base font-bold'>Description</p>
                                        <p className='text-base pl-6 text-left'>{project.proj_desc}</p>
                                    </div>

                                    <div className='flex flex-col items-start pb-4'>
                                        <p className='text-base font-bold'>Features</p>
                                        <ul className='list-disc pl-12'>
                                            <div>
                                                {project.proj_features.map(feature => (
                                                    <li className='text-base text-left'>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </div>
                                        </ul>
                                    </div>

                                    <div className='flex flex-col items-start pb-4'>
                                        <p className='text-base font-bold'>Platform(s)</p>
                                        <div>
                                            <ul className='list-disc pl-12'>
                                                {project.proj_platform.map(platform => (
                                                    <li className='text-base text-left'>
                                                        {platform}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-start pb-4'>
                                        <p className='text-base font-bold'>Theme</p>
                                        <p className='text-base pl-6'>{project.proj_theme}</p>
                                    </div>

                                    <div className='flex flex-col items-start pb-4'>
                                        <p className='text-base font-bold'>Colors</p>
                                        <div className='flex flex-col md:flex-row gap-x-4 pl-6'>
                                            {project.proj_colors.map(color => (
                                                <div className='w-48 md:w-28 h-20 rounded flex items-center justify-center mt-2' style={{ backgroundColor: color }}>
                                                    <p className='text-base font-bold' style={{ color: setTextColor(color) }}>{color}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-start pb-4'>
                                        <p className='text-base font-bold'>Additional Information</p>
                                        <p className='text-base pl-6 text-left'>{project.proj_add_info}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='flex flex-row justify-center animate-pulse' id='project-headers'>
                                    <div className='flex flex-col gap-y-2'>
                                        <div className='rounded-full bg-gray-400 h-5 w-36 my-2'></div>
                                        <div className='rounded-full bg-gray-300 h-3 w-36 my-2'></div>
                                    </div>
                                </div>
                                <div className='px-4 flex flex-col items-start animate-pulse' id='project-details'>
                                    <div className='flex flex-col items-start pb-4'>
                                        <p className='text-base font-bold'>Description</p>
                                        <div className='rounded-full bg-gray-300 h-3 w-48 md:w-96 mt-2'></div>
                                    </div>

                                    <div className='flex flex-col items-start pb-4'>
                                        <p className='text-base font-bold'>Features</p>
                                        <div>
                                            {project.proj_features.map(feature => (
                                                <div className='rounded-full bg-gray-300 h-3 w-60 my-2'></div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-start pb-4'>
                                        <p className='text-base font-bold'>Platform(s)</p>
                                        <div>
                                            {project.proj_platform.map(platform => (
                                                <div className='rounded-full bg-gray-300 h-3 w-48 my-2'></div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-start pb-4'>
                                        <p className='text-base font-bold'>Theme</p>
                                        <div className='rounded-full bg-gray-300 h-3 w-56 my-2'></div>
                                    </div>

                                    <div className='flex flex-col items-start pb-4'>
                                        <p className='text-base font-bold'>Colors</p>
                                        <div className='flex flex-col md:flex-row gap-x-4 pl-6'>
                                            {project.proj_colors.map(color => (
                                                <div className='w-48 md:w-28 h-20 rounded flex items-center justify-center bg-gray-300 mt-2'>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-start pb-4'>
                                        <p className='text-base font-bold'>Additional Information</p>
                                        <div className='rounded-full bg-gray-300 h-3 w-48 md:w-96 my-2'></div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}
