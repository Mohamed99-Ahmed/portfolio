import Skills from '@/components/skills/page';
import NavBar from '@/components/NavBar/NavBar';
import Header from '@/components/Header/Header';
import Projects from '@/components/projects/Projects';
import Contact from '@/components/Contact/Contact';
import Footer from './../components/Footer/Footer';
export default function Home() {

  return (<>
   
   
    <NavBar/>
    <main className='max-w-[100vw]'>
      <Header/>
      <Skills/>
      <Projects/>
      <Contact/>
      <Footer/>
    </main>
  </>);
}
