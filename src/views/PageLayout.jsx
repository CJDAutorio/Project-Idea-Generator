import ProjectForm from './ProjectForm'
import Footer from './Footer'

export default function PageLayout() {
    return (
        <>
            <div className="flex flex-col items-center justify-center grow">
                <ProjectForm />
            </div>
            <Footer />
        </>
    )
}
