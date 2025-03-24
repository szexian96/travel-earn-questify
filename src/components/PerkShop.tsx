
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gem, Ticket, Gift, Award, Download, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface NFTPerk {
  id: string;
  titleEn: string;
  titleJp: string;
  descriptionEn: string;
  descriptionJp: string;
  pointsCost: number;
  imageUrl: string;
  category: 'experience' | 'discount' | 'collectible' | 'utility';
  isAvailable: boolean;
}

// Mock data for NFT perks
const mockPerks: NFTPerk[] = [
  {
    id: 'perk1',
    titleEn: 'Exclusive Kyoto Temple Tour',
    titleJp: '京都寺院限定ツアー',
    descriptionEn: 'Get VIP access to hidden areas of Kyoto temples not open to the public',
    descriptionJp: '一般公開されていない京都の寺院の隠された場所へのVIPアクセスを取得',
    pointsCost: 500,
    imageUrl: 'https://source.unsplash.com/random/400x300/?temple,kyoto',
    category: 'experience',
    isAvailable: true
  },
  {
    id: 'perk2',
    titleEn: 'Tokyo Restaurant 30% Discount',
    titleJp: '東京レストラン30%割引',
    descriptionEn: 'Exclusive discount at participating premium restaurants',
    descriptionJp: '参加する高級レストランでの限定割引',
    pointsCost: 300,
    imageUrl: 'https://source.unsplash.com/random/400x300/?food,restaurant,tokyo',
    category: 'discount',
    isAvailable: true
  },
  {
    id: 'perk3',
    titleEn: 'Hokkaido Limited NFT Badge',
    titleJp: '北海道限定NFTバッジ',
    descriptionEn: 'Collectible digital badge proving your Hokkaido exploration',
    descriptionJp: 'あなたの北海道探検を証明するコレクションデジタルバッジ',
    pointsCost: 200,
    imageUrl: 'https://source.unsplash.com/random/400x300/?hokkaido,badge',
    category: 'collectible',
    isAvailable: true
  },
  {
    id: 'perk4',
    titleEn: 'Onsen Priority Access Pass',
    titleJp: '温泉優先アクセスパス',
    descriptionEn: 'Skip the lines at popular onsen locations',
    descriptionJp: '人気の温泉施設での行列スキップ',
    pointsCost: 450,
    imageUrl: 'https://source.unsplash.com/random/400x300/?onsen,japan',
    category: 'utility',
    isAvailable: false
  }
];

interface PerkShopProps {
  userPoints?: number;
  onPurchase?: (perkId: string) => Promise<boolean>;
}

const PerkShop: React.FC<PerkShopProps> = ({ 
  userPoints = 350, 
  onPurchase 
}) => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const filteredPerks = activeTab === 'all' 
    ? mockPerks 
    : mockPerks.filter(perk => perk.category === activeTab);

  const handlePurchase = async (perk: NFTPerk) => {
    if (userPoints < perk.pointsCost) {
      toast({
        title: t('shop.notEnoughPoints'),
        description: t('shop.earnMorePoints'),
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(perk.id);
    
    try {
      if (onPurchase) {
        const success = await onPurchase(perk.id);
        if (success) {
          toast({
            title: t('shop.purchaseSuccess'),
            description: language === 'en' ? perk.titleEn : perk.titleJp,
          });
        } else {
          throw new Error('Purchase failed');
        }
      } else {
        // Mock purchase success
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast({
          title: t('shop.purchaseSuccess'),
          description: language === 'en' ? perk.titleEn : perk.titleJp,
        });
      }
    } catch (error) {
      toast({
        title: t('shop.purchaseFailed'),
        description: t('shop.tryAgainLater'),
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(null);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'experience': return <Gift className="h-4 w-4" />;
      case 'discount': return <Ticket className="h-4 w-4" />;
      case 'collectible': return <Award className="h-4 w-4" />;
      case 'utility': return <Download className="h-4 w-4" />;
      default: return <Gem className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{t('shop.nftPerks')}</h2>
          <p className="text-muted-foreground">{t('shop.redeemPoints')}</p>
        </div>
        <div className="bg-secondary rounded-full py-2 px-4 flex items-center">
          <Gem className="h-5 w-5 text-primary mr-2" />
          <span className="font-semibold">{userPoints} {t('shop.points')}</span>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">{t('shop.all')}</TabsTrigger>
          <TabsTrigger value="experience">{t('shop.experiences')}</TabsTrigger>
          <TabsTrigger value="discount">{t('shop.discounts')}</TabsTrigger>
          <TabsTrigger value="collectible">{t('shop.collectibles')}</TabsTrigger>
          <TabsTrigger value="utility">{t('shop.utilities')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPerks.map((perk) => (
              <motion.div
                key={perk.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-48">
                    <img 
                      src={perk.imageUrl} 
                      alt={language === 'en' ? perk.titleEn : perk.titleJp} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {getCategoryIcon(perk.category)}
                        {t(`shop.${perk.category}`)}
                      </Badge>
                    </div>
                    {!perk.isAvailable && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="font-medium">{t('shop.comingSoon')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      {language === 'en' ? perk.titleEn : perk.titleJp}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {language === 'en' ? perk.descriptionEn : perk.descriptionJp}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <div className="flex items-center text-primary font-semibold">
                      <Gem className="h-5 w-5 mr-2" />
                      <span>{perk.pointsCost} {t('shop.points')}</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      disabled={!perk.isAvailable || userPoints < perk.pointsCost || isProcessing === perk.id}
                      onClick={() => handlePurchase(perk)}
                    >
                      {isProcessing === perk.id ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full" />
                          {t('shop.processing')}
                        </div>
                      ) : userPoints < perk.pointsCost ? (
                        t('shop.notEnoughPoints')
                      ) : (
                        t('shop.redeemNow')
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerkShop;
