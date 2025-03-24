import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  User, 
  Map, 
  FileText, 
  Globe,
  BookOpen,
  Video,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import StoryChaptersNav, { StoryChapter } from '@/components/StoryChaptersNav';
import CharacterProfile, { Character } from '@/components/CharacterProfile';
import WorldLoreEntry from '@/components/WorldLoreEntry';

interface WorldLoreEntryType {
  id: string;
  titleEn: string;
  titleJp: string;
  categoryEn: string;
  categoryJp: string;
  contentEn: string;
  contentJp: string;
  imageUrl: string;
  relatedLocations: {
    nameEn: string;
    nameJp: string;
    id: string;
  }[];
  tags: string[];
}

const mockStory = {
  id: '1',
  titleEn: 'The Lost Temple of Kyoto',
  titleJp: '京都の失われた寺院',
  descriptionEn: 'Discover the secrets of an ancient temple hidden in Kyoto\'s mountains.',
  descriptionJp: '京都の山々に隠された古代寺院の秘密を発見しよう。',
  contentEn: `For centuries, rumors had circulated among the locals about a temple hidden deep in the forests of eastern Kyoto. Some said it housed incredible treasures, while others claimed it was home to powerful spirits.\n\nIt wasn't until 1923 that explorer Hiroshi Tanaka stumbled upon ancient stone steps while hiking in the area. Following them deeper into the forest, he discovered the remains of what would later be known as Shinrin-ji (Forest Temple).\n\nThe temple's architecture suggested it was built during the early Heian period, around the 9th century. What made it truly remarkable was that it had seemingly been abandoned suddenly, with many artifacts left behind.\n\nArchaeologists found scrolls describing rituals performed to communicate with the spirits of the forest. The temple's main hall featured intricate wooden carvings depicting these ceremonies.\n\nToday, parts of the temple have been carefully restored, though much remains as it was found. Visitors can hike the same path Tanaka took, experiencing the same sense of discovery as they emerge from the forest to find this hidden historical treasure.`,
  contentJp: `何世紀もの間、京都東部の森深くに隠された寺院についての噂が地元の人々の間で広まっていました。すばらしい宝物が収められていると言う人もいれば、強力な霊が住んでいると主張する人もいました。\n\n1923年になって初めて、探検家の田中博がこの地域をハイキング中に古い石段を偶然発見しました。森の奥へと続くその階段をたどっていくと、後に森林寺（しんりんじ）として知られることになる寺院の遺跡を発見しました。\n\n寺院の建築様式は、9世紀頃の平安時代初期に建てられたことを示唆していました。特に注目すべきは、多くの工芸品が残されたまま、突然放棄されたように見えることでした。\n\n考古学者たちは、森の精霊と交信するために行われた儀式を記述した巻物を発見しました。寺院の本堂には、これらの儀式を描いた精巧な木彫りが施されていました。\n\n今日、寺院の一部は慎重に復元されていますが、発見された当時のままの部分も多く残っています。訪問者は田中と同じ道をハイキングし、森から抜け出してこの隠された歴史的宝物を見つけたときと同じ発見の感覚を体験することができます。`,
  videoUrlEn: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  videoUrlJp: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  pdfUrlEn: 'https://example.com/story-en.pdf',
  pdfUrlJp: 'https://example.com/story-jp.pdf',
  thumbnailUrl: 'https://source.unsplash.com/random/800x600/?temple,kyoto',
  coverImage: 'https://source.unsplash.com/random/1200x600/?temple,japan',
  createdAt: '2023-05-15T09:30:00Z',
  updatedAt: '2023-07-10T14:20:00Z'
};

const mockChapters: StoryChapter[] = [
  {
    id: '1',
    numberLabel: 'Chapter 1',
    titleEn: 'The Discovery',
    titleJp: '発見',
    descriptionEn: 'Hiroshi Tanaka\'s fateful hike through eastern Kyoto',
    descriptionJp: '田中博の運命的な京都東部でのハイキング',
    durationMinutes: 10,
    isLocked: false,
    thumbnailUrl: 'https://source.unsplash.com/random/100x100/?hike'
  },
  {
    id: '2',
    numberLabel: 'Chapter 2',
    titleEn: 'Secret Scrolls',
    titleJp: '秘密の巻物',
    descriptionEn: 'Uncovering the temple\'s mysterious rituals',
    descriptionJp: '寺院の謎めいた儀式の発見',
    durationMinutes: 15,
    isLocked: false,
    thumbnailUrl: 'https://source.unsplash.com/random/100x100/?scroll'
  },
  {
    id: '3',
    numberLabel: 'Chapter 3',
    titleEn: 'Forest Spirits',
    titleJp: '森の精霊',
    descriptionEn: 'The legends of spirits that protected the temple',
    descriptionJp: '寺院を守った精霊の伝説',
    durationMinutes: 12,
    isLocked: true,
    thumbnailUrl: 'https://source.unsplash.com/random/100x100/?spirit'
  },
  {
    id: '4',
    numberLabel: 'Chapter 4',
    titleEn: 'Modern Revelations',
    titleJp: '現代の啓示',
    descriptionEn: 'What archaeologists have learned in recent years',
    descriptionJp: '考古学者が近年学んだこと',
    durationMinutes: 18,
    isLocked: true
  }
];

const mockCharacters: Character[] = [
  {
    id: '1',
    nameEn: 'Hiroshi Tanaka',
    nameJp: '田中 博',
    role: 'Explorer',
    locationEn: 'Kyoto',
    locationJp: '京都',
    quoteEn: 'The forest doesn\'t give up its secrets easily, but the patient seeker will be rewarded.',
    quoteJp: '森は簡単に秘密を明かさないが、忍耐強い探求者は報われるだろう。',
    descriptionEn: 'Born in 1890, Hiroshi Tanaka was a devoted explorer and historian who spent his life documenting the hidden cultural treasures of Japan.\n\nAfter discovering the Lost Temple in 1923, he dedicated the remainder of his career to studying and preserving the site.',
    descriptionJp: '1890年生まれの田中博は、日本の隠された文化的宝物を生涯にわたって記録してきた熱心な探検家であり歴史家でした。\n\n1923年に失われた寺院を発見した後、彼はその場所の研究と保存に残りの経歴を捧げました。',
    imageUrl: 'https://source.unsplash.com/random/300x400/?japanese,man',
    relatedQuests: ['Temple Explorer Quest', 'Historical Documentation Quest'],
    relatedStories: ['The Lost Temple of Kyoto']
  },
  {
    id: '2',
    nameEn: 'Akiko Yamamoto',
    nameJp: '山本 明子',
    role: 'Archaeologist',
    locationEn: 'Tokyo University',
    locationJp: '東京大学',
    quoteEn: 'Every artifact tells a story if you know how to listen.',
    quoteJp: '聞き方を知っていれば、すべての遺物は物語を語る。',
    descriptionEn: 'Professor Akiko Yamamoto is the leading authority on Heian period temple architecture and has led the modern restoration efforts at the Lost Temple site.\n\nHer research has revealed new connections between the temple\'s design and astronomical alignments that suggest it may have served as an ancient observatory.',
    descriptionJp: '山本明子教授は平安時代の寺院建築の第一人者であり、失われた寺院の現代の修復活動を主導してきました。\n\n彼女の研究により、寺院のデザインと天文学的配置の間に新たなつながりが明らかになり、それが古代の天文台として機能していた可能性が示唆されています。',
    imageUrl: 'https://source.unsplash.com/random/300x400/?japanese,woman',
    relatedQuests: ['Archaeological Dig Quest'],
    relatedStories: ['The Lost Temple of Kyoto', 'Sacred Sites of Japan']
  }
];

const mockWorldLore: WorldLoreEntryType[] = [
  {
    id: '1',
    titleEn: 'Heian Period Architecture',
    titleJp: '平安時代の建築',
    categoryEn: 'Historical',
    categoryJp: '歴史的',
    contentEn: 'The Heian period (794-1185) saw distinctive architectural developments in Japanese religious structures. Temples of this era typically featured multi-tiered pagodas, extensive use of wooden brackets, and asymmetrical layouts that harmonized with natural surroundings.\n\nUnlike previous eras where Chinese influence dominated, Heian architecture began developing uniquely Japanese characteristics, with greater attention to integrating buildings with the landscape and more refined proportions.',
    contentJp: '平安時代（794-1185）は、日本の宗教的建造物において独特の建築的発展が見られました。この時代の寺院は典型的に多層の塔、木製ブラケットの広範な使用、自然環境と調和した非対称的なレイアウトを特徴としていました。\n\n中国の影響が支配的だった以前の時代とは異なり、平安建築は建物と風景の統合により大きな注意を払い、よりリファインされた比率を持つ独自の日本的特徴を発展させ始めました。',
    imageUrl: 'https://source.unsplash.com/random/400x300/?japanese,temple',
    relatedLocations: [
      {
        nameEn: 'Byodo-in Temple',
        nameJp: '平等院',
        id: 'loc1'
      },
      {
        nameEn: 'Daigo-ji Temple',
        nameJp: '醍醐寺',
        id: 'loc2'
      }
    ],
    tags: ['Architecture', 'Heian Period', 'Temples', 'Japanese History']
  },
  {
    id: '2',
    titleEn: 'Forest Spirit Beliefs',
    titleJp: '森の精霊信仰',
    categoryEn: 'Mythology',
    categoryJp: '神話',
    contentEn: 'Throughout Japanese history, forests have been considered sacred spaces inhabited by various spirits called kami. Kodama are spirits believed to inhabit trees, while tengu are more complex supernatural beings often associated with mountains and forests.\n\nRituals to honor and appease these forest spirits were common in remote temples, involving offerings of sake, rice, and sometimes specialized ceremonies during seasonal changes. Many of these practices blended elements of indigenous Shinto beliefs with imported Buddhist concepts.',
    contentJp: '日本の歴史を通じて、森は神と呼ばれるさまざまな精霊が住む神聖な空間と考えられてきました。木霊は木に宿ると信じられている精霊であり、天狗はより複雑な超自然的存在で、山や森に関連することが多いです。\n\nこれらの森の精霊を敬い、なだめるための儀式は辺鄙な寺院では一般的で、酒や米の奉納、そして時には季節の変わり目に特殊な儀式を行うことがありました。これらの慣行の多くは、土着の神道の信仰と輸入された仏教の概念の要素を混合していました。',
    imageUrl: 'https://source.unsplash.com/random/400x300/?japanese,forest',
    relatedLocations: [
      {
        nameEn: 'Mount Kurama',
        nameJp: '鞍馬山',
        id: 'loc3'
      }
    ],
    tags: ['Spirits', 'Mythology', 'Kodama', 'Tengu', 'Forest Kami']
  }
];

const StoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState(mockStory);
  const [chapters, setChapters] = useState<StoryChapter[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [worldLore, setWorldLore] = useState<WorldLoreEntryType[]>([]);
  const [activeTab, setActiveTab] = useState('story');
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [viewMode, setViewMode] = useState<'video' | 'pdf'>('pdf');

  useEffect(() => {
    const loadStory = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setChapters(mockChapters);
        setCharacters(mockCharacters);
        setWorldLore(mockWorldLore);
        setSelectedChapterId(mockChapters[0]?.id || '');
        setLoading(false);
      } catch (error) {
        console.error('Error loading story:', error);
        toast({
          title: 'Error',
          description: 'Failed to load story details',
          variant: 'destructive',
        });
        setLoading(false);
      }
    };
    
    loadStory();
  }, [id, toast]);

  const selectedChapter = chapters.find(ch => ch.id === selectedChapterId) || chapters[0];

  const title = language === 'en' ? story.titleEn : story.titleJp;
  const videoUrl = language === 'en' ? story.videoUrlEn : story.videoUrlJp;
  const pdfUrl = language === 'en' ? story.pdfUrlEn : story.pdfUrlJp;

  const handleViewPdf = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      toast({
        title: t('story.noPdf'),
        description: t('story.pdfNotAvailable'),
        variant: 'destructive',
      });
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/stories" className="inline-flex items-center text-sm mb-4 text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Stories
        </Link>
        
        <div className="relative rounded-xl overflow-hidden h-48 sm:h-64 md:h-96 mb-6">
          <img 
            src={story.coverImage || story.thumbnailUrl} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          </div>
        </div>
      </motion.div>
      
      <div className="flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="story" className="flex-1">
              <FileText className="mr-2 h-4 w-4" />
              {t('story.chapters')}
            </TabsTrigger>
            <TabsTrigger value="characters" className="flex-1">
              <User className="mr-2 h-4 w-4" />
              {t('story.characters')}
            </TabsTrigger>
            <TabsTrigger value="lore" className="flex-1">
              <Globe className="mr-2 h-4 w-4" />
              {t('story.lore')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="story" className="w-full">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-4 gap-8"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="lg:col-span-1">
                <StoryChaptersNav
                  chapters={chapters}
                  currentChapterId={selectedChapterId}
                  onChapterSelect={setSelectedChapterId}
                  className="sticky top-4"
                />
              </div>
              
              <div className="lg:col-span-3">
                <div className="mb-4">
                  <TabsList className="mb-6">
                    {videoUrl && (
                      <TabsTrigger 
                        value="video" 
                        onClick={() => setViewMode('video')}
                        className={viewMode === 'video' ? 'bg-primary text-primary-foreground' : ''}
                      >
                        <Video className="mr-2 h-4 w-4" />
                        Video
                      </TabsTrigger>
                    )}
                    
                    <TabsTrigger 
                      value="pdf" 
                      onClick={() => setViewMode('pdf')}
                      className={viewMode === 'pdf' ? 'bg-primary text-primary-foreground' : ''}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Storybook (PDF)
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                {viewMode === 'video' && videoUrl && (
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-border">
                    <iframe 
                      src={videoUrl}
                      title={title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                )}
                
                {viewMode === 'pdf' && (
                  <div className="bg-secondary/20 rounded-lg overflow-hidden border border-border/50 p-8 text-center">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                    <h3 className="text-xl font-medium mb-2">Storybook Available</h3>
                    <p className="text-muted-foreground mb-6">
                      View or download the PDF storybook version
                    </p>
                    <Button onClick={handleViewPdf}>
                      <Download className="mr-2 h-4 w-4" />
                      View Storybook
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="characters">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {characters.map(character => (
                <CharacterProfile key={character.id} character={character} />
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="lore">
            <motion.div 
              className="space-y-8"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {worldLore.map(lore => (
                <WorldLoreEntry key={lore.id} lore={lore} />
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StoryDetail;
