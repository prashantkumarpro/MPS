import HomeBanner from '../components/HomeBanner'
import WelcomeText from '../components/WelcomeText'
import FeaturesSection from '../components/Feature'
import Teachers from '../components/Teachers'
import MobileBottomHeader from '../components/MobileBottomHeder'
import Footer from '../pages/Footer'
import ContactForm from '../components/Contact'
import GallerySection from '../components/GallerySection'
import CoursesAndPrograms from '../components/CoursesAndPrograms'
import ViewReportForm from '../components/ViewReportForm'

const Home = () => {


  return (
    <>
      <HomeBanner />
      <WelcomeText />
      <ViewReportForm />
      <FeaturesSection />
      <CoursesAndPrograms />
      <Teachers />
      <GallerySection />
      <ContactForm />
      <MobileBottomHeader />
      <Footer />
    </>
  )
}

export default Home
