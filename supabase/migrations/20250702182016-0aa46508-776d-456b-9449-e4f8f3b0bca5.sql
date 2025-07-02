
-- Inserir dados iniciais para hero slides
INSERT INTO hero_slides (title, subtitle, description, image_url, cta_text, cta_link, order_index, active) VALUES
('Federação Cabo-verdiana de Basquetebol', 'Promovendo o Basquetebol Nacional', 'A FCBB é a entidade responsável pela organização e desenvolvimento do basquetebol em Cabo Verde', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png', 'Saber Mais', '/sobre', 1, true),
('Liga Nacional 2024/25', 'Temporada em Curso', 'Acompanhe os jogos, resultados e classificações da Liga Nacional de Basquetebol', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png', 'Ver Classificações', '/classificacoes', 2, true),
('Seleções Nacionais', 'Orgulho Nacional', 'As nossas seleções representam Cabo Verde nas competições internacionais', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png', 'Conhecer Seleções', '/selecoes', 3, true);

-- Inserir categorias
INSERT INTO categories (name, slug, description, color, order_index, active) VALUES
('Competições', 'competicoes', 'Campeonatos e torneios nacionais', '#F59E0B', 1, true),
('Clubes', 'clubes', 'Clubes e equipas', '#8B5CF6', 2, true),
('Seleções', 'selecoes', 'Seleções nacionais', '#EF4444', 3, true),
('Notícias', 'noticias', 'Últimas notícias do basquetebol', '#10B981', 4, true),
('Resultados', 'resultados', 'Resultados e calendário', '#3B82F6', 5, true);

-- Inserir clubes
INSERT INTO clubs (name, island, description, contact_email, contact_phone, address, website, founded_year, active, status, logo_url) VALUES
('CD Travadores', 'Santiago', 'Clube Desportivo Travadores é um dos clubes mais tradicionais de Cabo Verde', 'geral@travadores.cv', '+238 123 456 789', 'Cidade da Praia, Santiago', 'https://travadores.cv', 1965, true, 'active', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png'),
('Sporting CV', 'Santiago', 'Sporting Clube de Cabo Verde', 'info@sporting.cv', '+238 987 654 321', 'Cidade da Praia, Santiago', 'https://sporting.cv', 1970, true, 'active', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png'),
('Académica Porto Novo', 'Santo Antão', 'Associação Académica do Porto Novo', 'academia@portonovo.cv', '+238 111 222 333', 'Porto Novo, Santo Antão', null, 1980, true, 'active', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png'),
('CS Mindelense', 'São Vicente', 'Clube Sportivo Mindelense', 'mindelense@mindelo.cv', '+238 444 555 666', 'Mindelo, São Vicente', 'https://mindelense.cv', 1922, true, 'active', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png'),
('Five Stars', 'Sal', 'Five Stars Basketball Club', 'contact@fivestars.cv', '+238 777 888 999', 'Espargos, Sal', null, 1995, true, 'active', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png');

-- Inserir competições
INSERT INTO championships (name, type, season, status, start_date, end_date, description, venue) VALUES
('Liga Nacional Masculina', 'championship', '2024/25', 'active', '2024-10-01', '2025-05-31', 'Campeonato Nacional de Basquetebol Masculino', 'Várias ilhas'),
('Liga Nacional Feminina', 'championship', '2024/25', 'active', '2024-10-01', '2025-05-31', 'Campeonato Nacional de Basquetebol Feminino', 'Várias ilhas'),
('Taça de Cabo Verde', 'cup', '2024/25', 'upcoming', '2025-01-15', '2025-03-30', 'Taça Nacional de Basquetebol', 'Praia, Santiago'),
('Super Taça', 'tournament', '2024/25', 'completed', '2024-09-15', '2024-09-17', 'Super Taça de Basquetebol 2024', 'Mindelo, São Vicente');

-- Inserir notícias
INSERT INTO news (title, content, excerpt, category, status, featured, author, featured_image_url) VALUES
('Liga Nacional 2024/25 arranca com grande expectativa', 'A nova temporada da Liga Nacional de Basquetebol promete ser uma das mais competitivas dos últimos anos...', 'Nova temporada promete ser muito competitiva', 'competicoes', 'publicado', true, 'FCBB', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png'),
('Seleção Nacional convocada para AfroBasket', 'A Federação Cabo-verdiana de Basquetebol anunciou a convocatória da Seleção Nacional...', 'Convocatória anunciada para competição continental', 'selecoes', 'publicado', true, 'FCBB', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png'),
('Novo regulamento da Liga Nacional aprovado', 'O novo regulamento da Liga Nacional foi aprovado pela Assembleia Geral da FCBB...', 'Mudanças importantes no regulamento', 'competicoes', 'publicado', false, 'FCBB', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png'),
('Clínica de basquetebol para jovens', 'A FCBB organiza uma clínica de basquetebol destinada a jovens dos 12 aos 18 anos...', 'Formação de jovens talentos', 'noticias', 'publicado', false, 'FCBB', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png');

-- Inserir jogos
INSERT INTO games (home_team_id, away_team_id, competition_id, scheduled_date, status, venue, round) VALUES
((SELECT id FROM clubs WHERE name = 'CD Travadores'), (SELECT id FROM clubs WHERE name = 'Sporting CV'), (SELECT id FROM championships WHERE name = 'Liga Nacional Masculina'), '2024-11-15 19:00:00+00', 'finished', 'Pavilhão Vavá Duarte', 'Jornada 1'),
((SELECT id FROM clubs WHERE name = 'Académica Porto Novo'), (SELECT id FROM clubs WHERE name = 'CS Mindelense'), (SELECT id FROM championships WHERE name = 'Liga Nacional Masculina'), '2024-11-16 20:00:00+00', 'finished', 'Pavilhão do Mindelo', 'Jornada 1'),
((SELECT id FROM clubs WHERE name = 'Five Stars'), (SELECT id FROM clubs WHERE name = 'CD Travadores'), (SELECT id FROM championships WHERE name = 'Liga Nacional Masculina'), '2024-11-22 19:30:00+00', 'scheduled', 'Pavilhão do Sal', 'Jornada 2'),
((SELECT id FROM clubs WHERE name = 'Sporting CV'), (SELECT id FROM clubs WHERE name = 'Académica Porto Novo'), (SELECT id FROM championships WHERE name = 'Liga Nacional Masculina'), '2024-11-23 18:00:00+00', 'scheduled', 'Pavilhão Vavá Duarte', 'Jornada 2');

-- Atualizar jogos com resultados
UPDATE games SET home_score = 85, away_score = 78, status = 'finished' 
WHERE home_team_id = (SELECT id FROM clubs WHERE name = 'CD Travadores') 
AND away_team_id = (SELECT id FROM clubs WHERE name = 'Sporting CV');

UPDATE games SET home_score = 92, away_score = 88, status = 'finished' 
WHERE home_team_id = (SELECT id FROM clubs WHERE name = 'Académica Porto Novo') 
AND away_team_id = (SELECT id FROM clubs WHERE name = 'CS Mindelense');

-- Inserir classificações
INSERT INTO standings (team_id, competition_id, games_played, wins, losses, points_for, points_against, points, position) VALUES
((SELECT id FROM clubs WHERE name = 'CD Travadores'), (SELECT id FROM championships WHERE name = 'Liga Nacional Masculina'), 1, 1, 0, 85, 78, 2, 1),
((SELECT id FROM clubs WHERE name = 'Académica Porto Novo'), (SELECT id FROM championships WHERE name = 'Liga Nacional Masculina'), 1, 1, 0, 92, 88, 2, 2),
((SELECT id FROM clubs WHERE name = 'CS Mindelense'), (SELECT id FROM championships WHERE name = 'Liga Nacional Masculina'), 1, 0, 1, 88, 92, 1, 3),
((SELECT id FROM clubs WHERE name = 'Sporting CV'), (SELECT id FROM championships WHERE name = 'Liga Nacional Masculina'), 1, 0, 1, 78, 85, 1, 4),
((SELECT id FROM clubs WHERE name = 'Five Stars'), (SELECT id FROM championships WHERE name = 'Liga Nacional Masculina'), 0, 0, 0, 0, 0, 0, 5);

-- Inserir documentos oficiais
INSERT INTO official_documents (title, description, document_type, file_url, category, published, featured) VALUES
('Estatutos da FCBB', 'Estatutos da Federação Cabo-verdiana de Basquetebol', 'estatuto', '/documents/estatutos-fcbb.pdf', 'estatutos', true, true),
('Regulamento da Liga Nacional', 'Regulamento técnico da Liga Nacional de Basquetebol', 'regulamento', '/documents/regulamento-liga.pdf', 'regulamentos', true, true),
('Código Disciplinar', 'Código disciplinar da FCBB', 'regulamento', '/documents/codigo-disciplinar.pdf', 'regulamentos', true, false),
('Relatório de Atividades 2023', 'Relatório anual de atividades da FCBB', 'relatorio', '/documents/relatorio-2023.pdf', 'relatorios', true, false);

-- Inserir eventos do calendário
INSERT INTO calendar_events (title, description, event_type, start_date, end_date, location, organizer, status) VALUES
('Assembleia Geral da FCBB', 'Assembleia Geral Ordinária da Federação', 'assembleia', '2024-12-15 14:00:00+00', '2024-12-15 18:00:00+00', 'Sede da FCBB, Praia', 'FCBB', 'agendado'),
('Final da Liga Nacional Masculina', 'Jogo final da Liga Nacional', 'jogo', '2025-05-25 20:00:00+00', '2025-05-25 22:00:00+00', 'Pavilhão Vavá Duarte', 'FCBB', 'agendado'),
('Clínica de Arbitragem', 'Formação para árbitros', 'formacao', '2024-12-01 09:00:00+00', '2024-12-01 17:00:00+00', 'Centro de Formação', 'FCBB', 'agendado'),
('AfroBasket 2025', 'Campeonato Africano de Basquetebol', 'competicao', '2025-08-26 00:00:00+00', '2025-09-07 23:59:59+00', 'Angola', 'FIBA África', 'agendado');

-- Inserir galeria
INSERT INTO gallery (title, description, event, status, published_at, image_count) VALUES
('Liga Nacional 2024 - Jornada 1', 'Imagens da primeira jornada da Liga Nacional', 'Liga Nacional 2024', 'published', now(), 0),
('Assembleia Geral 2024', 'Fotografias da Assembleia Geral da FCBB', 'Assembleia Geral', 'published', now(), 0),
('Clínica de Basquetebol Jovem', 'Momentos da clínica de formação para jovens', 'Formação', 'published', now(), 0);

-- Inserir estatísticas de basquetebol
INSERT INTO basketball_stats (stat_key, stat_name, stat_value, description, icon_name, active, order_index) VALUES
('total_clubs', 'Clubes Filiados', '45', 'Número total de clubes filiados na FCBB', 'users', true, 1),
('active_players', 'Jogadores Ativos', '1,250', 'Jogadores registados e ativos', 'user-check', true, 2),
('competitions', 'Competições Anuais', '8', 'Competições organizadas anualmente', 'trophy', true, 3),
('referees', 'Árbitros Certificados', '78', 'Árbitros com certificação ativa', 'whistle', true, 4),
('islands_covered', 'Ilhas Abrangidas', '9', 'Ilhas com atividade de basquetebol', 'map', true, 5);

-- Inserir membros da federação
INSERT INTO federation_members (full_name, position, department, bio, photo_url, email, phone, active, status, order_priority) VALUES
('João Silva', 'Presidente', 'Direção', 'Presidente da FCBB desde 2020, com vasta experiência no basquetebol nacional', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png', 'presidente@fcbb.cv', '+238 123 456 789', true, 'publicado', 1),
('Maria Santos', 'Vice-Presidente', 'Direção', 'Vice-Presidente responsável pelas competições nacionais', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png', 'vice@fcbb.cv', '+238 987 654 321', true, 'publicado', 2),
('Pedro Costa', 'Secretário-Geral', 'Administração', 'Secretário-Geral da FCBB, responsável pela gestão administrativa', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png', 'secretario@fcbb.cv', '+238 111 222 333', true, 'publicado', 3),
('Ana Rodrigues', 'Tesoureira', 'Finanças', 'Tesoureira da FCBB, gestão financeira e orçamental', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png', 'tesoureira@fcbb.cv', '+238 444 555 666', true, 'publicado', 4);
