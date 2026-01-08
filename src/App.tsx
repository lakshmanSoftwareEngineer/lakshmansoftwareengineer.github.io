import { CustomCursor } from './components/ui/CustomCursor';
import { Header } from './components/layout/Header';
import { Hero } from './components/features/Hero';
import { About } from './components/features/About';
import { Skills } from './components/features/Skills';
import { Projects } from './components/features/Projects';
import { Achievements } from './components/features/Achievements';
import { Contact } from './components/features/Contact';
import { RadialMenu } from './components/ui/RadialMenu';
import { Home, User, Code, Briefcase, Trophy, Mail } from 'lucide-react';

function App() {

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const menuItems = [
    { id: 'top', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'achievements', label: 'Awards', icon: Trophy },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent selection:text-black cursor-none">
      <CustomCursor />
      <Header />

      {/* Radial Menu Integration */}
      <RadialMenu
        menuItems={menuItems}
        onSelect={(item) => scrollToSection(item.id)}
      />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    </div>
  )
}

export default App
