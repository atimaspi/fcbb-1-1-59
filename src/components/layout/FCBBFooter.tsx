
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const FCBBFooter = () => {
  return (
    <footer className="bg-fcbb-dark-gray text-fcbb-white border-t border-fcbb-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Informações */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png"
                alt="FCBB Logo"
                className="h-12 w-auto"
              />
              <div>
                <h3 className="text-xl font-bold font-display text-fcbb-gold">FCBB</h3>
                <p className="text-xs text-fcbb-white/80">
                  Federação Cabo-verdiana<br />de Basquetebol
                </p>
              </div>
            </div>
            <p className="text-sm text-fcbb-white/80 leading-relaxed">
              Promovendo e desenvolvendo o basquetebol em Cabo Verde desde 1986.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold text-fcbb-gold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/sobre" className="hover:text-fcbb-gold transition-colors">Sobre a FCBB</Link></li>
              <li><Link to="/competicoes" className="hover:text-fcbb-gold transition-colors">Competições</Link></li>
              <li><Link to="/resultados" className="hover:text-fcbb-gold transition-colors">Resultados</Link></li>
              <li><Link to="/noticias" className="hover:text-fcbb-gold transition-colors">Notícias</Link></li>
              <li><Link to="/documentos" className="hover:text-fcbb-gold transition-colors">Documentos</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold text-fcbb-gold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-fcbb-gold" />
                <span>geral@fcbb.cv</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-fcbb-gold" />
                <span>+238 261 45 67</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-fcbb-gold mt-0.5" />
                <span>Palácio dos Desportos<br />Várzea, Praia<br />Cabo Verde</span>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="text-lg font-semibold text-fcbb-gold mb-4">Siga-nos</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-fcbb-light-gray rounded-lg hover:bg-fcbb-gold hover:text-fcbb-black transition-all duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-fcbb-light-gray rounded-lg hover:bg-fcbb-gold hover:text-fcbb-black transition-all duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-fcbb-light-gray rounded-lg hover:bg-fcbb-gold hover:text-fcbb-black transition-all duration-200">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <h5 className="text-sm font-medium text-fcbb-gold mb-2">Newsletter</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Seu email"
                  className="flex-1 px-3 py-2 bg-fcbb-light-gray border border-fcbb-gold/20 rounded-l-lg text-sm focus:outline-none focus:border-fcbb-gold"
                />
                <button className="px-4 py-2 bg-fcbb-gold text-fcbb-black rounded-r-lg hover:bg-fcbb-gold/90 transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-fcbb-gold/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-fcbb-white/80">
          <p>&copy; 2024 Federação Cabo-verdiana de Basquetebol. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link to="/privacidade" className="hover:text-fcbb-gold transition-colors">Política de Privacidade</Link>
            <Link to="/termos" className="hover:text-fcbb-gold transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FCBBFooter;
