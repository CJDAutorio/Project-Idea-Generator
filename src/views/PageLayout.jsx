import ProjectForm from './ProjectForm'
import Header from './Header'
import Footer from './Footer'

export default function PageLayout() {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center grow">
                <ProjectForm />
            </div>
            <Footer />
        </>
    )
}
