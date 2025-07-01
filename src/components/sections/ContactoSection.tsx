
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const ContactoSection = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Endereço",
      details: ["Complexo Desportivo da Várzea", "CP 584, Praia - Santiago", "Cabo Verde"]
    },
    {
      icon: Phone,
      title: "Telefone",
      details: ["(+238) 261 56 89", "(+238) 991 23 45"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["geral@fcbb.cv", "presidente@fcbb.cv"]
    },
    {
      icon: Clock,
      title: "Horário",
      details: ["Segunda a Sexta: 08:00 - 17:00", "Sábado: 08:00 - 12:00"]
    }
  ];

  return (
    <section id="contacto" className="py-20 bg-cv-primary text-white">
      <div className="cv-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Contacto
          </h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Entre em contacto connosco para mais informações
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl"
                >
                  <div className="text-cv-secondary mb-4">
                    <info.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold mb-3">{info.title}</h3>
                  <div className="space-y-1 text-blue-100">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm">{detail}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl"
            >
              <div className="bg-gray-300 h-48 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-medium">Localização</p>
                  <p className="text-sm">Complexo Desportivo da Várzea</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold mb-6">Envie-nos uma Mensagem</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-white">Nome</Label>
                  <Input 
                    id="firstName" 
                    placeholder="Seu nome" 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-white">Apelido</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Seu apelido" 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu.email@exemplo.com" 
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
              
              <div>
                <Label htmlFor="subject" className="text-white">Assunto</Label>
                <Input 
                  id="subject" 
                  placeholder="Assunto da mensagem" 
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-white">Mensagem</Label>
                <Textarea 
                  id="message" 
                  placeholder="Escreva sua mensagem aqui..." 
                  rows={5}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
              
              <Button 
                className="w-full bg-cv-secondary hover:bg-cv-secondary/90 text-cv-primary font-bold py-3 transform hover:scale-105 transition-all duration-300"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactoSection;
