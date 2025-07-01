
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ExternalLink, Trophy, Users, Calendar } from "lucide-react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/fcbb.cv", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/fcbb.cv", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/fcbb_oficial", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com/@fcbb.cv", label: "YouTube" }
  ];

  const quickLinks = [
    { label: 'História da FCBB', path: '/sobre/historia' },
    { label: 'Direção', path: '/sobre/direcao' },
    { label: 'Estatutos', path: '/sobre/estatutos' },
    { label: 'Licenciamento', path: '/clubes/licenciamento' },
    { label: 'Área de Imprensa', path: '/imprensa' },
    { label: 'Área Reservada', path: '/area-reservada' }
  ];

  const competitions = [
    { label: 'Liga Nacional Masculina', path: '/competicoes/nacional-masculino' },
    { label: 'Liga Nacional Feminina', path: '/competicoes/nacional-feminino' },
    { label: 'Taça de Cabo Verde', path: '/competicoes/taca-cabo-verde' },
    { label: 'Super Taça', path: '/competicoes/super-taca' },
    { label: 'Campeonatos Regionais', path: '/competicoes/regionais' },
    { label: 'Seleção Nacional', path: '/selecoes/senior-masculina' }
  ];

  const partners = [
    { 
      name: "FIBA", 
      logo: "https://ik.imagekit.io/atimasp/fiba-logo-png_seeklogo.png?updatedAt=1750607219677",
      url: "https://www.fiba.basketball"
    },
    { 
      name: "FIBA Africa", 
      logo: "https://ik.imagekit.io/atimasp/fiba-logo-png_seeklogo.png?updatedAt=1750607219677",
      url: "https://www.fiba.basketball/africa"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-cv-dark via-gray-900 to-black text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cv-yellow rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cv-blue rounded-full blur-2xl" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="cv-container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* FCBB Info */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <img 
                  src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
                  alt="FCBB Logo" 
                  className="h-16 w-auto mr-4 filter brightness-0 invert"
                />
                <div>
                  <h3 className="text-2xl font-bold font-display">FCBB</h3>
                  <p className="text-cv-yellow font-semibold">Est. 1986</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                A Federação Cabo-verdiana de Basquetebol é o órgão máximo que rege o basquetebol em Cabo Verde, 
                promovendo o desenvolvimento da modalidade em todas as ilhas do arquipélago.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={social.label}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 bg-white/10 hover:bg-cv-blue rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group backdrop-blur-sm border border-white/20"
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white group-hover:text-cv-yellow transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 text-cv-yellow font-display flex items-center">
                <ExternalLink className="w-5 h-5 mr-2" />
                Links Rápidos
              </h3>
              <ul className="space-y-3 text-sm">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      to={link.path} 
                      className="text-gray-300 hover:text-cv-yellow transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Competitions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 text-cv-yellow font-display flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Competições
              </h3>
              <ul className="space-y-3 text-sm">
                {competitions.map((comp, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      to={comp.path} 
                      className="text-gray-300 hover:text-cv-yellow transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {comp.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Contact Info & Partners */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 text-cv-yellow font-display flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Contactos
              </h3>
              
              <div className="space-y-4 text-sm mb-8">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-cv-red flex-shrink-0 mt-0.5" />
                  <div className="text-gray-300">
                    <p>Av. Cidade de Lisboa, CP 540</p>
                    <p>Praia, Ilha de Santiago</p>
                    <p>Cabo Verde</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-cv-blue flex-shrink-0" />
                  <span className="text-gray-300">(+238) 261 22 34</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-cv-yellow flex-shrink-0" />
                  <a href="mailto:geral@fcbb.cv" className="text-gray-300 hover:text-cv-yellow transition-colors">
                    geral@fcbb.cv
                  </a>
                </div>
              </div>

              {/* International Partners */}
              <div>
                <h4 className="font-semibold mb-4 text-cv-yellow text-sm font-display">Parceiros Internacionais</h4>
                <div className="flex space-x-4">
                  {partners.map((partner, index) => (
                    <motion.a
                      key={index}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-12 h-12 bg-white/10 rounded-lg p-2 hover:bg-white/20 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
                      whileHover={{ y: -2 }}
                      title={partner.name}
                    >
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="w-full h-full object-contain filter brightness-0 invert"
                      />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800">
          <div className="cv-container py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Quick Stats */}
              <div className="flex items-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-cv-yellow" />
                  <span>24+ Clubes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-cv-blue" />
                  <span>1250+ Atletas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-cv-red" />
                  <span>180+ Jogos/Ano</span>
                </div>
              </div>

              {/* Copyright */}
              <div className="text-sm text-gray-400 text-center md:text-right">
                <p>&copy; {currentYear} Federação Cabo-verdiana de Basquetebol. Todos os direitos reservados.</p>
                <div className="flex items-center justify-center md:justify-end space-x-4 mt-2">
                  <Link to="/privacidade" className="hover:text-cv-yellow transition-colors">Privacidade</Link>
                  <span>•</span>
                  <Link to="/termos" className="hover:text-cv-yellow transition-colors">Termos</Link>
                  <span>•</span>
                  <Link to="/cookies" className="hover:text-cv-yellow transition-colors">Cookies</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
