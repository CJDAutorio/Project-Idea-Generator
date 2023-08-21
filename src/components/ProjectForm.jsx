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
            'Feature 4',
            'Feature 5',
            'Feature 6',
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
        proj_resources: [
            'Resource 1',
            'Resource 2',
            'Resource 3',
            'Resource 4',
            'Resource 5',
            'Resource 6',
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
        { value: 'gaming', label: 'Gaming and Esports' },
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
        const userRoleValue = event.target.role.value;
        const userSkillValue = event.target.skill.value;
        const industryValue = event.target.industry.value;
        const scopeValue = event.target.scope.value;

        if (verifyInputs(userRoleValue, userSkillValue, industryValue, scopeValue)) {
            const apiInit = {
                body: {
                    userRole: userRoleValue,
                    userSkill: userSkillValue,
                    industryType: industryValue,
                    projectScope: scopeValue,
                },
            };

            API.post('openai', '/openai', apiInit)
                .then(response => {
                    console.log(response);
                }).catch(error => {
                    console.log(error);
                });
        } else {
            setAlert(true);
        }
    };

    function verifyInputs(role, skill, industry, scope) {
        if (role === 'none' || skill === 'none' || industry === 'none' || scope === 'none') {
            return false;
        }
        return true;
    }

    return (
        <>
            <div className='absolute top-8 flex flex-row gap-x-8'>
                {alert && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-40 py-2 rounded relative cursor-pointer' role='alert' onClick={() => setAlert(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute top-1/4 left-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <strong className='font-bold'>Error!</strong>
                        <span className='block sm:inline'> Please select an option for each field.</span>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className='container-xl flex flex-col gap-y-8 items-center'>
                <div className='flex flex-row gap-x-8 items-end'>
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
                <button
                    type='submit'
                    className='mt-3 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75'
                >
                    Generate
                </button>
            </form>
        </>
    )
}
