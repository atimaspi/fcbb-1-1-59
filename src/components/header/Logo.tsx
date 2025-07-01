
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface LogoProps {
  isScrolled: boolean;
}

const Logo = ({ isScrolled }: LogoProps) => {
  return (
    <motion.div
      className="flex items-center space-x-4"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link to="/" className="flex items-center space-x-4">
        <motion.img 
          src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
          alt="FCBB Logo" 
          className="h-16 w-auto"
          whileHover={{ rotate: 5 }}
          transition={{ duration: 0.3 }}
        />
        <div className="flex flex-col">
          <h1 className={`text-2xl font-bold font-display leading-tight transition-colors duration-300 ${
            isScrolled ? 'text-cv-blue' : 'text-white'
          }`}>
            FCBB
          </h1>
          <p className={`text-sm leading-tight transition-colors duration-300 ${
            isScrolled ? 'text-gray-600' : 'text-cv-yellow'
          }`}>
            Federação Cabo-verdiana de Basquetebol
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default Logo;
