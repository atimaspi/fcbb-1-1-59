
import { Card, CardContent } from "@/components/ui/card";
import { Play, Clock, Eye } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const FibaVideoGrid = () => {
  const videoContent = [
    {
      id: 1,
      title: "Resumo da Final da Liga Nacional 2024",
      thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800",
      duration: "5:30",
      views: "2.5K",
      category: "Highlights",
      isLive: false
    },
    {
      id: 2,
      title: "Melhores Jogadas da Época",
      thumbnail: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=800",
      duration: "8:15",
      views: "4.2K",
      category: "Top Plays",
      isLive: false
    },
    {
      id: 3,
      title: "Entrevista com MVP da Liga",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800",
      duration: "12:45",
      views: "1.8K",
      category: "Interview",
      isLive: false
    },
    {
      id: 4,
      title: "AO VIVO: Sporting vs Benfica",
      thumbnail: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=800",
      duration: "LIVE",
      views: "850",
      category: "Live",
      isLive: true
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="cv-container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2 font-display">
              VÍDEOS EM DESTAQUE
            </h2>
            <p className="text-gray-600 text-lg">
              Os melhores momentos do basquetebol cabo-verdiano
            </p>
          </div>
          <Badge className="bg-cv-red text-white px-4 py-2">
            FCBB TV
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoContent.map((video) => (
            <Card key={video.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-md">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-cv-red rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3">
                  <Badge className={`${video.isLive ? 'bg-red-600 animate-pulse' : 'bg-black/70'} text-white border-none`}>
                    {video.isLive && <div className="w-2 h-2 bg-white rounded-full mr-1"></div>}
                    {video.duration}
                  </Badge>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-cv-blue text-white border-none text-xs">
                    {video.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-cv-blue transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {video.views}
                  </div>
                  {!video.isLive && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {video.duration}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FibaVideoGrid;
