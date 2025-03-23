
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Share, 
  Twitter, 
  Instagram, 
  TrendingUp, 
  User, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  ThumbsUp, 
  RotateCw, 
  Plus, 
  Image, 
  Video, 
  Map, 
  Clock, 
  X as XIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from '@/components/ui/switch';

// Sample data for social media posts
interface SocialPost {
  id: string;
  captionEn: string;
  captionJp: string;
  imageUrl: string;
  publishDate: string;
  platform: 'twitter' | 'instagram' | 'tiktok';
  status: 'scheduled' | 'published' | 'draft';
  performance?: {
    likes: number;
    shares: number;
    views: number;
    comments: number;
  };
}

// Sample data for user-generated content
interface UGCPost {
  id: string;
  userId: string;
  username: string;
  profileImageUrl: string;
  imageUrl: string;
  caption: string;
  platform: 'twitter' | 'instagram' | 'tiktok';
  timestamp: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  location?: {
    name: string;
    id: string;
  };
  tags: string[];
  matchedRoutes?: string[];
  matchedQuests?: string[];
}

// Mock data for social media posts
const mockSocialPosts: SocialPost[] = [
  {
    id: '1',
    captionEn: 'Discover the hidden temple trails of Kyoto this spring! 🌸 #TouriiJapan #KyotoSecrets',
    captionJp: '今春、京都の隠れた寺院の小道を発見しよう！🌸 #TouriiJapan #京都の秘密',
    imageUrl: 'https://source.unsplash.com/random/600x400/?kyoto,temple',
    publishDate: '2023-11-12T10:00:00Z',
    platform: 'instagram',
    status: 'published',
    performance: {
      likes: 324,
      shares: 47,
      views: 1209,
      comments: 32
    }
  },
  {
    id: '2',
    captionEn: 'Follow our new Hokkaido winter route and earn exclusive digital stamps! ❄️ #TouriiTravel #HokkaidoWinter',
    captionJp: '新しい北海道冬のルートをフォローして、限定デジタルスタンプを獲得しよう！❄️ #TouriiTravel #北海道の冬',
    imageUrl: 'https://source.unsplash.com/random/600x400/?hokkaido,snow',
    publishDate: '2023-11-20T14:30:00Z',
    platform: 'twitter',
    status: 'scheduled'
  },
  {
    id: '3',
    captionEn: 'Tokyo night lights quest now available! Complete all 5 tasks for exclusive rewards. #TokyoNights #TouriiQuests',
    captionJp: '東京の夜景クエストが利用可能になりました！5つのタスクをすべて完了して、限定報酬を獲得しよう。#東京の夜 #Touriiクエスト',
    imageUrl: 'https://source.unsplash.com/random/600x400/?tokyo,night',
    publishDate: '2023-11-05T18:45:00Z',
    platform: 'tiktok',
    status: 'published',
    performance: {
      likes: 836,
      shares: 124,
      views: 4328,
      comments: 67
    }
  }
];

// Mock data for user-generated content
const mockUGCPosts: UGCPost[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'traveler_jane',
    profileImageUrl: 'https://source.unsplash.com/random/100x100/?portrait,woman',
    imageUrl: 'https://source.unsplash.com/random/600x400/?osaka,castle',
    caption: 'Finally visited Osaka Castle! Such an amazing experience #TouriiJapan #OsakaAdventure',
    platform: 'instagram',
    timestamp: '2023-11-10T14:23:00Z',
    engagement: {
      likes: 245,
      shares: 32,
      comments: 18
    },
    location: {
      name: 'Osaka Castle',
      id: 'spot123'
    },
    tags: ['TouriiJapan', 'OsakaAdventure', 'JapaneseHistory'],
    matchedRoutes: ['Osaka Historical Tour'],
    matchedQuests: ['Osaka Heritage Quest']
  },
  {
    id: '2',
    userId: 'user2',
    username: 'hikingmaster',
    profileImageUrl: 'https://source.unsplash.com/random/100x100/?portrait,man',
    imageUrl: 'https://source.unsplash.com/random/600x400/?mount,fuji',
    caption: 'Conquered Mt. Fuji today! The view from the top is breathtaking #MtFuji #TouriiTravel',
    platform: 'twitter',
    timestamp: '2023-11-08T09:15:00Z',
    engagement: {
      likes: 467,
      shares: 87,
      comments: 43
    },
    location: {
      name: 'Mount Fuji',
      id: 'spot456'
    },
    tags: ['MtFuji', 'TouriiTravel', 'JapanHiking'],
    matchedRoutes: ['Mount Fuji Trail'],
    matchedQuests: []
  },
  {
    id: '3',
    userId: 'user3',
    username: 'foodie_explorer',
    profileImageUrl: 'https://source.unsplash.com/random/100x100/?portrait',
    imageUrl: 'https://source.unsplash.com/random/600x400/?tokyo,food',
    caption: 'Tokyo street food is incredible! Completing the Tokyo Food Quest one bite at a time #TokyoFood #TouriiQuests',
    platform: 'instagram',
    timestamp: '2023-11-11T18:42:00Z',
    engagement: {
      likes: 389,
      shares: 54,
      comments: 37
    },
    location: {
      name: 'Tsukiji Outer Market',
      id: 'spot789'
    },
    tags: ['TokyoFood', 'TouriiQuests', 'JapaneseStreetFood'],
    matchedQuests: ['Tokyo Food Explorer Quest']
  }
];

// Sample tourist routes for matching
const mockRoutes = [
  { id: '1', nameEn: 'Kyoto Historical Route', nameJp: '京都歴史ルート' },
  { id: '2', nameEn: 'Tokyo Modern Experience', nameJp: '東京モダン体験' },
  { id: '3', nameEn: 'Hokkaido Nature Trail', nameJp: '北海道自然の道' },
  { id: '4', nameEn: 'Osaka Food Journey', nameJp: '大阪フードの旅' },
  { id: '5', nameEn: 'Mount Fuji Trail', nameJp: '富士山トレイル' }
];

// Sample quests for matching
const mockQuests = [
  { id: '1', titleEn: 'Kyoto Temple Explorer', titleJp: '京都寺院探検家' },
  { id: '2', titleEn: 'Tokyo Night Lights', titleJp: '東京の夜景' },
  { id: '3', titleEn: 'Hokkaido Winter Adventure', titleJp: '北海道冬の冒険' },
  { id: '4', titleEn: 'Osaka Food Quest', titleJp: '大阪フードクエスト' },
  { id: '5', titleEn: 'Mt. Fuji Conqueror', titleJp: '富士山征服者' }
];

const SocialMediaManagement: React.FC = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('poster');
  const [newPost, setNewPost] = useState<Partial<SocialPost>>({
    captionEn: '',
    captionJp: '',
    imageUrl: '',
    platform: 'instagram',
    status: 'draft'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [selectedUGC, setSelectedUGC] = useState<UGCPost | null>(null);
  const [isMatchDialogOpen, setIsMatchDialogOpen] = useState(false);
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  const [selectedQuests, setSelectedQuests] = useState<string[]>([]);

  // Filter posts based on search term
  const filteredSocialPosts = mockSocialPosts.filter(post => {
    const caption = language === 'en' ? post.captionEn : post.captionJp;
    return caption.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredUGCPosts = mockUGCPosts.filter(post => {
    return post.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
           post.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const handleCreatePost = () => {
    toast({
      title: "Post Scheduled",
      description: "Your social media post has been scheduled successfully.",
    });
    setIsCreatePostOpen(false);
    console.log('New post:', newPost);
  };

  const handleMatchUGC = () => {
    toast({
      title: "UGC Matched",
      description: `The post by ${selectedUGC?.username} has been matched to routes and quests.`,
    });
    setIsMatchDialogOpen(false);
    console.log('Matched UGC to:', { routes: selectedRoutes, quests: selectedQuests });
  };

  const handlePlatformSelect = (platform: string) => {
    setNewPost(prev => ({ ...prev, platform: platform as SocialPost['platform'] }));
  };

  const handleStatusSelect = (status: string) => {
    setNewPost(prev => ({ ...prev, status: status as SocialPost['status'] }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const copyToOtherLanguage = (sourceField: 'captionEn' | 'captionJp') => {
    const targetField = sourceField === 'captionEn' ? 'captionJp' : 'captionEn';
    setNewPost(prev => ({ ...prev, [targetField]: prev[sourceField] }));
  };

  const selectUGCForMatching = (ugc: UGCPost) => {
    setSelectedUGC(ugc);
    setSelectedRoutes(ugc.matchedRoutes || []);
    setSelectedQuests(ugc.matchedQuests || []);
    setIsMatchDialogOpen(true);
  };

  const toggleRouteSelection = (routeId: string) => {
    setSelectedRoutes(prev => 
      prev.includes(routeId) ? prev.filter(id => id !== routeId) : [...prev, routeId]
    );
  };

  const toggleQuestSelection = (questId: string) => {
    setSelectedQuests(prev => 
      prev.includes(questId) ? prev.filter(id => id !== questId) : [...prev, questId]
    );
  };

  // Platform icons
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'tiktok':
        return <Video className="h-4 w-4" />;
      default:
        return <Share className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Social Media Management</h1>
          <p className="text-muted-foreground">
            Create, schedule, and track social media posts. Manage user-generated content.
          </p>
        </div>
        <Button onClick={() => setIsCreatePostOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Post
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="poster" className="flex items-center">
            <Share className="mr-2 h-4 w-4" />
            Social Poster
          </TabsTrigger>
          <TabsTrigger value="ugc" className="flex items-center">
            <TrendingUp className="mr-2 h-4 w-4" />
            User Content
          </TabsTrigger>
        </TabsList>
        
        {/* Social Poster Tab */}
        <TabsContent value="poster" className="space-y-6 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="ml-2" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Post Content</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSocialPosts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No posts found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredSocialPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded overflow-hidden bg-secondary flex-shrink-0">
                                <img 
                                  src={post.imageUrl} 
                                  alt="Post media" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium line-clamp-2 text-sm">
                                  {language === 'en' ? post.captionEn : post.captionJp}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="flex items-center gap-1 w-fit">
                              {getPlatformIcon(post.platform)}
                              <span className="capitalize">{post.platform}</span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                post.status === 'published' ? "default" : 
                                post.status === 'scheduled' ? "secondary" : "outline"
                              }
                              className="capitalize"
                            >
                              {post.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(post.publishDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {post.performance ? (
                              <div className="text-sm">
                                <div className="flex items-center gap-2">
                                  <ThumbsUp className="h-3 w-3" />
                                  <span>{post.performance.likes}</span>
                                  <Share className="h-3 w-3 ml-2" />
                                  <span>{post.performance.shares}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{post.performance.views}</span>
                                </div>
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">Pending</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-[160px]">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <RotateCw className="h-4 w-4 mr-2" />
                                  Refresh Stats
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* User-Generated Content Tab */}
        <TabsContent value="ugc" className="space-y-6 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search user posts..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="ml-2" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUGCPosts.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    No user-generated content found
                  </div>
                ) : (
                  filteredUGCPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <div className="aspect-video w-full bg-secondary relative">
                        <img 
                          src={post.imageUrl} 
                          alt={`Post by ${post.username}`} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            {getPlatformIcon(post.platform)}
                            <span className="capitalize">{post.platform}</span>
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="pt-4">
                        <div className="flex items-center mb-2">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden mr-2">
                            <img 
                              src={post.profileImageUrl} 
                              alt={post.username} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{post.username}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(post.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-sm line-clamp-3 mb-2">{post.caption}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        {post.location && (
                          <div className="flex items-center text-xs text-muted-foreground mb-3">
                            <Map className="h-3 w-3 mr-1" />
                            <span>{post.location.name}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {post.engagement.likes}
                            </span>
                            <span className="flex items-center">
                              <Share className="h-3 w-3 mr-1" />
                              {post.engagement.shares}
                            </span>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs h-7 px-2"
                            onClick={() => selectUGCForMatching(post)}
                          >
                            Match Content
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Post Dialog */}
      <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Social Media Post</DialogTitle>
            <DialogDescription>
              Create and schedule a post for social media platforms.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="captionEn">Caption (English)</Label>
                <div className="relative">
                  <Textarea
                    id="captionEn"
                    name="captionEn"
                    placeholder="Enter your caption in English"
                    rows={4}
                    value={newPost.captionEn}
                    onChange={handleInputChange}
                    className="resize-none"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute bottom-2 right-2 h-6 text-xs"
                    onClick={() => copyToOtherLanguage('captionEn')}
                  >
                    Copy to JP
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Use hashtags to increase visibility.
                </p>
              </div>
              
              <div>
                <Label htmlFor="captionJp">Caption (Japanese)</Label>
                <div className="relative">
                  <Textarea
                    id="captionJp"
                    name="captionJp"
                    placeholder="日本語でキャプションを入力"
                    rows={4}
                    value={newPost.captionJp}
                    onChange={handleInputChange}
                    className="resize-none"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute bottom-2 right-2 h-6 text-xs"
                    onClick={() => copyToOtherLanguage('captionJp')}
                  >
                    Copy to EN
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  ハッシュタグを使って視認性を高めましょう。
                </p>
              </div>
            </div>
            
            <div>
              <Label htmlFor="imageUrl">Media URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                placeholder="Enter image or video URL"
                value={newPost.imageUrl}
                onChange={handleInputChange}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Add a direct link to your image or video.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="platform">Platform</Label>
                <Select value={newPost.platform} onValueChange={handlePlatformSelect}>
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="twitter">Twitter/X</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="status">Post Status</Label>
                <Select value={newPost.status} onValueChange={handleStatusSelect}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Schedule</SelectItem>
                    <SelectItem value="published">Publish Now</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {newPost.status === 'scheduled' && (
              <div>
                <Label htmlFor="scheduleDate">Schedule Date</Label>
                <Input
                  id="scheduleDate"
                  type="datetime-local"
                  name="publishDate"
                  value={newPost.publishDate}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatePostOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePost}>
              {newPost.status === 'published' ? 'Publish Now' : 
               newPost.status === 'scheduled' ? 'Schedule' : 'Save Draft'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Match UGC Dialog */}
      <Dialog open={isMatchDialogOpen} onOpenChange={setIsMatchDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Match User Content</DialogTitle>
            <DialogDescription>
              Associate this user-generated content with routes and quests.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUGC && (
            <div className="space-y-6 mt-4">
              <div className="flex items-start gap-4">
                <div className="w-32 h-32 rounded overflow-hidden bg-secondary flex-shrink-0">
                  <img 
                    src={selectedUGC.imageUrl} 
                    alt={`Post by ${selectedUGC.username}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full overflow-hidden mr-2">
                      <img 
                        src={selectedUGC.profileImageUrl} 
                        alt={selectedUGC.username} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-medium text-sm">{selectedUGC.username}</p>
                  </div>
                  <p className="text-sm mb-2">{selectedUGC.caption}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedUGC.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Match to Routes</h3>
                <div className="grid grid-cols-2 gap-2">
                  {mockRoutes.map(route => (
                    <div key={route.id} className="flex items-center space-x-2">
                      <Switch 
                        id={`route-${route.id}`} 
                        checked={selectedRoutes.includes(route.nameEn)}
                        onCheckedChange={() => toggleRouteSelection(route.nameEn)}
                      />
                      <Label htmlFor={`route-${route.id}`} className="text-sm">
                        {language === 'en' ? route.nameEn : route.nameJp}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Match to Quests</h3>
                <div className="grid grid-cols-2 gap-2">
                  {mockQuests.map(quest => (
                    <div key={quest.id} className="flex items-center space-x-2">
                      <Switch 
                        id={`quest-${quest.id}`} 
                        checked={selectedQuests.includes(quest.titleEn)}
                        onCheckedChange={() => toggleQuestSelection(quest.titleEn)}
                      />
                      <Label htmlFor={`quest-${quest.id}`} className="text-sm">
                        {language === 'en' ? quest.titleEn : quest.titleJp}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMatchDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleMatchUGC}>
              Save Matches
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialMediaManagement;
