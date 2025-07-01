
import { Play, Eye, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedVideos = () => {
  const videos = [
    {
      id: 1,
      title: "Melhores momentos: ABC vs Seven Stars",
      thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&h=225&q=80",
      duration: "4:32",
      views: "2.1K",
      category: "Highlights"
    },
    {
      id: 2,
      title: "Treino da Seleção Nacional Masculina",
      thumbnail: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?auto=format&fit=crop&w=400&h=225&q=80",
      duration: "8:15",
      views: "3.5K",
      category: "Seleções"
    },
    {
      id: 3,
      title: "Entrevista: Técnico da Liga Nacional",
      thumbnail: "https://images.unsplash.com/photo-1552847661-dddc6d9e71ba?auto=format&fit=crop&w=400&h=225&q=80",
      duration: "12:08",
      views: "1.8K",
      category: "Entrevistas"
    }
  ];

  return (
    <section className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-cv-blue to-cv-red text-white px-6 py-4">
        <h2 className="text-xl font-bold flex items-center">
          <Play className="mr-2 h-6 w-6" />
          Vídeos em Destaque
        </h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </span>
                <span className="absolute top-2 left-2 bg-cv-red text-white text-xs px-2 py-1 rounded">
                  {video.category}
                </span>
              </div>
              <h3 className="font-semibold text-sm mb-2 group-hover:text-cv-blue transition-colors">
                {video.title}
              </h3>
              <div className="flex items-center text-xs text-gray-500 space-x-3">
                <span className="flex items-center">
                  <Eye className="mr-1 h-3 w-3" />
                  {video.views}
                </span>
                <span className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  há 2 dias
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link 
            to="/videos" 
            className="inline-flex items-center bg-cv-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Play className="mr-2 h-5 w-5" />
            Ver Todos os Vídeos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideos;
